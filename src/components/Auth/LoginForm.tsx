import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {user, userDetails} from '../../utils/userDB';
import useAuth from '../../hooks/useAuth';

export default function LoginForm() {
  const [error, setError] = useState<string>('');
  const {login} = useAuth();

  const initialValues = () => ({
    username: '',
    password: '',
  });

  const validationSchema = () => ({
    username: yup.string().required('El usuario es requerido'),
    password: yup.string().required('La contraseña es requerida'),
  });

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: formValues => {
      setError('');
      const {username, password} = formValues;
      if (username !== user.username || password !== user.password) {
        setError('El usuario o la contraseña son incorrectos');
      } else {
        login(userDetails);
      }
    },
  });
  return (
    <View>
      <Text style={styles.title}>Iniciar Sesion</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        autoCapitalize="none"
        value={formik.values.username}
        onChangeText={text => formik.setFieldValue('username', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        autoCapitalize="none"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={text => formik.setFieldValue('password', text)}
      />

      <Button title="Entrar" onPress={formik.handleSubmit} />

      <Text style={styles.error}>{formik.errors.username}</Text>
      <Text style={styles.error}>{formik.errors.password}</Text>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  error: {
    textAlign: 'center',
    color: '#f00',
    marginTop: 20,
  },
});
