import dotenv from 'dotenv';
dotenv.config();
import express, { type Request, type Response} from 'express';
import path from 'node:path';
const root = process.cwd();
import sequelize from './config/connection.js';
import routes from './routes/index.js';
import savedRecipesRoutes from "./routes/api/savedRecipesAPI.js"; // ✅ Correct the path





const app = express();
const PORT = process.env.PORT || 3001;
app.use("/api/saved-recipes", savedRecipesRoutes);

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

// Middleware to parse incoming requests
app.use(express.json());
app.use(routes);

// Wild card route to serve the index.html file
app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(root, '../client/dist/index.html'));
});

// Test-code line to check if the server is running
// app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));

// * Change force to true to drop tables and recreate them
sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
