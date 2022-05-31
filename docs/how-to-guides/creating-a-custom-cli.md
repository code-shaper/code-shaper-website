---
sidebar_position: 1
---

# Creating a custom CLI

Code Shaper provides a modular way to construct your projects in a monorepo. But
in some cases, you may want to generate a fully opinionated starter app in a
single repo. This guide shows you how to create a custom CLI to do just that.

## Example CLI

Let's create a CLI to generate an opinionated React app. This CLI will be
similar to [create-react-app](https://create-react-app.dev/), but we will use
Code Shaper to build it. We will call this cli `react-shaper`.

## Create an empty monorepo

Create an empty monorepo using Code Shaper.

```shell
# Change directory to a location where you create projects, e.g.
cd ~/projects

# Run Code Shaper and follow the prompts to create an empty monorepo
shaper
? Which plugin would you like to run? Repo
? Which generator would you like to run? turborepo
? Repository name? react-shaper

# Install dependencies
cd react-shaper
git init
npm install

# Add Code Shaper plugins
npm install -D @code-shaper/shaper-utils @code-shaper/custom-cli @code-shaper/plugin

# Commit
git add .
git commit -m "Initial commit"
```

## Create a custom CLI

Now let's create `react-shaper`, our custom CLI.

```shell
shaper
? Which plugin would you like to run? Custom CLI
? Which generator would you like to run? cli
? CLI name? react-shaper
? Parent directory? apps
? Package name used for publishing? react-shaper

# In the root directory, run:
npm install

# To make sure that everything is set up correctly, run a build
npm run build

# Commit
git add .
git commit -m "Added react-shaper CLI"
```

## Create a plugin + generator

Now that we have our CLI ready, let's create a plugin for generating our React
app.

```shell
# Run shaper in the repo's root directory
shaper
? Which plugin would you like to run? Plugin
? Which generator would you like to run? plugin
? Plugin name? react-starter
? Parent directory? plugins
? Package name used for publishing? @movie-magic/react-starter

# In the root directory, run:
npm install

# To make sure that everything is set up correctly, run a build
npm run build

# Run shaper again to generate a generator
shaper
? Which plugin would you like to run? Plugin
? Which generator would you like to run? generator
? Generator name? app
? Which plugin should this go under? plugins/react-starter
```

Register the `app` generator in your `react-starter` plugin by editing the
`index.ts` file of your plugin. See highlighted lines below.

```ts title="plugins/react-starter/src/index.ts"
import {
  Options,
  Plugin,
  Generator,
  GeneratorMap,
  selectGenerator,
} from '@code-shaper/shaper-utils';
// highlight-next-line
import { appGenerator } from './appGenerator';

const generators: GeneratorMap = {};

function registerGenerator(generator: Generator) {
  const { id } = generator;
  generators[id] = generator;
}

// ----- Register Generators Here -----
// highlight-next-line
registerGenerator(appGenerator);

const reactPatternsPlugin: Plugin = {
  id: '@movie-magic/react-starter',
  name: 'React Starter',
  description: 'generates react-starter artifacts',
  run: async (inputOptions: Options) => {
    const generator = await selectGenerator(generators, inputOptions);
    if (!generator) {
      return Promise.resolve();
    }

    return generator.generate(inputOptions);
  },
};

export default reactStarterPlugin;
```

Replace the contents of `appGenerator/index.ts` with the code shown below. The
main difference is that we are not asking for a parent directory - the reason
being that we will always generate the app under the current directory.

```ts title="plugins/react-starter/src/appGenerator/index.ts"
import { cc, FileUtils, Generator, Options } from '@code-shaper/shaper-utils';
import inquirer from 'inquirer';
import path from 'path';

export const appGenerator: Generator = {
  id: 'app',
  name: 'App',
  description: 'generates a App',
  generate: generateApp,
};

async function generateApp(inputOptions: Options) {
  const questions = [
    {
      type: 'input',
      name: 'itemName',
      message: 'App name? (e.g. "movie-magic")',
    },
  ];

  const options = await inquirer.prompt(questions, inputOptions);
  const { itemName } = options;

  // --------------------------------------------------------------------------
  // Add more options for code generation here
  // --------------------------------------------------------------------------
  // itemNameKebabCase = movie-magic
  options['itemNameKebabCase'] = cc.kebabCase(itemName);

  // itemNameCamelCase = movieMagic
  options['itemNameCamelCase'] = cc.camelCase(itemName);

  // itemNamePascalCase = MovieMagic
  options['itemNamePascalCase'] = cc.pascalCase(itemName);

  // itemNameCapitalCase = Movie Magic
  options['itemNameCapitalCase'] = cc.capitalCase(itemName);
  // --------------------------------------------------------------------------

  const { itemNameKebabCase } = options;

  const srcDir = path.join(__dirname, 'templates');
  const dstDir = path.join(process.cwd(), itemNameKebabCase);

  console.log();
  console.log(`Creating ${itemName}...`);

  FileUtils.transformFiles(srcDir, dstDir, options);

  console.log();
  console.log('Done. Now run:');
  console.log();
  console.log(`  cd ${itemNameKebabCase}`);
  console.log('  git init');
  console.log('  npm install');
  console.log('  git add .');
  console.log('  git commit -m "initial commit"');
  console.log();

  return Promise.resolve();
}
```

## Create a template

We'll start with a single template file to test out our generator. Create a
`templates` folder at `plugins/react-starter/src/appGenerator/templates`. Create
a template file called `package.json.ejs.t` under this folder with contents as
shown below:

```json title="plugins/react-starter/src/appGenerator/templates/package.json.ejs.t"
{
  "name": "<%= itemNameKebabCase %>",
  "description": "<%= itemNameCapitalCase %>",
  "version": "0.1.0",
  "scripts": {
    "build": "react-scripts build",
    "eject": "react-scripts eject",
    "start": "react-scripts start",
    "test": "react-scripts test"
  },
  "dependencies": {
    "react": "^18.1.0",
    "react-dom": "^18.1.0",
    "web-vitals": "^2.1.4"
  },
  "devDependencies": {
    "@types/node": "^17.0.36",
    "@types/react": "^18.0.9",
    "@types/react-dom": "^18.0.5",
    "react-scripts": "5.0.1",
    "typescript": "^4.7.2"
  }
}
```

Rebuild the generator by running the following command in the root directory.

```shell
npm run build

# Commit
git add .
git commit -m "Added react-starter plugin"
```

## Load the plugin from our CLI

At this point our plugin is ready. Let's wire it into our CLI so that we can run
it from there.

Add the `react-starter` plugin as a dependency in the `package.json` file of our
`react-shaper` CLI.

```json title="apps/react-shaper/package.json"
{
  ...
  "dependencies": {
    "@code-shaper/shaper-utils": "*",
    // highlight-next-line
    "@movie-magic/react-starter": "*",
    "inquirer": "^8.2.4",
    "inquirer-directory": "^2.2.0",
    "yargs": "^17.5.1"
  },
  ...
}
```

Now load the plugin in `react-shaper.ts`. See highlighted lines below.

```ts title="apps/react-shaper/src/react-shaper.ts"
import {
  getPluginChoices,
  Options,
  Plugin,
  PluginUtils,
  PluginMap,
} from '@code-shaper/shaper-utils';
// highlight-next-line
import reactStarterPlugin from '@movie-magic/react-starter';
import inquirer from 'inquirer';

// ---------- Plugin Store ----------
// Static plugins are built into the CLI
const staticPlugins: PluginMap = {};

// Dynamic plugins are loaded at runtime
const dynamicPlugins: PluginMap = {};

// ---------- Plugin Registration ----------
function registerStaticPlugin(plugin: Plugin) {
  const { id } = plugin;
  staticPlugins[id] = plugin;
}

function registerDynamicPlugin(plugin: Plugin) {
  const { id } = plugin;
  dynamicPlugins[id] = plugin;
}

// ----- Register static plugins here -----
// highlight-next-line
registerStaticPlugin(reactStarterPlugin);

// Register dynamic plugins
const plugins = PluginUtils.getDynamicPlugins();
plugins.forEach(registerDynamicPlugin);
```

Install dependencies and run a build to make sure everything is set up
correctly.

```shell
# In the root directory, run:
npm install

# To make sure that everything is set up correctly, run a build
npm run build

# Commit
git add .
git commit -m "Wired react-starter plugin to the CLI"
```

## Run the CLI

The CLI needs to be published to a binary repository (such as npm) before it can
be run. However, we should always make it work locally before publishing it to
the world! This is done using the `npm link` command. Let's give it a try.

```shell
# Change directory to the react-shaper CLI
cd apps/react-shaper

# Make sure that the dist directory exists.
# It contains the compiled version of react-shaper.
ls -al dist
total 32
drwxr-xr-x   6 naresh  staff   192 May 30 18:18 .
drwxr-xr-x  11 naresh  staff   352 May 30 18:18 ..
-rw-r--r--   2 naresh  staff    11 May 30 18:18 index.d.ts
-rw-r--r--   2 naresh  staff  1109 May 30 18:18 index.js
-rw-r--r--   2 naresh  staff   209 May 30 18:18 react-shaper.d.ts
-rw-r--r--   2 naresh  staff  2162 May 30 18:18 react-shaper.js

# Symlink to the local npm repository
npm link

# Verify that the link was created
npm list -g

# The following link should appear in the listing.
react-shaper@0.0.1 -> ./../../../../../projects/react-shaper/apps/react-shaper
```

Now the `react-shaper` command can be executed from any directory. Open a new
shell and execute the following commands:

```shell
# Change directory to a location where you create projects, e.g.
cd ~/projects

# Run react-shaper
# Note: If you are running in zsh, the following command may simply change
# the directory to react-shaper, instead of running react-shaper. To work
# around this issue, run this command first: unsetopt AUTO_CD
# See details here:
# https://unix.stackexchange.com/questions/126719/how-to-disable-auto-cd-in-zsh-with-oh-my-zsh
react-shaper
? Which plugin would you like to run? React Starter
? Which generator would you like to run? app
? App name? hello-world

Creating hello-world...
  package.json

Done. Now run:

  cd hello-world
```

This should create a directory called `hello-world` with the following
`package.json` file. Note the correct substitutions in `name` and `description`
properties.

```json title="hello-world/package.json"
{
  "name": "hello-world",
  "description": "Hello World",
  "version": "0.1.0",
  "scripts": {
    "build": "react-scripts build",
    "eject": "react-scripts eject",
    "start": "react-scripts start",
    "test": "react-scripts test"
  },
  "dependencies": {
    "react": "^18.1.0",
    "react-dom": "^18.1.0",
    "web-vitals": "^2.1.4"
  },
  "devDependencies": {
    "@types/node": "^17.0.36",
    "@types/react": "^18.0.9",
    "@types/react-dom": "^18.0.5",
    "react-scripts": "5.0.1",
    "typescript": "^4.7.2"
  }
}
```

## Bypass plugin prompts

As seen above, when react-shaper starts, it asks the user for a plugin and a
generator. For a simple CLI with only one plugin and one generator, these
questions are unnecessary. Let's bypass them by specifying their ids in
`react-shaper/index.ts`. Replace the contents of this file with the code below:

```ts title="apps/react-shaper/src/index.ts"
import yargs from 'yargs/yargs';
import { reactShaper } from './react-shaper';

async function main() {
  // Parse command line
  const argv = await yargs().parse(process.argv.slice(2));
  const { _, $0: command, ...options } = argv; // eslint-disable-line

  // Specify pluginId and generator
  const pluginId = '@movie-magic/react-starter';
  options['generator'] = 'app';

  // Run reactShaper
  await reactShaper.run(pluginId, options);
}

main().catch((err) => console.error('Error:', err));
```

Rebuild `react-shaper` by running the following command in the root of the
repository:

```shell
npm run build
```

Now rerun `react-shaper` in another shell. Remember to delete the old
`hello-world` directory.

```shell
# Change directory to a location where you create projects, e.g.
cd ~/projects

# Delete old implementation of hello-world
rm -rf hello-world

# Regenerate hello-world using the new react-shaper
react-shaper
? App name? hello-world

Creating hello-world...
  package.json

Done. Now run:

  cd hello-world
```

Note that `react-shaper` no longer asks for a plugin and a generator.

Go back to the repo root directory and commit your changes:

```shell
# Commit
git add .
git commit -m "Bypassed plugin prompts"
```

## Add more templates (optional)

You have now successfully built a custom CLI. As a next step, you can add more
templates in the templates directory
(`plugins/react-starter/src/appGenerator/templates`) to create a full-fledged
starter app. See an example [here](https://github.com/code-shaper/react-shaper).

## Publish to npm (optional)

You can share your CLI with others by publishing it to npm. For this you will
need an account with npm. You will also have to make sure that the name of your
CLI package is not taken already. Here are the rough steps to publish to npm:

```shell
# Remember to unlink your local react-shaper
npm unlink -g react-shaper

# Publish to npm
cd apps/react-shaper
npm publish

# Install the npm version
cd ~/projects
npm install -g react-shaper

# Try it out
react-shaper
? App name? hello-world

Creating hello-world...
  package.json

Done...
```
