import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ActivityIndicator } from 'react-native';
export default function usersList() {
  const [data, setData] = useState([]);
  const [searchData, setsearchData] = useState(data);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addElement = () => {
    const newId = data[data.length-1].id+1;
    setData([...data, { name: text, id: newId }]);
    setText(""); // Clear the input after adding the element
  }
 
  const todoElement = ({ item }) => {
    let completed=item.completed;
    return (
      <Pressable onPress={() => { }}>
        <View style={styles.item}>
          <Text style={{ fontSize: 20 }}>{item.title}</Text>
          {/*  <Text>{item.id}</Text>*/}
 

        </View>
        <Pressable  style={{
            width: 20,
            height: 20,
            borderRadius: 3,
            backgroundColor: completed?"pink":'lightgray',
            justifyContent: 'right',
            alignItems: 'right',
            marginTop:5,
            marginLeft:10
          }} ></Pressable>
          <Text style={styles.border} ></Text>
      </Pressable>
    );
  }

  return loading ? (<ActivityIndicator size="large" style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }} />) : (
    <SafeAreaView style={styles.container}>
      

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={todoElement}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 15,
  },
  demo: {
    fontSize: 25,
    marginBottom: 10,
    color: "#023047"
    ,

  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
  },
  addButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    alignItems: 'center',
    borderRadius:9,
    margin:5
  },
  item: {
    flexDirection:"row",
    paddingVertical: 10,
    
  },
  border:{
    paddingVertical: 2,
    borderBottomWidth: 3,
    borderBottomColor: '#ccc',
  }
});
