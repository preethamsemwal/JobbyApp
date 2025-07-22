import {Switch, Route, Redirect} from 'react-router-dom'
import Loginpage from './components/Loginpage'
import Home from './components/Home'
import Jobs from './components/Jobs'
import NotFound from './components/NotFound'
import JobDetails from './components/JobDetails'

import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <>
    <div className="bg-container">
      <Switch>
        <Route exact path="/login" component={Loginpage} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/jobs" component={Jobs} />
        <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  </>
)

export default App
