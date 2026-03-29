import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ShoppingListsPage from "./pages/ShoppingListsPage";
import ShoppingListDetailPage from "./pages/ShoppingListDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/lists" replace />} />
        <Route path="/lists" element={<ShoppingListsPage />} />
        <Route path="/lists/:listId" element={<ShoppingListDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;