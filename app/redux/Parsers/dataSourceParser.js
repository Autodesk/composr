/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import {updateDatasourceSettings} from 'actions/mainActions';
import store from 'store';

class DataSourceParser {
    static fromJSON(json) {
        store.dispatch(updateDatasourceSettings(json));
    }
}

export default DataSourceParser;