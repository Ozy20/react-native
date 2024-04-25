import { Link, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ActivityIndicator } from 'react-native';
export default function users() {
  const [data, setData] = useState([]);
  const [searchData, setsearchData] = useState(data);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [loading,setLoading] = useState (true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally{
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

  const searchElement = (searchText) => {
    setSearch(searchText); // Update search state with the input text

    if (searchText === "") {
      setsearchData(data); // Reset searchData to original data if search is empty
    } else {
      const filteredData = data.filter(element => element.name.includes(searchText));
      setsearchData(filteredData); // Update searchData with filtered results
    }
  }

  const renderItem = ({ item }) => {
    return(
      <Pressable onPress={() => {router.navigate(`/users/${item.id}`)}}>
        <View style={styles.item}>
          <Text style={{fontSize:20}}>{item.name}</Text>
          <Text>{item.id}</Text>
          <Pressable onPress={() => setData(data.filter(element => element.id != item.id))} style={styles.addButton} ><Text>delete</Text></Pressable>
        </View>
      </Pressable>
    );
  }

  return loading?(<ActivityIndicator size="large"  style={{flex: 1,alignItems: 'center', justifyContent: 'center',}}/>): (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Add new element'
          value={text}
          onChangeText={(t) => setText(t)}
          onSubmitEditing={addElement}
        />
        <Pressable onPress={addElement} style={styles.addButton}>
          <Text>Add</Text>
        </Pressable>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder='Search element'
          value={search}
          onChangeText={(t) => searchElement(t)}
        />
        {/*<Button onPress={() => searchElement(search)} title='Search' />*/}
      </View>

      <FlatList
        data={search === "" ? data : searchData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
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
    color:"#023047"
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
    marginLeft:5,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    borderRadius:10,
    borderWidth:3
  },
  addButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    alignItems: 'center',
    borderRadius:9,
    margin:5
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#ccc',
  },
});
