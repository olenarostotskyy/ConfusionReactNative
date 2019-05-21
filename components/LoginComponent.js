import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Card, Icon, Input, CheckBox } from 'react-native-elements';
import { SecureStore } from 'expo';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount() {//the lifecycle method, you're going to be implementing the access to the secure store
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {//promise -  in the promise, we'll get hold of the result (only user data)
                let userinfo = JSON.parse(userdata);// this will be returned in the form of JSON string because when you store in the secure storage, it's a key value pair, the value has to be in the form of a string or a number or something like that, you can't store- any JavaScript object that you store has to be converted into JSON string before you store in the secure store
                if (userinfo) {
                    this.setState({username: userinfo.username});//we will set up the username as userinfo.username; we will load this into the state of our application
                    this.setState({password: userinfo.password});//similarly, we'll set up the username and password 
                    this.setState({remember: true})//remember to true, so that I will remember to save any changes if the user makes to this also back to the store.
                }
            })
    }
//DrawerNavigator
    static navigationOptions = {
        title: 'Login',
    };
//hadle form
    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember)//only if the remember is true, which means that the checkbox was checked, then I will save the state to the secure storage
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))//constructing the js object and sending to secure store
                .catch((error) => console.log('Could not save user info', error));
        else
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user info', error));

    }
//rendering the view 
    render() {
        return (
            <View style={styles.container}>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    />
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title="Login"
                        color="#512DA8"
                        />
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    formInput: {
        margin: 40
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});

export default Login;