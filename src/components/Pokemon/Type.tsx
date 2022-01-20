import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import getColorByPokemonType from '../../utils/getColorByPokemonType';

type Type = {
  type: {
    name: string;
  };
};

type Props = {
  types: Type[];
};

export default function Type({types}: Props) {
  return (
    <View style={styles.content}>
      {types.map(item => (
        <View
          style={{
            ...styles.pill,
            backgroundColor: getColorByPokemonType(item.type.name),
          }}
          key={item.type.name}>
          <Text>{item.type.name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pill: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 10,
  },
});
