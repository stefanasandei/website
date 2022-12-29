---
layout: ../../layouts/PostLayout.astro
title: "An introduction to C++ templates"
publishDate: 28 December 2022
description: "Templates are one of the core features of C++"
author: "Stefan Asandei"
tags: []
---

## Why do we need templates

Most likely, if you've ever used C++ before, you've used templates in some form or another, maybe without even knowing this feature. Firstly, let's discuss why templates are needed. Imagine this situation:

```cpp
void Print(int a) {
    std::cout << a << '\n';
}

void Print(float a) {
    std::cout << a << '\n';
}

// also for strings, doubles, etc.
```

We have a `Print` function that needs to work for multiple types. Without using templates, we have to manually write all the definitions we might want for all. As you see, the function body is the same, only the signature is different. What if we want to auto-generate all the functions we need? This is where templates come in.

## Basics

Templates are a way to instruct the compiler on what code to generate. They're like a blueprint for the compiler, to fill in the gaps. This way, the programmer can only write a general function or class and only write the rules for the compiler to generate the specific code. Let's look at this example, probably the most simple way to use a template:

```cpp
template<typename T>
void Print(T a) {
    std::cout << a << '\n';
}
```

The interesting thing is, this definition alone won't generate any code in the executable. The compiler generates only the needed definitions, since we're not calling the function, it won't generate anything. Now, if we write something like this in the main, for example:

```cpp
int main() {
    Print<int>(12);
    Print<std::string>("Hello, World!");
}
```

We'll have two functions in the compiler's output: one for ints and one for strings. This is a very simple, yet powerful, use of templates. They can be used for metaprogramming, they're like a whole turing complete compile-time language inside C++.

## The syntax

The standard syntax when declaring a template is `template<typename T, ...>`, where `template` is the keyword, `typename` refers to a type T. Older C++ programs use the `class` keyword instead of `typename`, which still works but it isn't so obvious in my opinion, so I always prefer the latter approach instead. We can also use a specific type name instead, like `template<int N>`, this is allowed and you may want to use this. 

```
template <typename identifier> function_declaration;
```

And to use it:

```
function_name <type> (parameters);
```

Don't try to memorize, just use it and it'll come naturally. 

## Compile-time computations

I said they're compile-time, but what can they compute? Almost anything, with some functional programming concepts we can write functions that compute things during the program compilation. Let's take a look at this example:

```cpp
template<int32_t N>
struct Factorial {
  static constexpr int32_t value = N * Factorial<N-1>::value;
};

template<>
struct Factorial<0> {
  static constexpr int32_t value = 1;
};

// Factorial<10>::value = 3628800
```

This is a recurse implementation of the factorial, it calls the previous value of the factorial until it reaches the base condition, 0! = 1, and then it stops and the result is done. This uses `constexpr` to indicate this constant expression is calculated at compile-time.

## Template classes

Another common use case is represented by classes:

```cpp
template<typename T>
struct Vector2 {
  T x, y;

  float GetLenght() const {
    return std::sqrt(x*x + y*y);
  }
};

// Vector2<int>, Vector2<float>, ...
```

