---
sidebar_position: 9
---

# Vite plugin

This plugin generates [React](https://reactjs.org/) applications using
[Vite](https://vitejs.dev/). See the following references for further details:

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
6. **Storybook generator**: Generates repository-wide support for
   [Storybook](https://storybook.js.org/)
7. **Playwright generator**: Generates repository-wide support for
   [Playwright](https://playwright.dev/) end-to-end tests

## Installation

:::tip Prerequisites

Before installing this plugin, make sure that you have created a monorepo for
your code. See [Create a New Repo](../getting-started/create-a-new-repo) for
instructions.

:::

Add a dev dependency at the root of your code repository:

```shell
npm install -D @code-shaper/react
```

For step-by-step instructions on how to use this plugin, see
[Getting Started](../getting-started/core-concepts).

## Examples

1. https://github.com/code-shaper/movie-magic/tree/main/apps/movie-magic-react
2. https://github.com/code-shaper/movie-magic/tree/main/packages/ui-lib

## Repository

https://github.com/code-shaper/code-shaper/tree/main/plugins/react
