---
sidebar_position: 7
---

# Remix plugin

This plugin generates [Remix](https://remix.run/) related artifacts using
opinionated coding conventions and patterns. See the following reference for
further details:

- [Coding Conventions and Patterns](https://github.com/nareshbhatia/react-learning-resources/blob/main/docs/coding-conventions-and-patterns.md)

This plugin consists of two generators:

1. **Remix app generator**: generates a base app with support for jest,
   react-testing-library, and storybook
2. **Page generator**: for generating application pages

This plugin is intended to be used in conjunction with
[the React plugin](./react-plugin.md) for the following generators:

1. **React library generator**: for generating a reusable library of React
   components
2. **Component generator**: for generating React components in a standardized
   format
3. **Context generator**: for generating React context using the pattern
   described in
   [How to use React Context effectively](https://kentcdodds.com/blog/how-to-use-react-context-effectively)
   by Kent C. Dodds

## Installation

:::tip Prerequisites

Before installing this plugin, make sure that you have created a monorepo for
your code. See [Create a New Repo](../getting-started/create-a-new-repo.md) for
instructions.

:::

Add the following dev dependencies at the root of your code repository:

```shell
npm install -D @code-shaper/react @code-shaper/remix
```

For step-by-step instructions on how to use plugins, see
[Getting Started](../getting-started/core-concepts.md).

## Example

https://github.com/code-shaper/movie-magic/tree/main/apps/movie-magic-remix

## Repository

https://github.com/code-shaper/code-shaper/tree/main/plugins/remix
