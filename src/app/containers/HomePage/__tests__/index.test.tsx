import React from 'react';
import { render } from '@testing-library/react';
import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styles/theme/ThemeProvider';
import { HelmetProvider } from 'react-helmet-async';

// Store
import { configureAppStore } from 'store/configureStore';

import { HomePage } from '..';

const renderHomePage = (store: Store) =>
    render(
        <Provider store={store}>
          <ThemeProvider>
            <HelmetProvider>
              <HomePage />
            </HelmetProvider>
          </ThemeProvider>
        </Provider>,
    );

describe('<HomePage />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let component: ReturnType<typeof renderHomePage>;

  beforeEach(() => {
    store = configureAppStore();
    component = renderHomePage(store);
  });
  afterEach(() => {
    component.unmount();
  });

  it('should render and match the snapshot', () => {
    component.unmount();
    component = renderHomePage(store);
    expect(component.container).toMatchSnapshot();
  });
});
