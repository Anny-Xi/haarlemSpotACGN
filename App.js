import * as React from 'react';

import NavigationStack from './app/setting/Navigation';
import { ThemeProvider } from './app/setting/ThemeContext';


export default function App() {
  return (
    <ThemeProvider>
      <NavigationStack/>
    </ThemeProvider>
  );
}
