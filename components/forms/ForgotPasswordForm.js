const ForgotPasswordForm = ({handleSubmit, email, setEmail, newPassword, setNewPassword, secret, setSecret}) => (
    <form onSubmit={handleSubmit}>
                <div className="form-group">
                   
                   
                    <div className="form-group p-2">
                    <label className="text-dark"> Email</label>
                    <input value={email} onChange = {(e)=>setEmail(e.target.value)}type="email" className="form-control"placeholder="Enter your email address"/>
                    </div>

                  
                    <div className="form-group p-2">
                    <label className="text-dark"> New Password</label>
                    <input value={newPassword} onChange = {(e)=>setNewPassword(e.target.value)}type="password" className="form-control"placeholder="Enter new password"/>
                    </div>
                </div>
                <br></br>
                <div className="form-group">
                   
                   <label className="text-dark text-center py-2">Provide the security answer you used while registering.</label>
               

               <select className="form-select">
                   <option>What is your mother's maiden name?</option>
                   <option>What is your grandfather's name?</option>
                   <option>What town were you born in?</option>
               </select>
           </div>
           <div className="form-group py-2">
               <input
               value={secret} onChange = {(e)=>setSecret(e.target.value)}
               type="text"
               className="form-control"
               placeholder="Type your answer here"
               />
           </div>
                <br>
                </br>
         
                
                
                <br></br>
                <div className="col text-center"> 
                <button disabled={!email || !newPassword || !secret} className="btn btn-dark">Submit</button>
                </div>
            </form>
//in button, we use ? annd :, like if and else in javascript
)

export default ForgotPasswordForm;