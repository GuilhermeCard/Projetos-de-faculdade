import React, { Component, useState, useEffect, useCallback } from 'react';
import { CheckBox, Text, StyleSheet, View, TextInput, Button } from 'react-native';
import { useSelector, useDispatch, connect } from 'react-redux';

import { insertRegistros } from '../database/sqlite';
import { verificarClassificacao, pesoIdeal, verificarFaixaEtaria } from '../centralized_store/actions/calcular';

import Card from '../components/Card';

const TelaResultado = props => {

    let aux = new Date();
    let data = (aux.getDate() + '/' + (aux.getMonth() + 1) + '/' + aux.getFullYear());

    useEffect(() => {

        if (props.calc.peso, props.calc.altura, props.calc.resultado != '' > 0) {
            console.log('O valor do peso é ' + props.calc.peso);
            console.log('O valor do altura é ' + props.calc.altura);
            console.log('O valor do IMC é ' + props.calc.resultado);
            insertRegistros(props.calc.peso, props.calc.altura, props.calc.resultado, data);
        }
        else {
            console.log('As props ainda nao foram alteradas')
        }

    }, [props]);


    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={stylesTitulo.container}>
                <Text style={stylesTitulo.input}>
                    Resultado</Text>
            </View>

            <View style={styles.container}>
                <Card>
                    <Text style={styles.conteudoCard}>Peso:    {props.calc.peso}kg</Text>
                    <Text style={styles.conteudoCard}>Altura:  {props.calc.altura}m</Text>
                    <Text style={styles.conteudoCard}>Faixa-Etária:    {verificarFaixaEtaria(props.calc.idade)}</Text>
                    <Text style={styles.conteudoCard}>Classificação: IMC = {props.calc.resultado}  ({verificarClassificacao(props.calc.resultado, props.calc.idade)}) </Text>
                    <Text style={styles.conteudoCard}>Faixa de Peso Ideal: {pesoIdeal(props.calc.idade)}</Text>
                </Card>
            </View>
        </View>
    );
}

const stylesTitulo = StyleSheet.create({
    container: {
        textAlign: "center",
    },
    input: {
        paddingTop: 50,
        textAlign: "center",
        fontSize: 40
    }
})

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: 15,
        paddingTop: 50,
        
    },
    conteudoCard: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        fontSize: 20,
        

    }
});

function mapStateToProps(state) {
    return {
        calc: state.calc
    };
}

export default connect(mapStateToProps)(TelaResultado);