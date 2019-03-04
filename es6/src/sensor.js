export class Sensor {
    /**
     * Build a sensor instance
     * @param DBSensorName {string} the database name
     * @param DBSensorUrl {string} the database url
     * @param DBSensorUser {string} the database user
     * @param DBSensorPassword {string} the database password
     * @param DBSensorTable {string} the database table
     * @param DBSensorColumn {string} the database column
     */
    constructor(DBSensorName, DBSensorUrl, DBSensorUser, DBSensorPassword, DBSensorTable, DBSensorColumn) {
        this.DBSensorName = DBSensorName;
        this.DBSensorUrl = DBSensorUrl;
        this.DBSensorUser = DBSensorUser;
        this.DBSensorPassword = DBSensorPassword;
        this.DBSensorTable = DBSensorTable;
        this.DBSensorColumn = DBSensorColumn;
    }

    /**
     * TODO
     * Get a JSON definition of the sensor instance
     * @returns {JSON} the JSON definition
     */
    toJSON() {
        return null;
    }

    /**
     * Get a sensor instance from a JSON containing
     * its definition
     * @param json {JSON} the json definition
     * @return {Sensor} the sensor instance
     */
    static fromJSON(json) {
        if(json.hasOwnProperty('databaseSensorName')) {
            let DBSensorName = json.databaseSensorName;
            let DBSensorUrl = json.databaseSensorUrl;
            let DBSensorUser = json.databaseSensorUser;
            let DBSensorPassword = json.databaseSensorPassword;
            let DBSensorTable = json.databaseSensorTable;
            let DBSensorColumn = json.databaseSensorColumn;

            return new Sensor(DBSensorName, DBSensorUrl, DBSensorUser, DBSensorPassword, DBSensorTable, DBSensorColumn);
        }

        return null;
    }
}