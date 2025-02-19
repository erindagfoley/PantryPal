import { DataTypes, Sequelize, Model, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";


// Define the Ingredients class
export class Ingredients extends Model<InferAttributes<Ingredients>, InferCreationAttributes<Ingredients>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare amount: number;
  declare unit: string;
  declare userId: string;
 
}

export function IngredientsFactory(sequelize: Sequelize) {
  Ingredients.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING, // Link to the user who owns the ingredient
        allowNull: false,
      },
   
    },
    {
      tableName: "ingredients",
      sequelize,
    }
  );

  return Ingredients;
}