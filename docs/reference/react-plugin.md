---
sidebar_position: 6
---

# React plugin

This plugin generates [React](https://reactjs.org/) related artifacts using
opinionated coding conventions and patterns. See the following references for
further details:

- [Coding Conventions and Patterns](https://github.com/nareshbhatia/react-learning-resources/blob/main/docs/coding-conventions-and-patterns.md)
- [Recommended Folder Structure](https://github.com/nareshbhatia/react-learning-resources/blob/main/docs/folder-structure.md)

This plugin consists of five generators:

1. **React app generator**: based on [Vite](https://vitejs.dev/) builder
2. **React library generator**: for generating a reusable library of React
   components
3. **Component generator**: for generating React components in a standardized
   format
4. **Page generator**: for generating application pages
5. **Context generator**: for generating React context using the pattern
   described in
   [How to use React Context effectively](https://kentcdodds.com/blog/how-to-use-react-context-effectively)
   by Kent C. Dodds

## Installation

:::tip Prerequisites

Before installing this plugin, make sure that you have installed the `shaper`
CLI and created a monorepo for your code. See
[Setting up a monorepo](../getting-started/setting-up-a-monorepo.md) for
instructions.

:::

Add a dev dependency at the root of your code repository:

```shell
npm install -D @code-shaper/react
```

For step-by-step instructions on how to use this plugin, see
[Getting Started](../getting-started/overview.md).

## Examples

1. https://github.com/code-shaper/movie-magic/tree/main/apps/movie-magic-react
2. https://github.com/code-shaper/movie-magic/tree/main/packages/ui-lib

## Repository

https://github.com/code-shaper/code-shaper/tree/main/plugins/react
