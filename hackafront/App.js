import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, {Marker} from 'react-native-maps'

export default class App extends Component
{
    state = 
    {
        markers : 
        [{
            latitude: -8.003264247918796,
            longitude: -34.87099495638967,
            title: 'Onibus 1',
            subtitle: 'rota do onibus #3333'
        },
        {
            latitude: -8.025097269377099,
            longitude: -34.99660468037613,
            title: 'Onibus 2',
            subtitle: 'rota do onibus #12428'
        },
        {
            latitude: -7.95783310682058,
            longitude: -34.85016274859863,
            title: 'Onibus 3',
            subtitle: 'rota do onibus #'
        },
        ]
    } 

    render()
    {
        return (

        <View style={styles.container}>

            <MapView
            style={styles.map}
            loadingEnabled={true}
            region={{
                latitude: -8.003264247918796,
                longitude: -34.87099495638967,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
            >
                <Marker
                    coordinate={{latitude: -8.003264247918796,
                    longitude: -34.87099495638967}}
                    title={"title"}
                    description={"description"}
                />
                
            </MapView>

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