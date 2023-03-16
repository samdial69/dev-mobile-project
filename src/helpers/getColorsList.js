export const getColorsList = (colors) => {
    let colorsList = [];
    if (colors !== undefined && colors !== null) {
      if (colors.dominant !== undefined && colors.dominant !== null) {
        colorsList.push(colors.dominant.hex.substring(1));
      }
      if (colors.accent !== undefined && colors.accent !== null) {
        colorsList.push(colors.accent[0].hex.substring(1));
      }
      if (colors.other !== undefined && colors.other !== null) {
        colorsList.push(colors.other[0].hex.substring(1));
      }
    }
    return colorsList;
};
  