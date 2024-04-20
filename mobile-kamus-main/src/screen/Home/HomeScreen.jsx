import { ActivityIndicator, Dimensions, RefreshControl, ScrollView, SafeAreaView, Text, FlatList, View, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { useCallback, useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import { CardItems } from "../../component/CardItems";
import { gql, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native"
import SearchResult from "../../component/SearchResult";
import SearchButton from "../../component/SearchButton";
import WordItems from "../../component/WordItems";
import { Feather } from '@expo/vector-icons';


const { width } = Dimensions.get('window');
//you need to preview n items.
const previewCount = 1;
//to center items
//the screen will show `previewCount` + 1/4 firstItemWidth + 1/4 lastItemWidth 
//so for example if previewCount = 3
//itemWidth will be =>>> itemWidth = screenWidth / (3 + 1/4 + 1/4)
const itemWidth = width / (previewCount + .5);

export default function HomeScreen() {
  const nav = useNavigation()
  const window = Dimensions.get("window")
  const [openSearch, setOpenSearch] = useState(false)
  const cardListRef = useRef();
  const [page, setPage] = useState(10)
  
  const { data, error, loading, refetch } = useQuery(gql`
  query WordsQuery {
      words {
        _id
        lexem
        definition
        # example
        # homonym_number
        # phonetic_form
        # example_gloss
        # part_of_speech
        # sense_number
        # sub_entry
        # related_words_id

      }
    }

`)
  const datatemp = useMemo(() => {
    if (error || loading) {
      return []
    }
    if (data?.words == null) return []

    return data?.words?.filter((el, ind) => ind <= page)
  }, [data, page])

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(10)
    refetch()
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);
 

const limits = useMemo(() => {
  if (data?.words == null) return 0
  return data.words.length
}, [data])



  useLayoutEffect(() => {
    nav.setOptions({
      headerRight: () => <TouchableOpacity style={{ marginRight: 20, marginTop: 20 }} onPress={() => {
        setOpenSearch(true)
      }}>
        <Feather name="search" size={24} color="black" />
      </TouchableOpacity>
    })
  }, [])

  if (loading) return <SafeAreaView style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
  <ActivityIndicator size={50} />
</SafeAreaView>

  if(error) return <SafeAreaView style={{flex : 1, justifyContent :"center", alignItems :"center"}}>
    <Text style={{fontWeight :"bold", fontSize : 40}}>{error.cause + " : "+ error.message}</Text>
  </SafeAreaView>

  return (


    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

      <TouchableWithoutFeedback style={{ marginHorizontal: 20 }}>

        <View style={{ marginTop: 20 }}>

          {
            !loading && !error && <FlatList

              data={datatemp}
              ListEmptyComponent={<ActivityIndicator />}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
             
              ListHeaderComponent={
                <>
                  <SearchResult open={openSearch} setOpen={setOpenSearch} />
                  <Text style={{ fontFamily: "Poppins-Bold", fontSize: 15, marginTop: 40 }}>Lema Terbaru</Text>
                  <View>
                    {
                      !loading && !error && <FlatList
                        horizontal
                        ref={cardListRef}
                        data={datatemp}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        contentContainerStyle={{ paddingVertical: 10, }}
                        decelerationRate={0}
                        snapToAlignment={"center"}



                        renderItem={({ item }) => <CardItems onPress={() => {
                          nav.push("Detail", {
                            id: item._id,
                          })
                        }}
                          containerStyle={{
                            width: itemWidth - 40,
                            marginHorizontal: 20
                          }}
                          item={item} />}
                      />
                    }
                  </View>
                  <Text style={{ fontFamily: "Poppins-Bold", fontSize: 15, marginBottom: 10 }}>Daftar Lema</Text>
                </>


              }

              stickyHeaderHiddenOnScroll

              renderItem={({ item, index, separators }) => <WordItems key={"List-Words-" + (index + 1)} onPress={() => {
                nav.navigate("Detail", {
                  id: item._id
                })
              }} label={item.lexem || item.sub_entry} containerStyle={
                {
                  borderBottomWidth: index == data.words.length - 1 ? 0 : 1,
                }
              }


              />}
              onEndReached={() => {
                console.log("Reached end")
                setPage(page + 10)
              }}

              onEndReachedThreshold={0.1}
            />
          }
        </View>


      </TouchableWithoutFeedback>
    </SafeAreaView>

  )
}