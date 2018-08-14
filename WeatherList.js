import React, {Component} from 'react';
import {connect} from 'react-redux';
import {listRepos} from './reducer';
import {FlatList, View, Text, StyleSheet, ActivityIndicator} from 'react-native';

class WeatherList extends Component {

    renderItem = ({ item }) => (
        <View style={styles.item}>
          <Text>{item.weather[0].description}</Text>
        </View>
      );

       /* data={this.state.data}
              renderItem={({item}) => <Text>{item.weather[0].description}</Text>}
            /> */
    render() {
        const {data} = this.props;
        const {isLoading} = this.props;
        const {error} = this.props;
        return (
            <View styles={styles.container}>
            {error && <Text style={{padding: 20, paddingTop: 40}}>{error}</Text>}
            {data.city && <Text style={{fontSize:18}}>City: {data.city.name}</Text>}
            <FlatList 
                data={data.list}
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
    },
});

const mapStateToProps = state => {
    let storedProps = state.data.map(data => ({key:data.city.name.toString(), ...data}));
    
    return {
        data: storedProps,
        isLoading: state.loading,
        error: state.error,
    };
};

const mapDispatchToProps = {
    getWeather
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherList);