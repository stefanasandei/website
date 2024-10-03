---
layout: ../../layouts/PostLayout.astro
title: "Thinking in Lambda Calculus"
pubDate: 14 July 2023
description: "What if everything could be a function?"
author: "Stefan Asandei"
tags: []
---

## Introduction

Lambda Calculus is a formal system in mathematical logic introduced by Alonzo Church in the 1930s, where only pure functions are utilized. It can express any computation as a function-based abstraction. There are no numbers, operators, groups, or anything else, everything has to be defined as a pure function. Even with its limitations, it is fully Turing complete.

Let's take a look at the most basic function in Lambda Calculus, the Identify function. You may think of this as `f(x) = x`:

```
λx. x
```

The three fundamentals expressions are:

- variables: x, y, etc.
- abstractions: (λx. x), (λx. x x y), etc.
- applications: (x), (x y)

We use variables to store and pass functions. Abstractions are compositions of functions. Applications are calls to functions, passing other functions as input parameters.

The structure of a function consists of the following segments:

- the head: (λx.); It always starts with the Lambda symbol "λ" followed by the input function, called "x" in this case, and a dot "." to symbolize the end of the head.
- the body: (x); A series of expressions that apply functions to the input functions.
- the call: (x); A series of functions in parenthesis used to call the newly declared function.

Putting all of this together, we can understand the Identity function:

```
(λx. x) y = y
```

Here we defined an anonymous function (without a name), that simply returns the first parameter (x). We call these functions with the "y" functions as the parameter, which is returned. In Lambda Calculus we can only pass and return functions, everything is a function.

We can nest function declarations to get multiple input parameters:

```
(λx. λy. y x) a b = b a
```

We have two input functions, "x" and "y". We return the function y with x as a parameter. By calling this with "a" and "b" we get the result by substituting "a" with "x" and "b" with "y". All of these functions don't have to be declared, we can work only with the concept of them without getting an actual computational result. We see the result is an expression, "b a", meaning we call "b" with "a" as a parameter.

We can also name functions and reuse them:

```
# defintions
apply = (λx. x y z)
order (λx. λy. λz. z y x)

# call
reorder apply a = z y a
```

I'm using "#" as comments within the code. As Lambda Calculus is Turing complete, we can consider it a programming language. Here it is a useful online interpreter to execute Lambda Calculus code: https://lambster.dev/.

## Alpha Equivalence

Alpha equivalence states that any bound variable is a placeholder and can be replaced (renamed) with a different variable, provided there are no clashes. This means we can replace any expression with another equivalent expression to remove name collisions. Note that the expression "λx.(λx.x)" is alpha equivalent to "λy.(λx.x)" but it is not to "λy.(λx.y)".

## Beta Reduction

Beta reduction is the central idea of Lambda Calculus, you can think of it as simplifying fractions. To apply the beta reduction to a function you need to substitute all the functions and evaluate the expressions until you end up with a final expression. Here is an example:

```
not true β⟶ (λx. x false true) true β⟶ true false true β⟶ (λx. λy. x) false true β⟶ (λy. false) true β⟶ false
```

The proper notation would be an arrow with the beta letter on top of it, however, for the rest of this article, I will be using just a plain equal sign.

## Boolean operations

This is pretty much all the theory you'll need to start having fun with Lambda Calculus. Now let's do something useful, by defining boolean logic. We'll work our way up starting from the identity function.

Define two functions for true and false. True returns the first input, and false returns the second input. This may not seem intuitive, however, with this, we can already write the negation function.

```
true = (λx. λy. x)
false = (λx. λy. y)

not = (λx. x false true)
```

Not should return true for false, and false for true. Let's apply the beta reduction to understand why this works:

```
not true = true false true = (λx. λy. x) false true = false
not false = false false true = (λx. λy. y) false true = true
```

To build more complex functions, we can use a truth table.

| x   | y   | x & y | x \| y | x ^ y |
| --- | --- | ----- | ------ | ----- |
| 1   | 1   | 1     | 1      | 0     |
| 1   | 0   | 0     | 1      | 1     |
| 0   | 1   | 0     | 1      | 1     |
| 0   | 0   | 0     | 0      | 0     |

Now the definitions:

```
and = (λx. λy. x y false)

or = (λx. λy. x true y)

xor = (λx. λy. (and (or x y) (not (and x y))))
```

Let's test these functions and apply the beta reduction:

```
and true true = true true false = true
and true false = true false false = false
and false true = false true false = false
and false false = false false false = false

or true true = true true true = true
or true false = true true false = true
or false true = false true true = true
or false false = false true false = false
```

Everything works! We built boolean logic using only functions.

## Church Numerals

The Church numerals are a representation of the natural numbers using lambda notation. The method is named for Alonzo Church, who first encoded data in lambda calculus this way. Church encoding defines each number within a lambda function as the number of calls to an undefined function "f". Zero calls to "f" means 0, one call means 1, and so on. Zero is a function that applies "f" to "x" zero times - "zero = λf. λx. x". This method isn't very efficient for functional languages, which is the reason why most languages implement algebraic data types.

```
0 = (λf. λx. x)
1 = (λf. (λx. (f x)))
2 = (λf. (λx. (f (f x))))

is_zero = λx.x f, not f
is_zero 0 =
```

To get the next number we can define a "successor" function. I'll also write the beta reduction to best describe why and how it works.

```
one = (λf. λx. f x)
successor = (λn. λf. λn. f n f x)

successor one = (λn. λf. λn. f n f x) (λf. λx. f x) = ((λn. (λf. (λn. (((f n) f) x)))) (λf. (λx. (f x)))) = ((λn. (λf. (λn. (((f n) f) x)))) (λX0. (λx. (X0 x)))) = (λf. (λn. (((f n) f) x))) = (λf. (λn. (((f n) f) x)))
```

<!-- ## Turing combinator

Θ=(λxy.y(xxy))(λxy.y(xxy)). -->

## Conclusion

Lambda Calculus offers quite a unique perspective on the way we compute and represent expressions. It is the basis of any functional programming language, however many programming languages implemented "unpure" expressions such as algebraic data types. Alonzo Church, the mathematician who introduced this computation model, was also the Ph.D. supervisor of Alan Turing. Together they developed the "Church–Turing thesis", which states that a function on the natural numbers can be calculated by an effective method if and only if it is computable by a Turing machine. This is the combination of the state-based computation model of the Turing Machine and the functional model of Lambda Calculus.

## Resources

- https://brilliant.org/wiki/lambda-calculus/
- https://theory.stanford.edu/~blynn/lambda/
- http://bach.ai/lambda-calculus-for-absolute-dummies/
- https://lambster.dev/
