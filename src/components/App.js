import './App.css';
import { useSelector } from 'react-redux';
import PrincipalComponent  from './principalComponent/principalComponent';
import LoginComponent  from './login/loginComponent';

function App() {
  const session = useSelector(store => store.session); 
  console.log(session);
  const principalComponent = session.isSession ? 
  <PrincipalComponent></PrincipalComponent>
  :
  <LoginComponent></LoginComponent>

  return (
    <div>
      {principalComponent}
    </div>
  );
}

export default App;
