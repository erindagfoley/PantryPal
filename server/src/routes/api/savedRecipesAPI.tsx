import { Router, Response, Request } from "express";
import { authenticateToken, AuthRequest } from "../../middleware/auth.js"; // ✅ Import extended request type
import { SavedRecipe } from "../../models/savedRecipe.js";

const router = Router();

// ✅ Save a new recipe (Use `req.user` for user-specific recipes)
router.post("/", authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id, title, image } = req.body;
    const user = (req as AuthRequest).user; // ✅ Cast `req` to `AuthRequest`

    if (!user || !user.id) { 
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newRecipe = await SavedRecipe.create({ id, title, image, userId: user.id });
    return res.status(201).json(newRecipe);
  } catch (error) {
    return res.status(500).json({ message: "Error saving recipe", error });
  }
});

// ✅ Get all saved recipes (Filtered by user)
router.get("/", authenticateToken, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthRequest).user;

    if (!user || !user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const savedRecipes = await SavedRecipe.findAll({ where: { userId: user.id } });
    return res.json(savedRecipes);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching saved recipes", error });
  }
});

// ✅ Delete a saved recipe (Ensure user owns it)
router.delete("/:id", authenticateToken, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthRequest).user;

    if (!user || !user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const recipeId = req.params.id;
    const recipe = await SavedRecipe.findOne({ where: { id: recipeId, userId: user.id } });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found or not yours" });
    }

    await SavedRecipe.destroy({ where: { id: recipeId } });
    return res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting recipe", error });
  }
});

export default router;
