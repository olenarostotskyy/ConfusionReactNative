import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishDetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';


const MenuNavigator = createStackNavigator({// a new component
    Menu: { screen: Menu },
    DishDetail: { screen: DishDetail }
}, {
        initialRouteName: 'Menu',//So this StackNavigator starts with menu as the first screen when this component is the stack.
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"
            }
        }
    })

class Main extends Component {
   

    render() {

        return (
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                
                <MenuNavigator />
            </View>
            //this platform that I have imported here from react-native gives me access to information about the specific platform on which my react-native application is running.
            ////will return a sub-array containing only those elements from the dishes array that will match this criteria, where the dish.id is the same as the selected dish.  
        );
    }
}

export default Main;