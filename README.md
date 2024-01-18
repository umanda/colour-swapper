# Colour Swapper

## JavaScript color swaping 

`colour-swapper` is a compact and efficient JavaScript library designed for color manipulation and conversion, leveraging the capabilities of tinycolor2. This library simplifies the process of converting RGB colors to their grayscale equivalents, allowing developers to easily transform individual colors or entire color palettes to their grayscale versions. Additionally, colour-swapper offers functionality to find the closest color value within a given palette, providing a convenient solution for color matching and palette optimization. Ideal for web developers and UI designers, this library integrates seamlessly into a variety of web-based projects, enhancing visual design and user interface development with its robust color processing features.

## Uasge 

      npm install colour-swapper

1. Conver RBG to Graytone

   ```js
   import grayscale from "colour-swapper";
   const inputColor = '#008000';
   const expectedOutput = '#404040';
   const result = grayscale(inputColor);
   ```