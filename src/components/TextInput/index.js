import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import firebase from '../../firebase';
import { Button } from '../Forms/button';
import { MaxWidthWrapper } from '../Forms/maxwidth';

export default function TextInput(props) {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    sessionStorage.setItem('autosave', e.target.value);
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!props.user.isSignedIn) {
      props.app.showLogin();
      return;
    }
    if (message.length) {
      const { name, image } = props.state.user;
      const time = Date.now();
      await firebase.database().ref('messages').child(time).update({
        name: name,
        image: image,
        message: message,
        time: time,
      });

      sessionStorage.setItem('autosave', '');
      setMessage('');
    }
  };

  useEffect(() => {
    const savedItem = sessionStorage.getItem('autosave');
    if (savedItem) {
      setMessage(savedItem);
    }
  }, []);

  return (
    <Wrapper>
      {/* <VerticalCenter> */}
      {/* <MaxWidthWrapper max={720}> */}
      <MessageForm onSubmit={handleSubmit}>
        <MessageInput onChange={handleInputChange} value={message} />
        <SendButton>Send</SendButton>
      </MessageForm>
      {/* </MaxWidthWrapper> */}
      {/* </VerticalCenter> */}
    </Wrapper>
  );
}

// const VerticalCenter = styled.div`
//   height: 100%;
//   max-height: 90%;
// `;

const Wrapper = styled.div`
  background: #b3b3b3;
  border-top: 1px solid #191919;
  bottom: 0;
  grid-area: footer;
  height: var(--footer-height);
  left: var(--sidebar-width);
  /* padding-bottom: var(--input-padding-bottom); */
  position: sticky;
  width: calc(100vw - var(--sidebar-width));

  @media screen and (max-width: 768px) {
    left: 0;
    bottom: 0;
    width: 100vw;
  }
`;

const MessageForm = styled.form`
  /* align-items: center;
  display: flex;
  height: 100%;
  justify-content: center; */

  display: grid;
  grid-auto-flow: column;
  grid-gap: 2rem;
  grid-template-columns: 1fr;
  padding: 1rem 2rem 3rem;
`;

const MessageInput = styled.input.attrs((props) => ({
  type: 'text',
  placeholder: 'Say hi...',
}))`
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 0 1px #202020;

  font-size: 1rem;
  /* height: 60%; */
  outline: none;
  padding: 1rem;

  /* width: 85%; */

  &:hover {
    box-shadow: 0 0 0 1px#0061eb;
  }

  &:focus,
  &:active {
    box-shadow: 0 0 0 2px#0061eb;
  }
`;

const SendButton = styled.button`
  /* margin: 0.55rem 0; */
  /* hsl(215, 25%, 23%) */
  align-self: center;
  background: hsl(215, 56%, 42%);
  border: none;

  border-radius: 4px;
  box-shadow: 0 0 0 1px #191919;
  color: whitesmoke;
  cursor: pointer;
  font-size: 1rem;
  height: 65%;
  outline: none;
  padding: 0 1.5rem;

  /* &:focus {
    box-shadow: 0 0 0 3px white;
  } */

  &:hover {
    background: hsl(215, 56%, 37%);
    cursor: pointer;
  }

  &:focus {
    background: hsl(215, 56%, 34%);
    box-shadow: 0 0 0 2px hsl(215, 100%, 0%);
  }

  &:active {
    background: hsl(215, 56%, 34%);
  }

  &:disabled {
    background: hsla(0, 0%, 54%, 1);
  }
  &:disabled:hover {
    background: hsla(0, 0%, 54%, 1);
  }
`;