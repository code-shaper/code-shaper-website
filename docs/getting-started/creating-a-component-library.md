---
sidebar_position: 3
---

# Creating a component library

By convention, libraries are created in the **packages** directory. Let's create
one there.

## Create a React library

```shell
npx shaper
? Which plugin would you like to run? React
? Which generator would you like to run? react-library
? Library name? ui-lib
? Parent directory? packages
? Package name used for publishing? @movie-magic/ui-lib
```

Since we will develop components in this library using Storybook, add it as a
dependency in Storybook.

```json title="apps/movie-magic-storybook/package.json"
  "dependencies": {
    // highlight-next-line
    "@movie-magic/ui-lib": "*",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
```

Now execute the following commands to install dependencies and commit all
changes:

```shell
npm install

# Commit
git add .
git commit -m "chore: add ui-lib"
```

## Add a component

Now let's add a button component to `ui-lib`.

```shell
npx shaper
? Which plugin would you like to run? React
? Which generator would you like to run? component
? Component name? Button
? Which workspace should this go to? packages/ui-lib
? Parent directory within workspace? src/components/Button

Creating Button...
```

:::tip Parent directory within workspace?

Whenever Code Shaper asks you for the parent directory of a component, it gives
you the default location as `src/components/ComponentName` (see above). If you
are good with this location, just hit Enter - no need to type anything. If you
want to override that location, just type the preferred pathname and hit Enter.
This gives you full control over where components are created.

:::

A placeholder `Button` component has been created for you at
`packages/ui-lib/src/components/Button/Button.tsx`. Also a placeholder Storybook
story has been created. Let's implement the button interactively using
Storybook.

```shell
npm run dev
```

This automatically opens a browser window showing Storybook. If not, open your
browser and point it to `http://localhost:6006`. Storybook shows a placeholder
implementation of the button. However, it does not look like a button at all.
It's simply a `<div>` with some text.

![Placeholder Button](./img/placeholder-button.png)

Before implementing the button, let's add some css styles provided by the React
plugin to Storybook. Edit `apps/movie-magic-storybook/.storybook/preview.tsx` as
follows:

```tsx
// Import any required css here
// highlight-start
// Example: <--- delete this line
// import '@movie-magic/ui-lib/src/styles/main.css'; <--- uncomment this
// highlight-end

const preview: Preview = {
  ...
};
```

Then uncomment the last block in
`apps/movie-magic-storybook/.storybook/preview-head.html` to download the
_Inter_ font required by the CSS.

```html
<!--
  Use this file to add any extra elements to the head of your
  Storybook preview iframe.
-->

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
/>
```

You should immediately see the change in Storybook.

Finally, overwrite the code in `Button.tsx` with the real implementation of the
button. Note that `Button` has a `variant` property with 3 possible values:
`default` , `primary` & `secondary`.

```tsx title="packages/ui-lib/src/components/Button/Button.tsx"
import { clsx } from 'clsx';
import type * as React from 'react';

export const buttonVariants = ['default', 'primary', 'secondary'] as const;
export type ButtonVariant = typeof buttonVariants[number];

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const DefaultButtonProps = {
  variant: 'default',
} as const;

// ---------- Style Mappings ----------
const baseStyles = 'button button--contained button--small';

const variantStyles: Record<ButtonVariant, string> = {
  default: 'button--contained-default',
  primary: 'button--contained-primary',
  secondary: 'button--contained-secondary',
} as const;
// ------------------------------------

export function Button({
  className,
  variant = DefaultButtonProps.variant,
  children,
  ...props
}: ButtonProps) {
  const styles = clsx(className, baseStyles, variantStyles[variant]);

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
```

You will notice that Storybook is now showing the default button implementation.

## Implement a Storybook story

Modify the placeholder Button story to demonstrate all of its variations. Simply
overwrite `Button.stories.tsx` with the following code:

