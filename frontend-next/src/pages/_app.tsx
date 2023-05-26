import type { AppProps } from 'next/app';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import '@/styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { wrapper } from '@/store/store';
import { Provider } from 'react-redux';
import AppToolbar from '@/ui/AppToolbar/AppToolbar';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from '@/constants';
import theme from '@/theme';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID as string}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <header>
            <AppToolbar />
          </header>
          <main>
            <Container maxWidth="xl">
              <Component {...props.pageProps} />
            </Container>
          </main>
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
}
