import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/analytics';

import firebaseConfig from '../config';

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
  access_type: 'offline',
  display: 'page',
});

googleProvider.addScope('profile');
facebookProvider.addScope('public_profile, email');

const providers = {
  google: googleProvider,
  facebook: facebookProvider,
};

export { providers };

// // const db = firebase.database();
// export const database = () => {
//   const db = firebase.database();
//   return (function (path) {
//     return db.ref(path);
//   })();
// };

export default firebase;
