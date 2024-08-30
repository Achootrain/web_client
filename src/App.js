import Form from './page/Form';
import Home from './page/Home'; 
import Account from './page/Account';
import Login from './page/Login';
import Account_infor from './page/Account_infor';
import Work from './page/Work';
import Manage from './page/Manage';
import { Route, Routes, Link, BrowserRouter,NavLink } from 'react-router-dom';
import { UserProvider } from './state/usercontext';

function App() {
 

  return (
    <UserProvider>
    <div>
    <BrowserRouter>
    <nav class="bg-gray-900 h-14">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between p-4">
        <a href="" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://png.pngtree.com/png-clipart/20230924/original/pngtree-silver-award-silver-badge-vector-ribbon-banner-decoration-vector-png-image_12584648.png" className="h-8 rounded-full" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ACTProManager</span>
        </a>
        <div class="font-medium flex rounded-lg flex-row space-x-8 ">
          <NavLink to="/page/Home"className={({ isActive }) =>`text-base ${isActive ? 'text-emerald-500' : 'text-white'}`}>
              Home
          </NavLink>
          <NavLink to="/page/Work"
          className={({ isActive }) =>`text-base ${isActive ? 'text-emerald-500' : 'text-white'}`}>
              Your Project
          </NavLink>
          <NavLink to="/page/Login"className={({ isActive }) =>`text-base ${isActive ? 'text-emerald-500' : 'text-white'}`}>
              Login
          </NavLink>
          <NavLink to="/page/Account"className={({ isActive }) =>`text-base ${isActive ? 'text-emerald-500' : 'text-white'}`}>
              Account
          </NavLink>
          <Link to="https://github.com/Achootrain" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-emerald-500 md:p-0 dark:text-white md:dark:hover:text-emerald-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</Link>
        </div>
    
      </div>
  </nav>
        <Routes>
          <Route path="/page/Form" element={<Form/>} />
          <Route path="/page/Home" element={<Home/>} />
          <Route path="/page/Account" element={<Account/>} />
          <Route path="/page/Login" element={<Login/>} />
          <Route path="/page/Account_infor" element={<Account_infor/>} />
          <Route path="/page/Work" element={<Work/>} />
          <Route path="/page/Manage" element={<Manage/>} />
        </Routes>
      </BrowserRouter>
      <div ></div>
    </div>
  </UserProvider>
  );
}



export default App;
