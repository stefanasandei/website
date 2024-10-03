---
layout: ../../layouts/PostLayout.astro
title: "Fast vector operations with SIMD"
pubDate: 24 January 2023
description: "What if we can work with 8+ elements at a time?"
author: "Stefan Asandei"
tags: []
---

## Introduction

SIMD, which stands for "Single instruction, multiple data", is an internal part of the hardware design that performs the same operation on multiple data points simultaneously. By using it, you can process more elements with a single assembly instruction. By processing, I refer to arithmetic operations, comparison, loading, storing, blend and permutation between elements. A vector is nothing more than a collection of values stored liniarly in memory, modern processors feature ways to allow the manipulation of vectors using SIMD. However, the x86 specification doesn't provide guidelines for this, hence CPU vendors developed various extensions, such as SSE, AVX and NEON (arm). A SIMD unit does use parallel processing for computation, but it's in a more lightweight way, without the use of different threads, since it operates at a very low level.

## Extensions

Let's take a look at some SIMD extensions for modern processors:

- Streaming SIMD Extensions (SSE): introduced by Intel in 1999 for the x86 arhitecture, it contains 70 instructions and it has multiple versions
- Advanced Vector Extensions (AVX): from Intel & AMD in 2008 for x86, it provides new features and new instructions
- Neon: for ARM processors since 2011

Generally, for a modern x86 CPU I would recommend using primarily AVX, but you can also check support at runtime or at compile-time. For ARM processors Neon is the only option, which was also developed by ARM. All of these extensions have multiple versions, such as SSE1, SSE2, SSE3 and SSE4 (2006) for SSE and AVX2, AVX-512 (2013) for AVX. Note that, for the best performance, you should always benchmark which extension performs the best in your case. Know that even if these extensions were released in different years by different vendors, their API is very similar and by learning only one of them, you basically know how to operate all Now, let's discuss about each of these extensions.

## Streaming SIMD Extensions

SSE added eight new 128-bit registers known as `XMM0` through `XMM7`. Newer versions added up to the `XMM15` register. You can refer to the [Wikipedia](https://en.wikipedia.org/wiki/Streaming_SIMD_Extensions) article for a nice list of all its instructions, I prefer to demonstrate how to use it by giving practical examples. The most basic example for a SIMD operation would be the addition of two vectors. Since SSE and AVX are very similar, here I will write the code in Assembly x86 and in the AVX section I will use C, both for GNU/Linux.

```asm
section .data
    a db 1, 2, 3, 4
    b db 4, 3, 2, 1
    result db 0, 0, 0, 0

section .text
    global _start

_start:
    ; load values into xmm0 and xmm1
    movups xmm0, [a]
    movups xmm1, [b]

    ; perform addition using SSE instruction
    addps xmm0, xmm1

    ; store the result
    movups [result], xmm0

    ; exit the program
    mov rax, 60
    mov rdi, 0
    syscall
```

As you can see, here we use the `xmm0` and `xmm1` registers. To load data into them use the `movups` instruction. The actual operation here, addition, is `addps`, which adds the four elements of the two vector at the same time. This example is very simple, as it doesn't check the memory alignment and size, which is very important for SIMD (I'll show how in the C code). To run this code:

```bash
# compile
nasm -felf64 ./test-sse.asm

# link
ld ./test-sse.o -o ./test-sse

# run
./test-sse
```

There will be one output, we only change memory.

## Advanced Vector Extensions

AVX uses 32 registers from `zmm0` to `zmm31`. It's backwards compatible, as you can still use legacy SSE instructions. Its instructions are similar to the SSE's ones, like `movups` becoming `vmovaps` and `addps`'s alternative being `vaddps`. Here I want to focus on more practical examples in C, rather than writing more Assembly, which can be useful to understand the inner workings of the CPU. First, let's see how to load a vector and check its alignment:

```c
#include <immintrin.h>

int main() {
    // fast and easy way to load
    __m256 a = _mm256_set_ps(1.0f, 2.0f, 3.0f, 4.0f, 5.0f, 6.0f, 7.0f, 8.0f);
    bool is_aligned = ((uintptr_t)a & 31);

    // a more flexible way
    float *b = _mm_malloc(8 * sizeof(float), 32); // size and alignment
    // no need to check alignment for this one

    _mm_free(b);
    return 0;
}
```

Using this, let's add two vectors togheter:

```c
#include <immintrin.h>

#include <stdint.h>
#include <stdio.h>

void add_vectors_avx(float *a, float *b, float *result, size_t size) {
    // Check if the input vectors are properly aligned in memory
    if (!(((uintptr_t)a & 31) || ((uintptr_t)b & 31) || ((uintptr_t)result & 31))) {
        // Calculate how many AVX vectors we need
        size_t num_vectors = size / 8;

        __m256 *A = (__m256*)a;
        __m256 *B = (__m256*)b;
        __m256 *R = (__m256*)result;

        // Perform the vector addition using AVX instructions
        for (size_t i = 0; i < num_vectors; i++) {
            R[i] = _mm256_add_ps(A[i], B[i]);
        }
    }
    else puts("Vectors not aligned");
}

int main() {
    float *a = _mm_malloc(8 * sizeof(float), 32);
    float *b = _mm_malloc(8 * sizeof(float), 32);
    float *r = _mm_malloc(8 * sizeof(float), 32);
    for (int i = 0; i < 8; i++) {
        a[i] = i+1;
        b[i] = 8-i;
    }
    add_vectors_avx(a, b, r, 8);
    for(int i=0; i<8; i++)
        printf("%.1f + %1f = %.1f\n", a[i], b[i], r[i]);
    _mm_free(a);
    _mm_free(b);
    _mm_free(r);
    return 0;
}
```

