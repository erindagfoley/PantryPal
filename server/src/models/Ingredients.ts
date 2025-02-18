import { DataTypes, Sequelize, Model } from "sequelize";

// Definining attributes for the Recipes
// ! Not sure what to add in terms of table items
// TODO Fill out the rest of the table
interface IngredientsAttributes {
  id: number;
}

// Define the Recipe class extending Sequelize's Model
export class Ingredients extends Model<IngredientsAttributes> implements IngredientsAttributes {
  public id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function IngredientsFactory(sequelize: Sequelize): typeof Ingredients {
  Ingredients.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      tableName: 'ingredients',  // Name of the table in PostgreSQL
      sequelize, // The Sequelize instance that connects to PostgreSQL
      hooks: {
        // Leaving empty for now in case we need it
      }
    }
  );

  return Ingredients;  // Return the initialized User model
}
