import { describe, it, expect } from 'vitest'; // Update with the actual path
import colorswap from '../src/colorswap';

describe('colorswap', () => {
  it('should swap colors from inputColors with coloPallet', () => {
      const coloPallet = ['#fc5185','#364f6b','#43dde6','#f0f0f0'];
      const inputColors = ['#ffff00' ,'#ffa500'];
      const expectedOutput = ['#364f6b','#fc5185'];
      const inputColors2 = ['#008000'];
      const expectedOutput2 = ['#364f6b'];

      const inputColors3 = ['#ffff00BF' ,'#ffa50059'];
      const expectedOutput3 = ['#364f6bbf','#fc518559'];

      const result = colorswap(inputColors, coloPallet);
      const result2 = colorswap(inputColors2, coloPallet);
      const result3 = colorswap(inputColors3, coloPallet);
      expect(result).toEqual(expectedOutput);
      expect(result2).toEqual(expectedOutput2);
      expect(result3).toEqual(expectedOutput3);
  });
});