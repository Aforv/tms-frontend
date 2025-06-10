"use client";

import { Route, Routes } from "react-router-dom";
import Layout from "./navigation/Layout";
import Attendenceform from "./components/attendence/Attendenceform";
import AttendenceDataTable from "./components/attendence/AttendenceDataTable";
import { CandidateScreen } from "./components/Candidate/CandidateScreen";
import HourlyTasks from "./components/hourly_tasks/HourlyTasks";
import InternalInterview from "./components/internalInterview/InternalInterview";

function App() {
  return (
    <>     
      <Layout>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-5"> 
        <Routes>
          <Route path="/attendenceform" element={<Attendenceform/>} />
          <Route path="/attendencetable" element={<AttendenceDataTable />} />
          <Route path="/candidate" element={<CandidateScreen></CandidateScreen>}/>
          <Route path="/hourlytasks" element={<HourlyTasks/>} />
          <Route path="/internalinterview" element={<InternalInterview/>} />

        </Routes>
        </div>
      </Layout>

    </>
  );
}

export default App;
