import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native"
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { ActivityIndicator, Share, StyleSheet, Text, View } from "react-native"
import { ChipsKataKerja } from "../../component/Chips";
import { FlatList, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { CardItems } from "../../component/CardItems";
import { Button } from "frasydi-ui";
import { Entypo } from '@expo/vector-icons';
export default function DetailScreen() {
  const route = useRoute()
  const nav = useNavigation()
  const { data, loading, error } = useQuery(gql`
    query getWordId($id : String!){
        word(id: $id) {
          _id
          related_words_id
          lexem
          homonym_number
          sub_entry
          phonetic_form
          part_of_speech
          sense_number
          definition
          example
          example_gloss
          relatedWords {
            _id
            related_words_id
            lexem
            homonym_number
            sub_entry
            phonetic_form
            part_of_speech
            sense_number
            definition
            example
            example_gloss
            relatedWords {
              _id
              related_words_id
              lexem
              homonym_number
              sub_entry
              phonetic_form
              part_of_speech
              sense_number
              definition
              example
              example_gloss
              
            }
          }
        }
      }
      `, {
    variables: {
      id: route.params.id
    }
  })

  useEffect(() => {
    console.log(data?.word)
  }, [data])

  const onShare = async() => {
    try {
      const result = await Share.share({
        message:
          `${data?.word?.lexem || data?.word?.sub_entry} memiliki beberapa arti sbg :\n${data?.word?.definition?.map((el, ind) => `${ind+1}. ${el}\n` )}`,
          title :data?.word?.lexem || data?.word?.sub_entry
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  if (error) return <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text style={{ fontWeight: "bold", fontSize: 30 }}>Terdapat Masalah</Text>
  </SafeAreaView>
  if (loading) return <SafeAreaView style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator size={50} />
  </SafeAreaView>
  return (
    <SafeAreaView style={{ flex: 1, marginTop: "15%" }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginHorizontal: 20, elevation: 10, backgroundColor: "white", marginVertical: 20, borderRadius: 20 }}>
          <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
            <View style={{ justifyContent: "space-between", flexDirection :"row" }}>
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>{data.word?.lexem || data.word?.sub_entry}</Text>
              <TouchableOpacity onPress={onShare} >
                <Entypo name="share" size={30} color="rgb(0,166,230)"  />
              </TouchableOpacity>
              
            </View>
            <Text style={{ color: "rgb(0,166,230)", fontSize: 18, fontStyle: "italic" }}>{data.word?.phonetic_form || data.word?.lexem || data.word?.sub_entry}</Text>
            <ScrollView horizontal style={{  marginTop: 20 }}>
              <ChipsKataKerja label={"benda"} isSelect={data.word?.part_of_speech == "n"} />
              <ChipsKataKerja label={"kerja"} isSelect={data.word?.part_of_speech == "v"} />
              <ChipsKataKerja label={"keterangan"} isSelect={data.word?.part_of_speech == "adv"} />
            </ScrollView>
            <Text style={{ marginTop: 20, fontFamily: "Poppins-Bold" }}>Definisi</Text>
            {
              data.word?.definition?.map((el, ind) => (
                <View key={"Definisi-" + ind} style={{ flexDirection: "row" }}>
                  <Text style={{ fontFamily: "Poppins-Bold" }}>{ind + 1}. </Text>
                  <Text style={{ fontFamily: "Poppins" }}>{el}</Text>
                </View>))
            }

            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <View style={{ width: "50%" }}>

                {
                  data.word?.example != null && data.word?.example?.length > 0 ?
                    <>
                      <Text style={{ fontFamily: "Poppins-Bold" }}>Contoh</Text>
                      {

                        data.word?.example?.map((el, ind) => (
                          <Text key={"Contoh-Lokal-" + ind} style={{ fontFamily: "Poppins", color: "rgb(0,166,230)", flexWrap: "wrap" }}>{ind + 1}. {el}</Text>
                        ))
                      }
                    </>
                    : <></>
                }
              </View>
              <View style={{ width: "50%" }}>

                {
                  data.word?.example_gloss != null && data.word?.example_gloss.length > 0 ?
                    <>
                      <Text style={{ fontFamily: "Poppins-Bold" }}>Arti Contoh</Text>
                      {

                        data.word?.example_gloss?.map((el, ind) => (
                          <Text key={"Contoh-Lokal-" + ind} style={{ fontFamily: "Poppins", color: "rgb(0,166,230)", flexWrap: "wrap" }}>{ind + 1}. {el}</Text>
                        ))
                      }
                    </> :
                    <></>
                }
              </View>
            </View>
            {
              data.word?.related_words_id != null ?

                <TouchableOpacity style={{ marginTop: 10, color: "#FFCA6C", }} onPress={() => {
                  nav.push("Detail", {
                    id: data.word.related_words_id,
                  })
                }}>
                  <Text style={{ fontFamily: "Poppins" }}>Lihat Lema Dasar</Text>
                </TouchableOpacity>

                : <></>
            }
            {
              data.word?.relatedWords?.length > 0 ? <>
                <Text style={{ fontFamily: "Poppins-Bold", marginTop: 20 }}>Relasi</Text>
                <View>
                  <FlatList
                    data={data.word?.relatedWords}
                    horizontal
                    contentContainerStyle={{
                      paddingHorizontal: 20,
                      paddingVertical: 20
                    }}
                    renderItem={({ item }) => <CardItems onPress={() => {
                      nav.push("Detail", {
                        id: item._id,
                      })
                    }} containerStyle={{
                      marginRight: 20
                    }}
                      item={item} />}
                  />
                </View>

              </> : <></>
            }
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>


  )
}

