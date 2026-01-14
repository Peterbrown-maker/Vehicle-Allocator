import { describe, it, expect } from 'vitest';
import { calculateMinCars } from './calculateMinCars';

describe('calculateMinCars – examples', () => {
  it('Example 1', () => {
    expect(calculateMinCars([1,4,1], [1,5,1])).toBe(2);
  });

  it('Example 2', () => {
    expect(calculateMinCars([4,4,2,4], [5,5,2,5])).toBe(3);
  });

  it('Example 3', () => {
    expect(calculateMinCars([2,3,4,2], [2,5,7,2])).toBe(2);
  });
});
