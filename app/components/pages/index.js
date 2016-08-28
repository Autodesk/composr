import cx from 'classnames';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import StoreAPI from 'StoreAPI';
import CompositionCard from 'common/compositionCard'
import {GridList, GridTile} from 'material-ui/GridList';
import {RaisedButton, Popover, TextField, FlatButton} from 'material-ui';

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

    handleSignUp(e,v) {
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
        if (this.props.currentUser.get('uid'))
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

    render() {
        const tiles = [];
        for (var i=0; i < 6; i++) {
            tiles.push(
                <GridTile title={`composition ${i}`} subtitle={<span> by <b>Matan Zohar</b> </span>}>
                    <img src="https://firebasestorage.googleapis.com/v0/b/composr-cc8ff.appspot.com/o/images%2FSampleComposition.jpg?alt=media&token=2e310c1f-7fed-48eb-99dc-e5b2490faf57" />
                </GridTile>
            )
        }

        return (
            <div>
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

                <div className="main-gallery">
                    <div className="main-gallery-content">
                        <div className="main-gallery-header">
                            Compositions Gallery
                        </div>

                        <GridList
                            cols={3}
                            cellHeight={300}
                            padding={20}
                        >
                            {tiles}
                        </GridList>

                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUser:  StoreAPI.getCurrentUser()
    };
}

export default connect(mapStateToProps)(Index);

