---
layout: ../../layouts/PostLayout.astro
title: C++ build systems
publishDate: 3 August 2022
description: Checking out various build systems for C++
author: "Stefan Asandei"
tags: []
---

A build system transforms the source code into executable binaries. Usually that involves linking the files, setting up include directories and managing 3rd party libraries. Most "modern" languages come with a build system by default (cargo, node, python). Since C++ is meant to be a sucsessor to C, it doesn't have a build system and developer have to compile each file individually, using a command like this:

```shell
g++ -std=c++20 -Iinclude ./Source.cpp
```

Obviously this isn't convient for a project with more than 2 files, because of this the C++ community created a couple of build systems. I'll be honest: most of them are a complete mess. In the rest of the article I will compare the popular build systems to decide which one is the best (spoiler: none).

## GNU Make

Makefiles are the goold old standard! Personally I really like them for relatively simple projects that don't require dependencies. Writing a makefile it's very easy, you either specify the rules or you copy one from the internet, like any sane developer. The result is a minimal build system which supports partial recompiling and multithreading. Here it is the makefile I use for my projects:

```makefile
CXX := g++
CXXFLAGS := -std=c++20 -g -Wall
LDFLAGS :=
TARGET := program
SRC := $(wildcard src/*.cpp) $(wildcard src/**/*.cpp)
OBJ := $(SRC:.cpp=.o)
BIN := bin

all: build run clean

build: $(OBJ)
	$(CXX) $(LDFLAGS) -o $(BIN)/$(TARGET) $^

%.o: %.c
	$(CXX) -o $@ -c $^ $(CXXFLAGS)

clean:
	rm -rf $(OBJ)

run:
	./$(BIN)/$(TARGET)
```

It automatically selects all source files and it compiles them. For faster builds, run using `make -j8`, replacing "8" with the number of your cpu's cores.

- great & simple build system, inconvenient for 3rd party dependencies which require building from source.
- no IDE support

## CMake

CMake scripts are written in a custom language in the `CMakeLists.txt` at the root of the project. It has a lot of features, besides the basic ones from make, such as subprojects, fetching repos, finding dependencies and more. It is the most widely used build system, which is its main selling point. Since CMake is cross platform, it generates the project on each platform (vs solution for windows, makefile for gnu/linux and makefile for mac os). Here it is a simple CMake script I use for my vulkan projects (notice the use of `FetchContent`):

```cmake
cmake_minimum_required(VERSION 3.16.5)
project(Engine)

set(CMAKE_CXX_STANDARD 20)
set(SPIRV_SKIP_TESTS ON)
set(SPIRV_SKIP_EXECUTABLES ON)
set(SHADERC_ENABLE_TESTS OFF)
set(SHADERC_ENABLE_EXAMPLES OFF)
set(ASSIMP_BUILD_TESTS OFF)
set(ASSIMP_BUILD_ASSIMP_TOOLS OFF)

if (WIN32)
    set(VOLK_STATIC_DEFINES VK_USE_PLATFORM_WIN32_KHR)
elseif (UNIX)
    set(VOLK_STATIC_DEFINES VK_USE_PLATFORM_XCB_KHR)
endif()

include(FetchContent)

FetchContent_Declare(glfw GIT_REPOSITORY https://github.com/glfw/glfw.git)
FetchContent_Declare(volk GIT_REPOSITORY https://github.com/zeux/volk.git)
FetchContent_Declare(vk-bootstrap GIT_REPOSITORY https://github.com/charles-lunarg/vk-bootstrap.git)
FetchContent_Declare(googletest GIT_REPOSITORY https://github.com/google/googletest GIT_TAG main)
FetchContent_Declare(spirv-headers GIT_REPOSITORY https://github.com/KhronosGroup/SPIRV-Headers)
FetchContent_Declare(glslang GIT_REPOSITORY https://github.com/KhronosGroup/glslang)
FetchContent_Declare(spirv-tools GIT_REPOSITORY https://github.com/KhronosGroup/SPIRV-Tools)
FetchContent_Declare(shaderc GIT_REPOSITORY https://github.com/google/shaderc GIT_TAG main)
FetchContent_Declare(glm GIT_REPOSITORY https://github.com/g-truc/glm.git)

FetchContent_MakeAvailable(glfw volk vk-bootstrap googletest spirv-headers glslang spirv-tools shaderc glm)

add_executable(Engine src/Main.cpp)

target_link_libraries(Engine glfw volk vk-bootstrap::vk-bootstrap gtest glslang SPIRV-Tools-static shaderc glm)
```

Of course, for your C++ project you may copy paste this but stripped of the Vulkan stuff, unless you're into that.

- hard to configure and buggy, but used by almost any library
- used by CLion

## Premake

Premake is similar to CMake, but it uses lua for configuring. It's easier to write Premake scripts but very few libraries use it, which makes adding 3rd party libraries hard. You'd either write your own scripts for each library or search on github if someone has already done that. Since I've never used Premake, here it an example from its GitHub:

```lua
workspace "MyWorkspace"
    configurations { "Debug", "Release" }

project "MyProject"
    kind "ConsoleApp"
    language "C++"
    files { "**.h", "**.cpp" }

    filter { "configurations:Debug" }
        defines { "DEBUG" }
        symbols "On"

    filter { "configurations:Release" }
        defines { "NDEBUG" }
        optimize "On"
```

- easy to configure, hard to add libraries
- no IDE support

## Xmake

Xmake is a cross platform build system based on lua. It's also easy to configure, the main file being `xmake.lua`. It has a build backend, project generator and a package manager, very impressive. You can create a project using its cli: `xmake create -l c -P ./hello`, generating the following files:

```
hello
├── src
│   └── main.c
└── xmake.lua
```

the contents of xmake.lua:

```lua
target("hello")
    set_kind("binary")
    add_files("src/*.c")
```

It also supports project templates, using the `-t` argument. Read more on its documentation: [https://xmake.io/#/getting_started](https://xmake.io/#/getting_started).

- easy to configure, good package management
- no native IDE support

## Sidenotes

- Before I move on, I have to talk about what compilers to use. Usually follow this guide:

  - Windows: MSVC
  - GNU/Linux: gcc
  - MacOS: clang

  If you're on Windows and you're using gcc, seek help.

- There are also other build systems, such as Bazel, MSBuild, Gradle, Ninja and many more.

## Conclusion

Most probably you're gonna use CMake if your project is cross platform and it's public. If you're working for a single os and it's just a hobby project for yourself, give gnu/make a try ;)
