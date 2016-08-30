import cx from 'classnames';
import Firebase from 'firebase/firebase';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'signin'
        };
    }

    //
    //_signup() {
    //    return (
    //        <div>
    //            <div className="title">sign up</div>
    //            <input type="text" placeholder="email" ref="signup_mail" />
    //            <input type="password" placeholder="password" ref="signup_pass" />
    //            <div className="button" onClick={ () => this.signUp() }>sign up</div>
    //            <div className="footer">
    //                already a member?
    //                <span className="action" onClick={ () => this.setState({ mode: 'login' }) }>
    //                    sign in<i className="fa fa-sign-in" aria-hidden="true" />
    //                </span>
    //            </div>
    //        </div>
    //    );
    //}

    _signup() {
        return (
            <div>
                <div className="title">sign up</div>
                <div style={{textAlign: 'center'}}>
                    Sign Up is currently limited to Alpha users. <br/> <br/> Please leave your email to get an invite!

                    <input type="text" placeholder="email" ref="signup_mail" />
                    <div className="button" onClick={ () => this.signUp() }>sign up</div>
                </div>
                <div className="footer">
                    already a member?
                    <span className="action" onClick={ () => this.setState({ mode: 'login' }) }>
                        sign in<i className="fa fa-sign-in" aria-hidden="true" />
                    </span>
                </div>
            </div>
        );
    }

    signUp() {
        //Firebase.firebase.auth().createUserWithEmailAndPassword(this.refs.signup_mail.value, this.refs.signup_pass.value);
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

    _signin() {
        return (
            <div>
                <div className="title">sign in</div>
                <input type="text" placeholder="email" ref="signin_mail" />
                <input type="password" placeholder="password" ref="signin_pass" />
                <div className="button" onClick={ () => this.signIn() }>sign in</div>
                <div className="footer">
                    not a member?
                    <span className="action" onClick={ () => this.setState({ mode: 'signup' }) }>
                        sign up now<i className="fa fa-sign-in" aria-hidden="true" />
                    </span>
                </div>
            </div>
        );
    }

    signIn() {
        Firebase.firebase.auth().signInWithEmailAndPassword(this.refs.signin_mail.value, this.refs.signin_pass.value);
    }

    render() {
        return (
            <div>
                <div className="login-container">
                    { this.state.mode === 'signup' ? this._signup() : this._signin() }
                </div>
            </div>
        );
    }
}

export default Login;