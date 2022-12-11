import { Notify } from 'notiflix';

import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  set,
  ref,
  enableLogging,
  update,
  child,
  get,
  onDisconnect,
} from 'firebase/database';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

import { refs } from '../refs';

const firebaseConfig = {
  apiKey: 'AIzaSyCpmvTY0ghry2BME3vXs05gK7Jms9EY33Q',
  authDomain: 'filmoteka-new.firebaseapp.com',
  databaseURL: 'https://filmoteka-new-default-rtdb.firebaseio.com',
  projectId: 'filmoteka-new',
  storageBucket: 'filmoteka-new.appspot.com',
  messagingSenderId: '526905324301',
  appId: '1:526905324301:web:6258b94ba2aa8675bd3644',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const user = auth.currentUser;
const dt = new Date();

refs.registrationForm?.addEventListener('submit', logInUser);

refs.clickRegistrationBtn?.addEventListener('click', handleRegistration);

function handleRegistration(e) {
  e.preventDefault();
  if (refs.clickRegistrationBtn.textContent === 'Log in') {
    refs.registrationForm.addEventListener('submit', logInUser);
    refs.registrationForm.removeEventListener('submit', signUpUser);

    refs.notRegisteredText.style.display = 'block';
    refs.nameInput.style.display = 'none';
    refs.forgotPasswordLink.style.display = 'block';
    refs.clickRegistrationBtn.textContent = 'Sign in';
    refs.submitBtn.value = 'Log in';
  } else {
    refs.registrationForm.removeEventListener('submit', logInUser);
    refs.registrationForm.addEventListener('submit', signUpUser);
    refs.notRegisteredText.style.display = 'none';
    refs.nameInput.style.display = 'flex';
    refs.forgotPasswordLink.style.display = 'none';
    refs.clickRegistrationBtn.textContent = 'Log in';
    refs.submitBtn.value = 'Sign in';
  }
}

//registration
function signUpUser(e) {
  e.preventDefault();
  const username = refs.registrationForm.elements[0].value;
  const email = refs.registrationForm.elements[1].value;
  const password = refs.registrationForm.elements[2].value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      set(ref(database, 'users/' + user.uid), {
        username,
        email: email,
      });
      Notify.success(
        'Congratulations, your account has been successfully created.',
        {
          timeout: 1000,
        }
      );
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Notify.failure(errorMessage, {
        timeout: 2000,
      });
    });
  e.target.reset();
}

//Login
function logInUser(e) {
  e.preventDefault();

  const email = refs.registrationForm.elements[1].value;
  const password = refs.registrationForm.elements[2].value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in

      const user = userCredential.user;
      const uid = user.uid;

      update(ref(database, 'users/' + user.uid), {
        last_login: dt,
      });
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${uid}`))
        .then(snapshot => {
          if (snapshot.exists()) {
          } else {
            console.log('No data available');
          }
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Notify.failure(errorMessage, {
        timeout: 2000,
      });
    });
}

//get user data
onAuthStateChanged(auth, user => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${uid}`))
      .then(snapshot => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          refs.logOutBtn.style.display = 'block';
          refs.watchListBtn.style.display = 'block';
          refs.accountBtn.style.display = 'block';
          refs.signInBtn.style.display = 'none';
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
    // ...
  } else {
    // User is signed out
    // ...
  }
});

refs.logOutBtn?.addEventListener('click', e => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      refs.logOutBtn.style.display = 'none';
      refs.watchListBtn.style.display = 'none';
      refs.accountBtn.style.display = 'none';
      refs.signInBtn.style.display = 'block';
      Notify.success('Successful logged out.', {
        timeout: 1000,
      });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Notify.failure(errorMessage, {
        timeout: 2000,
      });
    });
});
