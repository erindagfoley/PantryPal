import { DataTypes, Sequelize, Model } from 'sequelize';

// Define the attributes for the UserRecipe model
interface UserRecipeAttributes {
  id: number;
  userId: number;
  recipeId: number;
}

// Define the UserRecipe class extending Sequelize's Model
export class UserRecipe extends Model<UserRecipeAttributes> implements UserRecipeAttributes {
  public id!: number;
  public userId!: number;
  public recipeId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Define the UserRecipeFactory function to initialize the UserRecipe model
export function UserRecipeFactory(sequelize: Sequelize): typeof UserRecipe {
  UserRecipe.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'user_recipes',
      sequelize,
    }
  );

  return UserRecipe;
}
