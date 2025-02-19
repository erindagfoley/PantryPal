import { DataTypes, Sequelize, Model, Optional } from "sequelize";

// Define attributes for the Ingredients model
interface IngredientsAttributes {
  id: number;
  userID: number; // Foreign key to associate with the User table
  spoonacularId: number; // Foreign key to associate with the Recipe table
  name: string; // Name of the ingredient
  amount: number; // Quantity of the ingredient
  unit: string; // Unit of measurement (e.g., grams, cups)
}

// Define optional attributes for creating a new Ingredient
interface IngredientsCreationAttributes extends Optional<IngredientsAttributes, "id"> {}

// Define the Ingredients class
export class Ingredients
  extends Model<IngredientsAttributes, IngredientsCreationAttributes>
  implements IngredientsAttributes
{
  public id!: number;
  public userID!: number;
  public spoonacularId!: number;
  public name!: string;
  public amount!: number;
  public unit!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Define the IngredientsFactory function to initialize the Ingredients model
export function IngredientsFactory(sequelize: Sequelize): typeof Ingredients {
  Ingredients.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // References the User table
          key: "id",
        },
      },
      spoonacularId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "recipes", // References the Recipe table
          key: "spoonacularId",
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "ingredients", // Name of the table in PostgreSQL
      sequelize, // The Sequelize instance that connects to PostgreSQL
    }
  );

  return Ingredients; // Return the initialized Ingredients model
}