---
layout: ../../layouts/PostLayout.astro
title: "ONI Recap"
pubDate: 22 April 2024
description: "oni deez nuts"
author: "Stefan Asandei"
tags: []
wip: true
---

## Fast exp

```cpp
int64_t ppow(int64_t n, int64_t p) {
  int64_t res = 1;

  while (p > 0) {
    if (p & 1) {
      res = (res * n) % mod;
    }
    n = (n * n) % mod;
    p >>= 1;
  }

  return res;
}
```

## Combinatorics

```cpp
void precalc() {
  fact[0] = fact[1] = 1;
  for (int i = 2; i <= nmax; i++) {
    fact[i] = fact[i - 1] * i % mod;
  }

  invf[nmax] = ppow(fact[nmax], mod - 2);
  for (int i = nmax - 1; i >= 0; i--) {
    invf[i] = (invf[i + 1] * (i + 1)) % mod;
  }
}

int64_t C(int n, int k) {
  int64_t val = (fact[n] * invf[k] % mod) * invf[n - k] % mod;
  return val;
}
```

## Eratosthenes

```cpp
// true -> nu e prim

ciur[0] = true;
ciur[1] = true;

for(int i=2; i*i<=1000000; i++) {
    if(ciur[i] == false) {
        for(int j=2; j*i<=1000000; j++) {
            ciur[j*i] = true;
        }
    }
}
```

## Partial sums

```cpp
// pe vector:
for(int i = 1 ; i <= n ; i++)
    sp[i] = sp[i-1] + v[i];
int sum = sp[dr] - sp[st-1];

// pe matrice

for(int i = 1 ; i <= n ; i ++)
    for(int j = 1 ; j <= m ; j ++)
        sp[i][j] = sp[i-1][j] + sp[i][j-1] - sp[i-1][j-1] + a[i][j];

int is,js; // coltul stanga sus
int ij,jj; // coltul dreapta jos

int sum = sp[ij][jj] - sp[is-1][jj] - sp[ij][js-1] + sp[is-1][js-1];
```

## Lee's algorithm

```cpp
void Lee(int istart ,int jstart) {
    queue<pair<int,int>> Q;
    Q.push(make_pair(istart , jstart));

    //marcare pozitie de start
    A[istart][jstart] = 1;

    while(! Q.empty()) { // cat timp coada este nevida
        int i = Q.front().first, j = Q.front().second;
        for(int k = 0 ; k < 4 ; k ++) {
            int iv = i + di[k], jv = j + dj[k]; // coordonatele vecinului
            if(iv >= 1 && iv <= n && jv >= 1 && jv <= m // element în matrice
                && A[iv][jv] == 0) { // element liber si nemarcat
                // marcam elementul vecin cu o valoare mai mare
                A[iv][jv] = A[i][j] + 1;
                // il adaugam in coada
                Q.push(make_pair(iv , jv));
            }
        }
        Q.pop(); // eliminam din coada
    }
}
```

## Big numbers

```cpp
struct big_int {
  int length;
  int digits[4096];

  void read(std::istream &in) {
    std::string buffer;

    in >> buffer;

    for (int i = buffer.size() - 1; i >= 0; i--) {
      digits[length++] = static_cast<int>(buffer[i] - '0');
    }
  }

  void read_as_vec(std::istream &in) {
    in >> length;
    for (int i = length - 1; i >= 0; i--)
      in >> digits[i];
  }

  void read_as_int(std::istream &in) {
    int a;
    in >> a;

    do {
      digits[length++] = a % 10;
      a /= 10;
    } while (a);
  }

  void output(std::ostream &out) {
    for (int i = length - 1; i >= 0; i--)
      out << digits[i];
  }

  big_int operator+(big_int &other) const {
    big_int result{};
    result.length = std::max(length, other.length);

    int t = 0;

    for (int i = 0; i < result.length; i++) {
      result.digits[i] = digits[i] + other.digits[i] + t;
      t = result.digits[i] / 10;
      result.digits[i] %= 10;
    }

    if (t == 1)
      result.digits[result.length++] = 1;

    return result;
  }

  big_int operator-(big_int &other) const {
    big_int result{};
    result.length = length;

    int t = 0;

    for (int i = other.length + 1; i <= length;)
      other.digits[i++] = 0;

    for (int i = 0; i < result.length; i++) {
      result.digits[i] = digits[i] - (other.digits[i] + t);

      if (result.digits[i] < 0)
        t = 1;
      else
        t = 0;

      if (t == 1)
        result.digits[i] += 10;
    }

    while (result.digits[result.length - 1] == 0 && result.length > 1)
      result.length--;

    return result;
  }

  big_int operator*(big_int &other) const {
    big_int result{};
    result.length = length + other.length - 1;

    int t = 0;

    for (int i = 0; i < length; i++) {
      for (int j = 0; j < other.length; j++) {
        result.digits[i + j] += digits[i] * other.digits[j];
      }
    }

    for (int i = 0; i < result.length; i++) {
      t += result.digits[i];
      result.digits[i] = t % 10;
      t /= 10;
    }

    if (t) {
      result.digits[result.length++] = t;
    }

    while (result.digits[result.length - 1] == 0 && result.length > 1)
      result.length--;

    return result;
  }

  big_int &operator+=(big_int &other) {
    *this = *this + other;

    return *this;
  }

  big_int &operator-=(big_int &other) {
    *this = *this - other;

    return *this;
  }

  big_int &operator*=(big_int &other) {
    *this = *this * other;

    return *this;
  }
};

```

