import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const { VITE_BASEURL } = import.meta.env;

function Login () {
  const [form, setForm] = useState({
    "email": '',
    "password": '',
    "nickname": ''
  })
  const [token, setToken] = useState('')

  const [msg, setMsg] = useState('')

  function handleInput(e) {
    console.log(e.target.name);
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    if (form.password.length < 5) setMsg('密碼長度需大於6個字')
    else setMsg('')
  }
  const navigate = useNavigate();
  const signIn = () => {
    // 伺服器+路由
    (async() => {
      try{
        const res = await axios.post(`${VITE_BASEURL}/users/sign_in`, form)
          setToken(res.data.token)
          const {token} = res.data
          document.cookie = `token=${token}`
          navigate('/Todo')
      }catch(error){
        setMsg(error.response.data.message)
      }
    })()
  }

  return (
    <div id="loginPage" className="bg-yellow">
      <div className="conatiner loginPage vhContainer ">
        <div className="side">
          <a style={{cursor: 'pointer'}}><img className="logoImg" src="https://upload.cc/i1/2022/03/23/rhefZ3.png" alt="" /></a>
          <img className="d-m-n" src="https://upload.cc/i1/2022/03/23/tj3Bdk.png" alt="workImg" />
        </div>
        <div>
          <form className="formControls" action="index.html">
              <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
              <label className="formControls_label" htmlFor="email">Email</label>
              <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required  onChange={handleInput} />
              {form.email?'':<span>此欄位不可留空</span>}
              <label className="formControls_label" htmlFor="password">密碼</label>
              <input className="formControls_input" type="password" name="password" id="password" placeholder="請輸入密碼" required  onChange={handleInput} />
              <span>{msg}</span>
              <input className="formControls_btnSubmit" type="button" onClick={signIn} value="登入" />
              <NavLink to="/SignUp" className="formControls_btnLink">
                <p>註冊帳號</p>
              </NavLink>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login