import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import {SearchBar} from 'react-native-elements'
import axios from 'axios'


var server = axios.create({
    baseURL: 'https://samples.openweathermap.org/data/2.5',
    timeout: 1000
})

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {zipcode: ''}
    this.data = {data: {}}
    this.city = {city: ''}
    this.error = {error: ''}
  }

  findCities() {
    server.get('/forecast?zip=94040,us&appid=b6907d289e10d714a6e88b30761fae22')
      .then((response) => {
        // this.setState({city:response.city.name})
        console.log('response========')
        var res = JSON.stringify(response)
        console.log(res)
        console.log(res.data)
        this.setState({data:JSON.stringify(response).data.list})
      })      
      .catch((err) => {
        console.log('error='+err)
        this.setState({error:err.message})
      })
  }
  render() {
    return ( 
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
            <TouchableOpacity  style={styles.button} onPress={this.findCities.bind(this)} >
              <Text style={styles.textStyle}>Search</Text>
            </TouchableOpacity>
            </View>
            <Text style={{fontSize:18}}>Error: {this.state.error}</Text>
            <Text style={{fontSize:18}}>City: {this.state.city}</Text>
            <FlatList
              data={this.state.data}
              renderItem={({item}) => <Text>{item.weather[0].description}</Text>}
            />
            </View>
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