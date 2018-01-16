import React from 'react';
import PropTypes from 'prop-types';
import styles from "./MessageList.css";

const Message = ({text, isPublic}) => {
  const msgLabel = isPublic ? 'public' : 'private';

  return (
    <div>
      <div className={styles.msgContainer}>
        <div className={styles.msgText}>{text}</div>
        <div className={[styles.msgLabel, msgLabel].join(' ')}>{msgLabel}</div>
      </div>
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  isPublic: PropTypes.bool,
};

export default Message;