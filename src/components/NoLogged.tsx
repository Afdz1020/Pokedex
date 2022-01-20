import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

type AccountNavigate = {
  Account: undefined;
};

type AccountNavigationProp = BottomTabNavigationProp<
  AccountNavigate,
  'Account'
>;

export default function NoLogged() {
  const navigation = useNavigation<AccountNavigationProp>();
  return (
    <View style={styles.content}>
      <Text style={styles.text}>
        Para ver esta pantalla tienes que iniciar sesion
      </Text>

      <Button
        title="Iniciar sesion"
        onPress={() => navigation.navigate('Account')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginVertical: 50,
    paddingHorizontal: 50,
  },
  text: {
    textAlign: 'center',
    marginBottom: 10,
  },
});
