import tinycolor from "tinycolor2";

/**
 * Converts a color to its grayscale equivalent.
 * 
 * @param color The color to be converted to grayscale in any valid CSS color format.
 * @returns The hexadecimal string of the grayscale color.
 */
const grayscale = (color: string): string => {

  // Extract the hue and saturation from the original color in HSL format
  const extractHue = tinycolor(color).toHsl().h;
  const extractSaturation = tinycolor(color).toHsl().s;

  // Create a new HSL color object from the original color
  const hslColor = tinycolor(color).toHsl();
  
  // Set the hue of the new HSL color object (though it's redundant as it's unchanged)
  hslColor.h = Number(extractHue);

  // Check if the saturation value is not null
  if (extractSaturation !== null) {
      // Adjust the saturation by converting it to a percentage (0-100 scale)
      hslColor.s = Number(extractSaturation) / 100;
  }

  // Convert the modified HSL object back to a hexadecimal color string
  const hclToHex = tinycolor(hslColor).toHexString();

  // Convert the hexadecimal color to its grayscale equivalent and return it
  const grayTone = tinycolor(hclToHex).greyscale().toHexString();

  return grayTone; 
};

export default grayscale;
