import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {StyledButtonOutline} from '../common/styles';

import {stackSetStackFocused} from '../../redux/actions/stackActions';
import {dataStackCreate} from '../../redux/actions/dataActions';

class Sidebar extends Component {
  constructor() {
    super();
    // TODO move this into the popup component
    this.state = {
      name: '',
      isRoutine: false,
      backgroundColor: 'default',
      durationGrace: 900,
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleStackCreate = this.handleStackCreate.bind(this);
    this.handleClickOptions = this.handleClickOptions.bind(this);
  }

  handleChangeName(e) {
    this.setState({name: e.target.value});
  }

  handleStackCreate(e) {
    e.preventDefault();
    this.props.dataStackCreate({...this.state});
  }

  handleClickOptions() {
  }

  render() {
    const stackItems = Object.values(this.props.stacks).map((stack) =>
      <h3 onClick={(e) => this.props.stackSetStackFocused(stack.id)}
        key={stack.id}>{stack.name}
      </h3>,
    );

    return (
      <div>
        { stackItems }
        <div>
          <form onSubmit={this.handleStackCreate}>
            <input
              type="text"
              placeholder="Stack name"
              value={this.state.name}
              onChange={this.handleChangeName}
              maxLength="255"
              required />
            <input type="submit" value="Add stack"/>
          </form>
          <StyledButtonOutline onClick={this.handleClickOptions}>Options</StyledButtonOutline>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  stacks: PropTypes.object.isRequired,
  stackSetStackFocused: PropTypes.func.isRequired,
  dataStackCreate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stacks: state.data.stacks,
});

const mapDispatchToProps = {
  stackSetStackFocused,
  dataStackCreate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
