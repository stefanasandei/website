---
layout: ../../layouts/PostLayout.astro
title: Memory management in modern C++
publishDate: 21 December 2023
description: How to better manage memory using specific programming techniques
author: "Stefan Asandei"
tags: []
---

## Introduction

Memory management is usually abstracted in most languages, however, that is not the case in C++. This makes C++ favorable for low latency and efficient systems, with the downside of not being safe. In this article, I want to present a couple of techniques to better manage memory manually. Modern C++ has come a long way from C to offer containers and best practices to ease the process of managing memory. Now of course, this is a never-ending cycle, as Rust introduced the concept of a borrow checker to make memory management safer, while also adding a lot of compiler overheard and worsening the developer experience. So let's buckle up and start exploring what C++ has to offer!

## The stack

Objects are allocated by default on the stack. It is the most basic way of managing memory, while also being very fast. It is a continuous block of memory, which allows the program to take advantage of hot L1 and L2 cache. Let's take a loop at a side-by-side comparison of some C++ code and its respective x86_64 assembly-generated code:

<div style="code-row">

```cpp
int main() {
    int a = 3;
    int b = 5;

    return 0;
}
```

```asm
main:
    push    rbp
    mov     rbp, rsp
    mov     dword ptr [rbp-4], 3
    mov     dword ptr [rbp-8], 5
    mov     eax, 0
    pop     rbp
    ret
```

</div>

In assembly, `rsp` is known as the stack pointer. It is a special-purpose register, and it points to the top of the stack. You can see in assembly what's really happening when we declare a variable. The value `3` is simply put at the memory address of `rbp - 4`. One integer is the size of 4 bytes, that's why we're subtracting from `rbp` multiples of 4.

Now this sparks the question "Why don't we use the stack for everything?". Well, we should try to use the stack as frequently as possible, however, it's not feasible because of its size limitations. We cannout allocate large objects unto the stack very often, since we'll run out of memory. Otherwise, the stack is very fast and optimal. How do we solve this max size limitation? We turn to the heap.

## The heap

Objects can be manually allocated unto the heap using the `new` operator, to be freed later using the `delete` operator. This is possible using language abstractions, as this does not translate to direct assembly calls to allocate memory, but to custom allocator interfaces in C++. 

Dynamic memory management has the downside of being explicit, the programmer must not forget to free the allocated memory, to avoid memory leaks. Here it is a simple example:

```cpp
int* a = new int[5];
a[0] = 3;

delete[] a;
```

Under the hood, this boils down to calls to "operator new[](unsigned long)" and "operator delete[](void*)", which have their own implementation-specific details.

Heap memory is not stored in a continuous place, and especially when big objects get freed and moved around, gaps are left making CPU caches hits fewer. To avoid this we can use memory management techniques, such as an arena allocator.

## Standard allocator interface

