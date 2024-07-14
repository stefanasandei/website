---
layout: ../../layouts/PostLayout.astro
title: "Exploring file formats #1: SPIR-v"
pubDate: 28 December 2023
description: "Let's explore the assembly language of the GPUs!"
author: "Stefan Asandei"
tags: []
wip: true
---

## Introduction

hello world

<div class="code-fat-row">

```asm
; SPIR-V
; Version: 1.0
; Generator: Khronos Glslang Reference Front End; 11
; Bound: 14
; Schema: 0
               OpCapability Shader
          %1 = OpExtInstImport "GLSL.std.450"
               OpMemoryModel Logical GLSL450
               OpEntryPoint Fragment %main "main" %fragColor
               OpExecutionMode %main OriginUpperLeft
               OpSource GLSL 460
               OpName %main "main"
               OpName %fragColor "fragColor"
               OpDecorate %fragColor Location 0
       %void = OpTypeVoid
          %3 = OpTypeFunction %void
      %float = OpTypeFloat 32
    %v4float = OpTypeVector %float 4
%_ptr_Output_v4float = OpTypePointer Output %v4float
  %fragColor = OpVariable %_ptr_Output_v4float Output
%float_0_400000006 = OpConstant %float 0.400000006
%float_0_800000012 = OpConstant %float 0.800000012
    %float_1 = OpConstant %float 1
         %13 = OpConstantComposite %v4float %float_0_400000006 %float_0_400000006 %float_0_800000012 %float_1
       %main = OpFunction %void None %3
          %5 = OpLabel
               OpStore %fragColor %13
               OpReturn
               OpFunctionEnd
```

```glsl
#version 460

layout (location = 0) out vec4 fragColor;

void main() {
	fragColor = vec4(0.4, 0.4, 0.8, 1.0);
}
```

</div>

## Resources

- https://shader-playground.timjones.io/
- https://github.com/google/spirv-tutor
