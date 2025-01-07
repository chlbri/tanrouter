import {
  createRootRoute,
  createRoute,
  Outlet,
  ScrollRestoration,
  type ReactNode,
} from '@tanstack/react-router';
import type { FC } from 'react';

const RootComponent: FC = () => {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
};

export const rootRoute = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
  }),
  component: RootComponent,
  context: () => ({ val: 67 }),
});

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head></head>
      <body>
        <hr />
        {children}
        <ScrollRestoration />
      </body>
    </html>
  );
}

export const getParentRoute = () => rootRoute;

const component = () => (
  <div className="p-2">
    <h3>Hello from About!</h3>
  </div>
);

export const aboutRoute = createRoute({
  getParentRoute,
  path: '/about/$id',
  component,
  context: () => ({
    value: true,
  }),
  beforeLoad: () => {
    return true;
  },
  head: () => ({ scripts: [{ 'aria-atomic': true }] }),
  loader: ({ context }) => ({
    deps: context.value,

    ret: 'ret',
  }),
  // id: '/about',
  loaderDeps: () => ({ ert: 'ert' }),
  validateSearch: () => ({
    value: 56,
  }),
  // search: {
  //   middlewares: [() => ({ value: 'false' }), () => ({ value: 'false' })],
  // },
  headers: () => ({}),
});
