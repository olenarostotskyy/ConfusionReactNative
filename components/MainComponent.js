import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }

  render() {
 
    return (
        <Menu dishes={this.state.dishes} /> //this.state.dishes as the props here.
    );
  }
}
  
export default Main;