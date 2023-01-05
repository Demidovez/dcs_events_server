const sql = require("mssql");
const configDB = require("../config");
const Query = require("./queries");
const dateFormat = require("dateformat");

class SQL {
  constructor() {
    sql.on("error", (err) => {
      console.log("ERROR SQL: " + err);
    });

    this.pool = new sql.ConnectionPool(configDB.CONNECTION_STRING);
    this.poolConnect = this.pool.connect();
  }

  async getEvents(fetchData) {
    const {
      timeStart,
      timeEnd,
      offset,
      limit,
      sortColumn,
      sortType,
      sortDataColumns,
    } = fetchData;

    try {
      const { queryData } = Query.getEvents(
        timeStart,
        timeEnd,
        offset,
        limit,
        sortColumn,
        sortType,
        sortDataColumns
      );

      await this.poolConnect;
      const startData = new Date().getTime();

      const data = await this.pool.request().query(queryData);
      console.log("Done data: " + (new Date().getTime() - startData));

      //pool.close();

      return {
        data: data.recordset.map((item) => ({
          ...item,
          Time: dateFormat(new Date(item.Time), "yyyy-mm-dd HH:MM:ss.l", true),
        })),
      };
    } catch (err) {
      console.log(err);

      return [];
    }
  }
}

module.exports = SQL;
