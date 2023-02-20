import './App.css';
import TodosList from './pages/TodosList';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<TodosList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
