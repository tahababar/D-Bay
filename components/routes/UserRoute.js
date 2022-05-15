/*

import {useEffect, useState, useContext} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import { UserContext } from "../../context";


//wrapper component..similar concept to contexts
const UserRoute = ({children}) => {
    const [ok, setOk] = useState(false);
    const router = useRouter();
    const [state, setState] = useContext(UserContext);

    useEffect(()=> {
         getCurrentUser() //check if there is a state or state token
    }, []) //this is useEffect() dependency, it means that the useEffect() runs when elements in this array change (every time browser refreshes)
    

    const getCurrentUser = async () => {
        try{
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API}/current-user`,
            {
                headers:{
                    Authorization: `Bearer ${state.token}`
                }
            }
            );
        if(data.ok) setOk(true);
        }catch(err){
            router.push('/login')
        }
    };
    return !ok ? (
        <SyncOutlined
        spin
        className="d-flex justify-content-center display-1 text-warning text-primary p-5"
        />
    ):(
        <>
        {children}
        </>
    );  //useEffect() will keep on sending requests to backend to 
    //make sure that the user is not accessing pages without authorization
    //if the token value fails or incorrect or no token is there, data.ok value from
    //backend will be false and user will be pushed to login page or will be
    //displayed a loading icon depending on the error..if token is successful and
    //data.ok is true, then all children (i.e. all page contents) will be displayed
    //to the user
};

export default UserRoute;

*/

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import { UserContext } from "../../context";

const UserRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();
  const [state] = useContext(UserContext);

  useEffect(() => {
    if (state && state.token) getCurrentUser();
  }, [state && state.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(`/current-user`);
      if (data.ok) setOk(true);
    } catch (err) {
      router.push("/login");
    }
  };

  process.browser &&
    state === null &&
    setTimeout(() => {
      getCurrentUser();
    }, 1000);

  return !ok ? (
    <SyncOutlined
      spin
      className="d-flex justify-content-center display-1 text-primary p-5"
    />
  ) : (
    <> {children}</>
  );
};

export default UserRoute;