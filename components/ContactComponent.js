import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';


class Contact extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {//f you want to further customize for each of the components in your navigator, you can specify the navigation options like this inside the component. 
        title: 'Contact us'//title will be "contact us" 
    };

    render() {

        return (
            <ScrollView>
                <Card
                    title='Contact information'>

                    <Text>
                        121, Clear Water Bay Road
                      </Text>
                      <Text>
                        Clear Water Bay, Kowloon
                        </Text>
                        <Text>
                        HONG KONG
                        </Text>
                        <Text>
                        Tel: +852 1234 5678
                        </Text>
                        <Text>
                        Fax: +852 8765 4321
                        </Text>
                        <Text>
                        Email:confusion@food.net
                        </Text>

                </Card>
            </ScrollView>


        );
    }


}



export default Contact;