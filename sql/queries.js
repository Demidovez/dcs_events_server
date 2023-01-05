const dateFormat = require("dateformat");

class Query {
  static getEvents(
    timeStart,
    timeEnd,
    offset,
    limit,
    sortColumn,
    sortType,
    sortDataColumns
  ) {
    const {
      Source,
      Description,
      ConditionName,
      Action,
      Value,
      Units,
      Station,
    } = sortDataColumns;

    return {
      queryData: `
        DECLARE @queryTimeStart BIGINT
        DECLARE @queryTimeEnd BIGINT

        SELECT @queryTimeStart = CAST(DATEDIFF(MINUTE, '1601-01-01 00:00:00', DATEADD(MINUTE, -180, CAST('${dateFormat(
          timeStart,
          "yyyy-mm-dd HH:MM:ss.l"
        )}' as datetime))) AS BIGINT) * 600000000

        SELECT @queryTimeEnd = CAST(DATEDIFF(MINUTE, '1601-01-01 00:00:00', DATEADD(MINUTE, -180, CAST('${dateFormat(
          timeEnd,
          "yyyy-mm-dd HH:MM:ss.l"
        )}' as datetime))) AS BIGINT) * 600000000

        SELECT * FROM (
          SELECT
                  [Time] as [Timestamp],
                  [EventID],
                  DATEADD(MINUTE, ABS(TimeBias), CAST(([Time] / 864000000000.0 - 109207) AS DATETIME)) as [Time],
                  [Action],
                  [Source],
                  [Station],
                  [ConditionName],
                  [Description],
                  [LocationFullName],
                  [Reason],
                  [Units],
                  [Value],
                  [PrevValue],
                  ROW_NUMBER() OVER (ORDER BY ${
                    sortColumn || "Time"
                  } ${sortType}) AS RowNum
              FROM [emsevents].[dbo].[Events] 
              WHERE [Time] <= @queryTimeStart AND [Time] >= @queryTimeEnd
              ${
                Source
                  ? `AND [Source] like '${Source.split("*").join("%")}'`
                  : ""
              }
              ${
                Description
                  ? `AND [Description] like '${Description.split("*").join(
                      "%"
                    )}'`
                  : ""
              }
              ${
                ConditionName
                  ? `AND [ConditionName] like '${ConditionName.split("*").join(
                      "%"
                    )}'`
                  : ""
              }
              ${
                Action
                  ? `AND [Action] like '${Action.split("*").join("%")}'`
                  : ""
              }
              ${Value ? `AND [Value] like '${Value.split("*").join("%")}'` : ""}
              ${Units ? `AND [Units] like '${Units.split("*").join("%")}'` : ""}
              ${
                Station
                  ? `AND [Station] like '${Station.split("*").join("%")}'`
                  : ""
              }
          ) AS result WHERE result.RowNum > ${offset} AND result.RowNum <= ${
        offset + limit
      }`,
    };
  }
}

module.exports = Query;
