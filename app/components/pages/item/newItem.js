import cx from 'classnames';

class NewItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const classes = cx({});

        return (
            <div className={ classes }>
                add / edit new item
            </div>
        );
    }
}

export default NewItem;

