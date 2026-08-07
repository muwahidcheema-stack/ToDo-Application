import { supabase } from "./client";

export async function signUpNewuser(email, password){
    const {data, error} = await supabase.auth.signUp({
        email: email,
        password: password,
    })
    if (error) {
        console.log("Error Logging In", error.message);
        return {success : false, error : error.message}
    } else {
        console.log("User Logged In Successfully", data);  
        return {success: true, data} 
    }
}

export async function signInWithEmail(email, password) {
    const {data, error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })
    if (error) {
        console.log("Error signingUp", error.message);
        return {success : false, error : error.message}
    } else {
        console.log("User Registered Successfully", data);   
        return {success: true, data} 
    }
}

export async function signOutUser() {
    const { error } = await  supabase.auth.signOut(); 
    if (error) {
        console.log("Sign Out Error", error.message);
         return {success : false, error : error.message}
    }
}