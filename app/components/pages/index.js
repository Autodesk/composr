//import cx from 'classnames';
import {RaisedButton, Popover, TextField, FlatButton} from 'material-ui';
import CompositionGallery from 'common/compositionsGallery';
import MyCompositions from './myCompositions';
import Firebase from 'firebase/firebase';

import {getNewSignupRef} from 'firebase/firebaseCommands';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            emailSignedUp: 'unsigned',
            firebaseRef: getNewSignupRef()
        };
    }

    static get propTypes() {
        return {

        };
    }

    componentDidMount() {
        this.refs.mainVideo.onended = () => this.refs.mainVideo.play();

        this.offAuthStateChange = Firebase.firebase.auth().onAuthStateChanged (
            (user) => this.setState({currentUser: user})
        )
    }

    componentWillUnmount() {
        this.offAuthStateChange();
    }

    handleTouchTap (event) {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    }

    handleRequestClose() {
        this.setState({
            open: false
        });
    }

    handleSignUp() {
        const val = this.refs.emailTextField.getValue();
        const regex = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
        if (regex.test(val)) {
            this.state.firebaseRef.set({email: val}).then(
                ()=> { this.setState({emailSignedUp: 'success'}) },
                ()=> { this.setState({emailSignedUp: 'error'}) }
            );

            setTimeout(this.handleRequestClose.bind(this), 2000);
        } else {
            this.setState({emailError: 'Invalid Email'});
        }
    }

    renderSignUpPopup() {

        if ( this.state.emailSignedUp === 'unsigned') {
            return [

                <TextField
                    ref="emailTextField"
                    hintText="email address"
                    errorText={this.state.emailError}
                />,
                <FlatButton label="Sign Up" onTouchTap={this.handleSignUp.bind(this)} />
            ]
        } if ( this.state.emailSignedUp === 'success') {
            return ( <div style={{textAlign:'center', height: '35px'}}> <b>Thank you for joining!</b><br/> We'll keep you posted ASAP.</div> )
        } else {
            return ( <div style={{textAlign:'center', height: '35px'}}>Something went wrong... please try again later</div> )
        }
    }

    renderSignUp() {
        if (this.state.currentUser)
            return null;

        return [
            <RaisedButton id="main-action-button" label="Join Alpha" primary={true}
                          onTouchTap={this.handleTouchTap.bind(this)}/>,

            <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'middle', vertical: 'top'}}
                onRequestClose={this.handleRequestClose.bind(this)}
                style={{padding: '20px', overflowY: 'hidden', width: '384px'}}
                zDepth={3}
            >
                {this.renderSignUpPopup()}
            </Popover>
        ]

    }

    renderWelcomeHero() {
        if (this.state.currentUser)
            return null;

        return (
            <div id="main-video-overlay">
                <div id="main-hero-overlay">
                    <div className="composr-logo-only"></div>
                    <h4 id="welcome-to-composr-text"> Composr is a flexible platform for creating real-time sound reactive visualizations.</h4>
                </div>

                <video ref='mainVideo' id="main-video" poster="https://firebasestorage.googleapis.com/v0/b/composr-cc8ff.appspot.com/o/images%2FmainVideoPoster.jpg?alt=media&token=2b799bc7-7e95-42a2-a30d-84e225313b50" autoPlay muted>
                    <source src="https://firebasestorage.googleapis.com/v0/b/composr-cc8ff.appspot.com/o/composrHeroVid.webm?alt=media&token=971ac3cc-47af-467b-8caf-9efb9e44fd2d" type="video/webm"/>
                </video>
                {this.renderSignUp()}

            </div>
        )
    }

    render() {
        return (
            <div>
                { this.renderWelcomeHero() }

                <CompositionGallery title="Picked Compositions" compositions={{}} />
                <MyCompositions/>
            </div>
        );
    }
}

export default Index;

