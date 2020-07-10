import React, { Component, useState, useEffect, useCallback } from 'react';
import { CheckBox, Text, StyleSheet, View, TextInput, Button } from 'react-native';
import { useSelector, useDispatch, connect } from 'react-redux'

const TelaCalcular = props => {

  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>

      <View style={stylesPlaceHolder.container}>
        <TextInput style={stylesPlaceHolder.input}
          placeholder='Digite aqui seu Peso' onChangeText={peso => { dispatch({ type: 'Alterar_Peso', peso: peso }) }}></TextInput>

        <TextInput style={stylesPlaceHolder.input}
          placeholder='Digite aqui sua Altura' onChangeText={altura => { dispatch({ type: 'Alterar_Altura', altura: altura }) }}></TextInput>

        <TextInput style={stylesPlaceHolder.input}
          placeholder='Digite aqui sua Idade' onChangeText={idade => { dispatch({ type: 'Alterar_Idade', idade: idade }) }}></TextInput>
      </View>

      <View style={{ flex: 1, margin: 100, paddingTop: 70, borderRadius: 5 }}>

        <Button title="Calcular" type="outline" onPress={() => { dispatch({ type: 'Resultado' }); props.navigation.navigate('TelaIMC') }} />

        <View style={{ paddingTop: 23 }}>
          <Button title="Histórico" type="outline" onPress={() => { props.navigation.navigate('TelaHistorico') }} />
        </View>

      </View>
    </View>
  );
}


const stylesPlaceHolder = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    margin: 20,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 2,
    textAlign: "center",
    borderRadius: 5
  }
});

function mapStateToProps(state) {
  return {
    calc: state.calc
  };
}

export default connect(mapStateToProps)(TelaCalcular);