```tsx title="packages/ui-lib/src/components/Button/Button.stories.tsx"
import { Button, buttonVariants, DefaultButtonProps } from './Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    className: {
      description: 'Additional style to apply',
    },
    variant: {
      description: 'The variant to use',
      control: 'radio',
      options: buttonVariants,
      table: {
        defaultValue: { summary: DefaultButtonProps.variant },
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: 'Button',
  },
} satisfies Story;

export const Variants = {
  render: () => (
    <div>
      {buttonVariants.map((variant) => (
        <Button className="mr-2" key={variant} variant={variant}>
          Button
        </Button>
      ))}
    </div>
  ),
} satisfies Story;
```

The snapshot below shows the updated Storybook interface. Notice that you can
interactively change button props and see how the button behaves. Once you are
satisfied with the implementation, move on to implement unit tests for the
button.

![Final Button Implementation](./img/final-button-implementation.png)

## Implement unit tests

Unit tests are important to automate the testing of our components. They also
serve as documentation for the component's requirements (hence they are also
called specification files or specs). Finally, they are incredibly useful to
ensure that future code changes don't break the component.

Modify the placeholder Button test to exercise its requirements. Simply
overwrite `Button.test.tsx` with the following code:

```tsx title="packages/ui-lib/src/components/Button/Button.test.tsx"
import { Button, buttonVariants } from './Button';
import { render } from '../../test/test-utils';

describe('<Button />', () => {
  it('should render correct default properties', () => {
    const { asFragment } = render(<Button>Submit</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correct variants', () => {
    const { asFragment } = render(
      <div>
        {buttonVariants.map((variant) => (
          <Button key={variant} variant={variant}>
            Submit
          </Button>
        ))}
      </div>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow to add a class using className prop', () => {
    const { asFragment } = render(<Button className="ml-2">Submit</Button>);
    expect(asFragment()).toMatchSnapshot();
  });
});
```

Run the tests from the repo's root directory:

```shell
npm test

> movie-magic@0.0.1 test
> turbo run test

• Packages in scope: @movie-magic/movie-magic-storybook, @movie-magic/ui-lib, eslint-config-custom, jest-config-custom, typescript-config-custom
• Running test in 5 packages
• Remote caching disabled
@movie-magic/ui-lib:test: cache miss, executing 4a56e6d92e7660a5
@movie-magic/ui-lib:test:
@movie-magic/ui-lib:test: > @movie-magic/ui-lib@0.0.1 test
@movie-magic/ui-lib:test: > jest --coverage
@movie-magic/ui-lib:test:
@movie-magic/ui-lib:test: PASS src/components/Button/Button.test.tsx
@movie-magic/ui-lib:test:  › 3 snapshots written.
@movie-magic/ui-lib:test: ------------|---------|----------|---------|---------|-------------------
@movie-magic/ui-lib:test: File        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
@movie-magic/ui-lib:test: ------------|---------|----------|---------|---------|-------------------
@movie-magic/ui-lib:test: All files   |     100 |      100 |     100 |     100 |
@movie-magic/ui-lib:test:  Button.tsx |     100 |      100 |     100 |     100 |
@movie-magic/ui-lib:test: ------------|---------|----------|---------|---------|-------------------
@movie-magic/ui-lib:test:
@movie-magic/ui-lib:test: Snapshot Summary
@movie-magic/ui-lib:test:  › 3 snapshots written from 1 test suite.
@movie-magic/ui-lib:test:
@movie-magic/ui-lib:test: Test Suites: 1 passed, 1 total
@movie-magic/ui-lib:test: Tests:       3 passed, 3 total
@movie-magic/ui-lib:test: Snapshots:   3 written, 3 total
@movie-magic/ui-lib:test: Time:        1.751 s, estimated 2 s
@movie-magic/ui-lib:test: Ran all test suites.
```

## Export the component

Now that the `Button` is fully tested, let's export it from our package. Add the
following line to `src/index.ts`:

```tsx title="packages/ui-lib/src/index.ts"
export * from './components/Button';
```

## Commit your code

We are now done with our button implementation. Let's commit the code.

```
# Commit
git add .
git commit -m "feat: add button component"
```

We are now ready to create our first web app using Code Shaper. Navigate to
[Creating an application](./creating-an-application.md).
