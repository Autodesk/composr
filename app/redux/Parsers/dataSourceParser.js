/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import {updateSettings} from 'actions/mainActions';
import store from 'store';

class DataSourceParser {
    static fromJSON(json) {
        store.dispatch(updateSettings(json));
    }
}

export default DataSourceParser;