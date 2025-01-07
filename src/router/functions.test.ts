import { createTests } from '@bemedev/vitest-extended';
import { concatPaths, removeFirstChar, removeLastChar } from './functions';

describe('#1 => RemoveLastChar', () => {
  const useTests = createTests(removeLastChar);

  useTests(
    ['Empty', [''], ''],
    ['One "/"', ['/'], ''],
    ['One "a"', ['a'], ''],
    ['Two "av"', ['av'], 'a'],
    ['Many "Lorem ipsum"', ['Lorem ipsum'], 'Lorem ipsu'],
  );
});

describe('#2 => RemoveFirstChar', () => {
  const useTests = createTests(removeFirstChar);

  useTests(
    ['Empty', [''], ''],
    ['One "/"', ['/'], ''],
    ['One "a"', ['a'], ''],
    ['Two "av"', ['av'], 'v'],
    ['Many "Lorem ipsum"', ['Lorem ipsum'], 'orem ipsum'],
  );
});

describe('#3 => concatPaths', () => {
  const useTests = createTests(concatPaths);

  useTests(
    ['Two empty', ['', ''], '/'],
    ['s1="/", s2=""', ['/', ''], '/'],
    ['s1="/", s2="/"', ['/', '/'], '/'],
    ['s1="first", s2="second"', ['first', 'second'], '/first/second'],
    ['s1="/first/", s2="/second"', ['/first', '/second'], '/first/second'],
    [
      's1="/first/second/third", s2="/fourth"',
      ['/first/second/third', '/fourth'],
      '/first/second/third/fourth',
    ],
    [
      's1="first/second/third/", s2="/fourth"',
      ['first/second/third/', '/fourth'],
      '/first/second/third/fourth',
    ],
  );
});
