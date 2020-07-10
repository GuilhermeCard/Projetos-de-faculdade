import * as SQLite from 'expo-sqlite'
import { useSelector, useDispatch, connect } from 'react-redux'

const database = SQLite.openDatabase('meubanco.db');

const sqlTableCreations =
    [
        'CREATE TABLE IF NOT EXISTS registros ( id INTEGER primary key not null, peso TEXT, altura TEXT, resultado TEXT, data DATE );',
        'CREATE TABLE IF NOT EXISTS usuarios ( id INTEGER primary key not null, login TEXT, senha TEXT, id_pessoa INTEGER, FOREIGN KEY (id_pessoa) REFERENCES pessoas(id) );',
        'CREATE TABLE IF NOT EXISTS pessoas ( id INTEGER primary key not null, nome TEXT, dta_nascimento TEXT, peso TEXT, altura TEXT );'
    ]


export const init = () => {

    const promise = new Promise((resolve, reject) => {
        database.transaction((objetoDaTransacao) => {
            for (var i = 0; i < sqlTableCreations.length; i++) {
                objetoDaTransacao.executeSql(sqlTableCreations[i]);
            }
        }, (error) => {
            reject(error)
        }, () => {
            console.log("SQL's executados com sucesso !");
            resolve()
        })
    })
    return promise;
}

export const insertRegistros = (peso, altura, resultado, data) => {

    const promise = new Promise((resolve, reject) => {
        database.transaction((objetoDaTransacao) => {
            objetoDaTransacao.executeSql('INSERT INTO registros (peso, altura, resultado, data) VALUES (?,?,?,?);',
                [peso, altura, resultado, data],
                (_, result) => { resolve(result) },
                (_, error) => { reject(error) },
            )
        })
    })
    return promise;
}

export const findAllRegistros = () => {

    const promise = new Promise((resolve, reject) => {
        database.transaction((objetoDaTransacao) => {
            objetoDaTransacao.executeSql('SELECT * FROM registros;',
                [],
                (_, result) => { resolve(result) },
                (_, error) => { reject(error) },
            )
        })
    })
    return promise;
}

export const findUserByLogin = (login) =>{  
    
    const promise = new Promise((resolve, reject) =>{  
        database.transaction( (objetoDaTransacao) =>{
            objetoDaTransacao.executeSql('SELECT * FROM usuarios where login = ?',
            [login], //vetor de argumentos dinâmicos
            (_, result) => { resolve(result)   },
            (_, error) => { reject(error)   },
            )
        })
    })  
    return promise;
}