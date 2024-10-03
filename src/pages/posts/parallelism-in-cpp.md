---
layout: ../../layouts/PostLayout.astro
title: "Parallelism in C++"
pubDate: 31 December 2022
description: "Let's discuss about threads, mutexes, async/await and much more"
author: "Stefan Asandei"
tags: []
---

## Introduction

We have multiple ways to achieve parallel computing in C++. The most common method is the use of `std::thread`, but there is also `std::async`, parallel for loops and coroutines. In the end, all functions use multiple threads to allow paralel execution. I will go through the most common methods and some related helper classes in the rest of this article.

## Threads

C++11 introduced threads, they allow multiple functions to execute concurrently. You may want to use this when you want to have two or more different threads of execution, running separately from one another, that achieve different tasks. For example you may have one main thread and a one for logging, or you may have a main thread and one used for rendering. It's very slow to communicate between threads, so avoid multi-threading when you have one main objective that can't be separated into other subtasks. Here it is an example:

```cpp
#include <iostream>
#include <threads>
#include <chrono>

void task() {
    for(int i=0; i<10; i++)
        std::cout << i << '\n';
    std::this_thread::sleep_for(std::chrono::seconds(1));
}

int main() {
    // starting first thread
    std::thread t1(task);

    // start second thread
    std::thread t2(task);

    // wait for the two thread to finish
    t1.join();
    t2.join();

    // everything is done
    return 0;
}
```

Notice the `join` function, that joins the thread with the main one, thus making the whole program wait for its execution to finish. Think of it like literal threads, you have one long thread and when you call `t1`, you create another thread coming from the first one, when you join them, they become one and the execution becomes linear.

You can query system hardware information using this standard functions:
```cpp
#include <threads>

// number of concurrent threads supported
// it's the number of CPU cores
std::thread::hardware_concurrency();
```

C++20 introduced `std::jthread`, it It has the same general behavior as std::thread, except that jthread automatically rejoins on destruction, and can be canceled/stopped in certain situations. Usually threads are destructed when the main thread finishes (the main functions reaches its end), the program will stop but they will continue running (unless you explicitly call join), since they're not tied in any way to the other main thread. A jthread will join the main thread, which means the program will finish only when all jthreads finish. This is mainly used for convenience, in case you forgot to write `join` for each thread in the end.

## Mutexes

A mutex, also known as a mutual exclusion, is used to protect variables from concurrent reads/writes from multiple threads. You can use it to avoid race conditions, which can happen when threads write to a shared resource at the same time. A mutex acts as a lock, it blocks access from a variable until you unlock it:

```cpp
#include <iostream>
#include <mutex>
#include <thread>

int counter = 0;
std::mutex counter_mutex;

void increment_counter() {
    // Acquire the mutex
    std::lock_guard<std::mutex> lock(counter_mutex);

    // Mutate the variable
    // happens across multiple threads
    counter++;
}

int main() {
    // Create two threads that increment the counter
    std::thread t1(increment_counter);
    std::thread t2(increment_counter);

    // Wait for the threads to finish
    t1.join();
    t2.join();

    // Print the final value of the counter
    std::cout << counter << std::endl;  // Outputs 2
    return 0;
}
```

Notice we used `std::lock_guard` inside the thread function. The class lock_guard is a mutex wrapper that provides a convenient RAII-style mechanism for owning a mutex for the duration of a scoped block. It basically acquired the mutex during the scope of the function, it's automatically unlocked at the end of the function. Here it is how to do it manually:

```cpp
void increment_counter() {
    counter_mutex.lock();
    counter++;
    counter_mutex.unlock();
}
```

As a summary, use a mutex when you have a variable where you need to write to from multiple threads.

## Atomics

An atomic data type is protected from data races, if one thread tries to write to atomic objects while another thread is extracting values from it, the result is well defined. Basically if you wrap your data type into an atomic, you don't have to worry about cross threads operations since they are guaranteed to be updated in an atomic manner, meaning that they cannot be interrupted by another thread during an update. Here it is an example:

```cpp
#include <atomic>
#include <iostream>
#include <thread>

int main() {
  // Define an atomic integer variable
  std::atomic<int> count(0);

  // Increment the atomic variable from two different threads
  std::thread t1([&]() {
    for (int i = 0; i < 100000; i++) {
      count.fetch_add(1, std::memory_order_relaxed);
    }
  });
  std::thread t2([&]() {
    for (int i = 0; i < 100000; i++) {
      count.fetch_add(1, std::memory_order_relaxed);
    }
  });

  // Wait for the threads to finish
  t1.join();
  t2.join();

  // Print the final value of the atomic variable
  std::cout << count << std::endl;  // Outputs 200000

  return 0;
}
```

Here we have an atomic integer. To add a value to it, use the `fetch_add` method. The `std::memory_order_relaxed` means the operations may be done in any order and may not be immediately visible to other threads. You can read about other options here: https://en.cppreference.com/w/cpp/atomic/memory_order.

