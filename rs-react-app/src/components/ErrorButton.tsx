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
      <button
        onClick={this.handleClick}
        className="mt-5 px-4 py-2 bg-red-500 text-black font-semibold rounded hover:bg-red-600 transition duration-200"
      >
        Throw Error
      </button>
    );
  }
}
