import { useState } from "react";
import "./App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Customize from "./pages/Customize";
import Exports from "./pages/Exports";
import Profile from "./pages/Profile";
import { useEffect } from "react";

function App() {

useEffect(() => {
const defaultCategories = [
  { id: 1, category: "Work", emoji: "💼", color: "#FFE8C2" },        // peach
  { id: 2, category: "Personal", emoji: "🏠", color: "#E8F4FF" },    // light sky blue
  { id: 3, category: "Study", emoji: "📚", color: "#E9FFE8" },       // mint green
  { id: 4, category: "Shopping", emoji: "🛒", color: "#FFE8ED" },    // soft pink
  { id: 5, category: "Health", emoji: "💊", color: "#FFF4C2" },      // light yellow
  { id: 6, category: "Fitness", emoji: "💪", color: "#E6FFFA" },     // aqua mint
  { id: 7, category: "Travel", emoji: "✈️", color: "#FFF1E6" },      // creamy orange
  { id: 8, category: "Finance", emoji: "💰", color: "#EAF9FF" },     // icy blue
  { id: 9, category: "Home Tasks", emoji: "🧹", color: "#FFF0F0" },  // blush soft
  { id: 10, category: "Events", emoji: "🎉", color: "#F5E8FF" }      // lavender
];

  // Load saved categories
const saved = JSON.parse(localStorage.getItem("catagory") || "[]");

  // Combine default + saved
  const combined = [...defaultCategories, ...saved];

  // Remove duplicates by `category` name
  const unique = combined.filter(
    (cat, index, self) =>
      index === self.findIndex((c) => c.category === cat.category)
  );

  // Save clean unique list
  localStorage.setItem("catagory", JSON.stringify(unique));
}, []);



  const router = createBrowserRouter([
    {
      path: "/",                // base route
      element: <MainLayout />,  // layout containing Navbar + Outlet
      children: [
        {
          index: true,          // default route (Home)
          element: <Dashboard />
        },
        {
          path: "customize",
          element: <Customize />
        },
        {
          path: "exports",
          element: <Exports />
        },
        {
          path: "profile",
          element: <Profile />
        }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
