"use client";

import { Route, Routes } from "react-router-dom";
import Layout from "./navigation/Layout";
import Attendenceform from "./components/attendence/Attendenceform";
import AttendenceDataTable from "./components/attendence/AttendenceDataTable";
import { CandidateScreen } from "./components/Candidate/CandidateScreen";
import HourlyTasks from "./components/hourly_tasks/HourlyTasks";
import InternalInterview from "./components/internalInterview/InternalInterview";
import { StatusHistoryScreen } from "./components/statushistory/StatusHistoryScreen";
import Overview from "./components/Dashboard/Overview";
import Monthly from "./components/Dashboard/Reports/Monthly";
import Daily from "./components/Dashboard/Reports/Daily";
import TlEvaluationForm from "./components/tlEvaluation/TlEvaluationForm";
import ExternalInterview from "./components/externalinterview/ExternaInterview";
import { HrProcessScreen } from "./components/hrprocess/HrProcessScreen";
import { MentorReviewScreen } from "./components/mentor/MentorReviewScreen";
import GapFillingForm from "./components/gapFilling/GapFillingForm";
function App() {
  return (
    <>     
      <Layout>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-5"> 
        <Routes>
          <Route path="/dashboard/overview" element={<Overview/>} />
          <Route path="/dashboard/reports/daily" element={<Daily />} />
          <Route path="/dashboard/reports/monthly" element={<Monthly />} />
          <Route path="/attendenceform" element={<Attendenceform/>} />
          <Route path="/attendencetable" element={<AttendenceDataTable />} />
          <Route path="/candidate" element={<CandidateScreen></CandidateScreen>}/>
          <Route path="/hourlytasks" element={<HourlyTasks/>} />
          <Route path="/internalinterview" element={<InternalInterview/>} />
          <Route path="/statushistory" element={<StatusHistoryScreen/>}/>
          <Route path="/tlevaluation" element={<TlEvaluationForm/>} />
          <Route path="/externalinterview" element={<ExternalInterview/>} />
          <Route path="/hrprocess" element={<HrProcessScreen/>} />
          <Route path="/mentorreview" element={<MentorReviewScreen/>} />
          <Route path="/gapfilling" element={<GapFillingForm/>} />
        </Routes>
        </div>
      </Layout>

    </>
  );
}

export default App;
