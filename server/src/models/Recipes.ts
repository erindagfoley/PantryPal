import { DataTypes, Sequelize, Model, Optional } from "sequelize";

// Definining attributes for the Recipes
// ! Not sure what to add in terms of table items
// TODO Fill out the rest of the table
interface RecipeAttributes {
  id: number;
}

// Define the Recipe class extending Sequelize's Model
export class Recipe extends Model<RecipeAttributes> implements RecipeAttributes {
  public id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function RecipeFactory(sequelize: Sequelize): typeof Recipe {
  Recipe.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      tableName: 'recipes',  // Name of the table in PostgreSQL
      sequelize, // The Sequelize instance that connects to PostgreSQL
      hooks: {
        // Leaving empty for now in case we need it
      }
    }
  );

  return Recipe;  // Return the initialized User model
}
