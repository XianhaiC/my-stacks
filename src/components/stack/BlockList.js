import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';

import BlockItem from './BlockItem';

import {sessionBlockFetchData} from '../../redux/actions/sessionActions';
import {dataBlockCreate} from '../../redux/actions/dataActions';

import AddRoundedIcon from '@material-ui/icons/AddRounded';

import {StyledButtonContainer, media} from '../common/styles';

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const StyledContainerCreate = styled.div`
  display: flex;
  width: 70%;

  ${media.xs(`
    width: 100%;
  `)}
`;

const StyledButtonContainerAdd = styled(StyledButtonContainer)`
  color: ${(props) => props.theme.secondary};
`;

class BlockList extends Component {
  constructor(props) {
    super(props);

    // these states should go inside of BlockItem.js
    this.state = {
      blockCreateOpen: false,
    };

    this.fetchBlocks = this.fetchBlocks.bind(this);
    this.closeBlock = this.closeBlock.bind(this);
  }

  closeBlock() {
    this.setState({blockCreateOpen: false});
  }

  fetchBlocks() {
    const {stacks, stackFocused, sessionBlockFetchData} = this.props;
    if (!stacks[stackFocused].loaded) {
      sessionBlockFetchData(stackFocused);
    }
  }

  componentDidMount() {
    this.fetchBlocks();
  }

  componentDidUpdate() {
    this.fetchBlocks();
  }

  render() {
    const {stacks, stackFocused} = this.props;

    if (!stacks[stackFocused].loaded) {
      return (<h3>Loading blocks</h3>);
    }

    const blockItems = stacks[stackFocused].order
        .map((blockId) =>
          <BlockItem key={blockId} blockId={blockId} />,
        );

    const styleIconAdd = {
      fontSize: '2rem',
    };

    const componentCreateBlock = this.state.blockCreateOpen ?
      (
        <BlockItem blockCreate={true} closeBlock={this.closeBlock} />
      ) :
      (
        <StyledContainerCreate>
          <StyledButtonContainerAdd
            onClick={() => this.setState({blockCreateOpen: true})}
          >
            <AddRoundedIcon style={styleIconAdd} />
            Add task
          </StyledButtonContainerAdd>
        </StyledContainerCreate>
      );

    return (
      <StyledContainer>
        {blockItems}
        {componentCreateBlock}
      </StyledContainer>
    );
  }
}

BlockList.propTypes = {
  stacks: PropTypes.object.isRequired,
  stackFocused: PropTypes.string.isRequired,
  loadingBlocks: PropTypes.bool.isRequired,
  sessionBlockFetchData: PropTypes.func.isRequired,
  dataBlockCreate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stacks: state.data.stacks,
  stackFocused: state.stack.stackFocused,
  loadingBlocks: state.session.loadingStacks,
});

const mapDispatchToProps = {
  sessionBlockFetchData,
  dataBlockCreate,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockList);
