---
sidebar_position: 1
---

# Shaper CLI

This `shaper` command-line interface is used to run Code Shaper plugins. Shaper
comes with the Repo plugin built into it. Other plugins are loaded dynamically
by adding them as dev dependencies at the top level of your repo.

## Installation

```shell
npm install -g code-shaper
```

Now you can run shaper on your command line as follows:

```shell
shaper
? Which plugin would you like to run? Repo
? Which generator would you like to run? turborepo
? Repository name? movie-magic
```

For step-by-step instructions on using `shaper`, see
[Setting up a monorepo](../getting-started/setting-up-a-monorepo.md).

## Repository

https://github.com/code-shaper/code-shaper/tree/main/apps/code-shaper
