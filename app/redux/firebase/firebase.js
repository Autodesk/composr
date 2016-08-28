import Firebase from 'firebase';

const clientId = THREE.Math.generateUUID();

class FirebaseAPI {
    constructor() {
        // Initialize Firebase
        const CONFIG = {
            apiKey: "AIzaSyB97YRcugOQrj5E2QVTb06Nl5d72Vd8mqU",
            authDomain: "composr-cc8ff.firebaseapp.com",
            databaseURL: "https://composr-cc8ff.firebaseio.com",
            storageBucket: "composr-cc8ff.appspot.com"
        };
        this.firebase = Firebase.initializeApp(CONFIG);
        this.storage = this.firebase.storage().ref();
    }
    // REALTIME DATABASE
    // ************************************************
    getDatabaseRef(path) {
        return this.firebase.database().ref(path);
    }

    set(path, payload, callback) {
        payload.clientId = clientId;

        this.firebase.database().ref(path).set(payload).then((e) => {
            if (callback) callback();
        });
    }
    push(path, payload, callback) {
        this.firebase.database().ref(path).push(payload).then(function(e) {
            console.log('success', e);
        }, function(error) {
            console.log(error);
        });
    }
    update() {
    }

    transaction() {
    }

    remove() {
    }

    getData(location, callback) {
        this.firebase.database().ref(location).once('value').then((snapshot) => {
            callback(snapshot.val());
            console.log('getting...', snapshot.val());
        });
    }

    onAdd(ref, callback) {
        const dataRef = firebase.database().ref(ref);
        dataRef.on('child_added', (data) => {
            callback(data.val());
        });
    }

    onChange(ref, callback) {
        const dataRef = firebase.database().ref(ref);
        dataRef.on('value', (data) => {
            if (clientId != data.val().clientId) {
                callback(data.val());
            } else {
                console.log('same client');
            }
        });
    }

    // AUTHENTICATION
    // ************************************************
    getCurrentUser(onLogin, onLogout) {
        this.firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                console.log('signed in...', user);
                onLogin(user);
            } else {
                // No user is signed in.
                console.log('not signed in');
                onLogout();
            }
        });
    }
    createUser(email, password) {
        this.firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            console.log(error);
        });
    }
    updateUser(data) {
        const user = this.firebase.auth().currentUser;
        user.updateProfile(data).then(() => {
            // Update successful.
        }, function(error) {
            // An error happened.
        });
    }
    signIn(email, password) {
        this.firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            console.log(error);
        });
    }
    signOut() {
        this.firebase.auth().signOut().then(function() {
            console.log('signed out!');
        }, function(error) {
            console.log(error);
        });
    }
    // STORAGE
    // ************************************************
    upload(fileName, path, file) {
        // Create a reference to 'file'
        const fileRef = this.storage.child(fileName);
        // Create a reference to 'images/mountains.jpg'
        const imagesRef = this.storage.child(`${ path }/${ fileName }`);
        // Upload the file to the path 'images/rivers.jpg'
        // We can use the 'name' property on the File API to get our file name
        const uploadTask = this.storage.child(`${ path }/${ fileName }`).put(file);
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // See below for more detail
        }, function(error) {
            // Handle unsuccessful uploads
            console.error(error);
        }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            const downloadURL = uploadTask.snapshot.downloadURL;
            console.log('success', downloadURL);
        });
    }
}
const FirebaseAPIInstance = new FirebaseAPI();
export default FirebaseAPIInstance;

window.fb = FirebaseAPIInstance;