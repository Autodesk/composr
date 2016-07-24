import cx from 'classnames';
import { connect } from 'react-redux';
import cookie from 'react-cookie';

class Index extends React.Component {
    static get propTypes() {
        return {

        };
    }

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-9">

                    </div>
                    <div className="col-md-3">
                        <div className="sidebar">


                            <div className="footer">
                                <span>help</span>
                                <span>privacy</span>
                                <span>terms</span>
                                <span>about</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps, { })(Index);

