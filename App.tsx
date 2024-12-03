import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import ErrorBoundary from '@components/errorBoundary';
import {UserProvider} from '@contexts/UserProvider';
import {DateProvider} from '@contexts/DateProvider';
import {DarkThemeProvider} from '@contexts/ThemeProvider';
import Navigator from '@navigation/Navigator';

function App(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <UserProvider>
        <DarkThemeProvider>
          <DateProvider>
            <NavigationContainer>
              <Navigator />
              <Toast />
            </NavigationContainer>
          </DateProvider>
        </DarkThemeProvider>
      </UserProvider>
    </ErrorBoundary>
  );
}

export default App;
