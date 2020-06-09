import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { initializeStore } from "./store";
import styled from 'styled-components';

// Styles
import "./styles.css";

const store = initializeStore();

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: darkgray;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: white;
`;

/**
 * Container
 */
const AppContainer = () => {
  return (
    <div className="App">
        <Wrapper>
            <Title>Companies Analysis</Title>
        </Wrapper>
    </div>
  );
};

/**
 * Build the app
 */
function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
