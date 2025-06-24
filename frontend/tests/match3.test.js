const { findMatches } = require('../src/utils/match3');

describe('findMatches', () => {
  test('detects horizontal matches', () => {
    const board = [
      ['a', 'a', 'a'],
      ['b', 'c', 'd'],
      ['e', 'f', 'g'],
    ];
    const result = findMatches(board);
    expect(result).toContainEqual({ x: 0, y: 0 });
    expect(result).toContainEqual({ x: 1, y: 0 });
    expect(result).toContainEqual({ x: 2, y: 0 });
  });

  test('detects vertical matches', () => {
    const board = [
      ['a', 'b', 'c'],
      ['a', 'd', 'e'],
      ['a', 'f', 'g'],
    ];
    const result = findMatches(board);
    expect(result).toContainEqual({ x: 0, y: 0 });
    expect(result).toContainEqual({ x: 0, y: 1 });
    expect(result).toContainEqual({ x: 0, y: 2 });
  });

  test('returns empty when no matches', () => {
    const board = [
      ['a', 'b', 'c'],
      ['d', 'e', 'f'],
      ['g', 'h', 'i'],
    ];
    expect(findMatches(board)).toEqual([]);
  });
});
