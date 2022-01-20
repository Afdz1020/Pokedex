import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Account from '../screens/Account';

type StackNavigationAccount = {
  AccountStack: undefined;
};

const Stack = createStackNavigator<StackNavigationAccount>();

export default function AccountNavigation() {
  const {Navigator, Screen} = Stack;
  return (
    <Navigator>
      <Screen
        name="AccountStack"
        component={Account}
        options={{title: '', headerTransparent: true}}
      />
    </Navigator>
  );
}
