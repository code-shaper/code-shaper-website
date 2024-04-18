---
sidebar_position: 2
---

# Set up a monorepo

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

# Create and empty directory for our repo and cd into it.
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
dependencies:

```shell
# Do a clean install with the newly generated package.json file
rm -rf package-lock.json node_modules
nvm use        # use the required version of node
npm install    # install dependencies

# Initialize a git repo in the current directory
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

## Create a workspace for our component library

Install Code Shaper plugins that we will need for this tutorial.

```shell
npm install @code-shaper/react @code-shaper/plugin
```

Now let's create a component library using the react plugin. By convention,
libraries are created in the **packages** directory. Let's create one there
called `ui-lib`.

```shell
npx shaper
? Which plugin would you like to run? React
? Which generator would you like to run? react-library
? Library name? ui-lib
? Parent directory? packages
? Package name used for publishing? @movie-magic/ui-lib
```

Now execute the following commands to install dependencies and commit all
changes:

```shell
npm install

# Commit
git add .
git commit -m "chore: add ui-lib"
```

## Create a workspace for our application

By convention, applications are created in the **apps** directory. Let's create
one there.

```shell
npx shaper
? Which plugin would you like to run? React
? Which generator would you like to run? app
? Application name? movie-magic
? Parent directory? apps
? Package name used for publishing? @movie-magic/movie-magic
```

Add a dependency in `apps/movie-magic/package.json` to `ui-lib`:

```json title="apps/movie-magic/package.json"
"dependencies": {
  "@movie-magic/ui-lib": "*",
  ...
}
```

Now execute the following commands for further setup and commit all the changes:

```shell
# Create a local environment file for movie-magic
cp apps/movie-magic/.env.example apps/movie-magic/.env.local

# Install dependencies:
npm install

# Build and run the app to make sure it works
npm run build
npm run dev

# Point your browser to http://localhost:3000/ to make sure the app runs.

# Commit
git add .
git commit -m "chore: add movie-magic app"
```

## What's Next?

Our monorepo is now ready for prime time! It contains a workspace for our
component library and another workspace for our application.

Let's start by
[adding a component to our component library](./add-component-to-library.md).
