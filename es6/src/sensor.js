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
}