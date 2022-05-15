//now on successful login, you get token and user
//we need to save it somewhere so that even when page reload happens
//or user comes back to page after closing the browser, user is still logged in
//we could save it in local storage but first we will implement context which will allow us to have global storage
//we can save user info and some other features there
//think of global storage as similar to component state
//the only difference is component state is accessible only in that component
//or it is available in children component, once you pass them as props
//just like you did pass props from login and register page to Authform
//but passing manually like that will not scale bigger apps,
//thats why we should use something like redux or context
//first we have to create a context
//then wrap our app with context
//then all pages can access context's state value and functions
//to update the state of that context
/*
import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    user: {},
    token: "",
  });

  useEffect(() => {
    setState(JSON.parse(window.localStorage.getItem("auth")));
  }, []);

  const router = useRouter();

  const token = state && state.token ? state.token : "";
  //axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  axios.interceptors.response.use(
    function (response) {
      // Do something before request is sent
      return response;
    },
    function (error) {
      // Do something with request error
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        setState(null);
        window.localStorage.removeItem("auth");
        router.push("/login");
      }
    }
  );

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };



//we will create an endpoint in the backend that gives us the currently logged in user
//based on the JWT token
//if the token is valid (and not expired and issued by our backend)
//only then we will be able to get that user from database and send successful response 
//so if we get successful response, that means that user is authenticaled and has rights to access protected data
*/

import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    user: {},
    token: "",
  });

  useEffect(() => {
    setState(JSON.parse(window.localStorage.getItem("auth")));
  }, []);

  const router = useRouter();

  const token = state && state.token ? state.token : "";
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  axios.interceptors.response.use(
    function (response) {
      // Do something before request is sent
      return response;
    },
    function (error) {
      // Do something with request error
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        setState(null);
        window.localStorage.removeItem("auth");
        router.push("/login");
      }
    }
  );

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };