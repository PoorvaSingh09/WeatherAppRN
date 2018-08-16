import React, {Component} from 'react'
import {connect} from 'react-redux'
import {FlatList, ActivityIndicator} from 'react-native'
import {View, Text, StyleSheet} from 'react-native'

class WeatherList extends Component {

    renderItem = ({ item }) => (
        <View style={styles.item}>
          <Text>{item.weather[0].description}</Text>
        </View>
      );

    render() {
        const {data} = this.props;
        const {isLoading} = this.props;
        const {error} = this.props;
        return (
            
            <View styles={styles.container}>
            {error && <Text style={{padding: 20, paddingTop: 40}}>{error}</Text>}
            {data.city && <Text style={{fontSize:18}}>City: {data.city.name}</Text>}
            <FlatList 
                style= {{flex:1}}
                data={data}
                keyExtractor={(item, index) => item.dt.toString()}
                renderItem={this.renderItem}
            />
            <ActivityIndicator size="large" color="#0000ff" animating={isLoading}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },rowContainer: {
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
});

const mapStateToProps = state => {
    let storedProps = state.data.list.map(data => ({city:state.data.city, ...data}));
    console.log(state.loading)
    return {
        data: storedProps,
        isLoading: state.loading,
        error: state.error,
    };
};

export default connect(mapStateToProps, null)(WeatherList);