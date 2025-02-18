import sequelize from "../config/connection.js";
import { UserFactory, associateUser } from "./User.js";
import { RecipeFactory, associateRecipe } from "./Recipes.js";
import { UserRecipeFactory } from "./UserRecipes.js";

const User = UserFactory(sequelize);
const Recipe = RecipeFactory(sequelize);
const UserRecipe = UserRecipeFactory(sequelize);

// Establish associations
associateUser();
associateRecipe();

sequelize.sync({ alter: true }); // Make sure associations are applied
export { User, Recipe, UserRecipe };
