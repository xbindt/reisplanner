import React from 'react';
import PropTypes from 'prop-types';

const Message = props => {
  const {
    head,
    text,
    type,
    startDate,
    startTime,
    endDate,
    endTime,

  } = props;
  return (
    <div>
      {head}
      {' '}
      {text}
    </div>
  );
};

Message.propTypes = {
  head: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
};

Message.defaultProps = {};

export default Message;
