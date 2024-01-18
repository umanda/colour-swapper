import tinycolor from "tinycolor2";
type Color = {
  h: number;
  s: number;
  l: number;
  a: number | undefined;
};

type PaletteColors = Color[];

/**
 * Calculates and returns a shade color based on the given palette.
 *
 * @param {Color[]} paletteColors - Array of colors representing the color palette.
 * @param {Color} paletteColor - The specific color from the palette for which the shade is to be calculated.
 * @param {Color} fillColor - Base color to which the calculated shade properties will be applied.
 * @returns {Color} - The calculated shade color.
 */
export const getShade = ({
  paletteColors,
  paletteColor,
  fillColor,
}: {
  paletteColors: PaletteColors;
  paletteColor: Color;
  fillColor: Color;
}): Color => {
  // Initializing the shade color with the properties of the fillColor.
  const shade: Color = {
    ...fillColor,
  };

  // Special color cases:
  // White (l = 1), Black (l = 0), Grey (s = 0)

  // Handle the case when the palette color is white (l = 1)
  if (paletteColor.l === 1) {
    // Find non-special colors (not white, black, or grey) in the palette
    const nonSpecialColors = paletteColors.filter(
      (c) => !(c.l === 0 || c.l === 1 || c.s === 0)
    );

    // If non-special colors exist, replace the hue of the shade
    // with the hue of the nearest color in the palette.
    if (nonSpecialColors.length) {
      const nearestColor =
        nonSpecialColors[getNearestColor(nonSpecialColors, paletteColor).index];
      shade.h = nearestColor.h;
    } else {
      // If no non-special colors exist, set the saturation of the shade to zero.
      shade.s = 0;
    }
  }
  // Handle the cases when the palette color is grey (s = 0) or black (l = 0)
  else if (paletteColor.s === 0 || paletteColor.l === 0) {
    // Set the saturation of the shade to zero.
    shade.s = 0;
  }
  // Handle the case for non-special colors
  else {
    // Retain the hue from the palette color.
    shade.h = paletteColor.h;
  }

  return shade;
};

// Ensure to define the getNearestColor function with proper TypeScript typings.

export const getNearestColor = (colors: PaletteColors, color: Color) => {
  // Calculate distances for all given colors
  const distances = colors.map((c) =>
    getDistance({ colorX: color, colorY: c })
  );

  // Smallest distance
  const distance = Math.min.apply(Math, distances);
  return {
    distance,
    index: distances.indexOf(distance),
  };
};

/**
 * Calculates the Euclidean distance between two colors.
 *
 * This function first converts colors into their Cartesian coordinates,
 * then uses the Euclidean distance formula to calculate the distance
 * between these two points in a three-dimensional space.
 *
 * @param {string} colorX - The first color.
 * @param {string} colorY - The second color.
 * @returns {number} - The Euclidean distance between the two colors.
 */
const getDistance = ({
  colorX,
  colorY,
}: {
  colorX: Color;
  colorY: Color;
}): number => {
  // Cartesian coordinates of the two colors
  const cx = getCoordinates(colorX);
  const cy = getCoordinates(colorY);
  // Calculating the Euclidean distance between the two points
  return Math.hypot(cy.x - cx.x, cy.y - cx.y, cy.z - cx.z);
};

export const getCoordinates = (colorHSL: Color) => {
  // Using RGB color space
  const colorRGB = tinycolor(colorHSL).toRgb();

  return {
    x: colorRGB.r,
    y: colorRGB.g,
    z: colorRGB.b,
  };
};
