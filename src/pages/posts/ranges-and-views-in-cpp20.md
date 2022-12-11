---
layout: ../../layouts/PostLayout.astro
title: "Ranges and views in C++20"
publishDate: 10 December 2022
description: "C++20 introduces ranges and views"
author: "Stefan Asandei"
tags: []
wip: false
---

## Introduction

The C++ standard template library provides a lot of utility classes such as `vector`, `array` and `list`. These are built on top of containers, data structures holding a collection of other objects. They offer a way to parse them by providing iterators, with the well-known `.begin()` and `.end()`methods. Common functions from the`<algorithm>` header, used primarily to manipulate the elements of vectors, always take as arguments the beginning and the end of the range of the vector. Here are some simple examples of usual use cases:

```cpp
std::sort(v.begin(), v.end());

v.erase(std::remove_if(v.begin(), v.end(), [](int i) {
    return i % 2 == 0;
}), v.end());
```

## Ranges

This was the only normal way to write functions that work with standard vectors. The C++20 standard introduces a new concept: `ranges`. At a high level, a range is something that you can iterate over, it abstracts iterators in a way that simplifies the use of the STL. Here is the most basic usage of a range:

```cpp
#include <ranges>

const std::vector<int> input = { 1, 2, 3, 4, 5, 6 };
auto x = input | std::views::filter([](const int n) { return n % 2 == 0; }) // 2, 4, 6
	       | std::views::transform([](const int n) { return n * n; }); // 4, 16, 36
```

As you can see the code is much cleaner, having the classic iterators removed. Each utility function under the `std::ranges::views` (aliased as `std::views`) only takes one parameter: a lambda expression. Most used functions include `filter` (remove items based on criteria), `transform` (used to change items), `drop` (remove first N items), `take` (select next N elements), `split` (split based on criteria). As a side note, C++23 will introduce a for_each function for ranges, until then we still have to use iterators:

```cpp
std::for_each(x.begin(), x.end(), [](auto const v) { std::cout << v << ' '; });
```

To sort a vector:

```cpp
// sort after the first 5 elements
std::ranges::sort(std::views::drop(v, 5));
// sort in reverse order:
std::ranges::sort(std::views::reverse(v));
// combine both
std::ranges::sort(std::views::drop(std::views::reverse(v), 5));
```

Now as you saw what's the basic gist of ranges, and how are they implemented? Like always, C++ likes to mess with operator overloading (like they did with `cout <<`), and because of this, the committee decided it's a good idea for ranges to overload the `|` operator (logic or). Each function returns an intermediate range, thus making function chaining possible. Here is an example of implementing this kind of syntactic sugar for a simple struct:

```cpp
// this is just to demonstrate how operator overloading shouldn't be used
struct test {
	int value;

        // overload the logic or operator, by default let's multiply with an int
	test operator|(const int x) const {
		return { value * x }; // return a new struct, to allow method chaining
	}

	test operator|(const std::function<int(int)> op) const {
		return { op(value) }; // take a lambda expression for custom operations
	}
};

test a = { .value = 5 };
auto b = a | 2  // 10
           | [](const int value) { return value + 1; }; // 11
```

I will dive deeper into the implementation details later in this article, this is just a simplified case. Now, of course, I don't recommend doing this in your codebase, but it's good to know it's possible since it's very used in the STL. Anyway, going back to ranges, another nice feature is the possibility of very nice-looking string manipulation, such as tokenizing:

```cpp
std::string s = "hello.world";
auto res = s | std::views::transform([](const char c) { return c == '.' ? ' ' : c; });
	     | std::ranges::to<std::string>(); // "hello world"


std::string words = "these are some words";
auto tokens = words
	| std::ranges::views::split(' ')
	| std::ranges::views::transform([](auto&& rng) {
	return std::string_view(&*rng.begin(), std::ranges::distance(rng));
}); // returns an array of all the words, separated by a whitespace in the string

```