This is quite simple, we have a Vector2 struct that can have elements of any type (usually int, float, or double, but this doesn't matter here). I'm sure you've seen this being heavily used by the Standard *Template* Library (STL):

```cpp
std::vector<int>
std::array<float, 1024>
std::unordered_map<std::string, int>
std::bitset<256>
// many more
```

## Concepts - constraints

In some cases, we may not want to allow any type for our class or functions. Concepts are requirements the template arguments have to follow. First, we define a `concept` and then we use the `requires` keyword in the template.

```cpp
#include <concepts>

template<typename T>
concept arithmetic = std::integral<T> || std::floating_point<T>;

template<typename T>
requires arithmetic<T>
T add(T a, T b) {
    return a + b;
}
```

This makes a lot of sense here, we don't want to add vectors or strings in the `add` function, and thus we require only arithmetic types, such as int or float. Concepts were introduced in C++20, before that, requirements for templates could be implemented using `std::enable_if`, which can be more verbose and lead to worse compiler warnings or errors.

Concepts can also be used to check if the class follows a particular interface that has a set of methods:

```cpp
template <typename SpecialObject>
concept IsSpecialObject = requires (SpecialObject obj) {
  obj.interfaceA();
  obj.interfaceB(); // has interfaceA() and interfaceB()
  { obj.interfaceC() } -> std::same_as<int>; 
  // the return type of interfaceC() is an int
};

// not necessarily a template
void doSomething(IsSpecialObject auto obj) { }
```

This may seem weird regarding the syntax, but it can be useful to reduce code duplication. 

## Compiler insight

Let's take a look at the code generated by the compiler. For this, I'll use the `clang` compiler, version `15.0.0`, for x86_64. I prepared the following C++ source code:

```cpp
#include <cstdio>

template<int32_t exp>
constexpr uint64_t RaiseToPower(int32_t base) {
    return base * RaiseToPower<exp-1>(base);
}

template<>
constexpr uint64_t RaiseToPower<0>(int32_t base) {
    return 1;
}

int main() {
    constexpr uint64_t n = RaiseToPower<3>(2);
    printf("%llu\n", n);
    return 0;
}
```

This is another basic template example, it raises the `base` to the `exp` power. It uses recursion for this. Here I used the `cstdio` library with the `printf` command since it produces way less assembly, which makes the output easier to read. First, I compiled it with the following command: `clang file.cpp -O0 -std=c++20 -S -o ./file.S`, notice the `-O0` flag (this disables any optimizations):

```asm
main:                                   # @main
        push    rbp
        mov     rbp, rsp
        sub     rsp, 16
        mov     dword ptr [rbp - 4], 0
        mov     edi, 2
        call    unsigned long RaiseToPower<3>(int)
        mov     qword ptr [rbp - 16], rax
        mov     rsi, qword ptr [rbp - 16]
        lea     rdi, [rip + .L.str]
        mov     al, 0
        call    printf@PLT
        xor     eax, eax
        add     rsp, 16
        pop     rbp
        ret
unsigned long RaiseToPower<3>(int):               # @unsigned long RaiseToPower<3>(int)
        push    rbp
        mov     rbp, rsp
        sub     rsp, 16
        mov     dword ptr [rbp - 4], edi
        movsxd  rax, dword ptr [rbp - 4]
        mov     qword ptr [rbp - 16], rax       # 8-byte Spill
        mov     edi, dword ptr [rbp - 4]
        call    unsigned long RaiseToPower<2>(int)
        mov     rcx, rax
        mov     rax, qword ptr [rbp - 16]       # 8-byte Reload
        imul    rax, rcx
        add     rsp, 16
        pop     rbp
        ret
unsigned long RaiseToPower<2>(int):               # @unsigned long RaiseToPower<2>(int)
        push    rbp
        mov     rbp, rsp
        sub     rsp, 16
        mov     dword ptr [rbp - 4], edi
        movsxd  rax, dword ptr [rbp - 4]
        mov     qword ptr [rbp - 16], rax       # 8-byte Spill
        mov     edi, dword ptr [rbp - 4]
        call    unsigned long RaiseToPower<1>(int)
        mov     rcx, rax
        mov     rax, qword ptr [rbp - 16]       # 8-byte Reload
        imul    rax, rcx
        add     rsp, 16
        pop     rbp
        ret
unsigned long RaiseToPower<1>(int):               # @unsigned long RaiseToPower<1>(int)
        push    rbp
        mov     rbp, rsp
        sub     rsp, 16
        mov     dword ptr [rbp - 4], edi
        movsxd  rax, dword ptr [rbp - 4]
        mov     qword ptr [rbp - 16], rax       # 8-byte Spill
        mov     edi, dword ptr [rbp - 4]
        call    unsigned long RaiseToPower<0>(int)
        mov     rcx, rax
        mov     rax, qword ptr [rbp - 16]       # 8-byte Reload
        imul    rax, rcx
        add     rsp, 16
        pop     rbp
        ret
unsigned long RaiseToPower<0>(int):               # @unsigned long RaiseToPower<0>(int)
        push    rbp
        mov     rbp, rsp
        mov     dword ptr [rbp - 4], edi
        mov     eax, 1
        pop     rbp
        ret
.L.str:
        .asciz  "%llu\n"
```

This is the unoptimized output. You can see the compiler just generated the code we needed! It created definitions for RaiseToPower<0>, <1>, <2> and <3>. Only the functions we explicitly called in our code were generated, this is why we can't, for example, use a variable as a parameter for a template. The arguments need to be known at compile time. Each of the functions is the same, except for the template argument. This is the main reason why we use templates, and let the compiler do the boring code generation.

Now let's see how the compiler can optimize this.
Optimized output (`-O3`):

```asm
main:                                   # @main
        push    rax
        lea     rdi, [rip + .L.str]
        mov     esi, 8
        xor     eax, eax
        call    printf@PLT
        xor     eax, eax
        pop     rcx
        ret
.L.str:
        .asciz  "%llu\n"
```

Wow, this is way shorter and faster! The compiler already computed the result, look at the line "`mov esi, 8`", 8 is our result (2^3) and esi is a register used as a parameter by `printf` in this case. We don't even have a separate variable for `n` in this case. This can be achieved by using the `constexpr` specifier, otherwise, the compiler may or may not decide to optimize this.

## Conclusion

Templates are a very powerful feature of C++ that enables metaprogramming. Besides making code cleaner and more concise, they can also be used to implement compile-time optimizations, which can also be achieved with a normal function in some cases. Templates can also be used in the wrong context and can lead to confusing code, in these scenarios you need to be careful when and how to use them. 

## References

- C++ documentation: https://en.cppreference.com/w/cpp/language/constraints
- more documentation: https://en.cppreference.com/w/cpp/language/templates
- Sandor Dargo's Blog: https://www.sandordargo.com/blog/2021/03/24/concepts-in-real-life
- The Compiler Explorer: https://godbolt.org
