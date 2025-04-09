

const validateName =  (name) =>{

    const regexName = /^[a-zA-Z\s]{2,50}$/;

    console.log("name", name);
    
    if(!name) return "Please fill name!";

    if(!regexName.test(name)) return "Please fill valid name!";
     
    return false;

};

const validateEmail = (email) =>{

    const regexEmail =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    
    if(!email) return "Please fill email!";

    if(!regexEmail.test(email)) return "Please add a valid email e.g. john@gmail.com";

    return false;
};

const validatePassword = (password) =>{

    const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    if(!password) return "Please create password";

    if(!regexPassword.test(password)) return "Password must have upper case [A-Z], digits 0-9, lower case [a-z] and special character (@,&,!,%,$,?)";

    return false;
};

export {validateEmail,validateName,validatePassword};