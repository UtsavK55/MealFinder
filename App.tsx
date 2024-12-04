import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';

import ErrorBoundary from '@components/errorBoundary';
import {DateProvider} from '@contexts/DateProvider';
import {DarkThemeProvider} from '@contexts/ThemeProvider';
import Navigator from '@navigation/Navigator';
import {store} from '@store';

function App(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <DarkThemeProvider>
          <DateProvider>
            <NavigationContainer>
              <Navigator />
              <Toast />
            </NavigationContainer>
          </DateProvider>
        </DarkThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
