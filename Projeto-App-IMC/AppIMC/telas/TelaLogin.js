import React, { Component, useState, useEffect, useCallback } from 'react';
import { CheckBox, Text, StyleSheet, View, TextInput, Button, Image } from 'react-native';


const TelaLogin = props => {

    const [Login, setLogin] = useState('');
    const [Senha, setSenha] = useState('');

    async function login(login, senha) {
        try {
            let retorno = await fetch('http://10.0.2.2:3000/users/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "login": login,
                    "senha": senha
                })
            });
            let json = await retorno.json();
            return json;
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ alignItems: 'center', paddingTop: 70, marginBottom: -100 }}>
                <Image source={require('../assets/balança.png')} style={{ width: 100, height: 100 }} />
            </View>

            <View style={stylesPlaceHolder.container}>
                <TextInput style={stylesPlaceHolder.input}
                    placeholder='Login' onChangeText={text => { setLogin(text); }}></TextInput>
                <TextInput style={stylesPlaceHolder.input}
                    placeholder='Senha' secureTextEntry={true} onChangeText={text => { setSenha(text) }}></TextInput>
            </View>

            <View style={{ flex: 1, margin: 50, marginLeft: 120, marginRight: 120, borderRadius: 5 }}>
                <Button title="Login" type="outline"
                    onPress={async () => {

                        const resultadoLogin = await login(Login, Senha)
                        if(resultadoLogin.Message == "Você está autorizado"){
                        props.navigation.navigate('TelaCalculo')}
                        else{
                            alert("Dados incorretos !")
                        };
                    }}
                />

                <View style={{ paddingTop: 23 }}>
                    <Button title="Cadastrar" type="outline"
                        onPress={() => {
                            props.navigation.navigate('TelaCadastro')
                        }}
                    />
                </View>
            </View>
        </View>
    );
}

const stylesPlaceHolder = StyleSheet.create({
    container: {
        paddingTop: 150
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 2,
        textAlign: "center",
        borderRadius: 5
    }
});

export default (TelaLogin);
