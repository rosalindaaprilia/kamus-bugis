import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";

export default function WordItems({ label, containerStyle, onPress }) {
    return (
        <Pressable  style={({pressed}) => [{
            paddingVertical: 15,

            borderBottomWidth: 0,
            
            backgroundColor :pressed ? "whitesmoke" : "white"
        
        }, 
        containerStyle]} onPress={onPress}>
            <Text style={{marginLeft : 5}}>{label}</Text>
        </Pressable>
    )
}