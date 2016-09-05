import Firebase from 'firebase/firebase';
import CompositionGallery from 'common/compositionsGallery';
import {getNewSignupRef} from 'firebase/firebaseCommands';

class MyCompositions extends React.Component {
    componentDidMount() {
        this.offAuthStateChange = Firebase.firebase.auth().onAuthStateChanged (
            (user) => this.setState({currentUser: user})
        )
    }

    componentWillUnmount() {
        this.offAuthStateChange();
    }

    render() {
        return (
            <div>
                <CompositionGallery title="My Compositions" compositions={[1,2,3,4,5,6]} />
            </div>
        );
    }
}

export default MyCompositions;

