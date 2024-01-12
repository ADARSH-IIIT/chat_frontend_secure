import axios from 'axios'

const axiosinstance = axios.create()
axiosinstance.defaults.withCredentials = true
export { axiosinstance }


export const  backend_base_url =  'https://backend-chat-gauu.onrender.com' 



export const signup_api = `${backend_base_url}/signup`

export const creds_compare_api = `${backend_base_url}/creds/compare`

export const set_jwt_api   =`${backend_base_url}/set/jwt`


export const logout_api   =`${backend_base_url}/logout`

export const resetpassword_api = `${backend_base_url}/resetpassword`

export const enterotp_api = `${backend_base_url}/enterotp`


export const whoiam_api = `${backend_base_url}/whoiam`


export const isloggedin_api = `${backend_base_url}/isloggedin`

export const  update_profile_api = `${backend_base_url}/update/profile/pic`


export const  update_username_api = `${backend_base_url}/update/username`
