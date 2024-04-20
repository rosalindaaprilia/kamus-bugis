import { useNavigation } from "@react-navigation/native";
import { Button, TextField } from "frasydi-ui";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../../hooks/useAuths";

const Dimension = Dimensions.get("window");
export default function RegisterPage() {
  const nav = useNavigation();
  const auth = useAuth()
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            width: Dimension.width + Dimension.width * 0.4,
            height: Dimension.width + Dimension.width * 0.4,
            backgroundColor: "#013298",
            borderRadius: Dimension.width,
            position: "absolute",
            top: "-30%",
            left: "-30%",
          }}
        ></View>
        <SafeAreaView>
          <View
            style={{
              marginHorizontal: "10%",
              marginTop: "10%",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 34,
                fontFamily: "Poppins-Bold",
              }}
            >
              Selamat Datang
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 15,
              }}
            >
              Buat Akun untuk melanjutkan
            </Text>
          </View>
          <Image
            style={{
              objectFit: "contain",
              position: "absolute",
              top: Dimension.height * 0.5,
              transform: [
                {
                  translateY: -50,
                },
              ],
              left: 0,
              right: 0,
            }}
            source={require("../../assets/welcome.png")}
          />
          <ScrollView contentContainerStyle={{}}>
            <View
              style={{
                marginHorizontal: 20,
              }}
            >
              <TextField name="Nama Pengguna" />
              <TextField name="Nomor Ponsel" />
              <TextField name="Kata Sandi" password />
              <TextField name="Konfirmasi Kata Sandi"  password />
              <Button
                label="Masuk"
                onPress={() => {
                  auth.login({username : "Frasydi", password :"Oke"})
                }}
                containerStyle={{
                  marginTop: 20,
                  backgroundColor :"#013298"
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 30,
                  justifyContent: "flex-end",
                }}
              >
                <Text>Sudah punya akun ?</Text>
                <TouchableOpacity onPress={() => {
                    nav.navigate("Login")
                }}>
                  <Text style={{ fontWeight: "bold" }}> MASUK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
}
