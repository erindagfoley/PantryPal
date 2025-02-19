import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import { User } from "./User.js";
import { UserRecipe } from "./UserRecipes.js";
import { Ingredients } from "./Ingredients.js";

// Definining attributes for the Recipes
interface RecipeAttributes {
  id: number;
  spoonacularId: number;
  title: string;
  image: string;
}

// Define the optional attributes for creating a new Recipe
interface RecipeCreationAttributes extends Optional<RecipeAttributes, "id"> {}

// Define the Recipe class extending Sequelize's Model
export class Recipe
  extends Model<RecipeAttributes, RecipeCreationAttributes>
  implements RecipeAttributes
{
  public id!: number;
  public spoonacularId!: number;
  public title!: string;
  public image!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Define the RecipeFactory function to initialize the Recipe model
export function RecipeFactory(sequelize: Sequelize): typeof Recipe {
  Recipe.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      spoonacularId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "recipes",
      sequelize,
    }
  );

  return Recipe;
}

export function associateRecipe() {
  Recipe.belongsToMany(User, {
    through: UserRecipe,
    foreignKey: "recipeId",
    as: "users",
  });

  Recipe.hasMany(Ingredients, {
    foreignKey: "spoonacularId",
    as: "ingredients",
  });
}
