import React from 'react';
import PropTypes from 'prop-types';
import styles from "./MessageList.css";
import { ScrollElement } from 'react-scroll';

const Message = ({text, isPublic, ...others}) => {
  const msgLabel = isPublic ? 'public' : 'private';
  const { name, id } = others;

  return (
    <div name={name} id={id} >
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

export default ScrollElement(Message);