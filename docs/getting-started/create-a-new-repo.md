---
sidebar_position: 2
---

# Create a New Repo

In this section, we will create a new repo that will be used as a foundation for
adding various artifacts like apps and libraries. You can find a completed
example of this repo [here](https://github.com/code-shaper/movie-magic).

## Prerequisites

1. Make sure that you have **Node Version Manager** (NVM) installed on your
   machine. NVM allows you to use different versions of node via the command
   line. To install NVM, follow the instructions below:

   - [NVM for MacOS](https://github.com/nvm-sh/nvm)
   - [NVM for Windows](https://github.com/coreybutler/nvm-windows)

2. Make sure that you have some version of node installed on your machine. This
   is required to bootstrap an empty repo in the next step. Execute the
   following command on the command line: `node -v`. If it returns a node
   version, you are good. Otherwise run this command to install the latest
   version: `nvm install --lts`.

3. Make sure that you have an IDE installed that understands TypeScript.
   [Visual Studio Code](https://code.visualstudio.com/) (free) and
   [WebStorm](https://www.jetbrains.com/webstorm/) (paid) are both good choices.

## Bootstrap an empty monorepo

```shell
# Change directory to a location where you normally create new projects,
# e.g. ~/projects
cd ~/projects

# Create an empty directory for our repo and cd into it.
# Repos are usually named with kebab-case.
mkdir movie-magic
cd movie-magic

# Create an empty package.json file
npm init -y

# Install Code Shaper and its repo plugin
npm install code-shaper @code-shaper/repo

# Run Code Shaper and follow the prompts to initialize turborepo
npx shaper
? Which plugin would you like to run? Repo
? Which generator would you like to run? turborepo
? This generator will overwrite some files in your repo. Ok to proceed? y
```

:::tip Specifying options on the command line

As seen above, you don't need to remember any options to run Code Shaper. It
basically asks you a few questions and generates what you want. However, you can
specify options on the command line to skip some or all the questions. For
example, the command line below specifies all the options, allowing Code Shaper
to generate the movie-magic repo without asking any questions:

```shell
npx shaper @code-shaper/repo --generator=turborepo --okToProceed=true
```

:::

Code Shaper has now initialized the repository with Turborepo and a new
package.json file. Execute the following commands to install the new
dependencies and then make an initial commit:

```shell
# Initialize a git repo in the current directory
git init

# Use the required version of node.
# If the required version of node is not installed on your machine,
# you will be prompted to install it.
nvm use

# Do a clean install with the newly generated package.json file
rm -rf package-lock.json node_modules
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

This completes the installation of Turborepo.

## Add an artifact

Now that our repository is all set up, let's add any artifact to it. Choose from
the options below:

### Web Applications

1. [Create a Next.js app](./create-a-nextjs-app)
2. [Create a Vite + React app](./create-a-vite-plus-react-app)

### Code Generators

1. [Create a custom generator](./create-a-custom-generator)
