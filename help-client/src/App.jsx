import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AccountVerified from "./components/AccountVerified"
import Campaign from "./routes/Campaign"
import Dashboard from "./routes/CampaignDashboard/Dashboard"
import Projects from "./routes/CampaignDashboard/Projects"
import Home from "./routes/Home"

import  { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute'
import CreateCampaign from './routes/CreateCampaign'
import Project from './routes/CampaignDashboard/Project'
import NotFound from './routes/NotFound'
import Category from './routes/Category'
import Search from './routes/Search'
// import RegisterAuth from './routes/Auth/RegisterAuth'
import LoginAuth from './routes/Auth/LoginAuth'

function App() {

  return (
    <BrowserRouter>
      <div className="">
        <div className="">
          {/* Toaster */}
            <Toaster
                toastOptions={{
                    success: {
                        style: {
                            background: '#252525',
                        },
                    },
                    error: {
                        style: {
                            background: 'rgb(153 27 27)',
                        },
                    },
                    loading: {
                        style: {
                            background: '#696e6e',
                        },
                    },
                      style: {
                        color: 'white',
                        fontSize: '11px'
                    }
                }}
                
                position='top-center' reverseOrder={false}
            ></Toaster>
            {/* Toaster */}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginAuth" element={<LoginAuth />} />
          {/* <Route path="/registerAuth" element={<RegisterAuth />} /> */}
          <Route path="/confirmMagicSession" element={<AccountVerified />} />
          <Route path="/campaign/:id" element={<Campaign />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/search" element={<Search />} />
          <Route path="/createCampaign"
            element={
              <ProtectedRoute>
                <CreateCampaign />
              </ProtectedRoute>
            }
          />
          <Route path="/user/overview"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/user/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route path="/user/projects/project/:id"
            element={
                <Project />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
