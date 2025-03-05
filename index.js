import express from "express";
import "dotenv/config";
import axios from "axios";

const app = express();
const PORT = 1010;
const KEY = process.env.KEY;
app.use(express.json());

app.get("/search/:query", async (req, res) => {
  const { query } = req.params;
  const apiUrl = `https://api.itbook.store/1.0/search/${query}`;
  try {
    const response = await axios.get(apiUrl);
    const books = response.data.books;
    if (!books || books.length === 0) {
      throw new Error("Книги не найдены");
    }

    // Возвращаем только нужные данные о книгах
    const filteredBooks = books.map((book) => ({
      title: book.title,
      subtitle: book.subtitle,
      price: book.price,
      image: book.image,
      url: book.url,
    }));

    res.json(filteredBooks);
  } catch (error) {
    res.status(500).json({ error: error.message || "Ошибка при получении данных" });
  }
});

app.listen(PORT, () => {
  console.log(`Server start in URL http:localhost:${PORT}`);
});

// https://api.openweathermap.org/geo/1.0/directl?q={city}&limit=1&appid={API key}
