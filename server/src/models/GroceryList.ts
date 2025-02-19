import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection.js";
// import { User } from "./User.js";

class GroceryList extends Model {}

GroceryList.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    // userId: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   references: {
    //     model: User,
    //     key: "id",
    //   },
    // },
    items: {
      type: DataTypes.JSONB, // Stores structured ingredient data
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "GroceryList",
    timestamps: true,
  }
);

export default GroceryList;
