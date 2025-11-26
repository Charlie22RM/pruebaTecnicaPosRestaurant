import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { GlobalProvider } from '../context/GlobalState';

export default function RootLayout() {
  return (
    <GlobalProvider>
      <ThemeProvider value={DefaultTheme}> 
        <Slot />  {/* Renderiza las rutas hijas */}
        <StatusBar style="auto" />
      </ThemeProvider>
    </GlobalProvider>
  );
}