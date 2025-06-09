"use client";

import { Route, Routes } from "react-router-dom";
import Layout from "./navigation/Layout";
import HourlyTasks from "./components/hourly_tasks/HourlyTasks";

function App() {
  return (
    <>
      <Layout>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-5"> 
        <Routes>
          <Route path="/hourlytasks" element={<HourlyTasks/>} />
        </Routes>
        </div>
      </Layout>

    </>
  );
}

export default App;
