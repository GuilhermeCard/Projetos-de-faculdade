

//Objeto com o estado inicial da variável de estado da tela de contagem (nesse caso temos apenas uma variável de estado)
const estadoInicial = {outravariavel : 1000};

//essa variável contempla todos as possíveis ações que podem ser disparadas para os eventos da tela de contagem
const outroReducer = (state = estadoInicial, action) => {

    switch(action.type){
        default:
            return state;
    }
    
}

export default outroReducer;