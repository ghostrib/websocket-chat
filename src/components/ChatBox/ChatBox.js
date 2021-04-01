import React, { useEffect, useRef, useState } from 'react';
import Message from './Message/Message';
import PropTypes from 'prop-types';
import s from './chatbox.module.scss';

/** https://stackoverflow.com/a/61266099 */
const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

const ChatBox = ({ messages }) => {
  const [ height, setHeight ] = useState('');
  useEffect(() => {
    window.addEventListener('resize', function(e) {
      console.log(window.innerHeight);
    });
  });

  return (
    <main className={s.main}>
      <ul className={s.main__list}>
        {messages.map((messageObject, i) => {
          const { name, message, image } = messageObject;
          return (
            <Message image={image} name={name} message={message} key={i} />
          );
        })}
        <AlwaysScrollToBottom />
      </ul>
    </main>
  );
};

export default ChatBox;

ChatBox.propTypes = {
  messages: PropTypes.array.isRequired,
};
