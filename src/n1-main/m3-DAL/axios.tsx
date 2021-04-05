import axios from "axios";


const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})


export const AuthAPI = {
    createRegistration(userName:string,email:string,password:string){
        return instance.post('auth/register',{userName,email,password})
    },
    newPassword(password:string,resetPasswordsToken:string){
        return instance.post('auth/set-new-password',{password,resetPasswordsToken})
    }
}