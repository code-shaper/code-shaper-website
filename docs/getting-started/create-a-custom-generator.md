---
sidebar_position: 8
---

# Create a Custom Generator

As mentioned in [Why Code Shaper](../why-code-shaper), if the pre-built
generators don't match your needs, you can write your own. This allows you to
generate code specific to your team's coding standards and patterns. You can
even share your code generators with other teams or open source it to share it
with a wider audience.

In this section, we'll learn how to create a custom code generator to generate a
simple website. You can find the completed example
[here](https://github.com/code-shaper/movie-magic/tree/main/plugins/instant-sites).

## Core concepts

Code Shaper allows you to bundle multiple generators into a plugin. The plugin
can be used within its own repository or published to a central registry (e.g.
npm or artifactory) for use in other repositories.

Thus creating a generator involves two steps:

1. Create a plugin
2. Add one or more generators to it

Let's start by creating a plugin.

## Create a plugin

Install Code Shaper plugin for generating a plugin. This plugin is a convenient
way to generate starter plugins and generators.

```shell
npm install @code-shaper/plugin
```

Now let's generate a plugin called `instant-sites` in the `plugins` folder:

```shell
# Run shaper in the repo's root folder
npx shaper
? Which plugin would you like to run? Plugin
? Which generator would you like to run? plugin
? Plugin name? instant-sites
? Parent folder? plugins
? Package name used for publishing? @movie-magic/instant-sites
```

Now the plugin is ready, but Code Shaper needs to load it dynamically. To make
this work, add the `instant-sites` plugin as a devDependency in the root
`package.json` file of your repo.

```json title="package.json"
{
  ...
  "devDependencies": {
    "@code-shaper/commitlint-config": "^1.*",
    "@code-shaper/eslint-config": "^1.*",
    "@code-shaper/plugin": "^1.*",
    "@commitlint/cz-commitlint": "^19.2.0",
    "@manypkg/cli": "latest",
    // highlight-next-line
    "@movie-magic/instant-sites": "*",
    "@typescript-eslint/eslint-plugin": "^5.62.0",
    ...
  },
  ...
}
```

Install dependencies and run shaper to verify that the plugin shows up.

```shell
# In the root folder, run:
npm install

# Run a build
npm run build

# Run shaper to verify that the plugin shows up
npx shaper
? Which plugin would you like to run? Instant Sites
? Which generator would you like to run? dummy
Dummy Generator: ./projects/movie-magic {}
```

## Create a generator

Now let's run shaper again to add a simple website generator to the plugin.

```shell
npx shaper
? Which plugin would you like to run? Plugin
? Which generator would you like to run? generator
? Generator name? simple-website
? Which plugin should this go under? plugins/instant-sites
```

Register the `simple-website` generator in your `instant-sites` plugin by
editing the `index.ts` file of your plugin. See highlighted lines below.

```ts title="plugins/instant-sites/src/index.ts"
import {
  Options,
  Plugin,
  Generator,
  GeneratorMap,
  selectGenerator,
} from '@code-shaper/shaper-utils';
// highlight-next-line
import { simpleWebsiteGenerator } from './simpleWebsiteGenerator';

const generators: GeneratorMap = {};

function registerGenerator(generator: Generator) {
  const { id } = generator;
  generators[id] = generator;
}

// ----- Register Generators Here -----
// highlight-start
// Delete the dummyGenerator
// Register `simpleWebsiteGenerator` instead
registerGenerator(simpleWebsiteGenerator);
// highlight-end

const instantSitesPlugin: Plugin = {
  id: '@movie-magic/instant-sites',
  name: 'Instant Sites',
  description: 'generates Instant Sites artifacts',
  run: async (inputOptions: Options) => {
    const generator = await selectGenerator(generators, inputOptions);
    if (!generator) {
      return Promise.resolve();
    }

    return generator.generate(process.cwd(), inputOptions);
  },
};

export default instantSitesPlugin;
```

Rebuild the plugin by running the following command in the root folder.

```shell
npm run build
```

Now run the plugin to make sure that the generator shows up.

```shell
npx shaper
? Which plugin would you like to run? Instant Sites
? Which generator would you like to run? simple-website
? Simple Website name? movie-magic-website
? Parent folder? apps

Creating movie-magic-website...
  README.md

options available for this generator:
{
  "itemName": "movie-magic-website",
  "parentDir": "apps",
  "itemNameKebabCase": "movie-magic-website",
  "itemNameCamelCase": "movieMagicWebsite",
  "itemNamePascalCase": "MovieMagicWebsite",
  "itemNameCapitalCase": "Movie Magic Website"
}
```

As you can see, the basic infrastructure for your generator is ready. It even
created a placeholder `README.md` file under `/apps/movie-magic-website`. The
last part of the output shows some _options_ available to your templates.
Templates use these options as _template variables_. Your generator may have to
ask additional questions from your user to collect the required template
variables for your templates. We will show you these concepts in a bit.

:::tip Note

We will use the terms _options_ and _template variables_ interchangeably.

:::

## Create your desired output

To implement our generator we will start backwards – we'll first create a sample
website at the final location in our repository. The generator already gave us a
head start on this by creating a placeholder folder at
`/apps/movie-magic-website`. We will simply develop this folder further to
represent our desired output. We'll then transform this folder into a set of
templates for our generator. So let's get started.

1. Delete the placeholder implementation of `movie-magic-website` at
   `/apps/movie-magic-website` and replace it with the one from
   [the completed example](https://github.com/code-shaper/movie-magic/tree/main/apps/movie-magic-website).
   Make sure you copy the full nested folder structure (a total of 5 files).
2. Now execute the following commands at the root of your repository to make
   sure that the website runs.

```shell
# Install dependencies:
npm install

# Run the website
npm run dev

# Point your browser to http://localhost:7777/.
# You should see the running website. See screenshot below.
```

![Movie Magic Website](./img/movie-magic-website.png)

## Copy the desired output into the generator

Now that we know what the desired output is, let's copy it into the plugin.

1. Copy the `/apps/movie-magic-website` folder into the
   `/plugins/instant-sites/src/simpleWebsiteGenerator/expected-output/apps`
   folder (next to the `simple-website` folder which was automatically generated
   for you).
2. Now the
   `/plugins/instant-sites/src/simpleWebsiteGenerator/expected-output/apps`
   folder should contain two sub-folders: `movie-magic-website` and
   `simple-website`.
3. Delete the `simple-website` folder. We don't need it since our expected
   output is in `movie-magic-website`.

Note that the `expected-output` folder is used for testing our generator. To get
a bigger picture, the generator folder contains 3 sub-folders:

```
simpleWebsiteGenerator
|--- expected-output
|--- templates
`--- test-output
```

When the generator test runs, it uses the `templates` folder to generate the
`test-output` folder. Then it compares the `test-output` folder with the
`expected-output` folder to make sure they match exactly. If any file or folder
does not match then the test fails. This is a good way to make sure that your
generator is working as expected.

## Create templates

Now that the `expected-output` is finalized, we can use it to create our
templates.

1. The templates folder contains one `README.md` file that was automatically
   generated. Delete it.
2. Copy the contents of the `expected-output/apps/movie-magic-website` folder
   into the `templates` folder. So your templates folder should look like this:

```
templates
|--- .gitignore
|--- package.json
|--- README.md
`--- src
     |--- global.css
     `--- index.html
```

Now we need to identify all files that contain the website name
`movie-magic-website` or any variation of it (e.g. Movie Magic Website). These
files need to be converted into templates, because we can't have templates with
hard-coded names. A quick search reveals that the following 3 files have have
hard-coded names:

1. `package.json`
2. `README.md`
3. `index.html`

We need to convert these into templates. This is done by adding a `.ejs.t`
extension to them ([EJS](https://ejs.co/) is our templating language). Rest of
the files can be left as is – they will be copied over to the target directory
without any transformation.

However, there is one exception – the `.gitignore` file. Although this file does
not have any hard-coded names, it still needs to get a `.ejs.t` extension,
otherwise the bundling process will not work correctly. Adding the extension
does not really hurt – the file will go through a transformation, but there is
nothing to transform!

Go ahead and add `.ejs.t` extension to the 4 files mentioned above. Your
`templates` folder should now look like this:

```
templates
|--- .gitignore.ejs.t
|--- package.json.ejs.t
|--- README.md.ejs.t
`--- src
     |--- global.css
     `--- index.html.ejs.t
```

Finally, let's edit the files with hard-coded names and replace them with
template variables. Remember that our generator
(`simpleWebsiteGenerator/index.ts`) had created these variables by asking
questions from the user? It's time to use them.

```diff title="templates/package.json.ejs.t"
{
-  "name": "movie-magic-website",
+  "name": "<%= itemNameKebabCase %>",
  ...
}
```

```diff title="templates/README.md.ejs.t"
- # Movie Magic Website
+ # <%= itemNameCapitalCase %>
...
```

```diff title="templates/src/index.html.ejs.t"
<!DOCTYPE html>
...
-    <title>Movie Magic Website</title>
+    <title><%= itemNameCapitalCase %></title>
...
-      <h1>Movie Magic Website</h1>
+      <h1><%= itemNameCapitalCase %></h1>
...
</html>

```

That's it! Let's test that the generator works, i.e. the generated output equals
the expected output.

## Test the generator

Let's modify the placeholder test to our use case:

```diff title="plugins/instant-sites/src/simpleWebsiteGenerator/simpleWebsiteGenerator.test.ts"
...
    // Run the generator
    await simpleWebsiteGenerator.generate(testOutput, {
      // ----- insert options here -----
-     itemName: 'simple-website',
+     itemName: 'movie-magic-website',
      parentDir: path.join(testOutput, 'apps'),
    });
...
```

Build & test:

```shell
npm run build
npm test
```

The test should pass because `test-output` should match `expected-output`
exactly.

## Tweak the generator

Now that the generator is working perfectly, let's tweak the messaging a bit to
make it more user friendly:

```diff title="plugins/instant-sites/src/simpleWebsiteGenerator/index.ts"
...
export const simpleWebsiteGenerator: Generator = {
  id: 'simple-website',
  name: 'Simple Website',
- description: 'generates a Simple Website',
+ description: 'generates a simple website',
  generate: generateSimpleWebsite,
};

async function generateSimpleWebsite(rootDir: string, inputOptions: Options) {
  const questions = [
    {
      type: 'input',
      name: 'itemName',
-     message: 'Simple Website name? (e.g. "simpleWebsite")',
+     message: 'Website name? (e.g. "movie-magic-website")',
    },
    {
      type: 'directory',
      name: 'parentDir',
      pageSize: 20,
-     message: 'Parent directory? (usually "<directory name>")',
+     message: 'Parent directory? (usually "apps")',
      basePath: rootDir,
    },
  ];
  ...
  FileUtils.transformFiles(srcDir, dstDir, options);
- console.log();
- console.log('options available for this generator:');
- console.log(JSON.stringify(options, null, '  '));
- console.log();
+ console.log();
+ console.log('Done.');
+ console.log();
+ console.log('What to do next?');
+ console.log('----------------');
+ console.log();
+ console.log('# Install newly added dependencies');
+ console.log('npm install');
+ console.log();
+ console.log('# Run the website to make sure it works');
+ console.log('npm run dev');
+ console.log();
+ console.log(
+   '# Point your browser to http://localhost:7777 to make sure the app runs.'
+ );
+ console.log();

  return Promise.resolve();
}
```

Run a build to compile the changes:

```shell
npm run build
```

## Final test

Let's do a final test of our generator using a different site name.

```shell
# Run shaper in the repo's root folder
npx shaper
? Which plugin would you like to run? Instant Sites
? Which generator would you like to run? simple-website
? Simple Website name? top-10-movies
? Parent folder? apps

Creating top-10-movies...
  .gitignore
  README.md
  package.json
  src/globals.css
  src/index.html

Done.

What to do next?
----------------

# Install newly added dependencies
npm install

# Run the website to make sure it works
npm run dev

# Point your browser to http://localhost:7777 to make sure the app runs.
```

Before running the suggested next steps, change the port of the site to 7778, so
that it does not conflict with `movie-magic-website`. To do this, make a
one-line change in `/apps/top-10-movies/package.json`:

```diff title="/apps/top-10-movies/package.json"
...
-   "dev": "serve -p 7777 src"
+   "dev": "serve -p 7778 src"
...
```

Run the following commands in the root of the repository:

```shell
npm run build
npm run dev
```

Point your browser to `http://localhost:7778`. You should now see the "Top 10
Movies" website. Nice!

Delete the `/apps/top-10-movies` folder as this was created just for the final
test.

## Commit your code

```shell
# Commit
git add .
git commit -m "feat: add instant-sites plugin and simple-website generator"
```

Congratulations! You have now learned how to write Code Shaper plugins and
generators.
