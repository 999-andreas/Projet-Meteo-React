import React, { useState, useRef } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';
import {onCitySelect} from '../Main';

const WeatherSearch = (props) => {
  const [search, setSearch] = useState('');
  const [cityList, setCityList] = useState([]);
  const debounceIdRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);

  const renderCityItem = ({ item, index }) => {
    const isFirstItem = index === 0;
    const isLastItem = index === cityList.length - 1;

    return (
      <TouchableOpacity 
      style={[styles.cityItem,
              index === cityList.length - 1 && { borderBottomWidth: 0 },
              isFirstItem && { paddingTop: 0 },
              isLastItem && { paddingBottom: 0, borderBottomWidth: 0 }
            ]} 
      onPress={() => {
        // Gérer la sélection de la ville ici
        props.onCitySelect(item);
        console.log("Ville sélectionnée:", item.name);
        setModalVisible(false); // Fermer le modal après sélection
      }}
    >
      {/*<Text style={styles.cityText}>{item.name}, {item.regionCode}, {item.country}</Text>*/}
      <Text style={styles.cityName}>{item.name}</Text>
      <Text style={styles.cityDetails}>{item.regionCode + ', ' + item.country}</Text>
    </TouchableOpacity>
    );
  };
  

  const fetchCities = async (query) => {
    const options = {
      method: 'GET',
      url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
      params: { namePrefix: query, limit: '5', languageCode: 'fr', sort: '-population' },
      headers: {
        'X-RapidAPI-Key': '8b6183a61emsh29be6e97e8d0f83p10c146jsn3a48394bf1ec',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
      
    };
    
    try {
      const response = await axios.request(options);
      setCityList(response.data.data);
    } catch (error) {
      console.error(error);
    }
    setModalVisible(true);
  };

  const handleSearch = (query) => {
    clearTimeout(debounceIdRef.current);
    setSearch(query);

    if (query.length > 2) {
      debounceIdRef.current = setTimeout(() => {
        console.log("Requête déclenchée pour:", query);
        fetchCities(query);
      }, 1000); // Délai en ms
    }
  };

  // Ajoutez ici la logique pour gérer la sélection d'une ville

  return (
    <View>
      <SearchBar
        containerStyle={{
          ...styles.searchBar,
          backgroundColor: 'transparent',
          borderTopColor: 'transparent', // Enlève la bordure supérieure
          borderBottomColor: 'transparent' // Enlève la bordure inférieure
        }}
        inputContainerStyle={{backgroundColor: '#6092CD'}}
        inputStyle={{color: '#AAAAAA'}}
        searchIcon={{ color: '#AAAAAA' }}
        clearIcon={{ color: '#AAAAAA' }}
        placeholder="Rechercher une ville..."
        placeholderTextColor="#AAAAAA"
        onChangeText={handleSearch}
        value={search}
        
        round
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}>
          <View style={styles.modalView}>
            <FlatList
              data={cityList}
              renderItem={renderCityItem}
              keyExtractor={(item, index) => `key-${index}`}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginTop: '3%',
    width: '100%'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalView: {
    // Styles pour le modal, par exemple :
    backgroundColor: 'rgba(96, 146, 205, 0.95)', //couleur et transparence
    padding: 20,
    elevation: 5,
    marginTop: '30%',
    borderRadius: 10,
    width: '90%',
  },
  cityItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#000000',
  },
  cityName: {
    fontSize: 18,
    fontWeight: 'bold', // Mettre le nom de la ville en gras
    color: 'black',
  },
  cityDetails: {
    fontSize: 16,
    color: 'black', // Styles pour la région et le pays
  },
});

export default WeatherSearch;