The `iota` function allows the creation of a finite or "infinite" range. You can think of it as an interval from maths, representing `[first, last)`. Fun fact, this function is way older, being named after the integer function ⍳ from the programming language APL. It was one of the STL components that were not included in C++98, but made it into the standard library in C++11. I consider the best way of understanding a function is to use it, so here is an example:

```cpp
// we can also use the for_each function, instead of a for loop
std::ranges::for_each(std::views::iota(1, 10), [](int i) {
	std::cout << i << ' ';
}); // 1, 2, 3, 4, 5, 6, 7, 8, 9

for (int i : std::views::iota(21, 29))
	std::cout << i << ' '; // prints the numbers from 21 to 28

// start from 1 and take the first 9 elements
for (int i : std::views::iota(1) | std::views::take(9))
	std::cout << i << ' ';
```

As you can see, it's quite useful! Now let's combine the things we talked about, since `iota` returns a range, that means we can apply the usual utility functions. Thus we can compute a bunch of useful stuff over a range of integers:

```cpp
// square each number from 1 to 9
auto squares = std::views::iota(1, 10) | std::views::transform([](int i) { return i * i; });
std::for_each(squares.begin(), squares.end(), [](auto const v) { std::cout << v << ' '; });

// find the perfect squares from 100 to 199
auto is_square = [](const int i) { return ceil(sqrt(i)) == floor(sqrt(i)); };
auto perfect_squares = std::views::iota(100, 200) | std::views::filter(is_square);

// yet another way to output a range
std::ranges::copy(perfect_squares, std::ostream_iterator<int>(std::cout, " "));
```

In the end, ranges are just for convenience, to make your code better looking and more concise.

## Range adaptors

I briefly talked about them already. A range adaptor is a class that wraps an existing range to provide a new range with different behavior. These are the utility functions under the `std::ranges::views` namespace:

- ```cpp
  filter(r: [T], f: T -> bool) -> [T]
  ```

  It returns a range with the elements of `r` that satisfy the `f` filter.

- ```cpp
  transform(r: [T], f: T -> U) -> [U]
  ```
  Runs the `f` function on every element of `r` and returns a new range. This is also known as `map` in other languages.
- ```cpp
  take(r: [T], n: N) -> [T]
  ```
  Produces a range that includes the first `n` elements of `r`, or the entirety of `r` if `r` does not have `n` elements.
- ```cpp
  drop(r: [T], n: N) -> [T]
  ```
  Creates a range that removes the first `n` elements of `r`, or it's empty if `r` doesn't have `n` elements.
- ```cpp
  join(r: [[T]]) -> [T]
  ```
  Takes multiple ranges of type `T` and joins them into a single range. Many languages call this `flatten`.
- ```cpp
  common(r: [T]) -> [T]
  ```
  Generates a common range with the elements of `r`. A range is common when `begin`(r)`and`end(r)` return the same type.
- ```cpp
  reverse(r: [T]) -> [T]
  ```
  Creates a range with the items of `r` in the reverse order.

## How to write a custom range adaptor?

What if we need to create a custom range for our use case, but the standard library doesn't provide an appropriate adaptor? We can always write our own. To study how the STL does it, simply do `ctrl + click` on the class name in Visual Studio, this will open the header which has enough information to understand the implementation. You can always search on GitHub for the full source of MSVC's STL. The code I'm about to give you is highly based on the one from Marius Băncilă's article on C++ ranges.

```cpp
#include <iostream>
#include <vector>
#include <ranges>

// this example shows how to write a custom `take` view
// the functionality will be the same as the standard one

// first create the class using the standard view interface base class
template<std::ranges::input_range R> requires std::ranges::view<R>
class custom_take_view : public std::ranges::view_interface<custom_take_view<R>>
{
private:
    R                                                  base_{}; // this is our base range
    std::iter_difference_t<std::ranges::iterator_t<R>> count_{}; // how many items we take
    std::ranges::iterator_t<R>                         iter_{ std::begin(base_) }; // the iterators
public:
    custom_take_view() = default;

