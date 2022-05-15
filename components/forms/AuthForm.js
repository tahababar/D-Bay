const AuthForm = ({handleSubmit, name, setName, email, setEmail, password, setPassword, secret, setSecret, page,username,setUsername,about, setAbout,ProfileUpdate}) => (
    <form onSubmit={handleSubmit}>
                <div className="form-group">
                    
                {!ProfileUpdate && (<div> <p className="text-center"><b>D-Bay</b> is a free web application where DePauw students and staff can sell and buy new or old resources from each other. Registered users can
                         follow each other and build their brand image by selling personal, curated or hand-made products to the campus community.
                    </p>
                    <br></br>
                    <hr></hr>
                    <br></br></div>)}


                    {ProfileUpdate && (<div className="form-group p-2">
                    <label className="text-dark"> Username</label>
                    <input value={username} onChange = {(e)=>setUsername(e.target.value)}type="text" className="form-control"placeholder="Enter your prefered username"/>
                    </div>)}

                    {ProfileUpdate && (<div className="form-group p-2">
                    <label className="text-dark"> About</label>
                    <input value={about} onChange = {(e)=>setAbout(e.target.value)}type="text" className="form-control"placeholder="Enter your bio here"/>
                    </div>)}
                    
                    {page !== "login" && (<div className="form-group p-2">
                    <label className="text-dark"> Name</label>
                    <input value={name} onChange = {(e)=>setName(e.target.value)}type="text" className="form-control"placeholder="Enter your prefered name"/>
                    </div>)}
                    <div className="form-group p-2">
                    <label className="text-dark"> Email</label>
                    <input value={email} onChange = {(e)=>setEmail(e.target.value)}type="email" className="form-control"placeholder="Enter your email address" disabled={ProfileUpdate}/>
                    </div>
                    <div className="form-group p-2">
                    <label className="text-dark"> Password</label>
                    <input value={password} onChange = {(e)=>setPassword(e.target.value)}type="password" className="form-control"placeholder="Enter a strong password"/>
                    </div>
                </div>
                <br>
                </br>
         
                {page !== "login" && (<div className="form-group">
                    <small>
                        <label className="text-muted py-2">Pick a question to answer. These questions will help you log in, in case you forget your password.</label>
                    </small>
 
                    <select className="form-select">
                        <option>What is your mother's maiden name?</option>
                        <option>What is your grandfather's name?</option>
                        <option>What town were you born in?</option>
                    </select>


                </div>)}
                {page !== "login" && (<div className="form-group py-2">
                    <input
                    value={secret} onChange = {(e)=>setSecret(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Type your answer here"
                    />
                </div>)}
                <br></br>
                <div className="col text-center"> 
                <button className="btn btn-dark">Submit</button>
                </div>
            </form>
//in button, we use ? annd :, like if and else in javascript
)

export default AuthForm;