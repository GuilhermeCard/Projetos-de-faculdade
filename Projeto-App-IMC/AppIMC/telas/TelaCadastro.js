import React, { Component, useState, useEffect, useCallback } from 'react';
import { CheckBox, Text, StyleSheet, View, TextInput, Button } from 'react-native';
import { useSelector, useDispatch, connect } from 'react-redux'

const TelaCadastro = props => {

    const [nome, setNome] = useState('');
    const [dta_nascimento, setNascimento] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [Login, setLogin] = useState('');
    const [Senha, setSenha] = useState('');

    async function cadastro(nome,
        dta_nascimento,
        peso,
        altura,
        Login,
        Senha, ) {
        try {
            let retorno = await fetch('http://10.0.2.2:3000/users/cadastro', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "nome": nome,
                    "dta_nascimento": dta_nascimento,
                    "peso": peso,
                    "altura": altura,
                    "login": Login,
                    "senha": Senha
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
            <View style={stylesTitulo.container}>
                <Text style={stylesTitulo.input}>
                    Cadastro</Text>
            </View>

            <View style={stylesPlaceHolder.container}>
                <TextInput style={stylesPlaceHolder.input}
                    placeholder='Digite aqui seu Nome' onChangeText={text => { setNome(text) }}></TextInput>

                <TextInput style={stylesPlaceHolder.input}
                    placeholder='Digite aqui sua Data de Nascimento' onChangeText={text => { setNascimento(text) }}></TextInput>

                <TextInput style={stylesPlaceHolder.input}
                    placeholder='Digite aqui sua Peso' onChangeText={text => { setPeso(text) }}></TextInput>

                <TextInput style={stylesPlaceHolder.input}
                    placeholder='Digite aqui sua Altura' onChangeText={text => { setAltura(text) }}></TextInput>

                <TextInput style={stylesPlaceHolder.input}
                    placeholder='Digite aqui sua Login' onChangeText={text => { setLogin(text) }}></TextInput>

                <TextInput style={stylesPlaceHolder.input}
                    placeholder='Digite aqui sua Senha' onChangeText={text => { setSenha(text) }}></TextInput>
            </View>

            <View style={{ flex: 1, margin: 100, paddingTop: 320, borderRadius: 5 }}>

                <Button title="Cadastrar" type="outline" onPress={async () => {

                    const resultadoCadastro = await cadastro(nome,
                        dta_nascimento,
                        peso,
                        altura,
                        Login,
                        Senha)
                    if (resultadoCadastro.Message == "Seu request chegou com esses dados") {
                        alert("Cadastro realizado com sucesso !");
                        props.navigation.navigate('TelaLogin')
                    }
                    else {
                        alert("Algo de errado ocorreu !")
                    };
                }} />
            </View>


        </View>
    );
}

const stylesTitulo = StyleSheet.create({
    container: {

        textAlign: "center",
    },
    input: {
        paddingTop: 10,
        textAlign: "center",
        fontSize: 30
    }
});

const stylesPlaceHolder = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 3
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




export default TelaCadastro;
