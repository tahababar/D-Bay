/*
import Link from 'next/link';
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../context";
import {useRouter} from "next/router";

//we also have Link like react,in next.js
//integrating Link in next is a little different
//fromreact.. see below how we did it


const Nav = () => {
    const [state, setState]  = useContext(UserContext);
    const [current, setCurrent] = useState("");
    const router = useRouter();

    useEffect(() => {
      process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname]);

    const logout = () => {
        window.localStorage.removeItem("auth");
        setState(null);
        router.push("/login");
    };
    
    
    return(
    <nav className="nav bg-dark d-flex justify-content-end">
  
  
  
  {state !== null ? (
      <>
      <Link href="/">
        <a className="nav-link text-light">Home</a>
    </Link> 

      <Link href = "/user/dashboard">
      <a className="nav-link text-light">{state.user.name}</a>
    </Link>
      <a onClick = {logout} className="nav-link text-light">Logout</a>
      
      </> 
       ) :
   (<>
  <Link href="/login" >
        <a className="nav-link text-light">Login</a>
    </Link>
  
  
  <Link href="/register" >
        <a className="nav-link text-light">Register</a>
    </Link>
</>)}
  
  
   
  
</nav>

    );
};

export default Nav;
*/

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "../context";
import { useRouter } from "next/router";

const Nav = () => {
  const [current, setCurrent] = useState("");
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const router = useRouter();

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };

  return (
    <nav
      className="nav bg-dark justify-content-between"
      
    >
      <Link href="/">
        <a
          className={`nav-link bg-dark text-warning h5 logo ${current === "/" && "active"}`}
        >
          D-Bay
        </a>
      </Link>

      {state !== null ? (
        <>
        
          <div className="dropdown nav-link">
            <a
              className="btn dropdown-toggle text-white"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {state && state.user && state.user.name}
            </a>
            <ul className="dropdown-menu bg-dark" aria-labelledby="dropdownMenuLink">
              <li>
                <Link href="/user/dashboard">
                  <a
                    className={`nav-link bg-dark text-warning dropdown-item ${
                      current === "/user/dashboard" && "active"
                    }`}
                  >
                    Dashboard
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/user/profile/update">
                  <a
                    className={`nav-link bg-dark text-warning dropdown-item ${
                      current === "/user/profile/update" && "active"
                    }`}
                  >
                    Profile
                  </a>
                </Link>
              </li>
              <li>
                <a onClick={logout} className="nav-link text-warning bg-dark">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <Link href="/login">
            <a
              className={`nav-link h5 text-light ${
                current === "/login" && "active"
              }`}
            >
              Login
            </a>
          </Link>

          <Link href="/register">
            <a
              className={`nav-link h5 text-light ${
                current === "/register" && "active"
              }`}
            >
              Register
            </a>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Nav;

//for dropdown, we will use custom document..jqury file for the next.js react framework