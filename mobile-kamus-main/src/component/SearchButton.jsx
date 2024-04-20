import { TouchableWithoutFeedback, View } from "react-native"
import { Feather } from '@expo/vector-icons';

export default function SearchButton({ containerStyle, onPress }) {
    return (
        <>
            <TouchableWithoutFeedback onPress={onPress}>
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
                    <View style={{position :"absolute", right : 10 }}>
                        <Feather name="search" size={24} color="#FFCA6C" />
                    </View>
                    <View  style={{ width: "100%", marginHorizontal: 20, height: "100%", paddingVertical : 15 }} />
                </View>
            </TouchableWithoutFeedback>
        </>
    )
}