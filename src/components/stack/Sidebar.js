import React, { Component } from 'react';
import { connect } from 'react-redux';

import { stackSetStackFocused } from '../../redux/actions/stackActions';

class Sidebar extends Component {
  constructor() {
    super();

    this.handleClickAddStack = this.handleClickAddStack.bind(this);
    this.handleClickOptions = this.handleClickOptions.bind(this);
  }

  handleClickAddStack() {
  }

  handleClickOptions() {
  }
  render() {
    const stackItems = Object.values(this.props.stacks).map((stack) =>
      <h3 onClick={(e) => this.props.stackSetStackFocused(stack.id)}
        key={stack.id}>{stack.name}
      </h3>
    );

    return (
      <div>
        { stackItems }
        <div>
          <button onClick={this.handleClickAddStack}>Add stack</button>
          <button onClick={this.handleClickOptions}>Options</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stacks: state.data.stacks,
})

const mapDispatchToProps = {
  stackSetStackFocused,
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
