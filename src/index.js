import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { rootReducer } from "./ducks/reducers";
import { BrowserRouter } from "react-router-dom";
import { createFirestoreInstance } from "redux-firestore";
import { createStore } from "redux";

const firebaseConfig = {
  apiKey: "AIzaSyC4_ZuMYmKL526q7b3sIvr4YLfQH_ZRssY",
  authDomain: "goods-page.firebaseapp.com",
  projectId: "goods-page",
  storageBucket: "goods-page.appspot.com",
  messagingSenderId: "1050606181772",
  appId: "1:1050606181772:web:a552ce92e0a2bf1372caa9",
  measurementId: "G-E1D4CSK6SC"
};

const rrfConfig = {
  userProfile: "goods",
  useFirestoreForProfile: true,
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const initialState = {};
const store = createStore(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, //since we are using Firestore
};


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
