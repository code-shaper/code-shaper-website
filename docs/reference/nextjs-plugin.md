---
sidebar_position: 4
---

# Next.js plugin

This plugin generates [Next.js](https://nextjs.org/) applications using
opinionated coding conventions and patterns. See the following reference for
further details:

- [Coding Conventions and Patterns](https://github.com/nareshbhatia/react-learning-resources/blob/main/docs/coding-conventions-and-patterns.md)

This plugin consists of the following generators:

1. **Next.js app generator**: generates a base app with support for jest,
   react-testing-library, and storybook
2. **Page generator**: for generating application pages

3. **React library generator**: for generating a reusable library of React
   components
4. **Component generator**: for generating React components in a standardized
   format
5. **Context generator**: for generating React context using the pattern
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
npm install -D @code-shaper/react @code-shaper/nextjs
```

For step-by-step instructions on how to use plugins, see
[Getting Started](../getting-started/core-concepts.md).

## Example

https://github.com/code-shaper/movie-magic/tree/main/apps/movie-magic-nextjs

## Repository

https://github.com/code-shaper/code-shaper/tree/main/plugins/nextjs
