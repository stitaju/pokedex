export const adjustColor = (color: string) => {
  const colorMap: Record<string, string> = {
    yellow: '#805b2b',
    red: '#dd592e',
    blue: '#00008b',
    pink: '#c70023',
    white: '#626262',
  };
  return colorMap[color] || color;
};
