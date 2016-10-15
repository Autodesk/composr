import Firebase from 'firebase/firebase';
import CompositionGallery from 'common/compositionsGallery';
import {getNewSignupRef} from 'firebase/firebaseCommands';

class MyCompositions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            compositions: null
        };
    }

    componentDidMount() {
        this.offAuthStateChange = Firebase.firebase.auth().onAuthStateChanged (
            (user) => this.getUserCompositions(user)
        )
    }

    componentWillUnmount() {
        this.offAuthStateChange();
    }

    getUserCompositions(user) {
        if (user) {
            const ref = Firebase.firebase.database().ref(Firebase.getUserCompositionsPath(user.uid));
            ref.once('value').then((res) => {
                const compositions  = res.val();

                if (compositions) {
                    this.setState({compositions});
                }
            })

        }
    }

    render() {
        return (
            <div>
                <CompositionGallery title="My Compositions" compositions={this.state.compositions} />
            </div>
        );
    }
}

export default MyCompositions;

