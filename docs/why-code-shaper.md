---
sidebar_position: 1
---

# Why Code Shaper

Starter templates and code generators are a popular way for developers to get
started with a new language or a framework. However, many of them fail to
support an efficient and robust development workflow.

## The Problems

1. **Lack of production-grade tooling**: Many generators provide a minimal setup
   to get us started quickly, however they lack the tooling necessary for
   creating production-grade apps. For example, they might leave out linting,
   standalone component development, testing, or mocking APIs. With such
   generators, we end up wasting a lot of time selecting and integrating tools
   that can work nicely together.
2. **Limited code generation capabilities**: Imagine you are a on a team that
   has very opinionated coding standards and patterns. You've also standardized
   on specific 3rd-party libraries and tooling. Then you want to write custom
   code generators to assist your developers to produce quality code. Many
   off-the-shelf generators provide minimal flexibility in generating code your
   way. Many are template-based, providing simple substitution mechanisms.
   However, these don't scale up if you want to do something more complex.
3. **Limited sharing capabilities**: When you write a useful code generator, you
   may want to share it with other teams or repos – perhaps even open source it.
   Many generators were not designed with this kind of sharing in mind, or
   sharing was an after-thought.

## How Code Shaper solves them?

Imagine a code generator that was designed from the ground up to solve the
problems above. Here's how we addressed these problems in Code Shaper:

1. **Provide production-grade tooling**: Code Shaper was designed to be modular,
   so that teams could add production-grade tooling of their choice. Its plugin
   architecture allows you to build your repo layer-by-layer, adding the exact
   tooling you need. The off-the-shelf generators come with high-quality,
   opinionated tooling for linting, testing, component development, and mocking
   APIs. See the [Next.js](./getting-started/create-a-nextjs-app),
   [Vite](./getting-started/create-a-vite-plus-react-app) and
   [Remix](./getting-started/create-a-remix-app) generators as examples.
2. **Powerful code generation capabilities**: Instead of template-first
   approach, Code Shaper takes a code-first approach. While the generator is
   based on powerful [EJS templates](https://ejs.co/), it is still driven using
   JavaScript. If the pre-built template workflow doesn't match your needs,
   you're able to customize the workflow in code. Try writing your own custom
   code generator by following the instructions
   [here](./getting-started/create-a-custom-generator).
3. **Full sharing capabilities**: Code Shaper's plugin architecture allows you
   to bundle one or more generators into a plugin. Then publish it to an
   internal or external registry such as [npm](https://www.npmjs.com/) or
   [artifactory](https://jfrog.com/artifactory/). This allows you to share your
   generators with other teams or open source it. Not only that, when you
   publish a new version, anyone can get it using a simple `npm update` – no
   copying, no fuss.

## Code Shaper Benefits

- **Speed**: Code Shaper saves you time whenever you start a new project because
  a robust starter repo can be created in minutes instead of days or weeks.
  Also, creating a new component, helper, or another artifact takes seconds
  instead of copying and pasting from other places. All this time adds up to
  huge savings.

- **Code consistency**: By encapsulating best practices, the code you generate
  will be consistent and of high quality across projects and team members. When
  new patterns are introduced, you simply upgrade your generators to new
  standards. This approach also helps junior team members become productive
  faster.

- **Standardized tooling**: Code generation allows you to embed standardized
  processes and tools into your projects. A member joining from another team is
  instantaneously familiar with the folder structure, development & testing
  tools and CI/CD pipeline.
