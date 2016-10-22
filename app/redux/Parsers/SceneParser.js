/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

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
            const instance = StoreAPI.getObjectById(json[typeName][k].uuid);

            if (instance) {
                instance.setState(json[typeName][k]);
            } else {
                SceneParser.createInstance(types, json[typeName][k]);
            }
        }
    }

    static fromJSON(json) {
        // load controller settings
        // load data settings

        const loadOrder = ['camera', 'controls', 'controller',
            'material', 'geometry', 'deformer', 'mesh', 'layer']
        for (let i of loadOrder) {
            if (json[i]) {
                SceneParser.createInstancesFromType(i, json)
            }
        }
    }
}

export default SceneParser;