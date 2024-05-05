---
sidebar_position: 1
---

# Introduction

Code Shaper is an easy-to-use code generator that is modular and extensible. It
was designed to integrate seamlessly with modern tooling and development
processes.

## Benefits

- **Speed**: Code Shaper saves you time whenever you start a new project because
  a robust starter repo can be created in minutes instead of days or weeks.
  Also, creating a new component, helper or another artifact takes seconds
  instead of copying and pasting from other places. All this time adds up to
  huge savings.

- **Code Consistency**: By encapsulating best practices, the code you generate
  will be consistent and of high quality across projects and team members. When
  new patterns are introduced, you simply create or upgrade your generators to
  new standards. This approach also helps junior team members to become
  productive faster.

- **Standardized Tooling**: Code generation allows you to embed standardized
  processes and tools into your projects. A member joining from another team is
  instantaneously familiar with the folder structure, development & testing
  tools and CI/CD pipeline.

## Guiding Principles

Code Shaper was designed with the following guiding principles in mind:

- **Easy to use**: Code Shaper should be easy to install and get started.
  Generators should be built in a conversational style so that users do not have
  to remember complex options. They should be able to use options if they prefer
  to do so.

- **Easy to share**: Generators should be easily sharable by publishing to npm.
  The CLI should be able to detect and load installed generators automatically.

- **First-class documentation**: Because no matter how wonderful a tool is, if
  people can't understand how to use it, it is worthless!

- **Unopinionated**: Code Shaper itself should be unopinionated about the
  languages and frameworks people use it for. Opinions are expected to be
  embedded in the plugins and generators that people write.

- **Modular**: Code Shaper should allow end users to build their tech stack in a
  modular fashion. For example, they should be able to start with their choice
  of repository structure and then layer on further decisions for frameworks,
  libraries, patterns, coding conventions, CI/CD pipelines etc.

- **Extensible**: Code Shaper should be easily extensible using a plugin
  architecture and a simple utility library to perform common tasks. Anyone with
  a basic knowledge of TypeScript should be able to write plugins - PhD degree
  not required. A plugin generator should be provided to scaffold the basic
  infrastructure.

- **Monorepo Friendly**: Code Shaper should be monorepo friendly. It should
  provide APIs that understand workspaces within monorepos and manage them.

- **Community driven**: Contributors and users should encourage discussion,
  suggestions and contributions to form a strong community and ecosystem.

## Documentation Structure

We strive to provide first-class documentation for Code Shaper. A high-level
overview of how it is organized will help you know where to look for certain
things:

- [Getting Started](./getting-started/core-concepts) is a hands-on introduction
  to Code Shaper. Start here if you’re new to this tool.
- [Concepts](./category/concepts) contains a discussion of key topics at a
  fairly high level and provides useful background information and explanation.
- [Reference](./category/reference) contains technical reference for Code Shaper
  utilities, plugins and other aspects of its machinery. This section assumes
  that you have a basic understanding of key concepts.
- [How-to guides](./category/how-to-guides) are recipes. They guide you through
  the steps involved in addressing key problems and use-cases. They are more
  advanced than the getting started tutorials and assume some knowledge of how
  Code Shaper works.
