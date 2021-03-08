import firebase from '../firebase';
import services from '../services';

export const parseCookies = () => {
  return document.cookie.split(/; */).reduce((obj, str) => {
    if (str === '') return obj;
    const eq = str.indexOf('=');
    const key = eq > 0 ? str.slice(0, eq) : str;
    let val = eq > 0 ? str.slice(eq + 1) : null;
    if (val !== null) {
      try {
        val = decodeURIComponent(val.replace(/"+/g, ''));
      }
      catch (ex) {
        return null;
      }
    }
    obj[key] = val;
    return obj;
  }, {});
};

export const checkCookies = function () {
  let firstCookie = document.cookie;
  return function () {
    const currentCookie = document.cookie;

    if (firstCookie !== currentCookie) {
      if (Object.values(parseCookies()).length) {
        console.log('User refreshed or did something but is still signed in');
      }
      else {
        console.log('User has cleared cookies so we should sign out');
        const user = firebase.auth().currentUser;
        if (user) {
          services.setOnlineStatus(false);
          // firebase.database().ref(`/users/${user.uid}`).update({ online: false });
        }
        firebase.auth().signOut();
      }
      firstCookie = currentCookie;
    }
  };
};
