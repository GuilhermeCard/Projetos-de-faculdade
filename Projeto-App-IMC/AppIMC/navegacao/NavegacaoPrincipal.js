import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import TelaCalcular from '../telas/TelaCalcular';
import TelaResultado from '../telas/TelaResultado';
import TelaExibicaoHistorico from '../telas/TelaExibicaoHistorico';
import TelaCadastro from '../telas/TelaCadastro';
import TelaLogin from '../telas/TelaLogin';

const NavegacaoTelas = createStackNavigator(

  {
    TelaLogin: TelaLogin,
    TelaCalculo: TelaCalcular,
    TelaIMC: TelaResultado,
    TelaHistorico: TelaExibicaoHistorico,
    TelaCadastro: TelaCadastro

  }
);

export default createAppContainer(NavegacaoTelas);