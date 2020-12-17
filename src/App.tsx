import './App.css';
import React, { useEffect, useState } from 'react';
import { useRoutes } from 'raviger';

import { AppState } from "./types";
import store from "./store";
import { updateCryptos } from "./actions";
import { Status } from "./constants";

import Header from "./components/Header";
import AllCryptosPage from "./components/AllCryptosPage";
import SingleCryptoPage from "./components/SingleCryptoPage";
import NotFoundPage from "./components/NotFoundPage";

const routes = {
  '/': () => <AllCryptosPage />,
  '/single/:currency': (params: any) => {
    const state: AppState = store.getState().app;
    const crypto = Object.values(state.cryptos).find(c => c.name.toLowerCase() === params.currency);
    return typeof crypto === "undefined" ? <NotFoundPage /> : <SingleCryptoPage rank={crypto.rank} currency={crypto} />
  }
};

function App() {
  const routeResult = useRoutes(routes);
  const state: AppState = store.getState().app;

  const selectedCryptoName: string =
    window.location.pathname.indexOf("/single/") > -1 ? window.location.pathname.slice(("/single/").length) : "";

  const t = 600;
  const [seconds, setSeconds] = useState(t);
  const reset = () => setSeconds(t);

  useEffect(() => {
    // Refresh data at the top of each minute
    if (seconds === t) {
      updateCryptos(state.selectedCurrency);
    }

    let interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);
    if (seconds < 0) {
      clearInterval(interval);
      reset();
    }
    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    seconds !== t && reset();
  }, [state.selectedCurrency, selectedCryptoName]);

  return (
    <div className="App" data-test="component-app">
      <Header selectedCryptoName={selectedCryptoName} />
      {routeResult || <NotFoundPage />}
    </div>
  );
}

export default App;
