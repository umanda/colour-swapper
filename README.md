# Colour Swapper

## JavaScript color swaping 

`colour-swapper` is a compact and efficient JavaScript library designed for color manipulation and conversion, leveraging the capabilities of tinycolor2. 

This library simplifies the process of converting RGB colors to their grayscale equivalents, allowing developers to easily transform individual colors or entire color palettes to their grayscale versions. 

Additionally, colour-swapper offers functionality to find the closest color value within a given palette, providing a convenient solution for color matching and palette optimization.

## Uasge 

      npm install colour-swapper

1. Convert RBG to Graytone

   ```js
   import grayscale from "colour-swapper";
   const inputColor = '#008000';
   const expectedOutput = '#404040';
   const result = grayscale(inputColor);
   ```
2. Swap RBG colors based on given colors

   ```js
   import colorswap from "colour-swapper";
   const colorPallet = ['#fc5185','#364f6b','#43dde6','#f0f0f0'];
   const inputColors = ['#ffff00' ,'#ffa500'];
   const result = colorswap(inputColors, coloPallet);
   ```