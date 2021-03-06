import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetail from './DishDetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Login from './LoginComponent';
import { View, Platform, Text, ScrollView, Image, StyleSheet,NetInfo, ToastAndroid} from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';



const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
})


const MenuNavigator = createStackNavigator({// a new component
    Menu: {
        screen: Menu,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name="menu" size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()} />
        })
    },
    DishDetail: { screen: DishDetail },

}, {
        initialRouteName: 'Menu',//So this StackNavigator starts with menu as the first screen when this component is the stack.
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"
            },
            headerLeft: <Icon name="menu" size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()} />
        }
    });


//The SafeAreaView is specifically for the iPhone X that defines a part of the area as a safe area where nothing else will be laid out.  
const CustomDrawerContentComponent = (props) => (
    <ScrollView>

        <SafeAreaView style={styles.container}
            forceInset={{
                top: 'always',
                horizontal: 'never'
            }}>

            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image source={require('./images/logo.png')}
                        style={styles.drawerImage} />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItems {...props} //{...props} is, ESX variable specific. Whatever the props are, just pass them on. Into the DrawerItems as such, everything. 
            />
        </SafeAreaView>
    </ScrollView>
);


//The reason for creating the home navigator using the create stack navigator is that this create stack navigator provides the status bar, a way of specifying the navigation and the title for that home. 
const HomeNavigator = createStackNavigator({
    Home: { screen: Home }

}, {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color: "#fff"
            },
            headerLeft: <Icon name="menu" size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()} />
        })
    });

const AboutNavigator = createStackNavigator({
    About: { screen: About },


}, {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color: "#fff"
            },
            headerLeft: <Icon name="menu" size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()} />
        })
    });


const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact },

}, {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color: "#fff"
            },
            headerLeft: <Icon name="menu" size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()} />
        })
    });


const FavoritesNavigator = createStackNavigator({
    Favorites: { screen: Favorites }
}, {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTitleStyle: {
                color: "#fff"
            },
            headerTintColor: "#fff",
            headerLeft: <Icon name="menu" size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()} />
        })
    });

const ReservationNavigator = createStackNavigator({
    Reservation: { screen: Reservation }
}, {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTitleStyle: {
                color: "#fff"
            },
            headerTintColor: "#fff",
            headerLeft: <Icon name="menu" size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()} />
        })
    })


const LoginNavigator = createStackNavigator({
    Login: { screen: Login }
}, {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTitleStyle: {
                color: "#fff"
            },
            headerTintColor: "#fff",
            headerLeft: <Icon name="menu" size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()} />
        })
    })



const MainNavigator = createDrawerNavigator({
    Login:
    {
        screen: LoginNavigator,
        navigationOptions: {
            title: 'Login',
            drawerLabel: 'Login',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                    name='sign-in'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            ),
        }
    },

    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor, focused }) => (//tintColor will essentially specify how to render the icon in the draw there.
                <Icon
                    name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({ tintColor, focused }) => (//tintColor will essentially specify how to render the icon in the draw there.
                <Icon
                    name='list'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }

    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact',
            drawerLabel: 'Contact',
            drawerIcon: ({ tintColor, focused }) => (//tintColor will essentially specify how to render the icon in the draw there.
                <Icon
                    name='address-card'
                    type='font-awesome'
                    size={22}
                    color={tintColor}
                />
            )
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About',
            drawerLabel: 'About',
            drawerIcon: ({ tintColor, focused }) => (//tintColor will essentially specify how to render the icon in the draw there.
                <Icon
                    name='info-circle'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },

    Favorites: {
        screen: FavoritesNavigator,
        navigationOptions: {
            title: 'My Favorites',
            drawerLabel: 'My Favorites',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                    name='heart'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            ),
        }
    },

    Reservation: {
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve Table',
            drawerLabel: 'Reserve Table',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                    name='cutlery'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            ),
        }
    }
},

    {
        initialRouteName: 'Home',// when the app opens the home component is the first one that will be rendered.
        drawerBackgroundColor: '#D1C4E9',
        contentComponent: CustomDrawerContentComponent

    });



    class Main extends Component {

        componentDidMount() {
          this.props.fetchDishes();
          this.props.fetchComments();
          this.props.fetchPromos();
          this.props.fetchLeaders();
      
          NetInfo.getConnectionInfo()
              .then((connectionInfo) => {
                  ToastAndroid.show('Initial Network Connectivity Type: '
                      + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
                      ToastAndroid.LONG)
              });


        NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = (connectionInfo) => {
        switch (connectionInfo.type) {
            case 'none':
                ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
                break;
            case 'wifi':
                ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
                break;
            case 'cellular':
                ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
                break;
            case 'unknown':
                ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
                break;
            default:
                break;
        }
    }

    render() {

        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>

                <MainNavigator />
            </View>
            //this platform that I have imported here from react-native gives me access to information about the specific platform on which my react-native application is running.
            ////will return a sub-array containing only those elements from the dishes array that will match this criteria, where the dish.id is the same as the selected dish.  
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});



export default connect(mapStateToProps, mapDispatchToProps)(Main);