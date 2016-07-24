import { connect } from 'react-redux';
import cx from 'classnames';

class Item extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const classes = cx({
            item: true
        });

        return (
            <div className={ classes }>
                { this.props.items }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        items: state.toJS().items
    };
}

export default connect(mapStateToProps)(Item);

