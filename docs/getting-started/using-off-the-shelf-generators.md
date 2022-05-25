---
sidebar_position: 2
---

# Using off-the-self generators

In this section, you will learn how to use off-the-self code generators to speed
up your development process. Specifically you will create a React application in
a monorepo. The monorepo will have two workspaces, one for the app itself and
another for a reusable component library.

For the purpose of this tutorial, let's assume that you are working for Movie
Magic, a company that provides a movie streaming service to its customers. By
the end of this tutorial, you will build a web page that shows top 10 movies of
all time.

> TODO: Add snapshot here

To get the most out of this tutorial, please follow the instructions
meticulously. A missed step could result in a lot of wasted of time and effort.
So let's get started...

## Install Code Shaper

```bash
npm install -g code-shaper
```

## Set up a minimal monorepo

```bash
# Change directory to a location where you create projects, e.g.
cd ~/projects

# Run Code Shaper and create a monorepo
shaper
? Which plugin would you like to run? Repo
? Which generator would you like to run? turborepo
? Repository name? movie-magic

# Install dependencies and commit
# (we will commit at each step for easy future reference)
cd movie-magic
git init
npm install

# Commit
git add .
git commit -m "Initial commit"
```

## Add StoryBook

```bash
shaper
? Which plugin would you like to run? Repo
? Which generator would you like to run? storybook
? Storybook will be added to movie-magic. Ok to proceed? Yes

# Add the following lines to the scripts section of your
# root package.json:
"storybook": "cd storybook && npm run storybook",
"build-storybook": "cd storybook && build-storybook -s public"

# In the root directory, run:
cd storybook
npm install
cd ..

# Commit
git add .
git commit -m "Added StoryBook"
```

## Add off-the-shelf plugins

```bash
npm install -D @code-shaper/shaper-utils @code-shaper/plugin
npm install -D @code-shaper/react @code-shaper/typescript

# Commit
git add .
git commit -m "Added Code Shaper plugins"
```

## Create a React UI Library

```bash
# Note that now when you run shaper, you will see 4 plugin choices:
# Repo, Plugin, React & TypeScript
shaper
? Which plugin would you like to run? React
? Which generator would you like to run? react-library
? Library name? ui-lib
? Parent directory? ./packages
? Package name used for publishing? @movie-magic/ui-lib

# In the root directory, edit package.json to force the latest version
# of React. This is done by adding the following overrides section after
# the devDependencies section:
"overrides": {
  "react": "^18.1.0",
  "react-dom": "^18.1.0"
},

# Edit /configs/typescript-config-custom/package.json to add a new
# typescript configuration (react-library.json). See below:
"files": [
  "base.json",
  // TODO: highlight-next-line
  "react-library.json",
],

# In the root directory, run:
npm run clean
npm install

# Commit
git add .
git commit -m "Added ui-lib"
```

## Add a Component

```bash
shaper
? Which plugin would you like to run? React
? Which generator would you like to run? component
? Component name? Button
? Which workspace should this go to? packages/ui-lib

# Implement the Button component using Storybook
npm run storybook

# Implement units tests
npm test

# Commit
git add .
git commit -m "Added Button component"
```

## Create an App

```bash
shaper
? Which plugin would you like to run? React
? Which generator would you like to run? app
? Application name? movie-magic
? Parent directory? ./apps
? Package name used for publishing? @movie-magic/movie-magic

# Add dependency to ui-lib in /apps/movie-magic/package.json
"devDependencies": {
  // TODO: highlight-next-line
  "@movie-magic/ui-lib": "*",
  ...
}

# In the root directory, run:
npm install

# To make sure that everything is set up correctly, run a build
npm run build

# Run the sample test we added
npm test

# Run movie-magic from the root directory:
npm run dev

# While the app is running, add a Button component (from our ui-lib)
# to the home page. Edit /apps/movie-magic/src/pages/HomePage/HomePage.tsx
# as follows:

import * as React from 'react';
// TODO: highlight-next-line
import { Button } from '@movie-magic/ui-lib';
import { Header } from '../../components';

export function HomePage() {
  return (
    <React.Fragment>
      <Header />
      // TODO: highlight-next-line (3 lines)
      <main className="p-4">
        <Button>Watch a Movie</Button>
      </main>
    </React.Fragment>
  );
}

# Commit
git add .
git commit -m "Added movie-magic app"
```

Congratulations! You have just learned how to use Code Shaper using
off-the-shelf generators. Now let's learn
[how to write your own custom generator](writing-a-custom-generator)
