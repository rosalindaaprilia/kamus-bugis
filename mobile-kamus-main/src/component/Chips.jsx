import { Text, View } from "react-native";

export const ChipsKataKerja = ({label, isSelect}) => <View style={{ borderWidth: 1, backgroundColor :!isSelect?"transparent" : "rgb(0,166,230)", borderColor: "rgb(0,166,230)" }}>
    <Text style={{
        paddingHorizontal: 20,
        paddingVertical: 3,
        color: isSelect ?"whitesmoke": "rgb(0,166,230)"
    }}>{label}</Text>
</View>
