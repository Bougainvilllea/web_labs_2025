type RGBColor = [number, number, number];

enum ColorName {
  RED = 'Красный',
  GREEN = 'Зеленый',
  BLUE = 'Синий',
  WHITE = 'Белый',
  BLACK = 'Черный'
}

function rgbToHex(rgb: RGBColor): string {
  return `#${rgb.map(c => {
    const hex = Math.max(0, Math.min(255, c)).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('').toUpperCase()}`;
}

function getColorInfo(colorName: ColorName): { rgb: RGBColor; hex: string } {
  switch (colorName) {
    case ColorName.RED:
      return { rgb: [255, 0, 0], hex: rgbToHex([255, 0, 0]) };
    case ColorName.GREEN:
      return { rgb: [0, 255, 0], hex: rgbToHex([0, 255, 0]) };
    case ColorName.BLUE:
      return { rgb: [0, 0, 255], hex: rgbToHex([0, 0, 255]) };
    case ColorName.WHITE:
      return { rgb: [255, 255, 255], hex: rgbToHex([255, 255, 255]) };
    case ColorName.BLACK:
      return { rgb: [0, 0, 0], hex: rgbToHex([0, 0, 0]) };
    default:
      throw new Error('Неизвестный цвет');
  }
}

const redInfo = getColorInfo(ColorName.RED);
console.log(`Цвет: ${ColorName.RED}`);
console.log(`RGB: [${redInfo.rgb}]`);
console.log(`HEX: ${redInfo.hex}`);