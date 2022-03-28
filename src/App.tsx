import { useEffect, useState } from 'react';
import './App.css';
import { getItem } from './Helpers/chromeScripts';
import { Navbar } from 'react-bootstrap';
import LoginForm from './Pages/LoginForm';
import TeamManage from './Pages/TeamManage';
import MemberHome from './Pages/MemberHome';

function App() {

  let [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    getUserInfo();
  }, [])

  let getUserInfo = async () => {
    let userInfo = await getItem('userInfo');
    if (userInfo) {
      setUser(userInfo);
    }
  }

  return (
    <>
      <Navbar className='shadow-sm mb-3'>
        <h3 className='text-center w-100 mb-0'>Agile Survey</h3>
      </Navbar>

      {user && user.role === 'leader' && <TeamManage user={user} />}

      {user && user.role === 'member' && <MemberHome user={user} />}

      {!user && <LoginForm setUser={setUser}/>}

    </>
  );
}

export default App;
