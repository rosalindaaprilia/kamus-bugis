
import { Modal, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState, useCallback } from "react";
import { AntDesign } from '@expo/vector-icons';
import WordItems from "../../component/WordItems";
import { SearchBarComponent } from "../../component/SearchBar";
export default function OfflineSearch() {
    const [search, setSearch] = useState("")
    const searchRef = useRef()
    const [history, setHistory] = useState([])
    const [offlineData, setOfflineData] = useState([])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>Mode Luring</Text>
            <View style={{ paddingVertical: 20, flexDirection: "row", alignItems: "center" }}>
                
                <View style={{ width: "100%" }}>
                    <SearchBarComponent ref={searchRef} onSearch={setSearch} containerStyle={{}} />
                </View>
            </View>
            <View style={{ marginHorizontal: 20 }}>
                {
                    offlineData.length > 0 ? <FlatList
                        data={data.search}
                        keyExtractor={(item, ind) => item._id}
                        renderItem={({ item, index }) =>
                            <WordItems label={item.lexem || item.sub_entry} containerStyle={
                                {
                                    borderBottomWidth: index == data.search.length - 1 ? 0 : 1,
                                }
                            } />
                        }

                    /> : 
                    <View style={{justifyContent :"center", alignItems :"center"}}>
                    <Text>Tampaknya Anda belum mendownload Data</Text>
                    </View>
                }


            </View>
        </SafeAreaView>
    )
}