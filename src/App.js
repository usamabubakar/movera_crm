import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Sidebar from './components/Sidebar';
import SidebarAgent from './components/pages/SidebarAgent';
import Dashboard from './components/Dashboard';
import Agent from './components/Agentt';
import Lead from './components/Lead';
import Vendor from './components/Vendor';
import Login from './components/Login';
import Quotes from './components/pages/Quotes';
import Isapprovel from './components/Isapprovel';
import TrackAgent from './components/TrackAgent';
// agent pages
import Leadagent from './components/pages/Leadagent';
import Followup from './components/pages/Followup';
import Cancellead from './components/pages/Cancellead';
import Adminchat from './components/Adminchat';
import Orders from './components/pages/Order';
import Potential from './components/pages/Potential';
import Agreement from './components/pages/Agreement';
import Dispatched from './components/pages/Dispatched';
import Chat from './components/pages/Chat';
import CustomerAgreement from './components/pages/CustomerAgreement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './App.css';

import store from './state/store';



function App() {
  const [hideshow, setHideshow] = useState(16);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isAdmin = useSelector(state => state.auth.isAdmin);
  const isAgent = useSelector(state => state.auth.isAgent);


  const handleWidth = () => {
    setHideshow(hideshow === 16 ? 3.5 : 16);
  };

  useEffect(() => {
    if (!isAuthenticated && window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }, [isAuthenticated]);


  return (
    <Router>
      <div className="Appdivs">
        {
          isAuthenticated ? (
            <>
              {isAdmin ? (
                <div className="sidebardiv" style={{ width: `${hideshow}rem` }}>
                  <div className="hideshowicon">
                    <FontAwesomeIcon icon={faCircleArrowLeft} onClick={handleWidth} />
                  </div>
                  <Sidebar widthh={hideshow} />
                </div>
              ) : (
                isAgent ? (
                  <div className="sidebardiv" style={{ width: `${hideshow}rem` }}>
                    <div className="hideshowicon">
                      <FontAwesomeIcon icon={faCircleArrowLeft} onClick={handleWidth} />
                    </div>
                    <SidebarAgent widthh={hideshow} />
                  </div>
                ) : null
              )}
            </>
          ) : null
        }
        <div className="routediv">
          <Routes>
            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/lead" element={<Lead />} />
                    <Route path="/agent" element={<Agent />} />
                    <Route path="/vendor" element={<Vendor />} />
                    <Route path="/pendingleads" element={<Isapprovel />} />
                    <Route path="/trackagent" element={<TrackAgent />} />
                    <Route path="/chat" element={<Adminchat />} />
                    <Route path="/login" element={<Navigate to="/dashboard" />} />
                  </>
                ) : (
                  <>
                    <Route path="/leads" element={<Leadagent />} />
                    <Route path="/followup" element={<Followup />} />
                    <Route path="/quotes" element={<Quotes />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/agreements" element={<CustomerAgreement />} />
                    <Route path="/dispatched" element={<Dispatched />} />
                    <Route path="/potential" element={<Potential />} />
                    <Route path="/cancelleads" element={<Cancellead />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/login" element={<Navigate to="/leads" />} />
                  </>
                )}
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
              </>
            )}
            <Route path="/customeragreement" element={<Agreement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
