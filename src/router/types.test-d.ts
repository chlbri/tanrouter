import { concatPaths } from './functions';
import type { ResolveParams } from './types';

// #region concatPaths
expectTypeOf(concatPaths('', '')).toEqualTypeOf<'/'>();
expectTypeOf<'/'>(concatPaths('/', '')).toEqualTypeOf<'/'>();
expectTypeOf<'/'>(concatPaths('/', '/')).toEqualTypeOf<'/'>();
expectTypeOf<'/'>(concatPaths('/ ', '/')).toEqualTypeOf<'/'>();
expectTypeOf<'/'>(concatPaths('/', ' /')).toEqualTypeOf<'/'>();
expectTypeOf<'/'>(concatPaths(' /', ' / '));
expectTypeOf(concatPaths('/', 'artist')).toEqualTypeOf<'/artist'>();

expectTypeOf(
  concatPaths('first', 'second'),
).toEqualTypeOf<'/first/second'>();

expectTypeOf(
  concatPaths('first/second/third/', '/fourth'),
).toEqualTypeOf<'/first/second/third/fourth'>();
// #endregion

// #region ResolveParams
declare const tt1: ResolveParams<'first', 'second'>;
expectTypeOf(tt1).toEqualTypeOf<{}>();

declare const tt2: ResolveParams<
  'first/$secondId/$thirdId',
  'fourth/$fifthId'
>;
expectTypeOf(tt2).toMatchTypeOf<{}>();
expectTypeOf(tt2).not.toEqualTypeOf<{}>();
expectTypeOf(tt2).toEqualTypeOf<{
  secondId: string;
  thirdId: string;
  fifthId: string;
}>();
// #endregion
