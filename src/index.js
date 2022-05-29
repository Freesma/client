import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import {createStore} from 'redux'
import {Provider} from "react-redux";


const userDefaultState = {
    id: null,
    fname: 'Maya',
    lname: null,
    login: null,
    pass: null,
    mobile: null,
    email: null,
    banned: null,
    isLoginned: false
}



const userReducer = (state = userDefaultState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, id: state.id = action.payload.id, fname: state.fname = action.payload.fname,
                lname: state.lname = action.payload.lname, login: state.login = action.payload.login,
                pass: state.pass = action.payload.pass, mobile: state.mobile = action.payload.mobile,
                email: state.email = action.payload.email, banned: state.banned = action.payload.banned}
        default:
            return state
    }
}

const store = createStore(userReducer)



ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);