import { describe, it, expect } from 'vitest'; // Update with the actual path
import grayscale from '../src/grayscale';

describe('grayscale function', () => {
  it('should convert #008000 to #404040', () => {
    const inputColor = '#008000';
    const expectedOutput = '#404040';
    const result = grayscale(inputColor);
    expect(result).toBe(expectedOutput);
  });
});