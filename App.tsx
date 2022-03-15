import React from 'react';

import AppContainer from './src/components/app-container';
import Main from './src/screens/main';
import Navigator from './src/index'

export default function App() {
  return (
    <AppContainer>
      <Navigator />
    </AppContainer>
  );
}