This may seem quite similar to `std::mutex`, so what are the differences? Firstly, atomics are specialized types designed for atomic operations, where mutexes are for general purpose. A mutex is also slower since it requires overhead when locking and unlocking itself. As a last bonus, atomics are also more predictable and easier to debug.

## Conditional variables

Another challenge when working with threads is when you want to execute stuff only when a certain condition is met. One use case would be a web server that uses a different thread for each new request, you would want to run code only when you get a request and not to check every time if you got one. This can be achieved using conditional variables:

```cpp
#include <condition_variable>
#include <iostream>
#include <mutex>
#include <thread>

bool flag = false;
std::mutex flag_mutex;
std::condition_variable flag_cv;

void waiting_thread() {
  // Acquire the mutex
  std::unique_lock<std::mutex> lock(flag_mutex);

  // Wait for the flag to be set
  flag_cv.wait(lock, [] { return flag; });

  // Print a message
  std::cout << "The flag is set!" << std::endl;
}

int main() {
  // Create a thread that waits for the flag
  std::thread t(waiting_thread);

  // Sleep for 1 second
  std::this_thread::sleep_for(std::chrono::seconds(1));

  // Set the flag
  {
    std::lock_guard<std::mutex> lock(flag_mutex);
    flag = true;
  }

  // Notify the waiting thread
  flag_cv.notify_one();

  // Wait for the thread to finish
  t.join();

  return 0;
}
```

The condition_variable class is a synchronization primitive used with a std::mutex to block one or more threads until another thread both modifies a shared variable (the condition) and notifies the condition_variable. Here it is the documentation for it: https://en.cppreference.com/w/cpp/thread/condition_variable.

## Async

Asynchronous functions are a quick way to separate their execution to another thread so they don't block the main thread. An async function will be dispatched from the main thread, it will run on a separate thread and it will join back returning the result when done. One example use case would be when you want to load multiple 3D models that don't have anything to do with each other, independent resources. Here it is how something like this would look like:

```cpp
#include <iostream>
#include <future>

int load_model(int id) {
    std::cout << "loading model\n";
    return id+1; // example function only
}

int main() {
    auto result = std::async(std::launch::async, load_model, 3);
    std::cout << result.get() << '\n';
    return 0;
}
```

You may be quite familiar if you've ever used javascript, which makes very heavy use of async functions for web related functions.

## Thread pools

This one is a programming technique and not a standard function. The creation of threads is very slow. If our program needs a large number of threads, let's say for handling incoming web requests or for rendering, instead of creating each one when it's needed, we can created a bunch of threads at the start of the program and reuse them. This is known as a tread pool. Let's take a look at some code:

```cpp
#include <iostream>
#include <thread>
#include <array>

void f() {
    while(true) {
        // do some work
        // might want to use conditional variables
        // inside here
    }
}

constexpr int pool_size = 4;
std::array<std::thread, pool_size> pool;

int main() {
    for(int i=0; i<pool_size; i++)
        pool[i] = std::thread(f);
    // rest of program
    for(int i=0; i<pool_size; i++)
        pool[i].join();
    pool[i].clear();
    // very basic implementation
    // for demonstration purposes only
    return 0;
}
```

This is a very basic implementation of a thread pool, just an array of threads. One notable thing is, once we construct a thread, it will start running for the rest of the program. This is why each thread would normally contain a conditional variable to know when to start running some work. To pass them arguments, you can also use a queue for the jobs. This is a pretty complex topic, you can read more about it online until I will write a separate article.

## Parallel for-each loops

C++17 introduced the easiest way to introduce multi-threading to a program, the `std::for_each` can loop over a view and run a function for each element. Here it is a normal use of it:

```cpp
std::vector<int> v = {1, 2, 3};

std::for_each(v.begin(), v.end(), [](auto& i) {
    std::cout << i << ' ';
});

// 1, 2, 3
```

First two arguments define the range and the third is a lambda expression that will be run for each element of the range. Now the cool thing is, the first argument can also be `std::is_execution_policy_v`, which specifies how to run the loop. Let's change the example above to make it run in parallel:

```cpp
#include <execution>

std::for_each(std::execution::par, v.begin(), v.end(), [](auto& i) {
    std::cout << i << ' ';
});
```

Sadly, even if this is part of the standard, not all compilers (gcc and clang) have implemented this. In my own testing, only MSVC had the `<execution>` header.

## Coroutines

Last, but not the least, one of the newest additions to C++, this is one of the biggest features to C++20. This is again quite a complex topic and requires a full length article, hence this is just a brief introduction. Coroutines represent function that can pause their execution and be resumed later. You can use the `co_await` (to wait for a couritine to finish) and `co_yield` (to return a value and pause the execution) keywords. I also found this nice video explaining how a couritine runs: https://www.youtube.com/watch?v=fstYQ1Zq73A.

