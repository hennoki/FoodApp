import { useEffect, useState } from "react";
import styles from "./fooddetails.module.css";
import ItemList from "./ItemList";

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "d55f25d4f7764e32b44d2b0ba5a2ef9e";
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]);
  return (
    <div className={styles.recipeCard}>
      <div>
        <h1 className={styles.recipeName}>{food.title}</h1>

        <img className={styles.recipeImage} src={food.image} alt="" />

        <div className={styles.recipeDetails}>
          <span>
            <strong>⏲ Ready in {food.readyInMinutes} Minutes</strong>
          </span>
          <span>
            👪 <strong> Serves {food.servings}</strong>{" "}
          </span>
          <span>
            {" "}
            <strong>
              {food.vegetarian ? "🥕 vegetarian" : "🍖 Non-Vegetarian"}{" "}
            </strong>{" "}
          </span>
          <span>
            🐮 <strong>{food.vegan ? "Vegan" : ""}</strong>{" "}
          </span>
        </div>
        <div>
          <span>
            💲<strong>{food.pricePerServing / 100} Per serving</strong>
          </span>
        </div>
      </div>

      <h2>Ingredients</h2>
      <ItemList food={food} isLoading={isLoading} />

      <h2>Instructions</h2>

      <div className={styles.recipeInstructions}>
        <ol>
          {isLoading ? (
            <p>loading...</p>
          ) : (
            food.analyzedInstructions[0].steps.map((step) => (
              <li>{step.step}</li>
            ))
          )}
        </ol>
      </div>
    </div>
  );
}
