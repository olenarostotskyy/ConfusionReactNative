import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishDetailComponent';
import {View} from 'react-native';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null //another prop ( after we creatred dishDetailComponent)
        };
    }


    onDishSelect(dishId) { //method which takes the dish ID as a parameter here
        this.setState({ selectedDish: dishId });
    }

    render() {

        return (
            <View>
                <Menu dishes={this.state.dishes} //this.state.dishes as the props here.
                    onPress={(dishId) => this.onDishSelect(dishId)}/>
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)} />
            </View>
            ////will return a sub-array containing only those elements from the dishes array that will match this criteria, where the dish.id is the same as the selected dish.  
        );
    }
}

export default Main;