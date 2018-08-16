import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getWeather} from '../Services/client'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import {SearchBar} from 'react-native-elements'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {zipcode: ''}
      }
      
    render() {
        return (
            <View style={styles.rowContainer}>
            <SearchBar lightTheme={true}
                       placholder="Search by zipcode"
                       placeholderTextColor="red"
                       round={true}
                       onChangeText= {(zipcode) => this.setState({zipcode})}
                       value={this.state.zipcode}
                       containerStyle={styles.searchContainerStyle}
            />
            <TouchableOpacity  style={styles.button} 
                                onPress={() => this.props.getWeather(this.state.zipcode, 'us')} >
              <Text style={styles.textStyle}>Search</Text>
            </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create ({
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
      borderWidth:1,
      paddingLeft:10,
    }
  })

const mapDispatchToProps = {
    getWeather
};

export default connect(null, mapDispatchToProps)(Header);