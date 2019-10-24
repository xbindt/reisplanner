import React from 'react';
import styled from 'styled-components';

const DelayContent = styled.span`
    color: ${props => props.theme.warningcolor};
`

const Delay = (props) => {
  return (
    <DelayContent>{props.children}</DelayContent>
  );
};

Delay.propTypes = {};

Delay.defaultProps = {};

export default Delay;
