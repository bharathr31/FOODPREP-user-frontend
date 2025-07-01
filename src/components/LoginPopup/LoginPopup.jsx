import React,{ useState} from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import {Storecontext} from '../../context/Storecontext';
import axios from 'axios'
import { toast } from 'react-toastify';

const LoginPopup = ({setshowLogin}) => {

    const {url,token,setToken} = useContext(Storecontext)

  const[curstate,setcurstate] = useState("Sign in")
  const[data, setData] = useState(
    {
        name:"",
        email:"",
        password:""
    }
  );
  const onChangeHandler = (e) =>
  {
    const {name, value} = e.target;
    setData({...data,[name]:value});
  }
  const onSubmitHandler = async(e)=>
  {
        e.preventDefault()
        
        let newurl = url

        if(curstate ==="Sign in")
        {
            newurl += '/api/user/login'
        }
        else{
            newurl +='/api/user/register'
        }
    
        try {
            const response = await axios.post(newurl,data)
            if(curstate === "Sign up")
            {
                toast.success("Account created Successfully!\nPlease login")
                setcurstate("Sign in")
            }
            else{
                 setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setshowLogin(false)
            }
        } catch (error) {
           toast.error(error.response?.data?.messge || "An error occured!")
        }
  }

  return (
    <div className='login-popup'>
        <form onSubmit={onSubmitHandler} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{curstate}</h2>
            <img onClick={()=>setshowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {curstate!=="Sign in" ? <input name='name' value={data.name} onChange={onChangeHandler} type="text" placeholder='your name' required  />:<></> }
            <input name='email' value={data.email} onChange={onChangeHandler} type="email" placeholder='your email' required/>
            <input name='password' value={data.password} onChange={onChangeHandler} type="password" placeholder='Password' required />
            <button type='submit' className="btn"> 
                {curstate}
            </button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, I agree to terms and privacy policy</p>
            </div>
        </div>
        {
            curstate ==="Sign in"? <p>Create a new Account <span onClick={()=>setcurstate("Sign up")}>Click here</span></p>
            :  <p>Already have an account? <span onClick={()=>setcurstate("Sign in")}>Login here</span></p>
        }
        </form>
    </div>
  )
}

export default LoginPopup