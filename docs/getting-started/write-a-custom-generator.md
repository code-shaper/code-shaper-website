---
sidebar_position: 5
---

# Write a custom generator

As mentioned in the [Overview](./overview.md) section, Code Shaper itself is
unopinionated about the technologies you use, however plugins usually are. You
can choose from the many off-the-shelf plugins designed to work with specific
technologies or roll your own to fit your unique needs. In this section, we will
explore writing our own plugin to use frameworks and patterns that we prefer.

## Use case

In our Movie Magic application, we used a `fetch`-based hook for fetching
movies. A more opinionated approach would be to use
[TanStack Query](https://tanstack.com/query) and
[Axios](https://axios-http.com/) for this. Let's write a plugin to generate
fetch hooks based on these libraries.

## Install TanStack Query and Axios

Start by adding TanStack Query and Axios to movie-magic. Run the following
command in the repository root:

```shell
npm install axios @tanstack/react-query --workspace @movie-magic/movie-magic
```

:::tip Using workspaces

Never add a package to a workspace by changing your working directory to that
workspace. This will create a package-lock.json file at the workspace level and
confuse npm Workspaces. The right way to add a package is to run **npm install**
from the root of the repository and specify the **--workspace** option.

:::

Now add react-query's `QueryClientProvider` as a global provider in the
application's component tree. Edit `main.tsx` as follows.

```tsx title="apps/movie-magic/src/main.tsx"
import { App } from './App';
// highlight-next-line
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/main.css';

// highlight-start
// Create a react-query client
const queryClient = new QueryClient();
// highlight-end

// Start mock service worker in dev environment
async function startMockServiceWorker() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    await worker.start();
    worker.printHandlers();
  }
}

startMockServiceWorker()
  .then(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const root = createRoot(document.getElementById('root')!);
    root.render(
      <React.StrictMode>
        // highlight-next-line
        <QueryClientProvider client={queryClient}>
          <Router>
            <App />
          </Router>
          // highlight-next-line
        </QueryClientProvider>
      </React.StrictMode>
    );
    return true;
  })
  .catch((error) => {
    console.log(error);
  });
```

## Modify useMovies to the desired pattern

The best way to write a generator is to first write out an example of what we
want to generate. We can then convert this example into a generic template that
can be used repeatedly. So let's start by modifying `useMovies` to use
react-query and axios.

Replace the code in `useMovies.ts` with the following:

```ts title="apps/movie-magic/src/pages/HomePage/useMovies.ts"
import type { Movie } from '@/models';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function fetchMovies(): Promise<Movie[]> {
  const apiUrl = import.meta.env.VITE_API_URL;
  const resMovies = await axios.get<Movie[]>(`${apiUrl}/top-10-movies`);

  return resMovies.data;
}

export function useMovies() {
  return useQuery(['movies'], fetchMovies);
}
```

## Modify MovieListContainer

Modify `MovieListContainer` to use `useMovies` correctly. Replace its contents
with the following:

```tsx title="apps/movie-magic/src/pages/HomePage/MovieListContainer.tsx"
import { useMovies } from './useMovies';
import { MovieList } from '@/components/MovieList';

export function MovieListContainer() {
  const { data, error, isLoading } = useMovies();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error !== undefined && error !== null) {
    return (
      <h1 className="mb-2 text-2xl font-semibold">
        Error:
        {error instanceof Error ? error.message : 'Something went wrong'}
      </h1>
    );
  }

  if (!data) {
    return <h1 className="mb-2 text-2xl font-semibold">No movies found</h1>;
  }

  return (
    <>
      <h1 className="mb-2 text-2xl font-semibold">Top 10 Movies Of All Time</h1>
      <MovieList movies={data} />
    </>
  );
}
```

Run the app:

```shell
npm run dev
```

Point your browser to `http://localhost:3000`. It should look exactly the same
as before. The only difference is the implementation of the `useMovies` hook.

## Commit your code

```shell
# Commit
git add .
git commit -m "chore: refactor use-movies hook to use tanstack query"
```

## Create a plugin + generator

Now that we have `useMovies` working again, we know the pattern that needs to be
generated. We will have to ask the user a few questions so that we can do proper
substitutions in our templates.

:::tip Terminology

A plugin can contain one or more generators. For example, a React plugin can
generate full react applications, components, contexts and many other artifacts.

:::

Let's start by generating a new plugin. We will name the plugin `react-patterns`
because it's going to house our custom React patterns.

```shell
# Run shaper in the repo's root directory
npx shaper
? Which plugin would you like to run? Plugin
? Which generator would you like to run? plugin
? Plugin name? react-patterns
? Parent directory? plugins
? Package name used for publishing? @movie-magic/react-patterns
```

Now the plugin is ready, but Code Shaper needs to load it dynamically. To make
this work, add the `react-patterns` plugin as a devDependency in the root
`package.json` file of your repo.

```json title="package.json"
{
  ...
  "devDependencies": {
    "@code-shaper/plugin": "latest",
    "@code-shaper/react": "latest",
    "@code-shaper/shaper-utils": "latest",
    "@commitlint/cz-commitlint": "^17.5.0",
    // highlight-next-line
    "@movie-magic/react-patterns": "*",
    "@typescript-eslint/eslint-plugin": "^5.60.0",
    ...
  },
  ...
}
```

Install dependencies and run shaper to verify that the plugin shows up.

```shell
# In the root directory, run:
npm install

# Run a build
npm run build

# Run shaper to verify that the plugin shows up
npx shaper
? Which plugin would you like to run? React Patterns
? Which generator would you like to run? <press control-c - no generators yet>
```

Now let's run shaper again to generate a new generator.

```shell
npx shaper
? Which plugin would you like to run? Plugin
? Which generator would you like to run? generator
? Generator name? fetch-hook
? Which plugin should this go under? plugins/react-patterns
```

Register the `fetch-hook` generator in your `react-patterns` plugin by editing
the `index.ts` file of your plugin. See highlighted lines below.

```ts title="plugins/react-patterns/src/index.ts"
import {
  Options,
  Plugin,
  Generator,
  GeneratorMap,
  selectGenerator,
} from '@code-shaper/shaper-utils';
// highlight-next-line
import { fetchHookGenerator } from './fetchHookGenerator';

const generators: GeneratorMap = {};

function registerGenerator(generator: Generator) {
  const { id } = generator;
  generators[id] = generator;
}

// ----- Register Generators Here -----
// highlight-next-line
registerGenerator(fetchHookGenerator);

const reactPatternsPlugin: Plugin = {
  id: '@movie-magic/react-patterns',
  name: 'React Patterns',
  description: 'generates react-patterns artifacts',
  run: async (inputOptions: Options) => {
    const generator = await selectGenerator(generators, inputOptions);
    if (!generator) {
      return Promise.resolve();
    }

    return generator.generate(process.cwd(), inputOptions);
  },
};

export default reactPatternsPlugin;
```

Rebuild the generator by running the following command in the root directory.

```shell
npm run build
```

Now run the generator. This is just a trial run. It will not generate anything,
so feel free to experiment.

```shell
npx shaper
? Which plugin would you like to run? React Patterns
? Which generator would you like to run? fetch-hook
? Fetch Hook name? useMovies
? Parent directory? apps/movie-magic/src/pages/HomePage

Creating useMovies...

TODO: Run FileUtils.transformFiles() with following arguments:
srcDir: plugins/react-patterns/dist/fetchHookGenerator/templates
dstDir: apps/movie-magic/src/pages/HomePage/use-movies

options available for this generator:
{
  "itemName": "useMovies",
  "parentDir": "apps/movie-magic/src/pages/HomePage",
  "itemNameKebabCase": "use-movies",
  "itemNameCamelCase": "useMovies",
  "itemNamePascalCase": "UseMovies",
  "itemNameCapitalCase": "Use Movies"
}
```

As you can see, the basic infrastructure for your generator is ready. You may
need to tweak the questions a bit, and you will need to write a template. The
last part of the output above shows some _options_ available to your templates.
Templates use these options as _template variables_. We will use the terms
_options_ and _template variables_ interchangeably. You can tweak them and/or
add more.

## Tweak the generator

Let's first tweak the generator to customize the questions and the options. See
the highlighted lines below:

```ts title="plugins/react-patterns/src/fetchHookGenerator/index.ts"
// highlight-next-line
import { cc, FileUtils, Generator, Options } from '@code-shaper/shaper-utils';
import { prompt, registerPrompt } from 'inquirer';
// @ts-ignore
import inquirerDirectory from 'inquirer-directory';
import path from 'path';

// Register inquirer prompts
registerPrompt('directory', inquirerDirectory);

export const fetchHookGenerator: Generator = {
  id: 'fetch-hook',
  name: 'Fetch Hook',
  // highlight-next-line
  description: 'generates a fetch hook',
  generate: generateFetchHook,
};

async function generateFetchHook(rootDir: string, inputOptions: Options) {
  const questions = [
    {
      type: 'input',
      name: 'itemName',
      // highlight-next-line
      message: 'What are you fetching? (e.g. "Movie" or "Movies")',
    },
    // highlight-start
    {
      type: 'input',
      name: 'returnType',
      message: 'What is the return type? (e.g. "Movie[]")',
    },
    // highlight-end
    {
      type: 'directory',
      name: 'parentDir',
      pageSize: 20,
      // highlight-next-line
      message: 'Parent directory?',
      basePath: rootDir,
    },
  ];

  const options = await prompt(questions, inputOptions);
  const { itemName, parentDir } = options;

  // --------------------------------------------------------------------------
  // Add more options for code generation here
  // --------------------------------------------------------------------------
  // highlight-start
  // Assume that the item in this generator is the thing we are fetching.
  // Example: itemName = Movies
  // highlight-end

  // highlight-next-line
  // itemNameKebabCase = movies
  options['itemNameKebabCase'] = cc.kebabCase(itemName);

  // highlight-next-line
  // itemNameCamelCase = movies
  options['itemNameCamelCase'] = cc.camelCase(itemName);

  // highlight-next-line
  // itemNamePascalCase = Movies
  options['itemNamePascalCase'] = cc.pascalCase(itemName);

  // highlight-next-line
  // itemNameCapitalCase = Movies
  options['itemNameCapitalCase'] = cc.capitalCase(itemName);

  // highlight-start
  const { itemNamePascalCase } = options;

  // filename = useMovies (then add extension)
  options['filename'] = `use${itemNamePascalCase}`;

  // hookName = useMovies
  options['hookName'] = `use${itemNamePascalCase}`;
  // highlight-end
  // --------------------------------------------------------------------------

  // highlight-start
  const { hookName } = options;

  const srcDir = path.join(__dirname, 'templates');
  const dstDir = parentDir;

  console.log();
  console.log(`Creating ${hookName}...`);

  // Create the hook
  FileUtils.transformFiles(srcDir, dstDir, options);

  console.log();
  console.log('Done.');
  console.log();
  console.log(`You can start using ${hookName} in your app`);
  console.log();
  // highlight-end

  return Promise.resolve();
}
```

## Write a template

Now that the generator is creating a good set of options, we can write a
template to generate the fetch hook. Start with `useMovies.ts` and generalize it
to fetch any type of object.

:::tip Templates

In this example we have only one template. However, in more complex scenarios we
may have multiple templates spread over a nested tree structure. Code Shaper can
handle such scenarios without breaking a sweat!

:::

Create a folder called `templates` under the `fetchHookGenerator` and copy
`useMovies.ts` under it. Specifically, copy
`apps/movie-magic/src/pages/HomePage/useMovies.ts` to
`plugins/react-patterns/src/fetchHookGenerator/templates/useMovies.ts`.

Now rename this file to `[filename].ts.ejs.t`. Why? Remember that our generator
outputs a `filename` option. When the generator copies this file over to the
destination, it will replace the `[filename]` part with that option. Moreover,
the `.ejs.t` suffix tells the generator to do option substitutions before
copying the file over. The suffix will be removed. What does this all mean? If
the value of the `filename` option is `useMovies`, the file created at the
destination will be called `useMovies.ts` - which is exactly what we want.

:::tip Static Templates

If you want to copy a template without any option substitutions, do not add the
`.ejs.t` suffix to it. For example, a file called `favicon.ico` will be copied
as is, without any substitutions.

:::

Finally, edit `[filename].ts.ejs.t` to turn it into a template. Here's the final
content:

```
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function fetch<%= itemNamePascalCase %>(): Promise<<%= returnType %>> {
  const apiUrl = import.meta.env.VITE_API_URL;
  const res<%= itemNamePascalCase %> = await axios.get<<%= returnType %>>(`${apiUrl}/<%= itemNameKebabCase %>`);

  return res<%= itemNamePascalCase %>.data;
}

export function <%= hookName %>() {
  return useQuery(['<%= itemNameCamelCase %>'], fetch<%= itemNamePascalCase %>);
}
```

## Test the generator

Let's write a test for our `fetchHookGenerator`. A placeholder test is already
provided for us. Edit it to add the generator specific options:

```ts title="plugins/react-patterns/src/fetchHookGenerator/fetchHookGenerator.test.ts"
import path from 'path';
import { FileUtils } from '@code-shaper/shaper-utils';
import { fetchHookGenerator } from './index';

describe('fetchHookGenerator', () => {
  test('should create a new fetchHook from templates', async () => {
    // suppress console logs
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, 'log').mockImplementation(() => {});

    // Delete test-output if it exists
    const testOutput = path.join(__dirname, 'test-output');
    FileUtils.deletePath(testOutput);

    // Run the generator
    await fetchHookGenerator.generate(testOutput, {
      // highlight-start
      itemName: 'Movies',
      returnType: 'Movie[]',
      parentDir: path.join(testOutput),
      // highlight-end
    });

    // Compare test-output with expected-output
    const expectedOutput = path.join(__dirname, 'expected-output');
    const result = FileUtils.compareDirectories(expectedOutput, testOutput);
    expect(result.same).toBe(true);

    // restore console logs
    jest.restoreAllMocks();
  });
});
```

Build & test:

```shell
npm run build
npm test
```

The test generates its output at
`plugins/react-patterns/src/fetchHookGenerator/test-output/useMovies`. However,
it fails because there is no `expected-output` folder to compare against.

Let's first make sure that the generated output in `useMovies.ts` matches the
code shown below:

```ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function fetchMovies(): Promise<Movie[]> {
  const apiUrl = import.meta.env.VITE_API_URL;
  const resMovies = await axios.get<Movie[]>(`${apiUrl}/movies`);

  return resMovies.data;
}

export function useMovies() {
  return useQuery(['movies'], fetchMovies);
}
```

Assuming the code matches, rename the `test-output` folder to `expected-output`.
We are essentially capturing a snapshot of what the output should look like. Now
rerun the test.

```shell
npm test
```

It should pass this time because `test-output` should match `expected-output`
exactly.

## Generate useMovies

Now let's generate the real `useMovies` hook in the app. Delete the existing
`useMovies` hook that we handwrote
(`apps/movie-magic/src/pages/HomePage/useMovies.ts`). Regenerate it using our
new fetch-hook generator:

```shell
npx shaper
? Which plugin would you like to run? React Patterns
? Which generator would you like to run? fetch-hook
? What are you fetching? Movies
? What is the return type? Movie[]
? Parent directory? apps/movie-magic/src/pages/HomePage

Creating useMovies...
  useMovies.ts

Done.

You can start using useMovies in your app
```

Here's the generated output, along with a couple of minor tweaks needed to make
it work. That's completely fine - we need to balance the effort vs. the
perfection we want to achieve!

```ts
// highlight-next-line
import type { Movie } from '@/models';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function fetchMovies(): Promise<Movie[]> {
  const apiUrl = import.meta.env.VITE_API_URL;
  // highlight-next-line
  const resMovies = await axios.get<Movie[]>(`${apiUrl}/top-10-movies`);

  return resMovies.data;
}

export function useMovies() {
  return useQuery(['movies'], fetchMovies);
}
```

Run the app:

```shell
npm run dev
```

Point your browser to `http://localhost:3000`. It should look exactly the same
as before. The only difference is that the `useMovies` hook is now
auto-generated.

## Commit your code

```shell
# Commit
git add .
git commit -m "feat: add react-patterns plugin and fetch-hook generator"
```

Congratulations! You have now learned how to write Code Shaper plugins and
generators.
