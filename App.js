import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import Header from './App/Header'
import {Provider} from 'react-redux'
import WeatherList from './App/WeatherList'
import {store} from './Services/client'

export default class App extends Component {
  
  render() {
    return ( 
      <Provider store={store}>
          <View style={styles.container}>
            <Header />
            <WeatherList />
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
  }
})