## Geometry

https://drive.google.com/file/d/105SxWBXSiUTFBtsoE_hl0cxUZLJAzmBU/view

- distanta dintre doua puncte

- distanta dintre un punct si o dreapta

- panta unei drepte

- arii

- baleiere

https://geometrie.tiiny.site/

- infasuratoare convexa

## Segment tree

```cpp
template <typename T>
class segment_tree {
public:
  segment_tree(int n) { sg = vector<T>(4 * n + 1); }

  void build(T *v, int curr, int tl, int tr) {
    if (tl == tr) {
      sg[curr] = v[tl];
    } else {
      int tm = (tl + tr) / 2;
      build(v, curr * 2, tl, tm);
      build(v, curr * 2 + 1, tm + 1, tr);
      sg[curr] = sg[curr * 2] + sg[curr * 2 + 1];
    }
  }

  void update(int curr, int tl, int tr, int new_pos, int new_val) {
    if (tl == tr) {
      sg[curr] = new_val;
    } else {
      int tm = (tl + tr) / 2;
      if (new_pos <= tm)
        update(curr * 2, tl, tm, new_pos, new_val);
      else
        update(curr * 2 + 1, tm + 1, tr, new_pos, new_val);
      sg[curr] = sg[curr * 2] ^ sg[curr * 2 + 1];
    }
  }

  T query(int curr, int tl, int tr, int l, int r) {
    if (l > r)
      return 0;

    if (l == tl && r == tr)
      return sg[curr];

    int tm = (tl + tr) / 2;
    return query(curr * 2, tl, tm, l, min(r, tm)) ^
           query(curr * 2 + 1, tm + 1, tr, max(l, tm + 1), r);
  }

private:
  vector<T> sg;
};
```

## Trie

```cpp
#include <iostream>
#include <string>

using namespace std;

const int nmax = 5000;
const int kmax = 1e6;
const int mod = 1e9 + 7;

template <size_t Size>
class trie {
public:
  trie() {}

  void insert(const string &s) {
    int node = 0;
    for (size_t i = 0; i < s.size(); i++) {
      if (!tree[node][s[i] - 'a'])
        tree[node][s[i] - 'a'] = ++ct;
      node = tree[node][s[i] - 'a'];
    }
    stop[node] = true;
  }

  int search(int x, const string &s, int dp[]) {
    int node = 0, ans = 0;
    for (size_t i = x; i < s.size(); i++) {
      if (!tree[node][s[i] - 'a'])
        return ans;
      node = tree[node][s[i] - 'a'];
      if (stop[node]) {
        ans = (ans + dp[i + 1]) % mod;
      }
    }
    return ans;
  }

private:
  int tree[Size + 1][26];
  bool stop[Size + 1];
  int ct = 0;
};

int k, dp[nmax + 1];
string n, s;
trie<kmax + 1> t;

int main() {
  cin >> n >> k;
  while (k--) {
    cin >> s;
    t.insert(s);
  }

  dp[n.size()] = 1;
  for (int i = n.size() - 1; i >= 0; i--) {
    dp[i] = t.search(i, n, dp);
  }

  cout << dp[0] << '\n';

  return 0;
}
```
