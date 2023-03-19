import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const WelcomeButtons = ({title, onPress}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  )
}

export default WelcomeButtons

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '20%',
        backgroundColor: '#F80053',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    }
})