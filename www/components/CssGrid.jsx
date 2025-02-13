import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Grid = ({ children, ...rest }) => {
  const Base = styled.div`
    display: flex;
    justify-content: space-between;
  `;
  return (
    <Base {...rest}>{children}</Base>
  );
};

const Row = ({ children, ...rest }) => {
  const Base = styled.div``;
  return (
    <Base {...rest}>{children}</Base>
  );
};

const Cell = ({ children, ...rest }) => {
  const Base = styled.div``;
  return (
    <Base {...rest}>{children}</Base>
  );
};

Grid.propTypes = {
  children: PropTypes.node,
};

Grid.defaultProps = {
  children: undefined,
};

export default Grid;
export { Row, Cell };
