import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

class SavedRecipe extends Model {
  public id!: number;
  public title!: string;
  public image?: string;
  public userId!: number;
}

SavedRecipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "savedRecipe",
    tableName: "savedRecipes", // Ensure this matches your database
    timestamps: true,
  }
);

export { SavedRecipe };
