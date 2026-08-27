import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    50: '#fff4e5',
    100: '#ffe1b8',
    200: '#ffcd8a',
    300: '#ffba5c',
    400: '#ffa62e',
    500: '#e68c14',
    600: '#b36d0c',
    700: '#804e07',
    800: '#4d2e01',
    900: '#1c0f00',
  },
  accent: {
    50: '#e5f3ff',
    100: '#b8deff',
    200: '#8ac9ff',
    300: '#5cb3ff',
    400: '#2e9eff',
    500: '#1485e6',
    600: '#0c67b3',
    700: '#074a80',
    800: '#012c4d',
    900: '#00101c',
  },
  earth: {
    50: '#f9f6f0',
    100: '#e8ddcc',
    200: '#d7c4a8',
    300: '#c6ab84',
    400: '#b59260',
    500: '#9c7947',
    600: '#7a5e37',
    700: '#574327',
    800: '#352817',
    900: '#130d05',
  },
};

const fonts = {
  heading: 'var(--font-heading)',
  body: 'var(--font-body)',
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'semibold',
      borderRadius: 'md',
    },
    variants: {
      solid: {
        bg: 'brand.500',
        color: 'white',
        _hover: {
          bg: 'brand.600',
        },
      },
      outline: {
        borderColor: 'brand.500',
        color: 'brand.500',
        _hover: {
          bg: 'brand.50',
        },
      },
    },
    defaultProps: {
      colorScheme: 'brand',
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: 'lg',
        overflow: 'hidden',
        boxShadow: 'sm',
        transition: 'transform 0.2s, box-shadow 0.2s',
        _hover: {
          transform: 'translateY(-4px)',
          boxShadow: 'md',
        },
      },
    },
  },
  Badge: {
    variants: {
      artesao: {
        bg: 'earth.100',
        color: 'earth.800',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
      tecnica: {
        bg: 'accent.100',
        color: 'accent.800',
      },
    },
  },
};

const theme = extendTheme({ colors, fonts, components });

export default theme;
