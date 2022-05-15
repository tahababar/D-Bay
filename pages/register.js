import axios from "axios";
import {useState} from "react";
//imported axios
import {toast} from "react-toastify";
import {Modal} from "antd";
import Link from 'next/link';
import AuthForm from '../components/forms/AuthForm';


const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secret, setSecret] = useState("");
    const [ok, setOk] = useState(false);

const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(name,email,password,secret);
    try{
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API}/register`, {
            name: name,
            email: email,
            password: password,
            secret: secret
        });
        if(data.error){
            toast.error(data.error)
        }else{
        setName('')
        setEmail('')
        setPassword('')
        setSecret('') //to empty text box fields after successful login
        setOk(data.ok);
        } //if successful login, backend will send json data.ok and so setok will be true to sucessfully register user
    } catch (err) {
       toast.error(err.response.data); //e.g. name is required message //toast.error will display red box message
    }
};

    return(
        <div className="container-fluid">
        <div className = "row py-5 bg-warning text-light">
            <div className = "col text-center text-dark">
                <h1>Register</h1>
            </div>
        </div>
    
    <div className="row py-5">
        <div className="col-md-6 offset-md-3">
            <AuthForm 
                handleSubmit = {handleSubmit}
                name = {name}
                setName = {setName}
                email = {email}
                setEmail = {setEmail}
                password = {password}
                setPassword = {setPassword}
                secret = {secret}
                setSecret = {setSecret}
            />
        </div>
    </div>
    <div className="row">
        <div className="col">
            <Modal
                title = "Congratulations on joining our community!"
                visible={ok}
                onCancel={() => setOk(false)}
                footer={null}
                >
                    <p>You have successfully registered.</p>
                    <Link href ="/login">
                        <a className="btn btn-warning btn-sm">Login</a>
                    </Link>
                </Modal>

        </div>
    </div>

            <div className="row"> 
                <div className="col">
                <p className="text-center">Already registered? {" "}
                <Link href ="/login">
                        <a>Login</a>
                    </Link> </p>
                </div>
            </div>
            <br></br>
            <br></br>
</div>

    )
};
//{" "} added to add space between tags in <p>
export default Register;