import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

// Define attributes for UserRecipe
interface UserRecipeAttributes {
  id: number;
  userId: number;
  recipeId: number;
}

// Define optional attributes for creation (omit `id` because it's auto-incremented)
interface UserRecipeCreationAttributes extends Optional<UserRecipeAttributes, 'id'> {}

// Define the UserRecipe model
export class UserRecipe extends Model<UserRecipeAttributes, UserRecipeCreationAttributes> implements UserRecipeAttributes {
  public id!: number;
  public userId!: number;
  public recipeId!: number;
}

// Initialize UserRecipe model
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
