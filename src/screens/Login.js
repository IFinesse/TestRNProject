import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Logo from '../components/Logo';

const Login = () => {
  return (
    <View style={styles.container}>
      <Logo />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Login


