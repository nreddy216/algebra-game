import React, { Component } from 'react';

// Helper functions
//
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Components
//
// App-level component
class Algebra extends Component {
  constructor() {
    super();

    const range = 5
    const xValue = getRandomInt(-range, range);
    const leftValue = getRandomInt(-range, range);

    // Top level props
    let props = {
      xValue: xValue
    }

    // Initial state
    this.state = {
      angle: 0,
      numBoxesRight: xValue + leftValue,
      numBoxesLeft: leftValue
    }
  }

  // Algebraic Functions
  addBoxToLeft(){
    this.setState({
      numBoxesLeft: this.state.numBoxesLeft + 1,
      angle: this.state.angle - 3
    })
  }

  addBoxToRight(){
    let angle = Math.abs(this.state.angle) > 9 ? Math.sign(this.state.angle)*12 : this.state.angle

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
        <BalanceContainer {...this.props} {...this.state} />
        <div className="BalanceButtons">
          <div className="LeftButtons">
            <button onClick={this.subtractBoxFromLeft.bind(this)}> - </button>
            <button onClick={this.addBoxToLeft.bind(this)}> + </button>
          </div>
          <div className="RightButtons">
            <button onClick={this.subtractBoxFromRight.bind(this)}> - </button>
            <button onClick={this.addBoxToRight.bind(this)}> + </button>
          </div>
        </div>
        <div className="pivot">
          <img src="./images/pivot.svg" alt="pivot" />
        </div>
        <Statement {...this.state} />
      </div>
    );
  }
}

// Balance
// state : rotation of balance shifts depending on value of boxes on each side of balance
class BalanceContainer extends Component {
  constructor(props) {
    super(props);
  }

  constrainAngle(angle){
    return Math.abs(angle) > 9 ? Math.sign(angle)*9 : angle;
  }

  render() {
    return (
      <div className="BalanceContainer" style={{transform: 'rotate(' + this.constrainAngle(this.props.angle) + 'deg)'}}>
        <div className="Boxes">
          <div className="LeftBoxes">
            <MysteryBox xValue={this.props.xValue} />
            <BoxContainer numBoxes={this.props.numBoxesLeft} />
          </div>
          <div className="RightBoxes">
            <BoxContainer numBoxes={this.props.numBoxesRight} />
          </div>
        </div>
        <div className="Balance">
          <div className="seesaw">
            <img src="./images/balance-top.svg" alt="balance top" />
          </div>
        </div>
      </div>
    );
  }
};

// Renders algebraic equation describing the balance
//
class Statement extends Component {
  constructor(props){
    super(props);
  }

  getStatement(numBoxesLeft, numBoxesRight, angle) {
    let statement = '';

    if(numBoxesLeft < 0){
      statement = `x - ${Math.abs(numBoxesLeft)}`
    } else if (numBoxesLeft === 0) {
      statement = 'x'
    } else {
      statement = `x + ${numBoxesLeft}`
    }

    if(angle === 0){
      statement += ' = ';
    } else {
      statement += ' != ';
    }

    return `${statement} ${numBoxesRight}`
  }

  render(){
    return (
      <div className="Statement">
        <p>{this.getStatement(this.props.numBoxesLeft, this.props.numBoxesRight, this.props.angle)}</p>
      </div>
    );
  }
};

// Smaller, Dumber Components
//
// The Mystery Box - has unknown value to user
//
const MysteryBox = ({ xValue }) => {
  return (
    <div className="MysteryBox" value={xValue}>
    </div>
  );
}

// Adds boxes to the container
//
const BoxContainer = ({ numBoxes }) => {
  let componentArray = [];
  for(var i=0; i<Math.abs(numBoxes); i++){
    componentArray.push( <Box key={i} numBoxes={numBoxes} />);
  }

  return (
    <div className="BoxContainer">
      {componentArray}
    </div>
  )
}

// Basic box component, each has a value of 1 or -1 in terms of 'weight'
//
class Box extends Component {
  constructor(props){
    super(props);
  }

  render(){
    // If the box is negative, style it differently
    let boxStyle = {};
    if(this.props.numBoxes < 0){
      boxStyle = {
        backgroundColor: '#d3d3d3'
      }
    }

    return (
      <div className="Box" style={boxStyle}>
      </div>
    );
  }
}

// TEST - Draggable box to add / subtract from right or left
//
class DragBox extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="DragBox" style={boxStyle} draggable="true">
      </div>
    );
  }
}

export default Algebra;
