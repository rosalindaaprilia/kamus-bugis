import { Pressable } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";

export const Button = ({ label, width, textColor, buttonStyle, containerStyle, textStyle,...buttonProps }) =>
    <View style={{borderRadius : 20, overflow : "hidden", width : width != null  ? width : "100%", ...containerStyle}}>
        
        <Pressable android_ripple={{
            color: "black",
        }} style={{ paddingVertical: 20, width :"100%",backgroundColor: "#FFCA6C", elevation : 5,...buttonStyle }} {...buttonProps} >
            <Text style={{ alignSelf :"center", fontFamily: "Poppins-Bold", color: textColor != null ? textColor : "whitesmoke", ...textStyle }}>{label}</Text>
        </Pressable>
    </View>

export const ButtonText = ({label, textColor,textPressColor,...buttonProps}) => <Pressable style={{paddingVertical : 20}}  {...buttonProps}>
    {
        ({pressed}) => <Text style={{alignSelf :"center", fontFamily :"Poppins-Bold", color : pressed ?  textPressColor!= null ? textPressColor :  "#FFB084" : textColor != null ? textColor : "#FFCA6C",textDecorationLine :"underline", textDecorationStyle :"solid"}}>{label}</Text>
    }
</Pressable>