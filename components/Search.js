import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem, SearchBar } from '@rneui/base';

const Item = ({ name }) => {
  return (
    <View style={styles.item}>
      <Text>{name}</Text>
    </View>
  );
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      searchValue: "",
    };
    this.arrayholder = [];
  }

  searchFunction = async (text) => {
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${text}&limit=5&appid=9cceaa071674faa23e4fc606cf7a6c1d`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Mettre à jour l'état avec les données reçues de l'API
      this.setState({ data: data, searchValue: text });
    } catch (error) {
      console.error('Erreur lors de la requête à l\'API OpenWeatherMap : ', error);
      // Gérer l'erreur, afficher un message d'erreur à l'utilisateur, etc.
    }
  };

  renderItem = ({ item }) => <Item name={item.name} />;

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Search Here..."
          lightTheme
          round
          value={this.state.searchValue}
          onChangeText={(text) => this.searchFunction(text)}
          autoCorrect={false}
        />

      </View>
    );
  }
}

export default Search;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 2,
  },
  item: {
    backgroundColor: "#f5f520",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
