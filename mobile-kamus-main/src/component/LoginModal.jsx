import { Image, ImageBackground, Modal, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import useAuth from "../hooks/useAuths";
import { TextField } from "frasydi-ui";
import { Button } from "./Button";
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function LoginModal({ isActive, setActive }) {
    const auth = useAuth()
    async function login({ username, password }) {
        await auth.login({ username: username, password: password }, (err) => {
            Alert.alert(err)
        })
    }

    const { control, handleSubmit } = useForm({
        mode: "onBlur",
        resolver: zodResolver(z.object({
            username: z.string().nonempty("Tidak boleh kosong"),
            password: z.string().nonempty("Tidak boleh kosong")
        })),

    })
    function submitLogin({ username, password }) {
        login({ username, password })
    }
    return (
        <Modal
            visible={isActive}
            onRequestClose={() => {
                setActive(false)
            }}
            animationType="fade"
        >
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: "#f3f3f3",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <TouchableOpacity style={{ position: "absolute", top: 10, left: 0, padding: 10 }} onPress={() => {
                    setActive(false)
                }}>
                    <Ionicons name="arrow-back" size={35} color="black" />
                </TouchableOpacity>
                <Image source={require("../assets/pages/Login/Image.png")} style={{ position: "absolute", width: "100%", height: 400, opacity: 0.4 }} />
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{
                        fontFamily: "Titan-One",
                        fontSize: 50,
                        alignSelf: "center",
                        marginBottom: 50
                    }}>Login</Text>
                    <Controller
                        name="username"
                        control={control}
                        render={({ field: { name, ref, onChange, ...props }, fieldState: { error } }) => <TextField textStyle={{
                            fontWeight: "bold",

                        }} onChangeText={onChange} HeaderIcon={
                            <View style={{ paddingHorizontal: 7 }}>
                                <AntDesign name="user" size={24} color="black" />
                            </View>

                        } {...props} label="Username" containerStyle={{ marginVertical: 20 }} style={{ width: "80%", height: 15, }} error={error?.message} />
                        }
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { name, ref, onChange, ...props }, fieldState: { error } }) => <TextField textStyle={{
                            fontWeight: "bold",

                        }} containerStyle={{ marginVertical: 20 }} HeaderIcon={
                            <View style={{paddingHorizontal : 7}}>
                                <MaterialCommunityIcons name="onepassword" size={24} color="black" />
                            </View>
                        } style={{ width: "70%", height: 15, }} onChangeText={onChange}  {...props} label="Password" error={error?.message} />
                        }
                    />
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 40 }}>
                        <Button label={"Login"} width={"80%"} onPress={handleSubmit(submitLogin)} />
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    )
}