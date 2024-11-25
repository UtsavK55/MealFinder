import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import ErrorBoundary from '@components/errorBoundary';
import {DarkThemeProvider} from '@contexts/ThemeProvider';
import Navigator from '@navigation/Navigator';

function App(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <DarkThemeProvider>
        <NavigationContainer>
          <Navigator />
          <Toast />
        </NavigationContainer>
      </DarkThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
