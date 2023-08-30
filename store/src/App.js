import './App.css';
import LoginButton from './components/loginButton';
import LogoutButton from './components/logoutButton';
import Profile from './components/profile';

function App() {
  return (
    <div className="App">
      <LoginButton/>
      <br/>
      <LogoutButton/>
      <br />
      <Profile/>
    </div>
  );
}

export default App;
