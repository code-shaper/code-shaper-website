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

# Make an initial commit
# We will commit at the end of each step to mark its completion.
# Note that we are using the conventional commit spec for commit messages.
# The `npm run commit` command helps us with this using prompts.
# This is equivalent to executing the following git command directly:
#   git commit -m "chore: initial commit"
git add .
npm run commit
  ? Select the TYPE of this change (required): chore
  ? Select the SCOPE of this change (optional) (press enter to skip): <press enter>
  ? Finish this SHORT sentence (required): "Applying this commit will...": (max 100 chars)
  initial commit
  ? Provide a LONGER description of the change (optional): (press enter to skip): <press enter>
  ? Are there any breaking changes?: No
  [master (root-commit)] chore: initial commit
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
    // highlight-end
    "@commitlint/cz-commitlint": "^17.5.0",
    "@typescript-eslint/eslint-plugin": "^5.60.0",
    ...
  }
  ...
}
```

Now execute the following commands in the repo's root directory:

```shell
npm install

# Commit
git add .
git commit -m "chore: add code-shaper libraries and plugins"

# Next time when you run shaper, you will magically see 2 new plugins:
# Plugin & React
```

## Add Storybook

[Storybook](https://storybook.js.org/) is an awesome tool to develop UI
components in isolation. It forces us to design components to be standalone,
without coupling them to other parts of the application. Let's add Storybook
support to our repo. We will add it as an app under the `apps` folder.

Execute the following command:

```shell
shaper
? Which plugin would you like to run? React
? Which generator would you like to run? storybook
? Storybook name? movie-magic-storybook
? Parent directory? apps
? Package name used for publishing? @movie-magic/movie-magic-storybook
```

In the root directory, edit `package.json` to force the latest version of React.
   This is done by adding the following overrides section after the devDependencies
   section:

```json
  "overrides": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
```

Now execute the following commands to install dependencies and commit all changes:

```shell
npm install

# Commit
git add .
git commit -m "chore: add storybook"
```

Your monorepo is now ready for prime time! Create your first component library
by navigating to
[Creating a component library](./creating-a-component-library.md)
