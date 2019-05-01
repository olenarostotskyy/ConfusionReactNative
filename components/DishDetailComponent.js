import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

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

function DishDetail(props) {//here we make use of the card!
    return (<RenderDish dish={props.dish} />);
}

export default DishDetail;