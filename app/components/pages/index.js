import cx from 'classnames';
import { connect } from 'react-redux';
import cookie from 'react-cookie';

import CompositionCard from 'common/compositionCard'
import {GridList, GridTile} from 'material-ui/GridList';

class Index extends React.Component {
    static get propTypes() {
        return {

        };
    }

    componentDidMount() {
        this.refs.mainVideo.onended = () => this.refs.mainVideo.play();
    }

    render() {
        const tiles = [];
        for (var i=0; i < 6; i++) {
            tiles.push(
                <GridTile title={`composition ${i}`} subtitle={<span> by <b>Matan Zohar</b> </span>}>
                    <img src="/assets/images/SampleComposition.jpg" />
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

                    <video ref='mainVideo' id="main-video" poster="/assets/images/mainVideoPoster.jpg" playsinline autoPlay muted>
                            <source src="https://firebasestorage.googleapis.com/v0/b/composr-cc8ff.appspot.com/o/composrHeroVid.webm?alt=media&token=971ac3cc-47af-467b-8caf-9efb9e44fd2d" type="video/webm"/>
                    </video>
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

export default Index;

