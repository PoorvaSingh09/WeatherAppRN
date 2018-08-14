import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import {SearchBar} from 'react-native-elements'

import {createStore, applyMiddleware} from 'redux'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import reducer from './reducer'
import {Provider} from 'react-redux'
import WeatherList from './WeatherList'

const client = axios.create({
  baseURL: 'https://samples.openweathermap.org/data/2.5',
  responseType: 'json'
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {zipcode: ''}
  }

  render() {
    return ( 
      <Provider store={store}>
          <View style={styles.container}>
          <View style={styles.rowContainer}>
            <SearchBar lightTheme={true}
                       placholder="Search by zipcode"
                       placeholderTextColor="red"
                       round={true}
                       onChangeText= {(zipcode) => this.setState({zipcode})}
                       value={this.state.zipcode}
                       containerStyle={styles.searchContainerStyle}
            />
            <TouchableOpacity  style={styles.button} onPress={this.store.getWeather(12345).bind(this)} >
              <Text style={styles.textStyle}>Search</Text>
            </TouchableOpacity>
            </View>
            
            <WeatherList/>
              {/* data={this.state.data}
              renderItem={({item}) => <Text>{item.weather[0].description}</Text>}
            /> */}
            </View>
          </Provider>
    )
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 40,
    marginLeft: 10,
    marginRight:10,
  },
  rowContainer: {
    flexDirection:"row", 
    borderRadius:4,
    justifyContent:"space-between",
  },
  searchContainerStyle: {
    flexGrow:1,
  },
  textStyle: {
    fontSize: 14,
    fontWeight:"bold",
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#E2E8ED',
    padding: 10,
    borderWidth:1,
    paddingLeft:10,
  }
})