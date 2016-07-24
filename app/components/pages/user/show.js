import cx from 'classnames';

class UserPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const classes = cx({});

        return (
            <div className={ classes }>
                user page
            </div>
        );
    }
}

export default UserPage;

