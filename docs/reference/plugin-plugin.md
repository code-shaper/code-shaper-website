---
sidebar_position: 5
---

# Plugin plugin

This plugin generates scaffolding for creating your own plugins and generators.
It consists of two generators:

1. **Plugin generator**: Generates scaffolding for a plugin
2. **Generator generator**: Generates scaffolding for a generator

## Installation

:::tip Prerequisites

Before installing this plugin, make sure that you have installed the `shaper`
CLI and created a monorepo for your code. See
[Setting up a monorepo](../getting-started/setting-up-a-monorepo.md) for
instructions.

:::

Add a dev dependency at the root of your code repository:

```shell
npm install -D @code-shaper/plugin
```

For step-by-step instructions on how to use this plugin, see
[Writing a custom generator](../getting-started/writing-a-custom-generator.md).

## Example

https://github.com/code-shaper/movie-magic/tree/main/plugins/react-patterns

## Repository

https://github.com/code-shaper/code-shaper/tree/main/plugins/react
