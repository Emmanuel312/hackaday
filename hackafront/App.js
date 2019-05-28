import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, {Marker} from 'react-native-maps'
import {Button, TextButton} from './styles'
const connection = new WebSocket('ws://192.168.0.200:3000/rabbitws');
connection.onopen = function()
{
    console.log('Connection open!');
}
// ws://10.0.2.2:3000/rabbitws
export default class App extends Component
{
    state = 
    {
        
        coordinate1:
        {
            latitude: 0,
            longitude: 0,
        },

    
        coordinate2:
        {
            latitude: 0,
            longitude: 0,
        },
        

        coordinate3:
        {
            latitude: 0,
            longitude: 0,
        }
    }    
        
    handleClick = (id) =>
    {
        connection.send(id)
        connection.onmessage = (e) =>
        {
            console.log(e.data)
            const dados = e.data.split(',');
            switch(dados[0])
            {
                case '3333':
                    const coordinate1 = {...this.state.coordinate1}
                    coordinate1.latitude = Number(dados[4])
                    coordinate1.longitude = Number(dados[5])
                    this.setState({coordinate1})
                    break;
                case '12428':
                    const coordinate2 = {...this.state.coordinate2}
                    coordinate2.latitude = Number(dados[4])
                    coordinate2.longitude = Number(dados[5])
                    this.setState({coordinate2})
                    break;
                case '12639':
                    const coordinate3 = {...this.state.coordinate3}
                    coordinate3.latitude = Number(dados[4])
                    coordinate3.longitude = Number(dados[5])
                    this.setState({coordinate3})
                    break;
            }
            
        }
    }
    render()
    {
        return (

        <View style={styles.container}>

            <MapView
            style={styles.map}
            loadingEnabled={true}
            region={{
                latitude: this.state.coordinate1.latitude,
                longitude: this.state.coordinate1.longitude,
                latitudeDelta: 0.3,
                longitudeDelta: 0.3,
            }}
            >

                <Marker 
                    coordinate={this.state.coordinate1}
                    title="3333"
                    />
                <Marker 
                coordinate={this.state.coordinate2}
                title="12428"
                />
                <Marker 
                coordinate={this.state.coordinate3}
                title="12639"
                />
                
            </MapView>
            <View>
                <Button onPress={() => this.handleClick('3333')}>
                    <TextButton>3333</TextButton>
                </Button>
                <Button onPress={() => this.handleClick('12428')}>
                    <TextButton>12428</TextButton>
                </Button>
                <Button onPress={() => this.handleClick('12639')}>
                    <TextButton>12639</TextButton>
                </Button>
            </View>
            
        </View>

        )
    }
}

const styles = StyleSheet.create({
  
  container: {
  
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

  },

  map: {

    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

  },

});