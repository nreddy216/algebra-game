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

    // Initial state
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
        <BalanceContainer angle={this.state.angle} numBoxesLeft={this.state.numBoxesLeft} numBoxesRight={this.state.numBoxesRight} xValue={this.state.xValue} />
        <div className="Buttons">
          <div className="LeftButtons">
            <Button onClick={this.subtractBoxFromLeft.bind(this)} name=" - "></Button>
            <Button onClick={this.addBoxToLeft.bind(this)} name=" + "></Button>
          </div>
          <div className="RightButtons">
            <Button onClick={this.subtractBoxFromRight.bind(this)} name=" - "></Button>
            <Button onClick={this.addBoxToRight.bind(this)} name=" + "></Button>
          </div>
        </div>
        <div className="pivot">
        </div>
        <Statement numBoxesLeft={this.state.numBoxesLeft} numBoxesRight={this.state.numBoxesRight} angle={this.state.angle} />
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
        <div className="LeftBoxes">
          <MysteryBox xValue={xValue} />
          <BoxContainer numBoxes={numBoxesLeft} />
        </div>
        <div className="RightBoxes">
          <BoxContainer numBoxes={numBoxesRight} />
        </div>
      </div>
      <div className="Balance">
        <div className="seesaw">
        </div>
      </div>
    </div>
  );
};

// Renders algebraic equation describing the balance
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
        {this.getStatement(this.props.numBoxesLeft, this.props.numBoxesRight, this.props.angle)}
      </div>
    );
  }
};

// Button with some label and on click function
const Button = ({ name, onClick }) => {
  return (
    <div className="Button" onClick={onClick}>
      {name}
    </div>
  );
};

const MysteryBox = ({ xValue }) => {
  return (
    <div className="MysteryBox" value={xValue}>
    </div>
  );
}

// Adds boxes to the container
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

// Box
class Box extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let boxStyle = {};
    if(this.props.numBoxes < 0){
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

export default Algebra;
