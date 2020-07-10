import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
  return (

    <View style={styles.card}>
      <View style={styles.conteudoCard}>
        {props.children}
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 7,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, heigth: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 7,
    marginHorizontal: 4,
    marginVertical: 6,
    borderColor: '#7a42f4',
    borderWidth: 2,
    
  },
  conteudoCard: {
    marginHorizontal: 18,
    marginVertical: 6
  }
});

export default Card;