import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const { VITE_BASEURL } = import.meta.env;

function SignUp () {

  const [form, setForm] = useState({
    "email": '',
    "password": '',
    "nickname": ''
  });

  const [secPassword, setSecPassword] = useState('')

  const [message, setMessage] = useState({
    "eMessage": '',
    "nMessage": '',
    "pMessage": '',
    "spMessage": ''
  });

  const [msg, setMsg] = useState('')

  function handleInput(e) {
    console.log(e.target.name);
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const navigate = useNavigate();
  const signUp = () => {
    if (form.password !== secPassword) {
      setMessage({...message, spMessage: '二次密碼輸入錯誤'})
    }else{
      (async() => {
        try{
          const res = await axios.post(`${VITE_BASEURL}/users/sign_up`, form)
          setMsg('註冊成功. UID: ' + res.data.uid);
          const intervalId = setInterval(() => {
              navigate('/')
              clearInterval(intervalId)
          }, 1000);
        } catch(error){
          setMsg('註冊失敗:' + error.response.data.message);
        }
      })()
    }
  }

  return(
    <div id="signUpPage" className="bg-yellow">
        <div className="conatiner signUpPage vhContainer">
            <div className="side">
                <a style={{cursor: 'pointer'}}><img className="logoImg" src="https://upload.cc/i1/2022/03/23/rhefZ3.png" alt="" /></a>
                <img className="d-m-n" src="https://upload.cc/i1/2022/03/23/tj3Bdk.png" alt="workImg" />
            </div>
            <div>
                <form className="formControls" action="index.html">
                    <h2 className="formControls_txt">註冊帳號</h2>
                    <label className="formControls_label" htmlFor="email">Email</label>
                    <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required onChange={handleInput} />
                    {/* {<span>123</span>} */}
                    <label className="formControls_label" htmlFor="nickname">您的暱稱</label>
                    <input className="formControls_input" type="text" name="nickname" id="nickname" placeholder="請輸入您的暱稱" onChange={handleInput} /> 
                    <label className="formControls_label" htmlFor="password">密碼</label>
                    <input className="formControls_input" type="password" name="password" id="password" placeholder="請輸入密碼" required onChange={handleInput} />
                    <label className="formControls_label" htmlFor="pwd">再次輸入密碼</label>
                    <input className="formControls_input" type="password" name="pwd" id="pwd" placeholder="請再次輸入密碼" required onChange={(e) => setSecPassword(e.target.value)} />
                    <span>{message.spMessage}</span>
                    <span>{msg}</span>
                    {/* <input className="formControls_btnSubmit" type="button" onclick="javascript:location.href='#todoListPage'" value="註冊帳號" onClick={signUp} /> */}
                    <input className="formControls_btnSubmit" type="button"  value="註冊帳號" onClick={signUp} />
                    <NavLink to="/" className="formControls_btnLink">
                      <p>登入</p>
                    </NavLink>
                </form>
            </div>
        </div>
    </div>
    // {/* <div>
    //   <h3>註冊</h3>
    //   <input id="signUpEmail" type="email" name="email" placeholder="Email" onChange={handleInput} />
    //   <label htmlFor='signUpEmail'>Email---{form.email}</label>
    //   <br />
    //   <input id="signUpPassword" type="password" name="password"  placeholder="Password" onChange={handleInput} />
    //   <label htmlFor='signUpPassword'>Password---{form.password}</label>
    //   <br />
    //   <input id="nickname" type="nickname" name="nickname"  placeholder="nickname" onChange={handleInput} />
    //   <label htmlFor='nickname'>Nickname---{form.nickname}</label>
    //   <br />
    //   <button type="button" onClick={signUp}>Sign Up</button>
    //   <br />
    //   {message}
    //   <br />
    // </div> */}
  )
}

export default SignUp