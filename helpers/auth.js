import bcrypt from "bcrypt";


export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12,(err, salt)=>{
            if (err){
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash)=>{
                if(err){
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};   //function for hashing password


//function to compare both hashed password (user entered and the one in DB)

export const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
} //will return either true or false



