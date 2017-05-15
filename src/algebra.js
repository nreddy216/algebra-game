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
      angle: 180,
      xValue: xValue,
      numBoxesRight: xValue + leftValue,
      numBoxesLeft: leftValue
    }
  }

  // TODO: Add buttons/UI to add / subtract these boxes on right or left
  // Figure out how to change angle
  // Refactor!

  addBoxToLeft(){
    this.setState({
      numBoxesLeft: this.state.numBoxesLeft + 1
    })
  }

  addBoxToRight(){
    this.setState({
      numBoxesRight: this.state.numBoxesRight + 1
    })
  }

  subtractBoxFromLeft(){
    this.setState({
      numBoxesLeft: this.state.numBoxesLeft - 1
    })
  }

  subtractBoxFromRight(){
    this.setState({
      numBoxesRight: this.state.numBoxesRight - 1
    })
  }

  // subtractBoxFromBothSides(){
  //   // this.setState({
  //   //   numBoxesLeft: this.state.numBoxesLeft - 1,
  //   //   numBoxesRight: this.state.numBoxesRight - 1
  //   // })
  //
  //   console.log("subtract");
  // }
  //
  addBoxToBothSides(){
    this.setState({
      numBoxesLeft: this.state.numBoxesLeft + 1,
      numBoxesRight: this.state.numBoxesRight + 1
    })

    console.log(this.state);
  }

  render() {
    return (
      <div className="Algebra" >
        <div className="Boxes"  >
          <BoxContainer numBoxes={this.state.numBoxesLeft}  {...this.props} />
          <BoxContainer numBoxes={this.state.numBoxesRight} {...this.props} />
        </div>
        <MysteryBox addBoxToBothSides={this.addBoxToBothSides.bind(this)} xValue={this.state.xValue} />
        <Balance angle={this.state.angle} />
        <Statement numBoxesLeft={this.state.numBoxesLeft} numBoxesRight={this.state.numBoxesRight} />
      </div>
    );
  }
}

// Mystery Box
class MysteryBox extends Component {

  render() {
    return (
      <div className="MysteryBox" onClick={this.props.addBoxToBothSides} value={this.props.xValue}>
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
      <div className="Box" value="1" style={boxStyle} onClick={this.props.subtractBoxFromBothSides}>
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

  getDegreeOfRotation(angle){
    return angle;
  }

  componentDidUpdate(){
    console.log('hi');
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
