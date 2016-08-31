import Firebase from 'firebase';

const clientId = THREE.Math.generateUUID();

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

class FirebaseAPI {
    constructor(options) {
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
    getCompositionPath(uid, compId) {
        return `/compositions/private/${uid}/${compId}`;
    }

    makePublic() {

    }

    getCompositionUrl(uid, compId) {
        return `/${uid}/comp/${compId}`;
    }

    setDatabaseCompRef(uid, compId) {
        this.compRef = this.firebase.database().ref(this.getCompositionPath(uid, compId));
    }

    createCompRef() {
        const currentUser = this.firebase.auth().currentUser;

        if (currentUser) {
            const compId = makeid();
            this.setDatabaseCompRef(currentUser.uid, compId);

            return {uid: currentUser.uid, compId, url: this.getCompositionUrl(currentUser.uid, compId)};
        }

        console.error('createCompRef: Permission denied, No Authenticated user.')
    }

    getCompData() {
        if (this.compRef) {
            return this.compRef.once('value');
        }

        console.error('getCompData: No composition is set');
    }

    setCompData(payload) {
        if (this.compRef) {
            payload.clientId = clientId;

            return this.compRef.set(payload);
        }

        console.error('setCompData: No composition is set');
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