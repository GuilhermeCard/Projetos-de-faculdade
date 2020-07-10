import React, { Component, useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, Button, Image, TextInput, ScrollView } from 'react-native';

import Card from '../components/Card';
import { findAllRegistros } from '../database/sqlite';

const TelaExibicaoHistorico = props => {

    const [dataArray, setDataArray] = useState([]);

    useEffect(() => {
        find();
        if (dataArray.length > 0) {
            console.log(dataArray);
        }
        else {
            console.log('Não há registros de cáculos');
        }
    }, [dataArray.length]);

    async function find() {
        let result = await findAllRegistros();
        setDataArray(result.rows._array);
    }

    return (

        <ScrollView style={styles.container}>

            {dataArray.map(
                (data) =>
                    <Card key={data.id}>

                        <Text>ID: {data.id}</Text>
                        <Text>Peso:  {data.peso}kg</Text>
                        <Text>Altura:  {data.altura}m</Text>
                        <Text>IMC:  {data.resultado}</Text>
                        <Text>Data:  {data.data}</Text>

                    </Card>
            )
            }

        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: 15

    },
    conteudoCard: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15

    }
});


export default TelaExibicaoHistorico;