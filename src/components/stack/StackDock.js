import React, { Component } from 'react';
import { connect } from 'react-redux';

import { playlistStart } from '../../redux/actions/playlistActions';

class StackDock extends Component {
  constructor() {
    super();

    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickShuffle = this.handleClickShuffle.bind(this);
    this.playlistPreprocess = this.playlistPreprocess.bind(this);
  }

  handleClickStart() {
    this.playlistPreprocess(false);
  }

  handleClickShuffle() {
    this.playlistPreprocess(false);
  }

  // ----- helpers

  playlistPreprocess(shuffle) {
    const { stacks, stackFocused, playlistStart } = this.props;
    playlistStart(stacks[stackFocused].order, shuffle);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClickStart}>Start session</button>
        <button onClick={this.handleClickShuffle}>Shuffle</button>
        <button>Grace</button>
        <button>Routine</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stacks: state.data.stacks,
  stackFocused: state.stack.stackFocused,
})

export default connect(mapStateToProps, { playlistStart })(StackDock);
