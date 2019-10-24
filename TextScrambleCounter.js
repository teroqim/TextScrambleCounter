import React from 'react';
import ReactTimeout from 'react-timeout';

// TODO: Open source!
class TextScrambleCounter extends React.Component {
  state = {
    counter: 0,
    delay: 500,
  };

  getSteps(props) {
    return props.steps || 10;
  }

  getDelay() {
    return this.props.duration / this.getSteps(this.props);
  }

  startScramble() {
    this.setState(
      {
        counter: this.getSteps(this.props),
      },
      () => {
        this.props.setTimeout(this.countDown.bind(this), this.getDelay());
      }
    );
  }

  countDown = () => {
    const newCounter = Math.max(0, this.state.counter - 1);
    this.setState(
      {
        counter: newCounter,
      },
      () => {
        if (newCounter > 0) {
          this.props.setTimeout(this.countDown.bind(this), this.getDelay());
        }
      }
    );
  };

  getRandomWord(length, alphabet) {
    return Array.from({ length })
      .map(() => alphabet[~~(Math.random() * length)])
      .join('');
  }

  render() {
    let word = this.props.word;
    if (this.state.counter > 0) {
      // Generate word
      word = this.getRandomWord(this.props.word.length, this.props.alphabet);
    }
    return <span className="text-scramble-counter">{word}</span>;
  }
}
export default ReactTimeout(TextScrambleCounter);

