import React, { Component } from 'react';
import { View, StyleSheet,Alert } from 'react-native';
import MapView, {Marker} from 'react-native-maps'
import { Button, TextButton,Menu } from './styles'
import api from './src/services/api'

const connection = new WebSocket('ws://172.22.64.71:3000/rabbitws');

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
        },
        clientCord:
        {
            latitude:-8.03127249841033,
            longitude:-34.95704824091886
        },
        isRadius: false
    }    
    async componentDidMount()
    {
        this._interval = setInterval(this.handleDistance,1000)
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this._interval);
     }

    handleDistance = async () =>
    {
        try
        {
            const initialCordinate = {...this.state.clientCord}
            const finalCordinate = {...this.state.coordinate1}
            const radius = 50000
            if(this.state.coordinate1.latitude != 0)
            {
                const dados = await api.post(`radiusdistance?radius=${radius}`, {initialCordinate,finalCordinate})
                console.log(this.state.isRadius)
                this.setState({isRadius:dados.data})
            }
            
        }
        catch(err)
        {
            console.log(err)
        }
       
        
    }

    handleClick = (id) =>
    {
        connection.send(id)
        connection.onmessage = (e) =>
        {
            //console.log(e.data)
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
        
        if(this.state.isRadius)
        {
            Alert.alert('Alerta','Seu onibus está no raio')
            this.componentWillUnmount()
        }
        
        return (

        <View style={styles.container}>

            <MapView
            style={styles.map}
            loadingEnabled={true}
            region={{
                latitude: this.state.clientCord.latitude,
                longitude: this.state.clientCord.longitude,
                latitudeDelta: 0.3,
                longitudeDelta: 0.3,
            }}
            >

                <Marker 
                    pinColor={'green'}
                    coordinate={this.state.coordinate1}
                    title="#3333"
                    description="onibus com o id 3333"
                    
                    />
                <Marker 
                coordinate={this.state.coordinate2}
                title="#12428"
                description="onibus com o id 12428"
                pinColor={'violet'}
                />
                <Marker 
                coordinate={this.state.coordinate3}
                title="#12639"
                description="onibus com o id 12639"
                pinColor={'gold'}
                />
                <Marker
                pinColor={'blue'}
                coordinate={this.state.clientCord}
                title="cliente"
                description="essa é sua posicao no mapa"
                />
            </MapView>
            <Menu>
                <Button onPress={() => this.handleClick('3333')}>
                    <TextButton>3333</TextButton>
                </Button>
                <Button onPress={() => this.handleClick('12428')}>
                    <TextButton>12428</TextButton>
                </Button>
                <Button onPress={() => this.handleClick('12639')}>
                    <TextButton>12639</TextButton>
                </Button>

                <Button onPress={this.handleDistance}>
                    <TextButton>Saber se a distancia do meu onibus</TextButton>
                </Button>
            </Menu>
            
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