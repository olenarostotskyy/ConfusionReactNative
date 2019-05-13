import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';




const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
};

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});



function RenderDish(props) {

    const dish = props.dish;//render dish function will receive as props that dish here


    if (dish != null) {
        return (
            <Card
                // when dish is null we will return the card
                //And the card takes Props as featuredTitle, which is going to be shown in the Card
                featuredTitle={dish.name}//dish object will contain a featuredTitle
                image={{ uri: baseUrl + dish.image }}>

                <Text style={{ margin: 10 }}>
                    {dish.description}
                </Text>
                <View style={styles.cardRow}>
                    <Icon
                        raised//if I use the prop or attribute as raised for the Icon, what this does is it displays the Icon in the form of a button, a rounded button. will automatically make that into a button-like display
                        reverse//reverse the color
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    //if it is already the favourite dish -console.log
                    //Otherwise, I'm going to call props.onPress() and then we will close off the icon here. So, again, using the props.favorite, if it is true, then I'm going to simply log out saying it's already in the favorites. If it's false, then I'm going to call the onPress(), which will be passed in as a parameter here.
                    />
                    <Icon
                        raised//if I use the prop or attribute as raised for the Icon, what this does is it displays the Icon in the form of a button, a rounded button. will automatically make that into a button-like display
                        reverse//reverse the color
                        name="pencil"
                        type='font-awesome'
                        color='#f50'
                        style={styles.cardItem}
                        onPress={() => props.onShowModal()}

                    //if it is already the favourite dish -console.log
                    //Otherwise, I'm going to call props.onPress() and then we will close off the icon here. So, again, using the props.favorite, if it is true, then I'm going to simply log out saying it's already in the favorites. If it's false, then I'm going to call the onPress(), which will be passed in as a parameter here.
                    />
                </View>
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
                <Rating
                    type="star"
                    fractions={0}
                    startingValue={+item.rating}
                    imageSize={10}
                    readonly
                    style={{ alignItems: 'flex-start', paddingVertical: '5%' }}
                />
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
            favorites: [],
            rating: 5,
            author: '',
            comment: '',
            showModal: false
        };
    }


    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    static navigationOptions = {
        title: 'Dish Details',

    };
    handleComment(dishId) {
        this.toggleModal();
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
    }


    resetForm() {
        this.setState({
            rating: 5,
            author: '',
            comment: '',
            showModal: false
        });
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId', '');
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}//Some will return a true if there exists an item in there that matches this function, otherwise, it will return a false. 
                    //will check every element in this array to see if this element, Is the same as the dishId.
                    //If this evaluates to true, if anyone of the elements in the array evaluates to true, this will return a true, and that's what this favorite will return. So, your favorite will be true if the dish ID already exists in this array. If it doesn't exist in this array, then el === dishId will fail for all the dishIds, and then so, in that case this will return a false.
                    onPress={() => this.markFavorite(dishId)}
                    // toggleModal={() => this.toggleModal()}!!!!!! was the problem
                    onShowModal={() => this.toggleModal()}

                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />


                <Modal animationType={"slide"} transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()}>
                    <View>

                        <Rating
                            showRating
                            type="star"
                            fractions={0}
                            startingValue={this.state.rating}
                            imageSize={40}
                            onFinishRating={(rating) => this.setState({ rating: rating })}
                            style={{ paddingVertical: 10 }}
                        />
                        <Input
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            onChangeText={(author) => this.setState({ author: author })}
                            style={{ paddingVertical: 10 }}
                            value={this.state.author}
                        />
                        <Input
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            onChangeText={(comment) => this.setState({ comment: comment })}
                            style={{ paddingVertical: 10 }}
                            value={this.state.comment}

                        />
                    </View>


                    <View style={{ margin: 10 }}>
                        <Button
                            onPress={() => { this.handleComment(dishId); this.resetForm(); }}
                            color="#512DA8"
                            title="Submit"
                        />
                    </View>
                    <View style={{ margin: 10 }}>
                        <Button
                            onPress={() => { this.toggleModal(); this.resetForm(); }}
                            color="grey"
                            title="Cancel"
                        />
                    </View>



                </Modal>
            </ScrollView>
            //will filter all the comments that belong to this particular dish
            //Only those comments where the dishId is the same as the dishId that you have just extracted, this should match
        );
    }

}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    },
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
