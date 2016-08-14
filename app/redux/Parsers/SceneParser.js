/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import ComposeLayer from 'js/Scene/ComposeLayer';
import ComposeMesh from 'js/Scene/ComposeMesh';
import StoreAPI from 'StoreAPI';

class SceneParser {
    static createInstance(types, instanceJson) {
        if (instanceJson.constructorName in types) {
            return new types[instanceJson.constructorName](instanceJson);
        }

        console.warn(`constructor type ${instanceJson.constructorName} doesnt exist`);
    }

    static createInstancesFromType(typeName, json) {
        const types = StoreAPI.getObjectClassesByType(typeName);

        for (let k of Object.keys(json[typeName])) {
            SceneParser.createInstance(types, json[typeName][k]);
        }
    }

    static fromJSON(json) {
        // load controller settings
        // load data settings

        if (json.geometry){ SceneParser.createInstancesFromType('geometry', json) }
        if (json.deformer){ SceneParser.createInstancesFromType('deformer', json) }
        if (json.layer){ SceneParser.createInstancesFromType('layer', json) }
        if (json.mesh){ SceneParser.createInstancesFromType('mesh', json) }
    }
}

export default SceneParser;