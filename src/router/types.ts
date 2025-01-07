import type {
  Fn,
  NOmit,
  StringEndWith,
  StringStartWith,
} from '@bemedev/types';

import type {
  ResolveParams as _ResolveParams,
  AnyRouteMatch,
  createRoute,
  ParsedLocation,
} from '@tanstack/react-router';

import type { FC } from 'react';
import { z } from 'zod';

export type CreateRouteArgs = Parameters<typeof createRoute>[0];

export type StringStartDefault_F = Fn<[str: string, add: string], string>;

export type StringTrim<
  T extends string,
  Acc extends string = '',
  Separator extends string = ' ',
> = T extends `${infer Char}${infer Rest}`
  ? Char extends Separator
    ? StringTrim<Rest, Acc>
    : StringTrim<Rest, `${Acc}${Char}`>
  : T extends ''
    ? Acc
    : never;

type _ConcatPaths<
  S1 extends string,
  S2 extends string,
  S11 extends StringEndWith<StringTrim<S1>, '/'> = StringEndWith<
    StringTrim<S1>,
    '/'
  >,
  S22 extends StringStartWith<StringTrim<S2>, '/'> = StringStartWith<
    StringTrim<S2>,
    '/'
  >,
> = S11['response'] extends true
  ? S22['response'] extends true
    ? `${S11['full']}${S22['next']}`
    : `${S11['full']}${S22['full']}`
  : S22['response'] extends true
    ? `${S11['full']}${S22['next']}`
    : `${S11['full']}/${S22['full']}`;

export type ConcatPaths<
  S1 extends string,
  S2 extends string,
  R extends _ConcatPaths<S1, S2> = _ConcatPaths<S1, S2>,
  S0 extends StringStartWith<R, '/'>['response'] = StringStartWith<
    R,
    '/'
  >['response'],
> = S0 extends true ? R : `/${R}`;

export type ConcatPaths_F = <S1 extends string, S2 extends string>(
  s1: S1,
  s2: S2,
) => ConcatPaths<S1, S2>;

export type RemoveChar_F = Fn<[arg: string, remain?: number], string>;

export type ResolveParams<
  S1 extends string,
  S2 extends string,
> = _ResolveParams<ConcatPaths<S1, S2>>;

export type Cause = 'preload' | 'enter' | 'stay';

export type BeforeLoaderArgs<
  TPath extends string = '/',
  TParentPath extends string = '/',
  TContext extends object = object,
> = {
  abortController: AbortController;
  preload: boolean;
  params: ResolveParams<TParentPath, TPath>;
  cause: Cause;
  location: ParsedLocation;
  context: TContext;
};

export type LoaderArgs<
  TPath extends string = '/',
  TParentPath extends string = '/',
  TContext extends object = object,
  TSearchValidator = never,
> = NOmit<BeforeLoaderArgs<TPath, TParentPath, TContext>, 'params'> & {
  params: TSearchValidator extends z.AnyZodObject
    ? z.infer<TSearchValidator>
    : ResolveParams<TParentPath, TPath>;
};

export type Head_F<
  TPath extends string = '/',
  TParentPath extends string = '/',
  TLoaderData = any,
> = (args: {
  params: ResolveParams<TParentPath, TPath>;
  data: TLoaderData;
}) => {
  links?: AnyRouteMatch['links'];
  scripts?: AnyRouteMatch['scripts'];
  meta?: AnyRouteMatch['meta'];
};

// TODO: to remap
export type ChildRouter<
  TParentPath extends string = '/',
  TPath extends string = '/',
  TContext extends object = object,
  TSearchValidator = never,
  TLoaderData = any,
  TChildren extends ChildRouter<TParentPath>[] = never,
> = {
  parentPath: TParentPath;
  path: TPath;
  component: FC;
  errorComponent?: FC;
  notFoundComponent?: FC;
  pendingComponent?: FC;
  beforeLoad?: Fn<[BeforeLoaderArgs<TPath, TParentPath, TContext>], void>;
  load?: {
    validateSearch?: TSearchValidator;
    func: Fn<
      [LoaderArgs<TPath, TParentPath, TContext, TSearchValidator>],
      TLoaderData
    >;
  };
  head?: Head_F<TPath, TParentPath, TLoaderData>;
  children?: TChildren;
  headers?: (data: TLoaderData) => Record<string, string>;
} & Pick<
  CreateRouteArgs,
  | 'caseSensitive'
  | 'onError'
  | 'onCatch'
  | 'pendingMinMs'
  | 'pendingMs'
  | 'preload'
  | 'preloadGcTime'
  | 'preloadStaleTime'
  | 'ssr'
  | 'staticData'
  | 'staleTime'
  | 'wrapInSuspense'
>;

export type Router<
  TContext extends object = object,
  TSearchValidator = never,
  TLoaderData = any,
  TChildren extends ChildRouter<'/', '/'>[] = ChildRouter<'/', '/'>[],
> = {
  context?: (
    params: NOmit<BeforeLoaderArgs<'/', '/'>, 'context'>,
  ) => TContext;
} & ChildRouter<
  '/',
  '/',
  NoInfer<TContext>,
  TSearchValidator,
  TLoaderData,
  TChildren
>;
