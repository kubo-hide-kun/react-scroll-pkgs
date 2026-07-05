export const theme = {
  color: {
    bg: '#05060a',
    bgAlt: '#0a0d16',
    surface: 'rgba(255, 255, 255, 0.04)',
    surfaceBorder: 'rgba(255, 255, 255, 0.08)',
    text: '#f5f7ff',
    textMuted: 'rgba(245, 247, 255, 0.62)',
    textFaint: 'rgba(245, 247, 255, 0.4)',
    accent: '#7ed4fd',
    accent2: '#709df7',
    accent3: '#4d78ef',
  },
  gradient: {
    brand:
      'radial-gradient(140% 1024% at 96% -2%, #7ed4fd 15%, #709df7 50%, #4d78ef 80%)',
    accentLine: 'linear-gradient(90deg, #7ed4fd 0%, #709df7 50%, #4d78ef 100%)',
  },
  radius: {
    md: '14px',
    lg: '24px',
  },
  maxWidth: '1120px',
} as const;

export const repoUrl = 'https://github.com/kubo-hide-kun/react-scroll-pkgs';
