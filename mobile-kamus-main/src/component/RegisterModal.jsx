import { Image, ImageBackground, Modal, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import useAuth from "../hooks/useAuths";
import { TextField } from "frasydi-ui";
import { Button } from "./Button";
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function RegisterModal({ isActive, setActive }) {
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
            email: z.string().email(),
            password: z.string().nonempty("Tidak boleh kosong"),
            email: z.string().nonempty("Tidak boleh kosong"),
            confirmPassword: z.string().nonempty("Tidak boleh kosong"),
        }).superRefine(({ confirmPassword, password }, ctx) => {
            if (confirmPassword != password) {
                ctx.addIssue({
                    code: "custom",
                    message: "Password tidak sama"
                })
            }
        })),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
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
                alignItems: "center",
                justifyContent: "center"

            }}>

                <TouchableOpacity style={{ position: "absolute", top: 10, left: 0, padding: 10 }} onPress={() => {
                    setActive(false)
                }}>
                    <Ionicons name="arrow-back" size={35} color="black" />
                </TouchableOpacity>
                <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                    <Text style={{
                        fontFamily: "Titan-One",
                        fontSize: 50,
                        alignSelf: "center",
                        marginBottom: 20
                    }}>Sign Up</Text>
                    <Controller
                        name="username"
                        control={control}
                        render={({ field: { name, ref, onChange, ...props }, fieldState: { error } }) => <TextField onChangeText={onChange} textStyle={{
                            fontWeight: "bold",
                            color: "black",
                            display: "none"
                        }}  {...props} HeaderIcon={<AntDesign name="user" size={24} color="black" />} label="Username" style={{ width: "100%", height: 15 }} error={error?.message} />
                        }
                    />
                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { name, ref, onChange, ...props }, fieldState: { error } }) => <TextField containerStyle={{ marginVertical: 20 }} textStyle={{
                            fontWeight: "bold",
                            color: "black",
                            display: "none"
                        }} onChangeText={onChange}  {...props} HeaderIcon={<Entypo name="email" size={24} color="black" />} label="Email" style={{ width: "100%", height: 15 }} error={error?.message} />
                        }
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { name, ref, onChange, ...props }, fieldState: { error } }) => <TextField textStyle={{
                            fontWeight: "bold",
                            color: "black",
                            display: "none"
                        }} onChangeText={onChange} HeaderIcon={<MaterialCommunityIcons name="onepassword" size={24} color="black" />}  {...props} label="Password" style={{ width: "100%", height: 15 }} containerStyle={{ marginVertical: 20 }} error={error?.message} />
                        }
                    />
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field: { name, ref, onChange, ...props }, fieldState: { error } }) => <TextField textStyle={{
                            fontWeight: "bold",
                            color: "black",
                            display: "none"
                        }} onChangeText={onChange} HeaderIcon={<MaterialCommunityIcons name="onepassword" size={24} color="black" />}  {...props} label="Confirm Password" containerStyle={{ marginVertical: 20 }} style={{ width: "100%", height: 15, }} error={error?.message} />
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