import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducers
import reducer, { initialState } from "../reducers";

export const initializeStore = (
  preloadedState = initialState
) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
};
