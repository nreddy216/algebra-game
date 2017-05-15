import React, { Component } from 'react';
// Helps conditionally join class names together
import classNames from 'classnames';

// Helper functions
// TODO: Move this to helper file or X component
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Components
// Main component
class Algebra extends Component {
  constructor(props) {
    super(props);
    console.log('init');
    // this.props = {
    //   numBoxes: 5
    // }
    this.state = {
      angle: 180,
      numBoxes: 5
    }
  }

  render() {
    return (
      <div className="Algebra">
        <Box state={this.state} {...this.props} />
        <MysteryBox {...this.props} />
        <Balance state={this.state} {...this.props} />
      </div>
    );
  }
}

// Mystery Box
const MysteryBox = () => {
  return (
    <div className="MysteryBox" value={getRandomInt(-10, 10)}>
    </div>
  );
};

// Box - 'dumb' component, only renders out box
class Box extends Component {

  constructor(props){
    super(props);
    // this.props.numBoxes

  }

  render(){
    let componentArray = [];
    for(var i=0; i<=this.props.numBoxes; i++) {
      componentArray.push(<div className="Box" key={i} value='1'></div>);
    }
    return (
      <div>
        {componentArray}
      </div>
    );
  }
}

class Balance extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="Balance" value='180'>
      </div>
    );
  }
};

export default Algebra;
