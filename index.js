const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const SQL = require("./sql");

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

// Настраиваем подключение к БД
const sql = new SQL();

//  Достаем из БД события
app.post("/events", async (req, res) => {
  const fetchData = req.body;

  const { data, count } = await sql.getEvents(fetchData);

  res.json({
    data,
    count,
  });
});

// Устанавливаем порт, и слушаем запросы
app.listen(5090, () => {
  console.log("Сервер запущен на 5090 порту");
});
