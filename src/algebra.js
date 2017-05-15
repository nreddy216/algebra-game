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
  constructor() {
    super();

    const xValue = getRandomInt(-5, 5);
    const rightValue = xValue + getRandomInt(-5, 5);
    this.state = {
      angle: 180,
      xValue: xValue,
      numBoxesRight: xValue + rightValue,
      numBoxesLeft: rightValue - xValue
    }
  }

  addBox(){
    // this.setState({
    //   numBoxes: this.state.numBoxes + 1
    // })
  }

  render() {
    return (
      <div className="Algebra">
        <div className="Boxes">
          <BoxContainer numBoxes={Math.abs(this.state.numBoxesLeft)} />
          <BoxContainer numBoxes={Math.abs(this.state.numBoxesRight)} />
        </div>
        <MysteryBox addBox={this.addBox.bind(this)} xValue={this.state.xValue} />
        <Balance />
      </div>
    );
  }
}

// Mystery Box
class MysteryBox extends Component {

  render() {
    return (
      <div className="MysteryBox" onClick={this.props.addBox} value={this.props.xValue}>
      </div>
    );
  }
};

class BoxContainer extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let componentArray = [];

    for(var i=0; i<this.props.numBoxes; i++){
      componentArray.push( <Box key={i} />);
    }

    return (
      <div className="BoxContainer">
        {componentArray}
      </div>
    )
  }

}

// Box
class Box extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="Box" value="1">
      </div>
    );
  }
}

// Balance
// state : rotation of balance shifts depending on # boxes on each side of balance
class Balance extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="Balance" value='180'>
        <div className="pivot">
        </div>
      </div>
    );
  }
};

// class LeftSide extends Component {
//   constructor(props) {
//     super(props);
//   }
//
//   render(){
//     return (
//
//     )
//   }
// }

export default Algebra;
