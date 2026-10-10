import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({children}){

    const [user, setUser] = useState(localStorage.getItem("currentUserEmail")?{email:localStorage.getItem("currentUserEmail")}:null);
    
    function signUp({email,password}){
        
        const users =JSON.parse(localStorage.getItem("users")||"[]");

        //SIGNUP       
       if(users.find((u)=>u.email===email)){
        return{ success: false, error:"Email already exists"};
       }
        const newUser={email,password};
        users.push(newUser);
        localStorage.setItem("users",JSON.stringify(users));
        //currentuser
        localStorage.setItem("currentUserEmail",email);
        // console.log(users);
        setUser({email});
        return{ success: true};
    }
//LOGIN
    function login({email,password}){
        const users=JSON.parse(localStorage.getItem("users")||"[]");
        const user=users.find((u)=>u.email===email && u.password===password );
        if(!user){
            return {success:false, error:"Invalid email or password"}
        }
        localStorage.setItem("currentUserEmail",email);
        setUser({email});
        return{ success: true};
    }

//LOGOUT
    function logout(){

        localStorage.removeItem("currentUserEmail");
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{signUp,user,login,logout}}>{children}</AuthContext.Provider>
    );
}