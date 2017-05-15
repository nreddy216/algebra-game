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
    const leftValue = xValue + getRandomInt(-5, 5);
    this.state = {
      angle: 180,
      xValue: xValue,
      numBoxesRight: xValue + leftValue,
      numBoxesLeft: leftValue
    }
  }

  addBox(){
    this.setState({
      numBoxesLeft: this.state.numBoxesLeft + 1
    })
  }

  subtractBoxFromBothSides(){
    this.setState({
      numBoxesLeft: this.state.numBoxesLeft - 1,
      numBoxesRight: this.state.numBoxesRight - 1
    })

    console.log(this.state);
  }

  render() {
    return (
      <div className="Algebra">
        <div className="Boxes">
          <BoxContainer numBoxes={this.state.numBoxesLeft} />
          <BoxContainer numBoxes={this.state.numBoxesRight} />
        </div>
        <MysteryBox subtractBoxFromBothSides={this.subtractBoxFromBothSides.bind(this)} xValue={this.state.xValue} />
        <Balance angle={this.state.angle} />
      </div>
    );
  }
}

// Mystery Box
class MysteryBox extends Component {

  render() {
    return (
      <div className="MysteryBox" onClick={this.props.subtractBoxFromBothSides} value={this.props.xValue}>
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

    for(var i=0; i<Math.abs(this.props.numBoxes); i++){
      componentArray.push( <Box key={i} numBoxes={this.props.numBoxes} />);
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
    let boxStyle = {};
    if(this.props.numBoxes < 0){
      console.log("less than");
      boxStyle = {
        backgroundColor: '#d3d3d3'
      }
    }

    return (
      <div className="Box" value="1" style={boxStyle}>
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
      <div className="Balance">
        <div className="seesaw" style={{transform: 'rotate(' + this.props.angle + 'deg)'}}>
        </div>
        <div className="pivot">
        </div>
      </div>
    );
  }
};

export default Algebra;
