import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const WelcomeButtons = ({title, onPress, height}) => {
  return (
    <TouchableOpacity style={[styles.container, {height: height}]} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default WelcomeButtons

const styles = StyleSheet.create({
    container: {
        width: '100%',
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