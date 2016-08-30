/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import {updateMetadata} from 'actions/mainActions';
import store from 'store';

class MetadataParser {
    static fromJSON(json) {
        store.dispatch(updateMetadata(json));
    }
}

export default MetadataParser;