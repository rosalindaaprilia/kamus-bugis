import { SafeAreaView, Text, View,ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, TextField } from "frasydi-ui";
import * as Updates from 'expo-updates';


export default function UserScreen() {

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        alert("Terdapat pembaruan. Aplikasi akan direstart untuk mengaplikasikan pembaruan")
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      // alert(`Error fetching latest Expo update: ${error}`);
      alert("Tidak ada pembaruan")
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#2148C0" }}>
      <View
        style={{
          position: "absolute",
          top: -50,
          right: -50,
          backgroundColor: "#3767FB",
          width: 250,
          height: 250,
          borderRadius: 300,
          zIndex: 11,
        }}
      ></View>
      <View
        style={{
          position: "absolute",
          top: -70,
          right: -70,
          backgroundColor: "#325BDA",
          width: 350,
          height: 350,
          borderRadius: 300,
          zIndex: 10,
        }}
      ></View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 20,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 30,
            color: "white",
          }}
        >
          Profile
        </Text>
        <View
          style={{
            width: "30%",
            aspectRatio: "1/1",
            backgroundColor: "white",
            borderRadius: 100,
            marginVertical: 20,
          }}
        ></View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 26,
            color: "white",
            marginBottom: 20,
          }}
        >
          Pengunjung
        </Text>
      </View>
      <View
        style={{
          zIndex: 20,
          backgroundColor: "white",
          flex: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <ScrollView>
          <View
            style={{
              marginVertical: 20,
              marginHorizontal: 20,
            }}
          >
            {/* <HeaderView label={"Email"} icon={ <MaterialIcons name="email" size={24} color={"rgba(0,0,0,0.5)"} />}/> */}
            {/* <TextField label="" name="Email" editable={false} value="test@Gmail.com"  /> */}
           
            {/* <Button label="Cek Pembaruan" containerStyle={{
              marginTop : 20,
            }} onPress={() => {
              onFetchUpdateAsync()
            }} /> */}
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const HeaderView = ({icon, label} ) => (
  <>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        columnGap: 20,
      }}
    >
        {
            icon && icon
        }
     
      <Text
        style={{
          color: "rgba(0,0,0,0.5)",
          fontSize : 20
        }}
      >
        {label}
      </Text>
    </View>
  </>
);
