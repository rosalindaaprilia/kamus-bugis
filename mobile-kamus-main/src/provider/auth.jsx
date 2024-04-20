import { useEffect, useState } from "react"
import { createContext } from "react"
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from "@react-navigation/native";
export const AuthContext = createContext({
    user: "",
    isLoading: false,
    login: async () => { },
    register: async () => { },
    setUser: async () => { },
    isOffline: false
})
export default function Auth({ children }) {
    const [isLoading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [isOffline, setIsOffline] = useState(false)
    
    async function Login({ username, password }, cb) {
        try {
            setUser(username)
        } catch (err) {
            console.error(err)
            cb("Server Error")
        }
    }

    async function Register({ username, password }, cb) {
        try {

        } catch (err) {
            console.error(err)
            cb("Server Error")
        }
    }

    useEffect(() => {
        NetInfo.addEventListener(state => {
            setIsOffline(!state.isConnected)
          });
    
        (
            async () => {
                try {

                    setLoading(true)
                    setUser("Username")
                    console.log("Test")
                } catch (err) {
                    console.error(err)
                } finally {
                    setLoading(false)
                }
            }
        )()

        return () => {
            setUser(null)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            isLoading: isLoading,
            login: Login,
            register: Register,
            user: user,
            setUser: setUser,
            isOffline
        }}>
            {children}
        </AuthContext.Provider>
    )
}