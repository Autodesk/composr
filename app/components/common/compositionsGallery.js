/**
 * @author Matan Zohar /matanzr@gmail.com
 */

import {GridList, GridTile} from 'material-ui/GridList';

class CompositionGallery extends React.Component {

    static get propTypes() {
        return {
            title: React.PropTypes.string,
            compositions: React.PropTypes.object
        };
    }

    render() {
        const defaultImage = "https://firebasestorage.googleapis.com/v0/b/composr-cc8ff.appspot.com/o/images%2FSampleComposition.jpg?alt=media&token=2e310c1f-7fed-48eb-99dc-e5b2490faf57";
        const compositions = this.props.compositions;

        const tiles = [];
        if (compositions) {
            Object.keys(compositions).forEach((c) => {
                const metadata = compositions[c].metadata;
                tiles.push(
                    <a href={`/${metadata.ownerId}/comp/${metadata.compId}`}>
                    <GridTile title={metadata.compName} subtitle={<span> by <b>{metadata.owner}</b> </span>}>
                        <img src={defaultImage} />
                    </GridTile>
                        </a>
                );
            });

        } else {
            tiles.push(<GridTile title="Nothing to show yet..." ></GridTile>)
        }

        return (
            <div className="main-gallery">
                <div className="main-gallery-content">
                    <div className="main-gallery-header">
                        { this.props.title }
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
        )
    }
}


export default CompositionGallery;