How to make a couroutine:
- must contain `co_await` or `co_yield` keyword
- must have a return type that
  - has a `promise_type` typedef specifying the *Promise* type
  - usually templated - e.g. Task<T> - where T is the type of the actual coroutine result
  - the STL does not provide any such return type
  - the return type is an interface for the caller, the *Promise* type is an interface for the coroutine
- muse use `co_return` instead of `return`

To exemplify the use of coroutines, I will create a generator, a routine that can be used to control the iteration behavior of the loop. It's basically a function `g()` that every time we call will return the next element in a sequence, let's say the fibonacci sequence. It will be used like this:

```cpp
// create our generator for the first 10 numbers
auto gen = fibonacci_sequence(10);


for (int j = 0; gen; j++)
    std::cout << "fib(" << j << ")=" << gen() << '\n';
```

In the code above, `fibonacci_sequence` is a coroutine that returns an unsigned integer. Since coroutines do not have to run sequentially, we can yield a result, pause the execution, and resume when the main thread requests the next number. First step to implement this is to define the return type of the coroutine, let's call it `Generator`:

```cpp
template <typename T>
struct Generator {
    // The class name 'Generator' is our choice and it is not required for coroutine
    // magic. Compiler recognizes coroutine by the presence of 'co_yield' keyword.
    // You can use name 'MyGenerator' (or any other name) instead as long as you include
    // nested struct promise_type with 'MyGenerator get_return_object()' method.
    // Note: You need to adjust class constructor/destructor names too when choosing to
    // rename class.

    struct promise_type;
    using handle_type = std::coroutine_handle<promise_type>;

    struct promise_type { // required
        T value_;
        std::exception_ptr exception_;

        Generator get_return_object() {
            return Generator(handle_type::from_promise(\*this));
        }
        std::suspend_always initial_suspend() { return {}; }
        std::suspend_always final_suspend() noexcept { return {}; }
        void unhandled_exception() { exception_ = std::current_exception(); } // saving
                                                                              // exception

        template <std::convertible_to<T> From> // C++20 concept
        std::suspend_always yield_value(From&& from) {
            value_ = std::forward<From>(from); // caching the result in promise
            return {};
        }
        void return_void() { }
    };

    handle_type h_;

    Generator(handle_type h)
        : h_(h)
    {
    }
    ~Generator() { h_.destroy(); }
    explicit operator bool() {
        fill(); // The only way to reliably find out whether or not we finished coroutine,
                // whether or not there is going to be a next value generated (co_yield)
                // in coroutine via C++ getter (operator () below) is to execute/resume
                // coroutine until the next co_yield point (or let it fall off end).
                // Then we store/cache result in promise to allow getter (operator() below
                // to grab it without executing coroutine).
        return !h_.done();
    }
    T operator()() {
        fill();
        full_ = false; // we are going to move out previously cached
                       // result to make promise empty again
        return std::move(h_.promise().value_);
    }

private:
    bool full_ = false;

    void fill() {
        if (!full_) {
            h_();
            if (h_.promise().exception_)
                std::rethrow_exception(h_.promise().exception_);
            // propagate coroutine exception in called context

            full_ = true;
        }
    }
};
```

This is quite a long definition but it's also kind of standard, you may reuse it for any other generator. Now, the implementation of the actual coroutine function:

```cpp
Generator<uint64_t> fibonacci_sequence(unsigned n) {
    if (n == 0)
        co_return;

    if (n > 94)
        throw std::runtime_error("Too big Fibonacci sequence. Elements would overflow.");

    // co_yield returns a result and then pauses the execution
    // the function will resume when it's called again
    // this is a stack-less coroutine
    co_yield 0;

    if (n == 1)
        co_return;

    co_yield 1;

    if (n == 2)
        co_return;

    uint64_t a = 0;
    uint64_t b = 1;

    // iteratively create the fibonacci sequence
    // and yield each result
    for (unsigned i = 2; i < n; i++) {
        uint64_t s = a + b;
        co_yield s;
        a = b;
        b = s;
    }
}
```

This is one use case of coroutines, they're pretty complex and require a lot of code to setup. You can read more about them on the C++ documentation, which I left a link to in my resources section.

## Conclusion

Multi-threading is a very powerful technique to allow a program to do multiple things at once. This may sound easy in theory, but in practice there are a lot of issues, such as race conditions. We have multiple data structures to help us with that, besides there are also best practices and algorithms we can implement.

## Resources

- https://en.cppreference.com/w/cpp/thread
- https://lewissbaker.github.io/2022/08/27/understanding-the-compiler-transform
- https://bartoszmilewski.com/2008/12/01/c-atomics-and-memory-ordering/
- https://en.cppreference.com/w/cpp/language/coroutines
- https://stackoverflow.com/questions/71153205/c-coroutine-when-how-to-use
- https://stackoverflow.com/questions/31978324/what-exactly-is-stdatomic
- https://www.scs.stanford.edu/~dm/blog/c++-coroutines.html
