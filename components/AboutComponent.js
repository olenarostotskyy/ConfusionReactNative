import React, { Component } from 'react';
import { Text, ScrollView, FlatList,View  } from 'react-native';
import { Card,ListItem } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';




class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leaders: LEADERS
        };
    }
    static navigationOptions = {//f you want to further customize for each of the components in your navigator, you can specify the navigation options like this inside the component. 
        title: 'About us'//title will be "menu"
    }
  

render() {
    const renderLeaders = ({item, index}) => { //takes 2 param:item and index

        return (
           
            <ListItem
                key={index}
                title={item.name}
                subtitle={item.description}
                leftAvatar={{ source: require('./images/alberto.png') }}//require that means that, whatever I supply as the image here should be already included in the code here.
            />
        );
    }


    return (
       <ScrollView>
           <History/>
        <Card
        title='Corporate leadership'>

       
        <FlatList //this FlatList will be mapped into a list view in Android and the corresponding list view in iOS.
            //It takes a data as one of the parameters and the data that I'm going to pass is props.dishes. 
            data={this.state.leaders} //one of the paramenters ///
            renderItem={renderLeaders}// secend param--used to specify how to render each item in the list. //we will render each item in the list(should be array of objects)
            keyExtractor={item => item.id.toString()} //when you use renderItem you pahe to have the keyExtactor//
        //The keyExtractor will extract one of the props off each item in the array and use that as a key here. Now, in this case, every item, when you go into dishes.js file, you'll notice that every item in the dishes.js file has this id here. 
        />
         </Card>
         </ScrollView>
    );
}

}



function History(props) {
    return (
        <Card
            title='Our History'>
            <View>
                <Text>
                    Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
</Text>
                <Text>
                    The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
</Text>
            </View>
        </Card>
    )

}





export default About;


