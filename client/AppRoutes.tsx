//created by erin
// routes.tsx or your routing configuration file
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import RecipeSearch from './components/RecipeSearch';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          {/* Other nested routes can go here */}
          <Route path="search" element={<RecipeSearch />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
