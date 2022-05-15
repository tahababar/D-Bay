import axios from "axios";
import {useState, useContext} from "react";
//imported axios
import {toast} from "react-toastify";
import {Modal} from "antd";
import Link from 'next/link';
import AuthForm from '../components/forms/AuthForm';
import { useRouter } from "next/router";
import { UserContext } from "../context";
import { WindowsFilled } from "@ant-design/icons/lib/icons";

const Login = () => {

 
    const [email, setEmail] = useState("taha@gmail.com");
    const [password, setPassword] = useState("rrrr");
    const [state, setState] = useContext(UserContext);

    const router = useRouter();

const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(name,email,password,secret);
    try{
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API}/login`, {
            email: email,
            password: password
        }
        );

        if(data.error){
            toast.error(data.error)
        }else{
            //update context
        setState({
            user: data.user,   //backend sends token and user info (data)
            token: data.token
        });
        //save in local storage
        window.localStorage.setItem("auth", JSON.stringify(data)); //the function wants a key too so we just gave it a random "auth" key
        router.push("/user/dashboard");  //used to take user to the page if successful login
       //router.push("/user")  //change this back to above commented line after testing
        console.log(data);
        }
        
    } catch (err) {
       toast.error(err.response.data); //e.g. name is required message //toast.error will display red box message
    }
};

    return(
        <div className="container-fluid">
        <div className = "row py-5 bg-warning text-light">
            <div className = "col text-center text-dark">
                <h1>Login</h1>
            </div>
        </div>
    
    <div className="row py-5">
        <div className="col-md-6 offset-md-3">
            <AuthForm 
                handleSubmit = {handleSubmit}

                email = {email}
                setEmail = {setEmail}
                password = {password}
                setPassword = {setPassword}
                page="login"   //so we can use some parts of authform but not others
            />
        </div>
    </div>


            <div className="row"> 
                <div className="col">
                <p className="text-center">Not yet registered? {" "}
                <Link href ="/register">
                        <a>Register</a>
                    </Link> </p>
                </div>
            </div>

        <div className="row">
            <div className="col">
                <p className="text-center">Forgot password? {" "}
                <Link href="/forgot-password">
                    <a>Reset here</a>
                </Link>
                </p>
            </div>
        </div>
        <br></br>
        <br></br>
</div>
    )
};
//{" "} added to add space between tags in <p>
export default Login;