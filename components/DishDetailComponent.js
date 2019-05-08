import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';

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
                <Icon
                    raised//if I use the prop or attribute as raised for the Icon, what this does is it displays the Icon in the form of a button, a rounded button. will automatically make that into a button-like display
                    reverse//reverse the color
                    name={ props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    //if it is already the favourite dish -console.log
                    //Otherwise, I'm going to call props.onPress() and then we will close off the icon here. So, again, using the props.favorite, if it is true, then I'm going to simply log out saying it's already in the favorites. If it's false, then I'm going to call the onPress(), which will be passed in as a parameter here.
                    />
            </Card>
        );
    }
    else {
        return (<View></View>);//empty view
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };

    return (
        <Card title='Comments' >
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}



class DishDetail extends Component {//here we make use of the card!

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            favorites: []//empty array, and then as I select the dishes and mark them as favorites, then they will be added into the favorites array. And then I can use the favorites array to check to see if my dish is a favorite dish or not.
        };
    }

    markFavorite(dishId) {
        this.setState({favorites: this.state.favorites.concat(dishId)});// add the favotite to  the array
    }

    // navigation
    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId', '');
        return (
            <ScrollView>
                <RenderDish dish={this.state.dishes[+dishId]} 
                favorite={this.state.favorites.some(el => el === dishId)}//Some will return a true if there exists an item in there that matches this function, otherwise, it will return a false. 
                //will check every element in this array to see if this element, Is the same as the dishId.
                //If this evaluates to true, if anyone of the elements in the array evaluates to true, this will return a true, and that's what this favorite will return. So, your favorite will be true if the dish ID already exists in this array. If it doesn't exist in this array, then el === dishId will fail for all the dishIds, and then so, in that case this will return a false.
                onPress={() => this.markFavorite(dishId)} 
                />
                <RenderComments comments={this.state.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
            //will filter all the comments that belong to this particular dish
            //Only those comments where the dishId is the same as the dishId that you have just extracted, this should match
        );
    }

}

export default DishDetail;