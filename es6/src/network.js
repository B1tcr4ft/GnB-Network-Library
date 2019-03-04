import { Node } from "./node";
import * as jsbayes from 'jsbayes';

export class Network {
    /**
     * Build a network instance
     * @param id {string} the network id
     * @param name {string} the network name
     * @param DBWriteName {string} the database name (as it is called on Grafana's database list) where the nodes' probabilities will be registered
     * @param DBWriteUrl {string} url of the database where the nodes' probabilities will be registered
     * @param DBWriteUser {string} user of the database where the nodes' probabilities will be registered
     * @param DBWritePassword {string} password of the database where the nodes' probabilities will be registered
     * @param refreshTime {number} the interval time (in milliseconds) between the node updates
     * @param nodes {Node[]} the list of nodes
     */
    constructor(id, name, DBWriteName, DBWriteUrl, DBWriteUser, DBWritePassword, refreshTime, nodes) {
        this.id = id;
        this.name = name;
        this.DBWriteName = DBWriteName;
        this.DBWriteUrl = DBWriteUrl;
        this.DBWriteUser = DBWriteUser;
        this.DBWritePassword = DBWritePassword;
        this.refreshTime = refreshTime;
        this.nodes = nodes;
        this.graph = this.makeGraph();
    }

    makeGraph() {
        let graph = jsbayes.newGraph();

        //creating the nodes
        this.nodes.forEach(node => {
            let states = node.states.map(state => state.name);
            graph.addNode(node.id, states);
        });

        //adding data to nodes
        this.nodes.forEach(node => {
            let graphNode = graph.node(node.id);

            //setting parent nodes
            node.parents.forEach(parent => graphNode.addParent(graph.node(parent)));

            //setting cpt
            graphNode.setCpt(node.cpt);
        });

        return graph;
    }

    /**
     * TODO
     * Get a JSON definition of the network instance
     * @returns {JSON} the JSON definition
     */
    toJSON() {
        let network = {};
        network.id = this.id;
        network.name = this.name;
        network.DBWriteName = this.DBWriteName;
        network.DBWriteUrl = this.DBWriteUrl;
        network.DBWriteUser = this.DBWriteUser;
        network.DBWritePassword = this.DBWritePassword;
        network.nodes = this.nodes;

        return JSON.parse(JSON.stringify(network));
    }

    /**
     * Get a network instance from a JSON containing
     * its definition
     * @param json {JSON} the json file
     * @returns {Network} the network instance
     */
    static fromJSON(json) {
        let id = json.id;
        let name = json.name;
        let DBWriteName = json.databaseWriteName;
        let DBWriteUrl = json.databaseWriteUrl;
        let DBWriteUser = json.databaseWriteUser;
        let DBWritePassword = json.databaseWritePassword;
        let refreshTime = json.refreshTime;
        let nodes = json.nodes.map(node => Node.fromJSON(node));

        return new Network(id, name, DBWriteName, DBWriteUrl, DBWriteUser, DBWritePassword, refreshTime, nodes);
    }
}