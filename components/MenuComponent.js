import React from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes :DISHES
        };
    }

    static navigationOptions = {//f you want to further customize for each of the components in your navigator, you can specify the navigation options like this inside the component. 
        title: 'Menu'//title will be "menu"
    }


    render() {
        const renderMenuItem = ({ item, index }) => { //takes 2 param:item and index

            return (
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    onPress={() => navigate('DishDetail', { dishId: item.id })}
                    leftAvatar={{ source: require('./images/uthappizza.png') }}//require that means that, whatever I supply as the image here should be already included in the code here.
                />
            );
        }

        const { navigate } = this.props.navigation;

        return (
            <FlatList //this FlatList will be mapped into a list view in Android and the corresponding list view in iOS.
                //It takes a data as one of the parameters and the data that I'm going to pass is props.dishes. 
                data={this.state.dishes} //one of the paramenters ///
                renderItem={renderMenuItem}// secend param--used to specify how to render each item in the list. //we will render each item in the list(should be array of objects)
                keyExtractor={item => item.id.toString()} //when you use renderItem you pahe to have the keyExtactor//
            //The keyExtractor will extract one of the props off each item in the array and use that as a key here. Now, in this case, every item, when you go into dishes.js file, you'll notice that every item in the dishes.js file has this id here. 
            />
        );
    }

}

export default Menu;