import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const prodConfig = {
  apiKey: process.env.REACT_APP_PROD_API_KEY,
  authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
  projectId: process.env.REACT_APP_PROD_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
};
const devConfig = {
  apiKey: process.env.REACT_APP_DEV_API_KEY,
  authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
  projectId: process.env.REACT_APP_DEV_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
};
const config =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

config['userProfile'] = 'users';
config['useFirestoreForProfile'] = true;

class Firebase {
  constructor() {
    app.initializeApp(config);

    // Helper
    this.fieldValue = app.firestore.fieldValue;

    this.auth = app.auth();
    this.db = app.firestore();

    this.user = this.user.bind(this);
    this.chapter = this.chapter.bind(this);
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // ***USERS***
  user = uid => this.db.doc(`users/${uid}`);
  users = () => this.db.collection('users');
  addTripToUser = (uid, tripRef) => {
    return this.user(uid)
      .set(
        {
          trips: [tripRef]
        },
        { merge: true }
      )
  }

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();

            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** OTHER APIs ***

  // ***CHAPTERS***
  // get chapters
  getChapters = () => this.db.collection('chapters');
  chapter = (id) => this.db.doc(`chapters/${id}`);

  // ***TRIPS***
  // get trips and users for admin
  async getAdminTrips(chapter) {
    var result = [];
    let tripsRef = await this.db.collection('trips').where('chapter', '==', chapter).get();
    for (var trip of tripsRef.docs) {
      let data = { ...trip.data(), tripUid: trip.id };
      const userId = trip.data().user.id;
      let userRef = await this.db.doc(`users/${userId}`).get();
      data = { ...data, ...userRef.data(), userUid: userRef.id };
      result.push(data);
    }
    return result;
  }

  async getAdminTripDetails(tripId) {
    let tripRef = await this.db.doc(`trips/${tripId}`).get();
    const userId = tripRef.data().user.id;
    let userRef = await this.db.doc(`users/${userId}`).get();
    return {
      ...userRef.data(),
      ...tripRef.data(),
      userUid: userRef.ida,
      tripUid: tripRef.id
    };
  }

  // set confirmed time
  async setConfirmedTime(tripId, date) {
    await this.db.doc(`trips/${tripId}`)
      .set({ confirmed_time: { completed: true, time: date } }, { merge: true });;
    let tripRef = await this.db.doc(`trips/${tripId}`).get();
    const userId = tripRef.data().user.id;
    let userRef = await this.db.doc(`users/${userId}`).get();
    return {
      ...userRef.data(),
      ...tripRef.data(),
      userUid: userRef.ida,
      tripUid: tripRef.id
    };
  }

  // trips by userId
  tripsByUser = (uid) => {
    const userRef = this.user(uid)
    return this.db.collection('trips')
      .where('user', '==', userRef)
  }

  // write new trip data to "trip" collection
  setNewTrip = (uid, tripData) => {
    const userRef = this.user(uid)
    const chapterRef = this.chapter(tripData.chapterId)
    return this.db.collection('trips').add({
      airline_name: tripData.airline,
      comments: tripData.comments,
      departure_date: tripData.departureDate,
      destination: tripData.destination,
      return_date: tripData.returnDate,
      supplies: tripData.supplies,
      suitcase: tripData.suitcase,
      user: userRef,
      chapter: chapterRef,
      requested: {
        completed: true
      }
    });
  }

  // ***CLINIC***
  setNewClinic = (clinicInfo) => {
    return this.db.collection('clinics')
      .doc(clinicInfo.place_id).set({
        ...clinicInfo
      })
  }
  clinics = () => this.db.collection('users');

}
export default Firebase;
