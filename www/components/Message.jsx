import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ head, text }) => (
  <div>
    {head}
    {' '}
    {text}
  </div>
);

Message.propTypes = {
  head: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

Message.defaultProps = {};

export default Message;
