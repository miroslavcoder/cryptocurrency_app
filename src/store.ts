import { combineReducers, createStore } from "redux";
import { AppState } from "./types";
import { Status } from "./constants";
import { actionTypes } from "./actions";
import { localCurrencies } from "./constants";

/*
crypto statuses:
  "NOT_LOADED",
  "LOADING",
  "LOAD_SUCCESS",
  "LOAD_FAIL"
*/

export const initialState: AppState = {
  selectedCurrency: localCurrencies[0],
  cryptos: [],
  cryptoRequestState: Status.NOT_LOADED,
  cryptoRequestFailure: ""
};

export function reducer(state: AppState = initialState, action: any): AppState {
  switch (action.type) {
    case actionTypes.UPDATE_CRYPTOS_REQUEST_STARTED:
      return {
        ...state,
        cryptoRequestState: Status.LOADING,
        cryptoRequestFailure: ""
      };
    case actionTypes.UPDATE_CRYPTOS_REQUEST_SUCCESS:
      return {
        ...state,
        cryptos: action.payload.data,
        cryptoRequestState: Status.LOAD_SUCCESS,
        cryptoRequestFailure: ""
      };
    case actionTypes.UPDATE_CRYPTOS_REQUEST_ERROR:
      return {
        ...state,
        cryptos: [],
        cryptoRequestState: Status.LOAD_FAIL,
        cryptoRequestFailure: action.payload.message
      };

    case actionTypes.SELECT_LOCAL_CURRENCY:
      return {
        ...state,
        selectedCurrency: action.payload.selected,
        cryptoRequestState: Status.NOT_LOADED,
      };

    default:
      return state;
  }
}

export interface RootState {
  app: AppState;
}

const store = createStore<RootState, any, any, any>(
  combineReducers({
    app: reducer
  })
);

export default store;
