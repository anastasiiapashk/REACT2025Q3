import { Component } from 'react';

interface State {
  throwError: boolean;
}

export default class ErrorButton extends Component<
  Record<string, never>,
  State
> {
  state: State = { throwError: false };

  handleClick = (): void => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Test error from ErrorButton');
    }

    return (
      <button onClick={this.handleClick} style={{ marginTop: '20px' }}>
        Throw Error
      </button>
    );
  }
}
