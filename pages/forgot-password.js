import axios from "axios";
import {useState} from "react";
//imported axios
import {toast} from "react-toastify";
import {Modal} from "antd";
import Link from 'next/link';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';


const ForgotPassword = () => {

    
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [secret, setSecret] = useState("");
    const [ok, setOk] = useState(false);

const handleSubmit = async (e) => {
        e.preventDefault();
  
    
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API}/forgot-password`, {
            email: email,
            newPassword: newPassword,
            secret: secret
        });
        if (data.error) {
            toast.error(data.error);
          }
       
        if (data.success) {
            setEmail("");
            setNewPassword("");
            setSecret("");
            setOk(true);
          }
    
};

    return(
        <div className="container-fluid">
        <div className = "row py-5 bg-warning text-light">
            <div className = "col text-center text-dark">
                <h1>Forgot Password?</h1>
            </div>
        </div>
    
    <div className="row py-5">
        <div className="col-md-6 offset-md-3">
            <ForgotPasswordForm 
                handleSubmit = {handleSubmit}
                email = {email}
                setEmail = {setEmail}
                newPassword = {newPassword}
                setNewPassword = {setNewPassword}
                secret = {secret}
                setSecret = {setSecret}
            />
        </div>
    </div>
    <div className="row">
        <div className="col">
            <Modal
                title = "Password Reset Successful!"
                visible={ok}
                onCancel={() => setOk(false)}
                footer={null}
                >
                    <p>Congratulations! You can now log in with your new password.</p>
                    <Link href ="/login">
                        <a className="btn btn-warning btn-sm">Login</a>
                    </Link>
                </Modal>

        </div>
    </div>

           
            <br></br>
            <br></br>
</div>

    )
};
//{" "} added to add space between tags in <p>
export default ForgotPassword;