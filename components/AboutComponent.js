import React, { Component } from 'react';
import { Text, ScrollView, FlatList,View  } from 'react-native';
import { Card,ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';


const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
  }




class About extends Component {
   
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
                leftAvatar={{source: {uri: baseUrl + item.image}}}//require that means that, whatever I supply as the image here should be already included in the code here.
            />
        );
    }

    if (this.props.leaders.isLoading){
        return(
            <ScrollView>
                <History />
                <Card
                    title='Corporate Leadership'>
                    <Loading />
                </Card>
            </ScrollView>
        );
    }


    else if (this.props.leaders.errMess) {
        return(
            <ScrollView>
                <History />
                <Card
                    title='Corporate Leadership'>
                    <Text>{this.props.leaders.errMess}</Text>
                </Card>
            </ScrollView>
        );
    } 
else {
            return(
                <ScrollView>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                    <FlatList 
                        data={this.props.leaders.leaders}
                        renderItem={renderLeader}
                        keyExtractor={item => item.id.toString()}
                        />
                    </Card>
                </ScrollView>
            );
        }
    }
};




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





export default connect(mapStateToProps)(About);


