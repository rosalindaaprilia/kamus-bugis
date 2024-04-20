import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, Animated } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';


export const SearchBarComponent = React.forwardRef(({ containerStyle, onSearch, ...props }, ref) => {
  const [search, setSearch] = useState("")





  return (
    <>
      <View style={{
        position: "relative",
        marginHorizontal: 20,
        backgroundColor: 'whitesmoke',
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: .5,
        borderBottomColor: "grey",
        zIndex: 100,

        ...containerStyle
      }}>

        <TextInput {...props} ref={ref} keyboardType='web-search' onSubmitEditing={() => {
          onSearch(search)
        }} style={{ width: "100%", marginHorizontal: 20, height: "100%" }} value={search} onChangeText={setSearch} />
        <TouchableOpacity style={{ position :"absolute", right : 10 }} onPress={() => {
          onSearch(search)
        }}>
          <Feather name="search" size={24} color="rgb(0,166,230)" />
        </TouchableOpacity>
      </View>

    </>

  )
})


