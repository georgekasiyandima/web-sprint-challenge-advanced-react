import React from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
};

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor() {
    super();
    this.state = initialState;
  }

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const cordMap = {
      0: { x: 1, y: 1 },
      1: { x: 1, y: 2 },
      2: { x: 1, y: 3 },
      3: { x: 2, y: 1 },
      4: { x: 2, y: 2 },
      5: { x: 2, y: 3 },
      6: { x: 3, y: 1 },
      7: { x: 3, y: 2 },
      8: { x: 3, y: 3 },
    };
    return cordMap[this.state.index];
  };

  reset = () => {
    this.setState(initialState);
  };

  move = (direction) => {
    switch (direction) {
      case "left":
        if (
          this.state.index !== 0 &&
          this.state.index !== 3 &&
          this.state.index !== 6
        ) {
          this.setState({
            ...this.state,
            steps: this.state.steps + 1,
            index: this.state.index - 1,
            message: initialMessage,
          });
        } else {
          this.setState({ ...this.state, message: "You can not move left" });
        }
        break;
      case "right":
        if (
          this.state.index !== 2 &&
          this.state.index !== 5 &&
          this.state.index !== 8
        ) {
          this.setState({
            ...this.state,
            steps: this.state.steps + 1,
            index: this.state.index + 1,
            message: initialMessage,
          });
        } else {
          this.setState({ ...this.state, message: "You can not move right" });
        }
        break;
      case "up":
        if (this.state.index > 2) {
          this.setState({
            ...this.state,
            steps: this.state.steps + 1,
            index: this.state.index - 3,
            message: initialMessage,
          });
        } else {
          this.setState({ ...this.state, message: "You can not move up" });
        }
        break;
      case "down":
        if (this.state.index < 6) {
          this.setState({
            ...this.state,
            steps: this.state.steps + 1,
            index: this.state.index + 3,
            message: initialMessage,
          });
        } else {
          this.setState({ ...this.state, message: "You can not move down" });
        }
        break;
      default:
        break;
    }
  };

  onEmailChange = (evt) => {
    this.setState({ ...this.state, email: evt.target.value });
  };

  onSubmit = (evt) => {
    evt.preventDefault();
    const cord = this.getXY(this.state.index);
    const x = cord[1];
    const y = cord[3];
    const postObject = {
      x,
      y,
      steps: this.state.steps,
      email: this.state.email,
    };
    axios
      .post("http://localhost:9000/api/result", postObject)
      .then((res) => console.log(res));
  };

  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates: {this.state.index}</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div
              key={idx}
              className={`square${idx === this.state.index ? " active" : ""}`}
            >
              {idx === this.state.index ? "B" : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={() => this.move("left")} id="left">
            LEFT
          </button>
          <button onClick={() => this.move("up")} id="up">
            UP
          </button>
          <button onClick={() => this.move("right")} id="right">
            RIGHT
          </button>
          <button onClick={() => this.move("down")} id="down">
            DOWN
          </button>
          <button onClick={this.reset} id="reset">
            reset
          </button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onEmailChange}
            id="email"
            type="email"
            placeholder="type email"
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
