import React from 'react';
import PropTypes from 'prop-types';

const Message = ({text, isPublic}) => {
  const msgLabel = isPublic ? 'public' : 'private';

  return (
    <div>
      <div>
        <div>{text}</div>
        <div>{msgLabel}</div>
      </div>
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  isPublic: PropTypes.bool,
};

export default Message;