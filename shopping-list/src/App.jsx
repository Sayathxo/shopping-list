import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ListsProvider } from "./context/ListsContext";
import { CURRENT_USER_ID, KNOWN_USERS } from "./api/shoppingListApi";
import PageHeader from "./components/list/PageHeader";
import ShoppingListsPage from "./pages/ShoppingListsPage";
import ShoppingListDetailPage from "./pages/ShoppingListDetailPage";

const CURRENT_USER = KNOWN_USERS.find((u) => u.id === CURRENT_USER_ID);

function App() {
  return (
    <ThemeProvider>
      <ListsProvider>
      <BrowserRouter>
        <PageHeader userName={CURRENT_USER.name} />
        <Routes>
          <Route path="/" element={<Navigate to="/lists" replace />} />
          <Route path="/lists" element={<ShoppingListsPage />} />
          <Route path="/lists/:listId" element={<ShoppingListDetailPage />} />
        </Routes>
      </BrowserRouter>
      </ListsProvider>
    </ThemeProvider>
  );
}

export default App;
