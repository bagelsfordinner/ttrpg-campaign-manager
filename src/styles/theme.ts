export const theme = {
  colors: {
    background: '#1A1E1C',
    surface: '#38423F',
    surfaceContrast: '#242A27',
    highlight: '#4A5E53',
    text: '#B8C3BF',
    secondaryText: '#8E9A96',
    tertiaryText: '#6C7572',
    disabledText: '#55605D',
    border: '#2F3532',
    inputBackground: '#2B312E',
    cardBackground: '#2F3936',
    overlayBackground: 'rgba(17, 20, 18, 0.8)',
    success: '#4F7C5B',
    warning: '#A07A2E',
    error: '#A14343',
    info: '#4E6C75',
    rust: '#B8542B',
    rustLight: '#D77A4A',
    accent: '#5A8880',
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '24px',
  },
};

export type AppTheme = typeof theme;
