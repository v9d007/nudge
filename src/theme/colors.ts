export interface StitchColorTheme {
  isDark: boolean;
  background: string;
  surfaceContainer: string;
  surfaceContainerLow: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  primaryContainer: string;
  primaryLight: string;
  secondary: string;
  secondaryContainer: string;
  tertiary: string;
  tertiaryContainer: string;
  error: string;
  tabBarBackground: string;
  tabBarActive: string;
  tabBarInactive: string;
  ringBackground: string;
  chartGrid: string;
  sunsetGradient: [string, string];
}

export const darkStitchTheme: StitchColorTheme = {
  isDark: true,
  background: '#1e1b18',
  surfaceContainer: '#2b2723',
  surfaceContainerLow: '#221f1c',
  surfaceContainerHigh: '#36312c',
  surfaceContainerHighest: '#423c36',
  cardBorder: '#423932',
  textPrimary: '#f7efe9',
  textSecondary: '#e0d9d3',
  textMuted: '#9e8d83',
  primary: '#f97316',
  primaryContainer: '#582200',
  primaryLight: '#ffb690',
  secondary: '#fd56a7',
  secondaryContainer: '#600037',
  tertiary: '#f9bd22',
  tertiaryContainer: '#422f00',
  error: '#ffb4ab',
  tabBarBackground: '#221f1c',
  tabBarActive: '#f97316',
  tabBarInactive: '#9e8d83',
  ringBackground: '#36312c',
  chartGrid: '#423c36',
  sunsetGradient: ['#f97316', '#fd56a7'],
};

export const lightStitchTheme: StitchColorTheme = {
  isDark: false,
  background: '#fff8f4',
  surfaceContainer: '#ffffff',
  surfaceContainerLow: '#faf2ec',
  surfaceContainerHigh: '#eee7e1',
  surfaceContainerHighest: '#e9e1db',
  cardBorder: '#ffedd5',
  textPrimary: '#1e1b18',
  textSecondary: '#584237',
  textMuted: '#8c7164',
  primary: '#f97316',
  primaryContainer: '#ffdbca',
  primaryLight: '#9d4300',
  secondary: '#b4136d',
  secondaryContainer: '#fd56a7',
  tertiary: '#795900',
  tertiaryContainer: '#ffdf9f',
  error: '#ba1a1a',
  tabBarBackground: '#ffffff',
  tabBarActive: '#f97316',
  tabBarInactive: '#8c7164',
  ringBackground: '#f4ece7',
  chartGrid: '#e9e1db',
  sunsetGradient: ['#f97316', '#fd56a7'],
};