But first I want to talk about the std::allocator interface, which allows us to define an allocator we can use with standard containers. For a class to be a valid std::allocator, it needs to respect the [specification](https://en.cppreference.com/w/cpp/memory/allocator). As of C++23, this states that the class must have at least the value_type and size_type members and the allocate and deallocate member functions. Here is an example:

```cpp
template <class T>
class my_allocator {
public:
    using value_type = T;

    allocator() noexcept {}

    value_type* allocate(std::size_t n) {
        return static_cast<value_type*>(new (n * sizeof(value_type)));
    }

    void deallocate(value_type* p, std::size_t) noexcept {
        delete(p);
    }
};
```

Now we can use it like this:

```cpp
my_allocator<int> alloc;

int* p = alloc.allocate(1);
alloc.deallocate(p, 1);
```

We can use it with standard containers by passing it as a template argument:

```cpp
std::vector<int, my_allocator<int>> vec;
    
for (int i = 0; i < 10; ++i) {
    vec.push_back(i);
}
    
for (const auto& elem : vec) {
    std::cout << elem << " ";
}
```

## Arena allocator

With this bag of knowledge, we can get into custom allocator patterns. These patterns can allow us to get better performance or memory usage, depending on the use case. One specific pattern I want to talk about is the arena allocator, which allows us to allocate large objects into a continuous space of memory, to optimize speed through CPU cache hits.

In an arena allocator, we start by allocating a large block of memory at the creation of the allocator. When we get an allocation request, we simply return the address of the current memory block within the arena and increment it with the size of the requested object. We don't need to do anything when we get a deallocation request, since everything will get freed when the destructor of the arena allocator gets called. This way the programmer doesn't have to remember to manually deallocate memory.

```cpp
template<typename T>
class ArenaAllocator {
public:
    using value_type = T;
    using pointer = T*;
    using const_pointer = const T*;
    using size_type = std::size_t;
    
    ArenaAllocator() {
        arena = std::allocator<T>().allocate(ARENA_SIZE);
        arena_end = arena + ARENA_SIZE;
        current_pos = arena;
    }
    
    template<typename U>
    struct rebind {
        using other = ArenaAllocator<U>;
    };
    
    T* allocate(size_type n) {
        if (current_pos + n <= arena_end) {
            T* result = current_pos;
            current_pos += n;
            return result;
        } else {
            throw std::bad_alloc();
        }
    }
    
    void deallocate(T* p, size_type n) {
        // Deallocation in arena allocator is a no-op
        // The entire arena is deallocated when the allocator is destroyed
    }
    
    ~ArenaAllocator() {
        std::allocator<T>().deallocate(arena, ARENA_SIZE);
    }

private:
    static constexpr size_type ARENA_SIZE = 100;

    pointer arena;
    pointer arena_end;
    pointer current_pos;
};
```

Now this is only an example implementation. You may also want to implement this for type-agnostic objects, where we only work with type pointers and allocate blocks of dynamic size. The principle is the same either way.

## Resource tracking

Let's take a step back and check out a method for memory management. This can be useful for debugging or benchmarking. Since dynamic memory management on the heap is done using the new and delete operators, we can override these functions.

```cpp
void* operator new(size_t size) {
    std::cout << "Allocating " << size << " bytes\n";

    return malloc(size);
}

void operator delete(void* ptr, size_t size) {
    std::cout << "Freeing " << size << " bytes\n";
    
    free(ptr);
}
```

In the new implementation, we can also update a global state for memory allocations: 

```cpp
size_t AllocatedBytes = 0;

void* operator new(size_t size) {
    AllocatedBytes += size;
    return malloc(size);
}

void* operator delete(void* ptr, size_t size) {
    AllocatedBytes -= size;
    free(ptr);
}

// we can call this at the end of our program
void DetectMemoryLeaks() {
    std::assert(AllocatedBytes == 0);
}
```

## RAII

RAII stands for "Resource Acquisition Is Initialization" and it is a C++ programming technique. RAII can help us prevent memory leaks by managing the heap memory of an object through its construct & destructor. We can allocate memory in the constructor and free it in the destructor, which gets called automatically at the end of the lifetime of the object. 

```cpp
class Object {
public:
    Object() {
        m_Memory = new int[100];
    }

    ~Object() {
        delete[] m_Memory;
    }

private:
    int* m_Memory;
};
```

Most modern C++ libraries should use RAII since it leverages OOP for memory safety. Here I would want to point out `Vulkan.hpp` which encapsulates Vulkan objects through the `vk::raii` namespace in RAII objects. This is very significant hence Vulkan development requires the creation and destruction of *a lot* of objects.

<!-- ## Custom malloc

todo

## Multithreading safe allocator

todo one day maybe -->

## Conclusion

Memory management is a key aspect of software development and it shouldn't be overlooked. The memory safety helpers of languages such as Rust are one of their core features and the reason why people are moving from traditional system languages, like C or C++. This is why I consider all C++ programmers should take memory management very seriously and consider using modern language features & best practices to ensure memory safety.

## References

- https://en.cppreference.com/w/cpp/language/raii
- https://courses.engr.illinois.edu/cs225/fa2022/resources/stack-heap/
- https://www.plantation-productions.com/Webster/www.artofasm.com/DOS/ch11/CH11-4.html
- https://en.cppreference.com/w/cpp/memory/allocator
- https://godbolt.org/