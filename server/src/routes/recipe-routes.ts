import { Router } from 'express';
import { User, Recipe, UserRecipe } from '../models';

const router = Router();


// Route to save a recipe for a user
router.post('/save-recipe', async (req, res) => {
  try {
    const { userId, spoonacularId, title, image } = req.body;

    let recipe = await Recipe.findOne({ where: { spoonacularId } });
    if (!recipe) {
      recipe = await Recipe.create({ spoonacularId, title, image });
    }

    await UserRecipe.create({ userId, recipeId: recipe.id });

    res.json({ message: 'Recipe saved!', recipe });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a user's saved recipes
router.get('/user/:userId/saved-recipes', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.userId, {
        include: [
          {
            model: Recipe,
            as: 'recipes', // Make sure to use the alias defined in associations
            through: { attributes: [] }, // Exclude join table columns
          },
        ],
      });
  
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.json(user.recipes); // Now this should work
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
  export default router;
