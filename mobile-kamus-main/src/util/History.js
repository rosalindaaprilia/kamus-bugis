import AsyncStorage from '@react-native-async-storage/async-storage';

export async function PushHistory(data) {
    // await AsyncStorage.removeItem("History")
    const datas = await AsyncStorage.getItem("History")
    const tempData = []
    if(datas != null) {
        try {

            const parseJson = JSON.parse(datas)
            if(parseJson.findIndex(el => el.id == data._id) != -1) return 
            tempData.push(...parseJson)
        }catch(err) {
            console.log(err)
        }
    }
    tempData.push({id : data._id, label : data.lexem || data.sub_entry})
    AsyncStorage.setItem("History", JSON.stringify(tempData))
}

export async function DeleteHistory(id) {
    const datas = await AsyncStorage.getItem("History")
    const tempData = []
    if(datas != null) {
        try {
            const parseJson = JSON.parse(datas)
            tempData.push(...parseJson)
        }catch(err) {
            console.log(err)
        }
    }
    
    AsyncStorage.setItem("History", JSON.stringify(tempData.filter(el => el.id != id)))
}