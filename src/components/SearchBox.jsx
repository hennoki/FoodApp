import { useEffect, useState } from "react";
import styles from "./searchBox.module.css";

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "d55f25d4f7764e32b44d2b0ba5a2ef9e";

export default function SearchBox({ foodData, setFoodData }) {
  const [query, setQuery] = useState("pizza");
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data.results);
      setFoodData(data.results);
    }
    fetchFood();
  }, [query]);
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
      />
    </div>
  );
}
