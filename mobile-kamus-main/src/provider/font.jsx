import { useFonts } from "expo-font"
import { useEffect } from "react"
import * as SplashScreen from "expo-splash-screen"


SplashScreen.preventAutoHideAsync()

export default function FontProvider({ children }) {
    const [loaded] = useFonts({
        "Titan-One": require("../assets/Font/TitanOneRegular.ttf"),
        "Poppins-Bold" : require("../assets/Font/Poppins-Bold.ttf"),
        "Poppins" : require("../assets/Font/Poppins-Regular.ttf"),
    })

    useEffect(() => {
        if(loaded) {
            (async() => {
                await SplashScreen.hideAsync()
            })()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    return (
        children 
    )
}