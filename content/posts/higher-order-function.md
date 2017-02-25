---
title: Higher Order Functions (WIP)
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

This seems a necessity in JavaScript, because JS functions are first-class citizen of the language.
Unfortunately, other languages may not have such definition. AFAIK, Java logics must reside in a method
(a method is a bound function that only belong to a class), and you cannot pass methods to another
method, or return it from there.
