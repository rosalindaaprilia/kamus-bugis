import { gql, useQuery } from "@apollo/client";
import { Modal, Text, View, TouchableOpacity,FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { SearchBarComponent } from "./SearchBar";
import { useEffect, useRef, useState, useCallback } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeleteHistory, PushHistory } from "../util/History";
import { AntDesign } from '@expo/vector-icons';
import WordItems from "./WordItems";
export default function SearchResult({ open, setOpen }) {
    const nav = useNavigation()
    const [search, setSearch] = useState("")
    const searchRef = useRef()
    const [history, setHistory] = useState([])

    const { data, error, loading } = useQuery(gql`
    query SearchQuery($query: String!) {
        search(query: $query) {
            _id
            lexem
            definition
            example
            homonym_number
            phonetic_form
            example_gloss
            part_of_speech
            sense_number
            sub_entry
            related_words_id

        }
        }

    `, {
        variables: {
            query: search
        }
    })

    useEffect(() => {
        if (open) {
            const times = setTimeout(() => {
                searchRef.current.focus()
            }, 500)

            return () => {
                clearTimeout(times)
            }
        }
    }, [open])

    useFocusEffect(useCallback(() => {
        getHistory()

        return () => {
            setSearch("")
            setOpen(false)
        }
    }, []))

    async function getHistory() {
        const data = await AsyncStorage.getItem("History")
        if (data == null) return []
        const json = JSON.parse(data)
        setHistory(json)
    }

    return (
        <Modal
            animationType="fade"
            visible={open}
            transparent
            onRequestClose={() => {
                setOpen(false)
            }}
        >
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <View style={{ paddingVertical: 20, flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => {
                        setOpen(false)
                    }}>
                        <AntDesign name="arrowleft" size={25} color="black" />
                    </TouchableOpacity>
                    <View style={{ width: "90%" }}>
                        <SearchBarComponent ref={searchRef} onSearch={setSearch} containerStyle={{}} />
                    </View>
                </View>
                <View style={{ marginHorizontal: 20 }}>
                    {
                        (search.length == 0) ? <>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Riwayat Pencarian</Text>
                            <FlatList
                                data={history}
                                keyExtractor={(item, ind) => item.id}
                                renderItem={({ item, index }) => <View style={{ paddingVertical: 10 }} >
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <TouchableOpacity onPress={() => {
                                            nav.push("Detail", {
                                                id: item.id,
                                            })
                                        }}>
                                            <Text style={{ fontSize: 17, }}>{item.label}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => {
                                            (
                                                async () => {
                                                    console.log(item)
                                                    await DeleteHistory(item.id)
                                                    await getHistory()
                                                }
                                            )()
                                        }}>
                                            <Feather name="x" size={25} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </View>}
                            />
                        </> : data?.search != null && <FlatList
                            data={data.search}
                            keyExtractor={(item, ind) => item._id}
                            renderItem={({ item, index }) =>
                                <WordItems label={item.lexem || item.sub_entry} containerStyle={
                                    {
                                        borderBottomWidth: index == data.search.length - 1 ? 0 : 1,
                                    }
                                } onPress={() => {
                                    PushHistory(item)
                                    nav.navigate("Detail", {
                                        id: item._id
                                    })
                                }} />
                            }

                        />
                    }


                </View>
            </SafeAreaView>
        </Modal>
    )
}