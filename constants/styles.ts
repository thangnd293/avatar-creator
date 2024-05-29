export const COLORS = {
  primary: "hsl(325, 75%, 45%)",
  primaryLight: "hsl(325, 65%, 65%)",
  secondary: "hsl(272, 86%, 67%)",
  white: "hsl(0, 0%, 100%)",
  gray: {
    100: "hsl(185, 5%, 95%)",
    300: "hsl(190, 5%, 80%)",
    500: "hsl(196, 4%, 60%)",
    600: "hsl(196, 5%, 50%)",
    700: "hsl(220, 5%, 40%)",
    900: "hsl(220, 3%, 20%)",
  },
};

export const WEIGHTS = {
  normal: 400,
  medium: 500,
  bold: 700,
};

const BREAKPOINTS = {
  small: 550,
  medium: 1100,
  large: 1500,
};

export const QUERIES = {
  phoneAndSmaller: `(max-width: ${BREAKPOINTS.small / 16}rem)`,
  tabletAndSmaller: `(max-width: ${BREAKPOINTS.medium / 16}rem)`,
  laptopAndSmaller: `(max-width: ${BREAKPOINTS.large / 16}rem)`,
};
