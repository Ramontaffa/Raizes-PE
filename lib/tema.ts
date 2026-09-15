import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const tema = extendTheme({
  config,
  fonts: {
    heading: `'Fraunces', serif`,
    body: `'Work Sans', sans-serif`,
  },
  // Escala derivada do primary (#b75c40) para os componentes do Chakra que pedem
  // colorScheme (Stepper, Alert, Badge, Checkbox, Switch...). Sem ela, esses componentes
  // caem no laranja genérico da biblioteca, fora da identidade do projeto.
  colors: {
    terracota: {
      50: "#f9f2f0",
      100: "#f3e5e0",
      200: "#e8cbc2",
      300: "#daaa9c",
      400: "#c8836e",
      500: "#b75c40",
      600: "#a15239",
      700: "#854430",
      800: "#653626",
      900: "#49281d",
    },
  },
  semanticTokens: {
    colors: {
      bg: { default: "#fdfbf7", _dark: "#2a2421" },
      fg: { default: "#2d2420", _dark: "#f4efe9" },
      card: { default: "#ffffff", _dark: "#362e2a" },
      cardFg: { default: "#2d2420", _dark: "#f4efe9" },
      primary: { default: "#b75c40", _dark: "#c97155" },
      primaryFg: { default: "#ffffff", _dark: "#ffffff" },
      secondary: { default: "#e8dbce", _dark: "#4a3b32" },
      secondaryFg: { default: "#4a3b32", _dark: "#e8dbce" },
      muted: { default: "#f4efe9", _dark: "#3a322d" },
      mutedFg: { default: "#7a6a61", _dark: "#a3958c" },
      accent: { default: "#8b9d77", _dark: "#8b9d77" },
      accentFg: { default: "#ffffff", _dark: "#ffffff" },
      border: { default: "#e2d7cc", _dark: "#4a3b32" },
      ring: { default: "#b75c40", _dark: "#c97155" },
    },
  },
  styles: {
    global: {
      body: {
        bg: "bg",
        color: "fg",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 500,
        borderRadius: "7px",
      },
      variants: {
        solid: {
          bg: "primary",
          color: "primaryFg",
          _hover: { opacity: 0.92 },
        },
        outline: {
          borderColor: "border",
          color: "primary",
        },
      },
    },
  },
});

export default tema;
