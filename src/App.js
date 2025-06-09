"use client";

import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
// import Header from "./navigation/Header";
// import SideNav from "./navigation/SideNav";
// import About from "./components/About";
// import SidebarToggle from "./navigation/SidebarToggle";
// // import CollapsibleSidebar from "./navigation/CollapsibleSidebar";
// import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
// import SideNavNew from "./navigation/SideNavNew";
import Layout from "./navigation/Layout";
import Overview from "./components/Dashboard/Overview";
import Daily from "./components/Dashboard/Reports/Daily";
import Monthly from "./components/Dashboard/Reports/Monthly";
import { CandidateScreen } from "./components/Candidate/CandidateScreen";


function App() {
  return (
    <>
      {/* <Header/>
      <SideNav/> */}
      {/* <SidebarToggle/> */}

      {/* <CollapsibleSidebar/>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">          
            <Routes>                   
                <Route path="about" element={<About />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="/" element={<Home />}>
                  <Route index element={<Home />} />
                </Route>
            </Routes>
        </div>
      </div> */}

      {/* <CollapsibleSidebar>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-5">          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </CollapsibleSidebar> */}

      {/* <SideNavNew/> */}

       {/* <Layout>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-5"> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        </div>
      </Layout> */}
     
      <Layout>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-5"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard/overview" element={<Overview />} />
          <Route path="/dashboard/reports/daily" element={<Daily />} />
          <Route path="/dashboard/reports/monthly" element={<Monthly />} />
          <Route path="/candidate" element={<CandidateScreen></CandidateScreen>}/>
       
        </Routes>
        </div>
      </Layout>

    </>
  );
}

export default App;