    // the constructor takes a base range and the count
    constexpr custom_take_view(R base, std::iter_difference_t<std::ranges::iterator_t<R>> count)
        : base_(base)
        , count_(count)
        , iter_(std::begin(base_)) // initialize the iterator as the beggining of the base
    {
        for (auto iter = begin(); iter != end(); ++iter)
            std::cout << *iter << '\n'; // print them just to demonstrate the use of iterators here
    }

    // some getters
    constexpr R base() const&
    {
        return base_;
    }

    constexpr R base()&&
    {
        return std::move(base_);
    }

    constexpr auto begin() const
    {
        return iter_;
    }

    // this is the most important part of the view
    // instead of returning the end() of the base
    // we take the next `count_` items starting from the beggining of the base
    // this is how `take` works
    constexpr auto end() const
    {
        return std::next(iter_, count_);
    }

    // to determine the size, or lenght, of the new range
    constexpr auto size() const requires std::ranges::sized_range<const R>
    {
        const auto s = std::ranges::size(base_);
        const auto c = static_cast<decltype(s)>(count_);
        return s < c ? 0 : s - c;
    }
};

template<class R>
custom_take_view(R&& base, std::iter_difference_t<std::ranges::iterator_t<R>>)
    ->custom_take_view<std::ranges::views::all_t<R>>;

// convinience namespace to wrap the custom_take_view class
namespace details
{
    struct custom_take_range_adaptor_closure
    {
        std::size_t count_;
        constexpr custom_take_range_adaptor_closure(std::size_t count) : count_(count)
        {}

        template <std::ranges::viewable_range R>
        constexpr auto operator()(R&& r) const
        {
            return custom_take_view(std::forward<R>(r), count_); // here we construct the class
        }
    };

    struct custom_take_range_adaptor
    {
        template<std::ranges::viewable_range R>
        constexpr auto operator () (R&& r, std::iter_difference_t<std::ranges::iterator_t<R>> count)
        {
            return custom_take_view(std::forward<R>(r), count);
        }

        constexpr auto operator () (std::size_t count)
        {
            return custom_take_range_adaptor_closure(count);
        }
    };

    // overload the logic or `|` operator
    template <std::ranges::viewable_range R>
    constexpr auto operator | (R&& r, custom_take_range_adaptor_closure const& a)
    {
        return a(std::forward<R>(r)); // forward the range to the struct
    }
}

// create a class instance inside a namespace for convinience
namespace views
{
    details::custom_take_range_adaptor custom_take;
}
```

How to use this `custom_take_view` adapter:

```cpp
int main()
{
    auto is_even = [](int const n) {return n % 2 == 0; };

    std::vector<int> n = { 1, 2, 3, 4, 5, 6, 7, 8, 9};
    auto v = n | std::ranges::views::filter(is_even) // keep only the even numbers
               | std::ranges::views::reverse // reverse the range
               | views::custom_take(3); // take the first 3 items
    std::ranges::copy(v, std::ostream_iterator<int>(std::cout, " "));
    // output the range by copying it to the output stream
}
```

I know the code is quite lengthy, but I included some comments to hopefully make it clearer. The best way, in my opinion, to understand it is to copy-paste it into a C++ IDE (such as Visual Studio) and start experimenting. See what classes we extended and what the stack call trace looks like (in what order are the functions called, starting from the logic or operator down to the `end()` getter of the `custom_take_view` class).

## Conclusion

Ranges are nice new features of C++ that allows easier processing on list-like containers, especially vectors. You can easily achieve the same thing using loops or old-style `<algorithm>` functions, but the code will be longer and harder to read. Keep in mind ranges are not finalized and not all compilers finished implementing them! C++23 will also add new functions for ranges, such as converting them to a standard container (such as string or array).

## References

- C++ documentation: https://en.cppreference.com/w/cpp/ranges
- Marius Băncilă's blog: https://mariusbancila.ro/blog/2020/06/06/a-custom-cpp20-range-view/
- Barry's C++ blog: https://brevzin.github.io/c++/2021/02/28/ranges-reference/
- Microsoft docs: https://learn.microsoft.com/en-us/cpp/standard-library/ranges?view=msvc-170
