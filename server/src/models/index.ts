import sequelize from "../config/connection.js";
import { UserFactory } from "./User.js";
import { RecipeFactory, Recipe } from "./Recipes.js";
import { UserRecipeFactory, UserRecipe } from "./UserRecipes.js";

const User = UserFactory(sequelize);
const RecipeModel = RecipeFactory(sequelize);
const UserRecipeModel = UserRecipeFactory(sequelize);

export { User, RecipeModel, UserRecipeModel };
