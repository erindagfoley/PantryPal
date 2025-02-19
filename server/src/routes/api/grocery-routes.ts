import { Router } from "express";
import axios from "axios";
import { authenticateToken } from "../../middleware/auth.js";
import { Ingredients } from "../../models/Ingredients.js";

const router = Router();
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

// Generate a grocery list from selected recipes
router.post("/generate", authenticateToken, async (req, res) => {
  const { recipeIds } = req.body;
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const userId = req.user.username; 

  if (!recipeIds || recipeIds.length === 0) {
    return res.status(400).json({ error: "No recipes provided." });
  }

  try {
    let groceryItems: { name: string; amount: number; unit: string }[] = [];

    // Fetch ingredients for each recipe
    for (const recipeId of recipeIds) {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/information`,
        {
          params: { apiKey: SPOONACULAR_API_KEY },
        }
      );

      const ingredients = response.data.extendedIngredients.map(
        (ingredient: any) => ({
          name: ingredient.name,
          amount: ingredient.measures.metric.amount,
          unit: ingredient.measures.metric.unitShort,
        })
      );

      groceryItems.push(...ingredients);
    }

    // Add duplicate items (sum of all of the quantities)
    const aggregatedList: Record<string, { amount: number; unit: string }> = {};

    groceryItems.forEach(({ name, amount, unit }) => {
      if (!aggregatedList[name]) {
        aggregatedList[name] = { amount, unit };
      } else {
        aggregatedList[name].amount += amount;
      }
    });

    // Store each ingredient in the Ingredients table
    for (const [name, { amount, unit }] of Object.entries(aggregatedList)) {
      await Ingredients.create({
        name,
        amount,
        unit,
        userId,
      });
    }

    return res.status(201).json({ message: "Grocery list generated!" });
  } catch (error) {
    console.error("Error generating grocery list:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// Retrieve a user's grocery lists
router.get("/", authenticateToken, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const userId = req.user.username;

  try {
    const ingredients = await Ingredients.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    return res.json(ingredients);
  } catch (error) {
    console.error("Error fetching grocery lists:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// Delete a grocery list (delete all ingredients for the user)
router.delete("/", authenticateToken, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const userId = req.user.username;

  try {
    await Ingredients.destroy({ where: { userId } });
    return res.json({ message: "Grocery list has been deleted successfully." });
  } catch (error) {
    console.error("Error deleting grocery list:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

export default router;