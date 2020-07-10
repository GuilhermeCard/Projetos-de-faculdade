import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ContainerNavegacao from './navegacao/NavegacaoPrincipal';

import {init} from './database/sqlite';

import { createStore, combineReducers } from 'redux';

import  reducerCalcular  from './centralized_store/reducers/calcular';
import  outroReducer from './centralized_store/reducers/outroReducer';

import { Provider } from 'react-redux';


const reducerCompleto = combineReducers({
 calc: reducerCalcular,
 outro: outroReducer
});

const store = createStore(reducerCompleto);

init().then(
  () =>{
        console.log("Database inicializado");
  }
).catch( (error) => {
        console.log("Erro");
        console.log(error);
})

export default function App() {
  return (
    <Provider store ={store}>
      <ContainerNavegacao />
    </Provider>
  );
}


