---
sidebar_position: 2
---

# React plugin

This plugin generates React related artifacts using opinionated coding
conventions and patterns. See the following references for further details:

- [Coding Conventions and Patterns](https://github.com/nareshbhatia/react-learning-resources/blob/main/docs/coding-conventions-and-patterns.md)
- [Recommended Folder Structure](https://github.com/nareshbhatia/react-learning-resources/blob/main/docs/folder-structure.md)

This plugin consists of five generators:

1. **React app generator**: based on [Vite](https://vitejs.dev/) builder
2. **React library generator**: for generating a reusable library of React
   components
3. **Component generator**: for generating React components in a standardized
   format
4. **Page generator**: for generating Application pages
5. **Context generator**: for generating React context using the pattern
   described in
   [How to use React Context effectively](https://kentcdodds.com/blog/how-to-use-react-context-effectively)
   by Kent C. Dodds

## Installation

Add a dev dependency at the root of your repository:

```shell
npm install -D @code-shaper/react
```

For step-by-step instructions on how to use this plugin, see
[Getting Started](../getting-started/overview.md).

## Source Code

https://github.com/code-shaper/code-shaper/tree/main/plugins/react