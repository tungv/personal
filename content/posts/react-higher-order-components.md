---
title: React Higher Order Components (Part 1)
date: 2017-02-25
layout: Post
route: /posts/react-higher-order-components-part-1
tags:
  - react
  - Functional Programming
---

# Component Composition
In React (and React-like libraries), a component is a factory (either a class or a function)
that returns an element. Most components are just dumb. They can do only one job - emitting the element.
To make dumb components smarter, we may "enhance" them using a technique called Composition, described
as follow:

```js
class MyComponent extends React.Component {
  render() {
    return <div>hello {this.props.name}</div>
  }
}

class ComponentWithBlueBorder extends React.Component {
  render() {
    return (
      <div style={{ border: 'blue' }}>
        <MyComponent name={this.props.name} />
      </div>
    );
  }
}
```

Composition is just a way to tell that you use a component while constructing another one.

# Repeated Compositions
The problem is, after a while, you realize that there are so many components that need a same composition.
For example, there are 10 components that need to have blue borders and you don't want to create
another 10 `ComponentWithBlueBorder`s. The best solution might be to create a function that returns
components (not elements).

```js
const ButtonWithBlueBorder = addBlueBorder(Button);
const InputWithBlueBorder = addBlueBorder(Input);
const DialogWithBlueBorder = addBlueBorder(Dialog);
```

And that `addBlueBorder` should be able to enable 2 criteria:
1. You can pass in any component (`addBlueBorder` may not have any assumptions about that component)
2. Any props you pass to the new component must be forwarded to the original one.

Based on these requirements, the implementation of `addBlueBorder` should look like this:

```js
const addBlueBorder = (DumpComponent) => class ComponentWithBlueBorder extends React.Component {
  render() {
    return (
      <div style={{ border: 'blue' }}>
        <ComponentWithBlueBorder {...this.props} />
      </div>
    );
  }
};
```

And there you go! You can now add blue border to any component of choice.

# Slightly different Compositions
However, another requirement arises. You now want to have more than just "blue" border. You want red,
green, purple, and so on. In another word, you want a more generic `addBorderColor` function.
Otherwise, you have to create many `addBlueBorder`, `addRedBorder`, `addYellowBorder`, etc. So you
come back and modify your code to something like this:

```js
const addBorderColor = (DumpComponent, color) => class ComponentWithBlueBorder extends React.Component {
  render() {
    return (
      <div style={{ border: color }}>
        <ComponentWithBlueBorder {...this.props} />
      </div>
    );
  }
};
```

Easy money, right? And by the way, did you notice that you just create function, that takes a component
as its params and returns another one? Due to the similarity with
[Higher Order Function](/posts/higher-order-function) concept, this is called **Higher Order Component** - a function that returns React Component.

> Due to the similarity with [Higher Order Function](/posts/higher-order-function) concept, this is called **Higher Order Component** - a  function that returns React Component.

# Wholly different Compositions
Of course, you won't stop with just one kind of composition. The project will need more. And thank
to the composable nature **Higher Order Components**, you can simply add up your function calls:

```js
const MyAnimatedButtonWithRedBorder = makeAnimated(addBorderColor(Button, 'red'));
const MyGodLikeAwesomeButton = makeGodLike(MyAnimatedButtonWithRedBorder);
// and so on
```

Looks great, right? But this comes with a drawback. Your original `Button` element get faded into a
bunch of code. Think about having 10 different functions in the composition chain! You will get lost
pretty easy.

And here come the rescue. **The `compose` function**. As we all know, those composition functions we
made are, of course, functions. And they can be *composed* together.

```js
const enhance = compose(
  makeAnimated,
  (Component) => addBorderColor(Component, 'red'),
  makeGodLike,
  // ... more function here.
);

const MyGodLikeAwesomeButton = enhance(Button);
```

That's it! Now you can divide and conquer the _**original component**_ and the _**enhancement logic**_.
Best of both worlds. And you can even get cleaner code with curried function for the case of `addBorderColor`:

```js
const old_addBorderColor = (color, Component) => /* ... */; // notice the switch in arguments order
const addBorderColor = curry(old_addBorderColor, 2);

// better compose
const enhance = compose(
  makeAnimated,
  addBorderColor('red'),
  makeGodLike,
  // ... more function here.
);
```

If you are not sure about `curry` and `compose` functions, please take a few minutes to read
[Higher Order Function](/posts/higher-order-function) posts.

# Conclusions
By applying Functional Programming ideas to React components, you can get a much clean code with separation
between pure rendering logic and enhancement logic. However, it's a blurred line in the definition of pure
rendering/enhancement logic. My go-to solution is _**"don't optimize and separate code too early"**_
(don't be afraid of repeating yourself).
