import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'


const Task = ({task, completed}) => {

  return (
    <View style={[styles.container, {backgroundColor: "#"+Math.floor(Math.random()*16777215).toString(16)}]}>
      <Text style={styles.text}>{task}</Text>
    </View>
  )
}

export default Task

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    text: {
        color: '#fff',
        fontSize: 15,
    }
})