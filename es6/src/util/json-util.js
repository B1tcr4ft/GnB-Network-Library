import { Network } from '../network/network';

/**
 * TODO
 * Get a JSON definition of a network instance
 * @param network {Network} the network instance
 * @returns {JSON} the JSON definition
 */
export function getJSONFromNetwork(network) {
    return null;
}

/**
 * Get a network instance from a JSON containing
 * its definition
 * @param json {JSON} the json file
 * @returns {Network} the network instance
 */
export function getNetworkFromJSON(json) {
    let id = json.id;
    let name = json.name;
    let DBWriteName = json.databaseWriteName;
    let refreshTime = json.refreshTime;
    let nodes = json.nodes.map(node => Node.fromJSON(node));

    return new Network(id, name, DBWriteName, refreshTime, nodes);
}