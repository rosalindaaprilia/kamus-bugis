import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getOffileWords() {
    try {
        const data = await AsyncStorage.getItem("@word")
        if(data == null) return {
            status : false,
            data : []
        }
        return JSON.parse(data)
    }catch(err) {
        console.error(err)
        await AsyncStorage.removeItem("@word")
        return {
            status : false,
            data : []
        }
    }
}

export async function downloadWords(data ) {
    try {
        return await AsyncStorage.setItem("@word", JSON.stringify(data))
    }catch(err) {
        console.error(err)
        return {
            status : false,
        }
    }
}