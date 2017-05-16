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
    const leftValue = getRandomInt(-5, 5);
    this.state = {
      angle: 0,
      xValue: xValue,
      numBoxesRight: xValue + leftValue,
      numBoxesLeft: leftValue
    }
  }

  addBoxToLeft(){
    this.setState({
      numBoxesLeft: this.state.numBoxesLeft + 1,
      angle: this.state.angle - 3
    })
  }

  addBoxToRight(){
    this.setState({
      numBoxesRight: this.state.numBoxesRight + 1,
      angle: this.state.angle + 3
    })
  }

  subtractBoxFromLeft(){
    this.setState({
      numBoxesLeft: this.state.numBoxesLeft - 1,
      angle: this.state.angle + 3
    })
  }

  subtractBoxFromRight(){
    this.setState({
      numBoxesRight: this.state.numBoxesRight - 1,
      angle: this.state.angle - 3
    })
  }

  render() {
    return (
      <div className="Algebra">
        <div className="Buttons">
          <Button onClick={this.subtractBoxFromLeft.bind(this)} name="Subtract from Left"></Button>
          <Button onClick={this.subtractBoxFromRight.bind(this)} name="Subtract from Right"></Button>
          <Button onClick={this.addBoxToLeft.bind(this)} name="Add to Left"></Button>
          <Button onClick={this.addBoxToRight.bind(this)} name="Add to Right"></Button>
        </div>
        <BalanceContainer angle={this.state.angle} numBoxesLeft={this.state.numBoxesLeft} numBoxesRight={this.state.numBoxesRight} xValue={this.state.xValue} />
        <div className="pivot">
        </div>
        <Statement numBoxesLeft={this.state.numBoxesLeft} numBoxesRight={this.state.numBoxesRight} />
      </div>
    );
  }
}

// Mystery Box
class MysteryBox extends Component {

  render() {
    return (
      <div className="MysteryBox" onClick={this.props.subtractBoxFromLeft} value={this.props.xValue}>
      </div>
    );
  }
};

const Button = ({ name, onClick }) => {
  return (
    <div className="Button" onClick={onClick}>
      {name}
    </div>
  );
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
      <div className="Box" value="1" style={boxStyle} onClick={this.props.subtractBoxFromBothSides}>
      </div>
    );
  }
}

// Balance
// state : rotation of balance shifts depending on # boxes on each side of balance
const BalanceContainer = ({ angle, numBoxesLeft, numBoxesRight, xValue }) => {
  return (
    <div className="BalanceContainer" style={{transform: 'rotate(' + angle + 'deg)'}}>
      <div className="Boxes">
        <BoxContainer numBoxes={numBoxesLeft} />
        <BoxContainer numBoxes={numBoxesRight} />
      </div>
      <MysteryBox xValue={xValue} />
      <Balance />
    </div>
  );
};

// Balance
// state : rotation of balance shifts depending on # boxes on each side of balance
class Balance extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="Balance">
        <div className="seesaw">
        </div>
      </div>
    );
  }
};

// Balance
// state : rotation of balance shifts depending on # boxes on each side of balance
class Statement extends Component {
  constructor(props){
    super(props);
  }

  getLeftStatement(numBoxesLeft){
    if(numBoxesLeft < 0){
      return "x - " + Math.abs(numBoxesLeft)
    } else if (numBoxesLeft === 0){
      return "x "
    } else {
      return "x + " + numBoxesLeft
    }
  }

  render(){
    return (
      <div className="Statement">
        {this.getLeftStatement(this.props.numBoxesLeft)} = {this.props.numBoxesRight}
      </div>
    );
  }
};


export default Algebra;
