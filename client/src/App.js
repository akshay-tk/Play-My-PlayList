import react from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateRoom  from './components/createRoom/CreateRoom';
import JoinRoom from './components/joinRoom/JoinRoom';
import Login from './components/login/Login';
import Sign from './components/signInUp/signInUpContainer'
import ResetPassword from './components/resetPassword/resetPassword';

function App() {
  return (
<react.Fragment>
<BrowserRouter >
<Switch>
            <Route path="/" component={Home} exact />
            <Route path="/create-room" component={CreateRoom} exact/>
            <Route path="/join-room" component={JoinRoom} exact /> 
            <Route path="/login-page" component={Login} exact /> 
            <Route path="/sign-page" component={Sign} exact/> 
            <Route path="/reset-password" component={ResetPassword} exact/> 

</Switch>
</BrowserRouter>
</react.Fragment>
  );
}

export default App;






