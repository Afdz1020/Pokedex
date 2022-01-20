import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';
import {getPokemonsFavoriteApi} from '../../api/favorite';

type ProsItemMenu = {
  title: string;
  text: string;
};

export default function UserData() {
  const {auth, logout} = useAuth();

  const [total, setTotal] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await getPokemonsFavoriteApi();
          setTotal(response.length);
        } catch (error) {
          setTotal(0);
        }
      })();
    }, []),
  );
  return (
    <View style={styles.content}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.title}>{`${auth.firstName} ${auth.lastName}`}</Text>
      </View>

      <View style={styles.dataContent}>
        <ItemMenu title="Nombre" text={`${auth.firstName} ${auth.lastName}`} />
        <ItemMenu title="Username" text={auth.username} />
        <ItemMenu title="Email" text={auth.email} />
        <ItemMenu title="Total Favoritos" text={`${total} Pokemons`} />
      </View>
      <View style={styles.btnLogout}>
        <Button title="Desconectarse" onPress={logout} />
      </View>
    </View>
  );
}

function ItemMenu({title, text}: ProsItemMenu) {
  return (
    <View style={styles.itemMenu}>
      <Text style={styles.itemMenuTitle}>{title}: </Text>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleBlock: {
    marginBottom: 30,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  dataContent: {
    marginBottom: 20,
  },
  itemMenu: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#CFCFCF',
  },
  itemMenuTitle: {
    fontWeight: 'bold',
    paddingRight: 10,
    width: 120,
  },
  btnLogout: {
    padding: 20,
  },
});