## Neon

```c
#include <arm_neon.h>
#include <stdio.h>

int main() {
    float32x4_t a = vld1q_f32(new float[4]{1.0f, 2.0f, 3.0f, 4.0f});
    float32x4_t b = vld1q_f32(new float[4]{8.0f, 7.0f, 6.0f, 5.0f});
    float32x4_t c = vaddq_f32(a, b);

    float result[4];
    vst1q_f32(result, c);

    for (int i = 0; i < 4; i++) {
        printf("%.1f ", result[i]);
    }
    puts("");
    return 0;
}
```

## Support

Run-time check on x86:

```c
#include <stdio.h>
#include <cpuid.h>

int main() {
    unsigned int eax, ebx, ecx, edx;

    __get_cpuid(1, &eax, &ebx, &ecx, &edx);
    if (edx & bit_SSE) {
        printf("SSE is supported.\n");
    }
    if (edx & bit_SSE2) {
        printf("SSE2 is supported.\n");
    }
    if (ecx & bit_AVX) {
        printf("AVX is supported.\n");
    }
    if (ecx & bit_AVX2) {
        printf("AVX2 is supported.\n");
    }
    return 0;
}
```

Run-time check on ARM:

```c
#include <stdio.h>

int main() {
    unsigned int isar0, isar1;
    asm ("mrs %0, id_isar0" : "=r" (isar0));
    asm ("mrs %0, id_isar1" : "=r" (isar1));
    if (isar0 & (1 << 4)) {
        printf("NEON is supported.\n");
    }
    if (isar1 & (1 << 4)) {
        printf("CRC32 is supported.\n");
    }
    return 0;
}
```

Compile-time check on x86:

```c
#include <stdint.h>

// Use the appropriate SIMD instruction set for your processor
#ifdef __SSE__
#include <xmmintrin.h>
#elif __AVX__
#include <immintrin.h>
#endif

void add_vectors_simd(float *a, float *b, float *result, size_t size) {
    // Calculate how many SIMD vectors we need
    size_t num_vectors = size / 4;

    // Use the appropriate SIMD type for your processor
    #ifdef __SSE__
    __m128 *A = (__m128*)a;
    __m128 *B = (__m128*)b;
    __m128 *R = (__m128*)result;
    #elif __AVX__
    __m256 *A = (__m256*)a;
    __m256 *B = (__m256*)b;
    __m256 *R = (__m256*)result;
    #endif

    // Perform the vector addition using SIMD instructions
    for (size_t i = 0; i < num_vectors; i++) {
        R[i] = _mm_add_ps(A[i], B[i]);
    }
}
```

## Use cases

Vector intrinsics can be used in various fields, where fast vector operations are needed. This includes image processing (filters, grayscale, etc.), math (dot product, etc.) and graphics programming (rasterazation, ray tracing, etc.). Generally every time you work with large volumes of data, the operations can be sped up using SIMD. Based on a [StackOverflow benchmark](https://stackoverflow.blog/2020/07/08/improving-performance-with-simd-intrinsics-in-three-use-cases/), SIMD optimized programs can be 5-12 times faster than the scalar versions.

## Disavntages

While working with a lot of data, performance can be limited by the memory bandwidth. There is also an issue regarding precision, since SIMD is working with float numbers. Depending on the algorithm you're writing, data, especially for very small decimal numbers, can be lost.

## Notes

In conclusion, almost everytime you're working with vectors, where it's possible to align the data in a favorable way, it's best to use SIMD. Libraries such as GLM already take advantage of this, so it's best just to know enough to have a basic understanding, but to use a solid and tested library. There is also BLAS (Basic Linear Algebra Subprograms), a specification with low-level routines that describes common vector operations. These are organized in levels based on their time complexity (1 is O(n), 2 is O(n^2) and 3 is O(n^3)). BLAS libraries typically use SIMD under the hood.

## Resources

- http://ftp.cvut.cz/kernel/people/geoff/cell/ps3-linux-docs/CellProgrammingTutorial/BasicsOfSIMDProgramming.html
- https://stackoverflow.blog/2020/07/08/improving-performance-with-simd-intrinsics-in-three-use-cases/
- https://en.wikipedia.org/wiki/Single_instruction,_multiple_data
- https://stackoverflow.com/questions/59373900/why-is-there-no-simd-functionality-in-the-c-standard-library
- https://developer.arm.com/Architectures/Neon
- https://en.wikipedia.org/wiki/Streaming_SIMD_Extensions
- https://www.physicsforums.com/insights/an-intro-to-avx-512-assembly-programming/
- https://github.com/gcc-mirror/gcc/blob/master/gcc/config/i386/cpuid.h
- https://gist.github.com/csarron/3191b401ec545f78022881f1805cae9a
