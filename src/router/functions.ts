import { t } from '@bemedev/types';
import type {
  ConcatPaths_F,
  RemoveChar_F,
  StringStartDefault_F,
} from './types';

export const removeLastChar: RemoveChar_F = (str, remain = 1) => {
  const out = str.slice(0, -remain);
  return out;
};
export const removeFirstChar: RemoveChar_F = (str, remain = 1) => {
  const out = str.substring(remain);
  return out;
};

export const addStringDefault: StringStartDefault_F = (str, add) => {
  const start = str.startsWith(add);
  if (start) return str;
  return `${add}${str}`;
};

export const concatPaths: ConcatPaths_F = (s1, s2) => {
  const _s1 = s1.trim();
  const _s2 = s2.trim();

  const empty1 = _s1 === '';
  const empty2 = _s2 === '';
  const empty = empty1 && empty2;
  const end1 = _s1.endsWith('/');
  const start2 = _s2.startsWith('/');

  let out = t.anify<any>();

  if (empty) {
    out = '/';
  }

  if (end1) {
    if (start2) {
      out = `${_s1}${removeFirstChar(_s2)}`;
    } else {
      out = `${_s1}${_s2}`;
    }
  } else {
    if (start2) {
      out = `${_s1}${_s2}`;
    } else {
      out = `${_s1}/${_s2}`;
    }
  }

  out = addStringDefault(out, '/');

  return out;
};
