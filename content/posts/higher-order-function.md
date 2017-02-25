---
title: Higher Order Functions with Curry and Compose
date: 2017-02-25
layout: Post
# hero credit: https://www.flickr.com/photos/retrochief/5279191747/in/set-72157625518081281/
hero: https://c1.staticflickr.com/6/5282/5279191747_1eabc8389e_b.jpg
tags:
  - Functional Programming
  - JavaScript
---

If you're familiar with Functional Programming (at a very basic level), you might heard about
higher order functions. They are but functions that either take another function as a param,
or return a new function when called, or both.

An example of a function that takes another function as its param is `Array.prototype.map`

```js
const arrayOfIntegers = [1, 2, 3, 5, 8];
const getSquare = (number) => number * number; // ES6 lambda function syntax
const arrayOfSquares = arrayOfIntegers.map(getSquare);
```

Another example of a function that returns a new function when called:

```js
const logEverySecond = () => {
  const id = setInterval(() => {
    console.log('now': Date.now());
  }, 1000);

  return () => {
    clearInterval(id);
  };
}

// start logging time on every second (approximately)
const stop = logEverySecond();

// later, when we want to stop logging
stop();
```

You can see these patterns everywhere in JavaScript projects, because JS functions are first-class citizens of the language. Unfortunately, other languages may not have such definition. AFAIK, Java logics must inhabit within a method (a method is a bound function that belong only to `class`es), and you cannot pass methods to another method, or return it from there.

# Curried Functions

> In mathematics and computer science, currying is the technique of translating the evaluation of a function that takes multiple arguments (or a tuple of arguments) into evaluating a sequence of functions, each with a single argument.

A lot of words? If you write some codes, currying is as simple as:

```js
const add = (a, b) => a + b;

// before currying
add(1, 2) // 3

// after currying
add(1)(2); // 3
```

That means, currying will make a function which originally takes 2 params to become a "lazy" function that accepts the first param, and returns another function, which in turn, waits for the other param before running.

In some functional libs (like `lodash` or `ramda`), a curried function can take more than one param at a time. Which enables the following:

```js
// Original function:
const add = (x, y, z) => x + y + z
add(1, 2, 3) // 6

// After currying:
curriedAdd(1)(2)(3) // 6
curriedAdd(1, 2)(3) // 6
curriedAdd(1)(2, 3) // 6
curriedAdd(1, 2, 3) // 6
```

# But why?!
Why do we need to care about curry at all? One of the answers is **separation of logics and data**. Logic is usually static, while data is dynamic by nature.

Think of a `forEach` function, which requires an array and a logic describes what to do with each item in the array. Or a `filter` function, which needs an array as well as a function that return whether we should keep an item. So on and so forth. Let's take a `map` function as an example:

```js
const map = (mapFunction, array) => {
  const results = [];
  for (let i = 0; i < array.length; ++i) {
    results[i] = mapFunction(array[i]);
  }
  return results;
}

// usages before currying
map(x => x * x, array)

// after currying
curriedMap(x => x * x)(array)

// let's put the "lazy" function to a variable
const mapSquare = curriedMap(x => x * x)

// now you can pass the actual data in
mapSquare([1, 2, 3]) // [1, 4, 9]
```

In this example, we successfully move the logic (multiply the number by itself) apart from the actual array (`[1, 2, 3]`). From now, we can reuse `mapSquare` function with any other array.

# Compose
Another interesting "primitive" function in Functional Programming is `compose`. In math, Function Composition is denoted as:

```plain
F(x) = (g º f)(x) = g(f(x))
```

Meaning when you call F with a param x, it's equivalent to call f(x) first and apply g to the result.

In JavaScript, composition can reduce a lot of codes while maintain a good separation between data and logic.

```js
// an over-simplified version of compose
const compose2 = (f, g) => (x) => f(g(x));

const doubleAndAdd5 = compose2(
  x => x + 5,
  x => x * 2
);

// reuse the logic multiple times
doubleAndAdd5(10) // 25
doubleAndAdd5(100) // 205
```

# Curry + Compose
`curry` and `compose` by themselves have brought a lot of benefits. However, you gain the real power when combining the two. Just look at the following example:

```js
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

// an over-simplified version of curry and compose
const curry2 = (fn) => (first) => (second) => fn(first, second);
const compose2 = (f, g) => (x) => f(g(x));

const xAdd = curry2(add);
const xMultiply = curry2(multiply);

// double and add 5
const doubleAndAdd5 = compose2(
  xAdd(5),
  xMultiply(2)
);

doubleAndAdd5(10) // 25
doubleAndAdd5(100) // 205
```

Look at the definition of `doubleAndAdd5` function. There is nothing but a **declaration of logic**. You tell the computer that you want to multiply by two and then add 5 to the result. That declaration is just a bunch of existing functions. You create a new logic without writing any new *untested code*. The `doubleAndAdd5` function will work precisely to what you describe it to do. It's by no chance it can go wrong. Think about it! That's just so awesome. It's the true benefit of *declarative programming*.

> You create a new logic without writing any new *untested code*. [...] It's the true benefit of **declarative programming**.

# Conclusions
Functional Programming is a huge paradigm with many new terms that you might not even hear about, like: Setoid, Monoid, Functor, Applicative, Traversable, Monad, Comonad, etc. However, it isn't a necessity to understand all of them to take advantages of FP. Getting started with `curry` and `compose` is enough for you to dive in, especially when FP is taking over the [frontend](https://facebook.github.io/react/) [frameworks](redux.js.org/).
