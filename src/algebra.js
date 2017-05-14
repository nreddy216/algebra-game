import React, { Component } from 'react';
// Helps conditionally join class names together
import classNames from 'classnames';

// TODO: Move this to helper file or X component
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let x = getRandomInt(-10, 10);

console.log(x);

// Components

// Box - 'dumb' component, only renders out box
class Box extends Component {
  render() {
    return (
      <div className="box">
        <p>1</p>
      </div>
    )
  }
}

// Main component
class Algebra extends Component {
  init() {
    console.log('init');
  }

  render() {
    <div className="Algebra">
      <Box />
    </div>
  }
}
