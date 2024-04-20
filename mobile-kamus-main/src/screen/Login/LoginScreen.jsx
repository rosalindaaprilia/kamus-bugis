import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LoginModal from '../../component/LoginModal';
import RegisterModal from '../../component/RegisterModal';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
function LoginScreen({ navigation }) {
    
    const [login, setLogin] = useState(false)
    const [register, setRegister] = useState(false)
    const nav = useNavigation()
    return (
        <>
        <StatusBar style='auto' />
        <LoginModal isActive={login} setActive={setLogin}  />
        <RegisterModal isActive={register} setActive={setRegister}/>
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ marginHorizontal: 30 }}>
                <Text style={{ fontFamily: "Poppins-Bold", fontSize: 20 }}>Kamus Digital</Text>
                <Text style={styles.text}>Membantu Belajar Bahasa Bugis.</Text>
                <Text style={styles.text}>Biarkan Saya Membantumu...</Text>
            </View>
            <Image source={require("../../assets/pages/Login/Image.png")} style={{ width: "100%" }} />
            <TouchableOpacity onPress={() => {
                
                nav.navigate("Login")   
                
            }} style={{ width: "100%", flexDirection: "row", justifyContent :"flex-end", alignItems :"center", marginTop : 40 }}>
               
               <Text style={{
                color : "black",
                fontWeight :"600",
                fontSize : 20
                }}>
                Masuk
                </Text>
                <AntDesign name="right" size={24} color="black" />

            </TouchableOpacity>
        </SafeAreaView>
        </>

    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Poppins", lineHeight: 30, fontSize: 20
    }
})

export default LoginScreen;
