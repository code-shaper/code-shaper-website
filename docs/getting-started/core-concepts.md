---
sidebar_position: 1
---

# Core Concepts

Code Shaper allows you to write multiple apps and packages in a single
repository. Each app and package gets its own workspace. You can think of
workspaces as the building blocks of your repository.

We use [Turborepo](https://turbo.build/repo) to create workspaces and run your
development tasks. It is a high-performance build system for JavaScript and
TypeScript codebases.

:::tip Using other languages and build systems

Note that Code Shaper is flexible enough to accommodate other languages and
build systems. You can use its code generation capabilities to support the
development workflow of your choice.

:::

Setting up Code Shaper involves two steps:

1. Creating a new repo
2. Adding an app or a package to it

Step 2 can be repeated any number of times to add apps or packages that use
different frameworks and languages.

So let's get started by [creating a new repo](./create-a-new-repo).
