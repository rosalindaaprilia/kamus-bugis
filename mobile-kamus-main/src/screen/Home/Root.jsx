import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "./HomeScreen"
import useAuth from "../../hooks/useAuths"
import UserAvatar from "@muhzi/react-native-user-avatar";
import { Dimensions, View } from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import TerjemahScreen from "./TerjemahScreen";
import UserScreen from "./UserOptions";
const Tabs = createBottomTabNavigator()
const width = Dimensions.get("window").width
export default function HomeRoot() {
    const auth = useAuth()
    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        return <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
                    } else if (route.name === 'Terjemah') {
                        return <MaterialIcons name={"translate"} size={24} color={color} />
                    } else if (route.name === "User") {
                        return <Ionicons name={focused ? "person-circle" : "person-circle-outline"} size={size} color={color} />
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#325BDA',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tabs.Screen name="Home" options={{
                
                headerLeft: () =>
                    <View style={{ marginHorizontal: 20, marginTop: 20 }}>

                        <UserAvatar
                            userName={"Test"}
                            size={40}
                            backgroundColor="#0be881"

                            active
                        />
                    </View>

                ,
                headerShadowVisible: false,



                headerTitleAlign: "center",
                headerTitleStyle: {
                    marginTop: 20
                },
                headerTitle : "Beranda",
                tabBarLabel : "Beranda"

            }} component={HomeScreen} />
            {/* <Tabs.Screen name="Terjemah" component={TerjemahScreen} /> */}
            <Tabs.Screen name="User" component={UserScreen} options={{
                headerTitle :"Pengguna",
                tabBarLabel :"Pengguna"
            }} />
        </Tabs.Navigator>
    )
}