import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const Navbar = () => {
const {user,logOut} = useContext(AuthContext)
const navigate = useNavigate()

     const links = <>
        <li><NavLink to='/' className='btn btn-sm capitalize'>Home</NavLink></li>
        <li><NavLink to='/addcoffee' className='btn btn-sm capitalize'>Add-Coffee</NavLink></li>
        <li><NavLink to='/users' className='btn btn-sm capitalize'>Users</NavLink></li>
       
    
    </>

    return (
      <div className="relative z-10">
        <div className="navbar ">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu gap-5 menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {links}
              </ul>
            </div>
            <Link to="/" className="btn btn-ghost normal-case text-xl">
              Coffee Store
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu gap-5 menu-horizontal px-1">{links}</ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="dropdown  dropdown-end dropdown-hover">
                <label tabIndex={0} className=" mr-10">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={user.photoURL} />
                    </div>
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a>{user.displayName}</a>
                  </li>
                  <li>
                    <a onClick={logOut}>Logout</a>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    );
};

export default Navbar;