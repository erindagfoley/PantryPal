import sequelize from "../config/connection.js";
import { UserFactory, associateUser } from "./User.js";
import { RecipeFactory, associateRecipe } from "./Recipes.js";
import { UserRecipeFactory } from "./UserRecipes.js";
import { IngredientsFactory } from "./Ingredients.js";

const User = UserFactory(sequelize);
const Recipe = RecipeFactory(sequelize);
const UserRecipe = UserRecipeFactory(sequelize);
IngredientsFactory(sequelize);

// Establish associations
associateUser();
associateRecipe();

// Make sure associations are applied
sequelize.sync({ alter: true }); 
export { User, Recipe, UserRecipe };
