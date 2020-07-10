const estadoInicial = { peso: '', altura: '', resultado: '', idade: '', data:'' };

import { alterarPeso, alterarAltura, calcularResultado, alterarIdade, } from '../actions/calcular';

const reducerCalcular = (state = estadoInicial, action) => {
    switch (action.type) {
        case alterarPeso:
            return { ...state, peso: Number(action.peso) };

        case alterarAltura:
            return { ...state, altura: Number(action.altura) };

        case alterarIdade:
            return { ...state, idade: action.idade };

        case calcularResultado:
            return { ...state, resultado: (Number(state.peso) / (Number(state.altura) * Number(state.altura))).toFixed(2) };
        default:
            return state;
    }
}

export default reducerCalcular;





