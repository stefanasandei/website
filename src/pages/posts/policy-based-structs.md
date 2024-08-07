---
layout: ../../layouts/PostLayout.astro
title: "Policy based data structures in C++"
pubDate: 10 july 2024
description: "Non-standard structures from gcc"
author: "Stefan Asandei"
tags: []
wip: true
---

## Introduction

```cpp
#include <ext/pb_ds/assoc_container.hpp> // Common file
#include <ext/pb_ds/tree_policy.hpp>

#include <iostream>

using namespace __gnu_pbds;
using namespace std;
 
// a new data structure defined. Please refer below
// GNU link : https://goo.gl/WVDL6g
typedef tree<int, null_type, less<int>, rb_tree_tag,
             tree_order_statistics_node_update>
    ordered_set;

using prefix_trie = trie<string, null_type, trie_string_access_traits<>, 
            pat_trie_tag, trie_prefix_search_node_update>;

int main() {
    ordered_set p;
    p.insert(5);
    p.insert(2);
    p.insert(6);
    p.insert(4);
 
    // value at 3rd index in sorted array.
    cout << "The value at 3rd index ::"
         << *p.find_by_order(3) << endl;
 
    // index of number 6
    cout << "The index of number 6::" << p.order_of_key(6)
         << endl;
 
    // number 7 not in the set but it will show the
    // index number if it was there in sorted array.
    cout << "The index of number seven ::"
         << p.order_of_key(7) << endl;
 
    prefix_trie t;
    t.insert("lovely");
    t.insert("lol");
    t.insert("yes");

    auto match_range = t.prefix_range("l");
    for(auto it = match_range.first; it != match_range.second; ++it) {
        cout << *it << '\n';
    }

    return 0;
}
```