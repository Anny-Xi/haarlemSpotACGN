import * as React from 'react';

import NavigationStack from './app/screens/NavigationScreen';
import { ThemeProvider } from './app/setting/ThemeContext';


export default function App() {
  return (
    <ThemeProvider>
      <NavigationStack/>
    </ThemeProvider>
  );
}
