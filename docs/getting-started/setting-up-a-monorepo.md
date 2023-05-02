---
sidebar_position: 2
---

# Setting up a monorepo

## Prerequisites

Before running through this tutorial:

1. Make sure that you have Node version 16 or higher installed on your machine.
   If you don't, follow the instructions
   [here](https://github.com/nareshbhatia/react-learning-resources#developer-machine-setup).
2. Make sure that you have an IDE installed that understands TypeScript.
   [Visual Studio Code](https://code.visualstudio.com/) (free) and
   [WebStorm](https://www.jetbrains.com/webstorm/) (paid) are both good choices.

## Install Code Shaper

Install Code Shaper as a global plugin. This will make it easier to run it
repeatedly with a minimum number of keystrokes.

```shell
npm install -g code-shaper
```

:::tip Open new shells/terminals

You may have to close existing shells/terminals and open new ones to access Code
Shaper.

:::

## Create an empty monorepo

The monorepo generator is built right into Code Shaper. You don't need to
install any plugins for it. Create an empty monorepo using Code Shaper.

```shell
# Change directory to a location where you create projects, e.g.
cd ~/projects

# Run Code Shaper and follow the prompts to create an empty monorepo
shaper
? Which plugin would you like to run? Repo
? Which generator would you like to run? turborepo
? Repository name? movie-magic
```

:::tip Specifying options on the command line

As seen above, you don't need to remember any options to run Code Shaper. It
basically asks you a few questions and generates what you want. However, you can
specify options on the command line to skip some or all the questions. For
example, the command line below specifies all the options, allowing Code Shaper
to generate the movie-magic repo without asking any questions:

```shell
shaper @code-shaper/repo --generator=turborepo --itemName=movie-magic
```

:::

```shell
# Install dependencies
cd movie-magic
git init
npm install

# Commit
# (we will commit at the end of each step to mark its completion)
git add .
git commit -m "Initial commit"
```

## Add Code Shaper libraries and plugins

Add the following Code Shaper packages to the `devDependencies` section of the
root `package.json` file:

```json title="package.json"
{
  ...
  "devDependencies": {
    // highlight-start
    "@code-shaper/plugin": "latest",
    "@code-shaper/react": "latest",
    "@code-shaper/shaper-utils": "latest",
    "@code-shaper/typescript": "latest",
    // highlight-end
    "husky": "^8.0.1",
    "lint-staged": "^13.0.1",
    "prettier": "^2.7.1",
    "rimraf": "^3.0.2",
    "turbo": "latest"
  }
  ...
}
```

Now execute the following commands in the repo's root directory:

```shell
npm install

# Commit
git add .
git commit -m "Added code-shaper libraries and plugins"

# Next time when you run shaper, you will magically see 3 more plugins:
# Plugin, React & TypeScript
```

## Add Storybook

[Storybook](https://storybook.js.org/) is an awesome tool to develop UI
components in isolation. It forces us to design the component to be standalone,
without coupling it to other parts of the application. Let's add Storybook
support to our repo.

```shell
shaper
? Which plugin would you like to run? React
? Which generator would you like to run? storybook
? Storybook will be added to movie-magic. Ok to proceed? Yes

# Add the following lines to the scripts section of your
# root package.json:
"storybook": "cd storybook && npm run storybook",
"build-storybook": "cd storybook && npm run build-storybook"

# In the root directory, run:
cd storybook
npm install
cd ..

# Commit
git add .
git commit -m "Added storybook"
```

Your monorepo is now ready for prime time! Create your first component library
by navigating to
[Creating a component library](./creating-a-component-library.md)
