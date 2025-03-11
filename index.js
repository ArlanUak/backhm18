import express from "express";
import "dotenv/config";
import axios from "axios";

const app = express();
const PORT = 1010;

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));

app.get("/", (req,res) => {
  res.render("index", {title: "Главная страница"});
});

app.get("/search", async (req, res) => {
  const { query } = req.query;
  if(!query) return res.render("search", {books: null, error: null, query: ""});
  
  try {
    const apiUrl = `https://api.itbook.store/1.0/search/${query}`;
    const response = await axios.get(apiUrl);
    const books = response.data.books || [];
    res.render("search", { books, error: null, query });
  } catch (error) {
    res.render("search", {  books: null, error: "Ошибка при получении данных", query });
  }
});

app.get("/about", (req, res) => {
  res.render("about", { title: "О проекте" });
});

app.listen(PORT, () => {
  console.log(`Server start in URL http:localhost:${PORT}`);
});

