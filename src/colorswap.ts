import tinycolor from "tinycolor2";
import { getNearestColor, getShade } from "./color-tone-helper";

interface Color {
  hex: any | undefined;
  hsl: any;
  index: number;
  isMostNearer: boolean;
  alpha: string; // Added to store alpha values
}

interface PaletteColor {
  hex: any | undefined;
  hsl: any;
  index: number;
  fillColorIndexes: { index: number; distance: number }[];
}

const colorswap = (colors: string[], palette: string[]): string[] => {
  // Prepare objects with initial values
  const fillColors: Color[] = colors.map((c, index): Color => {
    const colorObj = tinycolor(c);
    // Correctly extract and format the alpha value as a two-digit hex string
    let alpha = Math.round(colorObj.getAlpha() * 255).toString(16);
    alpha = alpha.length === 1 ? '0' + alpha : alpha; // Ensure two digits
    return {
      hsl: tinycolor(c).toHsl(),
      index, // Original index
      isMostNearer: false,
      hex: undefined,
      alpha: colorObj.getAlpha() === 1 ? '' : alpha, // Store alpha hex, if fully opaque, store empty string
    };
  });
  const paletteColors: PaletteColor[] = palette.map(
    (c, index): PaletteColor => {
      return {
        hsl: tinycolor(c).toHsl(),
        index,
        fillColorIndexes: [], // Array of nearest fill color's indexes
        hex: undefined,
      };
    }
  );

  // Find nearest palette color for each fill colors
  fillColors.forEach((fColor, index) => {
    const nearestColorObj = getNearestColor(
      paletteColors.map((c) => c.hsl),
      fColor.hsl
    );

    // Push this fill color to this nearest palette color
    const nearestPaletteColor = paletteColors[nearestColorObj.index];
    nearestPaletteColor.fillColorIndexes.push({
      index,
      distance: nearestColorObj.distance,
    });
  });

  // Sort the `fillColorIndexes` by their distances in ASC order
  // so that the first index will be the most nearest color
  paletteColors.forEach((pColor) => {
    pColor.fillColorIndexes = pColor.fillColorIndexes.sort(
      (a, b) => a.distance - b.distance
    );

    if (pColor.fillColorIndexes.length) {
      // Flag first index to the most nearest
      fillColors[pColor.fillColorIndexes[0].index].isMostNearer = true;
    }
  });

  // Find un-used palettes and use them by the nearest fill color which is not
  // most nearest color to the other palette color (remaining fill colors)
  paletteColors
    .filter((c) => !c.fillColorIndexes.length)
    .forEach((pColor) => {
      const remainingFillColors = fillColors.filter((c) => !c.isMostNearer);
      if (remainingFillColors.length) {
        const nearestObj = getNearestColor(
          remainingFillColors.map((c) => c.hex),
          pColor.hex
        );

        const nearestColor = remainingFillColors[nearestObj.index];
        const nearestFColor = fillColors[nearestColor.index];

        // Move this fill color index
        // a. remove from old palette
        paletteColors
          .filter((c) => c.fillColorIndexes.length)
          .forEach((pColor) => {
            if (
              pColor.fillColorIndexes
                .map((c) => c.index)
                .includes(nearestFColor.index)
            ) {
              pColor.fillColorIndexes = pColor.fillColorIndexes.filter(
                (c) => c.index !== nearestFColor.index
              );
            }
          });

        // b. push to the current palette
        pColor.fillColorIndexes.push({
          index: nearestFColor.index,
          distance: nearestObj.distance,
        });

        // Flag it to the most nearest
        fillColors[nearestFColor.index].isMostNearer = true;
      }
    });

  // Now palettes are having array of fill color indexes to where
  // it is going to apply
  paletteColors
    .filter((c) => c.fillColorIndexes.length) // case: could be empty if fill colors < palette colors
    .forEach((pColor) => {
      pColor.fillColorIndexes.forEach((fColor, index) => {
        // Direct replace palette color for the first index as it is the
        // most nearest fill color
        if (index === 0) {
          fillColors[fColor.index].hsl = pColor.hsl;
        } else {
          // Generate shade
          fillColors[fColor.index].hsl = getShade({
            paletteColors: paletteColors.map((c) => c.hsl), // Useful to generate shade for special colors
            paletteColor: pColor.hsl,
            fillColor: fillColors[fColor.index].hsl,
          });
        }
      });
    });

  // When converting back to hex, append the alpha values
  return fillColors.map((c) => tinycolor(c.hsl).toHexString() + c.alpha);
};

export default colorswap;
