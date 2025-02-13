import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DelayContent = styled.span`
    color: ${props => props.theme.warningcolor};
`;

const Delay = ({ children }) => (<DelayContent>{children}</DelayContent>);

Delay.propTypes = {
  children: PropTypes.node.isRequired,
};

Delay.defaultProps = {};

export default Delay;
