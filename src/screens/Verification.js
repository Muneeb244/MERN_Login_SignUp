import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Verification = ({navigation, route}) => {

    const {user} = route.params;
    console.log(user?.verificationCode);
  return (
    <View>
      <Text>Verification</Text>
    </View>
  )
}

export default Verification

const styles = StyleSheet.create({})