import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "popper.js";
import "bootstrap";
import "./assets/scss/app.scss"
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import TodosList from './pages/TodosList';
import Layout from './pages/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IssuesList from './pages/IssuesList';
import store from './features/store';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  element={<Layout />}>
          <Route index element={<TodosList />} />
          <Route path="issues" element={<IssuesList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
