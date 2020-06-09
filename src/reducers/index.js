import { languages, currencies } from '../enum';

export const initialState = {
  language: languages.English,
  currency: currencies.euro,
};

export const ActionTypes = {
  SET_LANGUAGE: "SET_LANGUAGE",
  SET_CURRENCY: "SET_CURRENCY"
};

export const Actions = {
  setLanguage: (lang) => ({
    type: ActionTypes.SET_LANGUAGE,
    lang
  }),
  setCurrency: (currency) => ({
    type: ActionTypes.SET_CURRENCY,
    currency
  })
};

const GlobalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_LANGUAGE:
      return {
        ...state,
        language: action.lang
      };
    case ActionTypes.SET_CURRENCY:
      return {
        ...state,
        currency: action.currency
      };
    default:
      return state;
  }
};

export default GlobalReducer;
