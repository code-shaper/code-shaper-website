---
sidebar_position: 2
---

# Setting up a monorepo

## Prerequisites

Before running through this tutorial:

1. Make sure that you have **Node Version Manager** (NVM) installed on your
   machine. NVM allows you to use different versions of node via the command
   line. To install NVM, follow the instructions below:

   - [NVM for MacOS](https://github.com/nvm-sh/nvm)
   - [NVM for Windows](https://github.com/coreybutler/nvm-windows)

2. Install the LTS (Long Time Support) version of Node following the
   instructions above. This is recommended for deterministic and reliable
   builds. As of this writing, the LTS version is 18.16.0. If, for whatever
   reason, you want to use a different version of node, that's fine. Just be
   prepared for minor deviations from this tutorial.

3. Make sure that you have an IDE installed that understands TypeScript.
   [Visual Studio Code](https://code.visualstudio.com/) (free) and
   [WebStorm](https://www.jetbrains.com/webstorm/) (paid) are both good choices.

## Bootstrap an empty monorepo

```shell
# Change directory to a location where you create projects, e.g.
cd ~/projects

# Create and empty directory for our repo and cd into it
mkdir movie-magic
cd movie-magic

# Create an empty package.json file
npm init -y

# Install Code Shaper and its repo plugin
npm install -D code-shaper @code-shaper/repo

# Run Code Shaper and follow the prompts to initialize turborepo
npx shaper
? Which plugin would you like to run? Repo
? Which generator would you like to run? turborepo
? This generator will overwrite some files in your repo. Ok to proceed? y
? Repository name? (e.g. movie-magic) movie-magic
```

:::tip Specifying options on the command line

As seen above, you don't need to remember any options to run Code Shaper. It
basically asks you a few questions and generates what you want. However, you can
specify options on the command line to skip some or all the questions. For
example, the command line below specifies all the options, allowing Code Shaper
to generate the movie-magic repo without asking any questions:

```shell
npx shaper @code-shaper/repo --generator=turborepo --okToProceed=true --itemName=movie-magic
```

:::

Code Shaper has now initialized the repository with Turborepo and a new package.json file.
Execute the following commands for further setup:

```shell
# Do a clean install with the newly generated package.json file
rm -rf package-lock.json node_modules
nvm use        # use the required version of node
npm install    # install dependencies

# Install Code Shaper plugins that we will need for this project
npm install @code-shaper/react @code-shaper/plugin

# Initialize the git repo
git init

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

## Add Storybook

[Storybook](https://storybook.js.org/) is an awesome tool to develop UI
components in isolation. It forces us to design components to be standalone,
without coupling them to other parts of the application. Let's add Storybook
support to our repo. We will add it as an app under the `apps` folder.

Execute the following command:

```shell
npx shaper
? Which plugin would you like to run? React
? Which generator would you like to run? storybook
? Repository name? movie-magic
? Parent directory? apps
```

Now execute the following commands to install dependencies and commit all
changes:

```shell
npm install

# Commit
git add .
git commit -m "chore: add storybook"
```

Your monorepo is now ready for prime time! Create your first component library
by navigating to
[Creating a component library](./creating-a-component-library.md)
