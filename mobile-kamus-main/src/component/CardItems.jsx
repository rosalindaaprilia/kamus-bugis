import { StyleSheet, Text, TouchableOpacity, View, Pressable, Dimensions } from "react-native";
const Width = Dimensions.get("window").width
export const CardItems = ({ item, containerStyle, onPress }) => (
        <TouchableOpacity style={{ ...styles.containerCard, ...containerStyle }} onPress={onPress}  >
            <Text style={{ fontSize: 20, fontFamily: "Poppins-Bold" }}>{item.lexem || item.sub_entry || ""}</Text>
            <Text style={{ marginTop: 10, fontFamily: "Poppins", fontSize: 15 }}>{item.definition.length > 0 ? item.definition[0] : ""}</Text>

            <Text style={{ marginTop: 20, fontFamily: "Poppins-Bold", fontSize: 11, textAlign: "center", color: "rgb(0,166,230)" }}>Lanjut</Text>
        </TouchableOpacity>

)

const styles = StyleSheet.create({
    containerCard: {
        padding: 20,
        borderRadius: 20,
        backgroundColor: "white",
        elevation: 5

    }
})

