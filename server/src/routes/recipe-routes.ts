import { Router } from "express";
import { User, Recipe, UserRecipe } from "../models/index.js";

const router = Router();

// Route to save a recipe for a user
router.post("/save-recipe", async (req, res) => {
  try {
    const { userId, spoonacularId, title, image } = req.body;

    let recipe = await Recipe.findOne({ where: { spoonacularId } });
    if (!recipe) {
      recipe = await Recipe.create({ spoonacularId, title, image });
    }

    await UserRecipe.create({ userId, recipeId: recipe.id });

    res.json({ message: "Recipe saved!", recipe });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a user's saved recipes
router.get("/user/:userId/saved-recipes", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: [
        {
          model: Recipe,
          as: "recipes",
          through: { attributes: [] },
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user.recipes);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

export default router;
