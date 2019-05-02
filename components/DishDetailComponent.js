import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';


function RenderDish(props) {

    const dish = props.dish;//render dish function will receive as props that dish here

    if (dish != null) {
        return (
            <Card
            // when dish is null we will return the card
                //And the card takes Props as featuredTitle, which is going to be shown in the Card
                featuredTitle={dish.name}//dish object will contain a featuredTitle
                image={require('./images/uthappizza.png')}>
                
                <Text style={{ margin: 10 }}>
                    {dish.description}
                </Text>
            </Card>
        );
    }
    else {
        return (<View></View>);//empty view
    }
}

class DishDetail extends Component {//here we make use of the card!
    
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }
// navigation
    static navigationOptions = {
        title: 'Dish Details'
    };

    render(){
        const dishId = this.props.navigation.getParam('dishId','');
        return (<RenderDish dish={this.state.dishes[+dishId]} />);
    }
    
}

export default DishDetail;