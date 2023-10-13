---
sidebar_position: 1
---

# Overview

The goal of this tutorial is to get you started with Code Shaper as quickly as
possible. It is divided into four parts:

1. [Setting up a monorepo](./setting-up-a-monorepo)
2. [Creating a component library](./creating-a-component-library.md)
3. [Creating an application](./creating-an-application.md)
4. [Writing your own custom generator](./writing-a-custom-generator)

## The Tutorial App

During the course of the tutorial, we will build a simple web app called _Movie
Magic_. It shows a list of top 10 movies and allows the user to watch any of
them. You can look at the finished source code in the
[Movie Magic repo](https://github.com/code-shaper/movie-magic).

![Top 10 Movies](./img/home-page.png)

## Implementation Plan

Code Shaper is a modular code generator. We will build our web app
layer-by-layer, simulating how we might build a mission critical application in
real life.

Here's our plan to implement this app:

1. Bootstrap a **monorepo** from scratch where we will house our app, a
   component library, Storybook and a custom generator. We will use
   [Turborepo](https://turborepo.org/) for this.
2. Create a workspace called **ui-lib** which will house reusable React
   components, such as buttons, tabs and menus.
3. Create another workspace called **movie-magic** where we will house the main
   application. This app will use components from the ui-lib.
4. Write a **generator** to replace the `fetch` based hook in movie-magic with
   `react-query` and `axios`.

![Monorepo Structure](./img/monorepo-structure.png)

By convention, we store apps under the **apps** folder and libraries under the
**packages** folder of the monorepo.

:::tip Notice the modular nature of Code Shaper

As we progress through the tutorial, you will notice that we use different
plugins for different aspects of the application. Code Shaper itself is
unopinionated about the technologies you use, however plugins usually are.
Choose from the many off-the-shelf plugins designed to work with specific
technologies or roll your own to fit your unique needs. We will look at the
second option in the last part of the tutorial.

:::

:::danger Pay attention

To get the most out of this tutorial, please follow the instructions
meticulously. A missed step could mean a lot of wasted of time and frustration.

:::

Let's get started. Navigate to [Set up a monorepo](./set-up-a-monorepo).
