"use client";

import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ProfilePage from "./components/ProfilePage";
import ProfilePage from "./components/ProfilePage";
import Layout from "./navigation/Layout";
import Overview from "./components/Dashboard/Overview";
import Daily from "./components/Dashboard/Reports/Daily";
import Monthly from "./components/Dashboard/Reports/Monthly";
import Attendenceform from "./components/attendence/Attendenceform";
import AttendenceDataTable from "./components/attendence/AttendenceDataTable";
import { CandidateScreen } from "./components/Candidate/CandidateScreen";


function App() {
  return (
    <>     
      <Layout>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-5"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard/overview" element={<Overview />} />
          <Route path="/dashboard/reports/daily" element={<Daily />} />
          <Route path="/dashboard/reports/monthly" element={<Monthly />} />
          <Route path="/attendenceform" element={<Attendenceform/>} />
          <Route path="/attendencetable" element={<AttendenceDataTable />} />
          <Route path="/candidate" element={<CandidateScreen></CandidateScreen>}/>
       
        </Routes>
        </div>
      </Layout>

    </>
  );
}

export default App;
