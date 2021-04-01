/* eslint-disable no-restricted-globals */
import PropTypes from 'prop-types';
import React from 'react';
import firebase from '../../firebase';
import s from './textinput.module.scss';


class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    this.updateMessage = this.updateMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.inputRef = React.createRef(null);
  }

  sendMessage(e) {
    e.preventDefault();
    if (!this.props.user.isSignedIn) {
      this.props.app.showLogin();
      return;
    }
    if (this.state.message.length) {
      const db = firebase.database().ref();
      const key = Date.now();

      const { name, image } = this.props.state.user;
      const { message } = this.state;
      const post = { name, image, message, time: key };

      const updates = {};
      updates['/messages/' + key] = post;

      db.update(updates);
      this.setState({ message: '' });
      sessionStorage.setItem('autosave', '');
    }
  }

  updateMessage(e) {
    sessionStorage.setItem('autosave', e.target.value);

    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  componentDidMount() {
    // window.addEventListener('resize', this.getAvailableHeight);

    // console.log(this.inputRef.current);
    if (sessionStorage.getItem('autosave')) {
      this.setState({ message: sessionStorage.getItem('autosave') });
    }
  }

  // getAvailableHeight() {
  //   setTimeout(() => {
  //     console.log(window.innerHeight);
  //   }, 500);
  // }

  render() {
    const { updateMessage, sendMessage } = this;
    const { message } = this.state;
    return (
      <div

        ref={this.inputRef}
        className={s.message}
        // onFocus={this.getAvailableHeight}
      >
        <form className={s.message__form} onSubmit={sendMessage}>
          <input

            onChange={updateMessage}
            type="text"
            className={s.message__form__input}
            placeholder="Say hi..."
            name="message"
            value={message}
          />
        </form>
      </div>
    );
  }
}

TextInput.propTypes = {
  state: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
};

export default TextInput;
