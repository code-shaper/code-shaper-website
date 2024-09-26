---
sidebar_position: 5
---

# Plugin plugin

This plugin generates scaffolding to create your own plugins and generators. It
consists of two generators:

1. **Plugin generator**: Generates scaffolding for a plugin
2. **Generator generator**: Generates scaffolding for a generator

## Installation

:::tip Prerequisites

Before installing this plugin, make sure that you have created a monorepo for
your code. See [Create a New Repo](../getting-started/create-a-new-repo) for
instructions.

:::

Add a dev dependency at the root of your code repository:

```shell
npm install @code-shaper/plugin
```

For step-by-step instructions on how to use this plugin, see
[Create a Custom Generator](../getting-started/create-a-custom-generator).

## Example

https://github.com/code-shaper/movie-magic/tree/main/plugins/react-patterns

## Repository

https://github.com/code-shaper/code-shaper/tree/main/plugins/react
