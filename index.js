const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const demo = require("./demo");

// Создаем веб-сервер
const app = express();

// Делаем наш парсинг в формате json
app.use(bodyParser.json());

// Добавляем дополнительные зоголовки для запросов
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

// Парсит запросы по типу: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//  Достаем из БД события
app.post("/events", async (req, res) => {
  //   const { data } = req.body;

  const { columns, offset, limit, variant } = req.body;

  //   console.log(columns, offset, limit);

  //const data = db.getEvents(columns, offset, limit);

  const data = [
    {
      key: 433333633,
      date: "2021-04-09 12:13:348",
      source: "2BM004M088",
      condition: "SET BYPPAS8",
      action: "OK8",
      description: "Byppas set for interlock8",
      value: "1008",
      pred_value: "80",
      units: "%",
      station: "8STN11",
    },
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    ...demo.data,
    {
      key: 43333333,
      date: "2021-04-09 12:13:349",
      source: "2BM004M099",
      condition: "SET BYPPAS9",
      action: "OK9",
      description: "Byppas set for interlock9",
      value: "1009",
      pred_value: "90",
      units: "%",
      station: "9STN11",
    },
  ];
  const count = data.length;

  res.json({
    columns: demo.columns,
    data: data
      .slice(
        offset,
        offset + limit <= data.length ? offset + limit : data.length
      )
      .map((item) => ({ ...item, key: Math.random() })),
    count,
  });
});

// Устанавливаем порт, и слушаем запросы
app.listen(5090, () => {
  console.log("Сервер запущен на 5090 порту");
});
