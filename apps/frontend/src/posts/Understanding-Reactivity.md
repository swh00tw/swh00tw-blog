---
title: Understanding Reactivity
description: How React, Solid, Svelte, Qwik are different?
publishedAt: 2023-11-17
tags:
  - react
  - svelte
  - solid
  - frontend
published: true
coverImgSrc: posts/reactivity-small.png
backgroundImgSrc: posts/reactivity-big.png
lang: en
---

<script>
	import Callout from "../lib/mdsvex/custom/Callout.svelte";
</script>

## What's Reactivity

It's ~~magic~~. I mean a black box that takes change of the states in you app and updates the UI accordingly.

For example, in React:

```jsx
function Counter() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Display value={count} />
			<IncrementButton setCount={setCount} />
		</>
	);
}

function Display({ count }) {
	return <div>{count}</div>;
}

function IncrementButton({ setCount }) {
	return (
		<button
			onClick={() => {
				setCount((c) => c + 1);
			}}
		>
			Add 1
		</button>
	);
}
```

How can React figure out which node need to be re-executed after we click on `IncrementButton`? That's the problem of Reactivity.

Frameworks like React, Vue, Svelte, and Solid need to implement some ways to figure out which DOM or component need to be recomputed and updated. And they also need to exposed their easy-to-use APIs to abstract the complexity. They used different strategies to realize reactivity which I will explain later.

### Why is it important?

If you want to learn more about performance of these framework or simply want to know about how to optimize your app, you need to have some knowledge about what tasks framework performs in the background.

This article aims to give you a general idea about how frameworks do under-the-hood. I won't touch too much technical detail in this post. Just let you know why some frameworks claimed they are more efficient and why some frameworks are usually blamed for their overhead of updating UI.

## React

Let's start from the most popular one. Unfortunately, the overhead of React's reactivity is not quite good compare to the new solutions like Svelte, Qwik, and Solid.

But, good news, it's easy to understand. React use VDOM (Virtual DOM) under-the-hood. After state changes, the resulting VDOM is recomputed and is compared to previous VDOM. The comparing step is called reconcile diffing algorithm. React will know exactly which node need to update. And then perform update to the real DOM. Actually, Angular does the similar things as well.

The main takeaway here is that React does not know which state is bound to which DOM component. Therefore, when states change, the entire tree is recomputed. These years, lots of new frameworks and new reactivity strategies came out. React's strategy is often deemed an inefficient way for updating UI.

## Svelte

<Callout type="Disclaimer">
	By the time of writing this, Svelte 5 is about to releasing. However, since it hasn't been published yet. Here we just discuss about Svelte 4. I am sure there are some big updates and improvements for Svelte. I will write another post to explain how it's different from Svelte 4. Stay tune! 
</Callout>

Svelte always keep application states in sync with the DOM. It doesn't use VDOM like React. Actually, Svelte compiler analyses the code you write and generates an optimized JavaScript output. After the states change, Svelte won't run diffing algorithm like React. There are related "update code" generated by compiler at build time. Svelte will simply run that code directly to update the DOM.

For example, for a component with state reassignment or mutation inside its `<script>` tag, the compiler will generate "update code" like `$$invalidate(idx_for_that_variable_in_ctx, new_value)`. This function will be added to the specific event listener on the element(depends on where you add the event listeners and which event you are listening to). When it fires after the event you're listening to happens, it will store the `new_value`, mark the variable(state) it's trying to invalidate as "Dirty", and finally schedule UI update for this component. When updating UI, the code will check if the variables are marked as "Dirty", if it's dirty, it will use the `new_value` we stored previous to update the DOM.

Takeaway, Svelte utilizes a smart compiler to figure out how things can change and generate optimized JavaScript code to update UI(only the components need to be updated, or we can say only the branch in the Tree need to be updated.). Unlike React, Svelte will not re-execute irrelevant components since the compiler knew it's not necessary.

## Solid

Solid connects Signals directly to the DOM. The coolest part? Solid executes its components just once at startup, and they are never executed again. Instead, all the subsequent changes in your application are smoothly managed by Solid’s unique reactivity system, which intelligently updates the DOM whenever there's a change in state. But how does this work?

Imagine "Signals" in Solid as special messengers in your code. During the initial setup of your webpage, when Solid is rendering everything for the first time, it carefully assigns these messengers to different parts of your application's state – the data your application uses and displays. These messengers are incredibly lightweight and efficient. They have one simple job: to keep an eye on their assigned piece of state and to notify the relevant parts of your webpage whenever there's a change.

For example, if you have a piece of text on your webpage that displays the current time, Solid assigns a Signal to the state holding the time value. Whenever the time changes, this Signal notices and tells the specific part of your webpage showing the time to update with the new value. The beauty of this system is that only the parts of your webpage that need to change will change. Everything else stays as is, making updates very fast and efficient.

In summary, Signals in Solid are like efficient and dedicated messengers that ensure your webpage reflects changes in your application's state in real-time, without unnecessary work or delay. Signals play an significant role in Solid's reactivity system.

## Qwik

In contrast to traditional frameworks like React, Angular, Svelte, and Vue, which operate on Component-level Reactivity and require re-execution of related components upon state changes, Qwik introduces a more refined approach, known as DOM-level reactivity (same as Solid). This means Qwik is designed to directly update only the relevant DOM elements in response to state changes, without re-executing entire components. This efficient mechanism is facilitated by a reactivity graph, meticulously constructed by Qwik, which outlines how specific Signals (representing state changes) are connected to individual DOM elements. This graph, primarily executed on the client side, ensures minimal updates to the DOM, significantly improving performance.

Another innovative aspect of Qwik is its approach to hydration. Traditional web frameworks typically download and execute a significant amount of JavaScript at startup, leading to longer load times. Qwik, on the other hand, defers this process. It strategically delays downloading component code until it is actually needed - for instance, during user interactions or state mutations. This approach, often referred to as "lazy loading", ensures faster initial rendering. An observable effect of this strategy is a subtle delay during the first interaction, like in the [Counter example](https://stackblitz.com/edit/qwik-starter-j7ckh4?file=src/routes/index.tsx), where Qwik fetches the necessary code on-demand.

For those keen to delve deeper into how Qwik's reactivity model efficiently reflects UI changes following state modifications, I recommend this insightful [article](https://qwik.builder.io/docs/concepts/reactivity/) from the Qwik documentation. It provides a detailed exploration of Qwik’s architecture and its innovative approach to modern web development.

## Conclusion

Although the ultimate goal of these frameworks are the same - helping developers build an performant web application quickly, different strategies for Reactivity are involved. Learning different design of reactivity help you to think more about the performance side of these frameworks.

### Which framework should I choose?

There are always trade-off involved. If you are new to web development and just finished this article, you might think "If React is really that bad, why many people choose it?". The truth is, besides reactivity and performance, there are lots of other pros and cons between these frameworks to consider. To name a few, developer experience, the scale of community and ecosystem, and learning curve of the framework are also important. So, you know, there are reasons why React are still the most popular framework out there.

To sum up, I would recommend new web developers learn React or Vue. However, if you are already familiar with one of these, go learning something new and cool like Solid and Qwik. 🎉

## Reference

- [Unveiling the Magic: Exploring Reactivity Across Various Frameworks](https://www.builder.io/blog/reactivity-across-frameworks)
- [Compile Svelte in your head](https://lihautan.com/compile-svelte-in-your-head-part-1/)
- [Qwik Reactivity](https://qwik.builder.io/docs/concepts/reactivity/)