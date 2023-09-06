import { HashRouter, NavLink, Route, Routes  } from 'react-router-dom';

import Login from "./Login";
import SignUp from './SignUp';
import Todo from './Todo';

import { useState } from 'react';
import { useEffect} from 'react';
import axios from "axios"


// function SignUp () {

//   const [form, setForm] = useState({
//     "email": '',
//     "password": '',
//     "nickname": ''
//   });
//   const [message, setMessage] = useState('');

//   function handleInput(e) {
//     console.log(e.target.name);
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   }

//   const signUp = () => {
//     // 伺服器+路由
//     (async() => {
//       try{
//         console.log(`${host}/users/sign_up`);
//         // axios [method] , api path, data
//         const res = await axios.post(`${host}/users/sign_up`, form)
//         console.log(res);
//         setMessage('註冊成功. UID: ' + res.data.uid);
//       } catch(error){
//         setMessage('註冊失敗:' + error.message);
//       }
//     })()
//   }

//   return(
//     <div>
//       <h3>註冊</h3>
//       <input id="signUpEmail" type="email" name="email" placeholder="Email" onChange={handleInput} />
//       <label htmlFor='signUpEmail'>Email---{form.email}</label>
//       <br />
//       <input id="signUpPassword" type="password" name="password"  placeholder="Password" onChange={handleInput} />
//       <label htmlFor='signUpPassword'>Password---{form.password}</label>
//       <br />
//       <input id="nickname" type="nickname" name="nickname"  placeholder="nickname" onChange={handleInput} />
//       <label htmlFor='nickname'>Nickname---{form.nickname}</label>
//       <br />
//       <button type="button" onClick={signUp}>Sign Up</button>
//       <br />
//       {message}
//       <br />
//     </div>
//   )
// }

// function SignIn () {

//   const [form, setForm] = useState({
//     "email": '',
//     "password": '',
//     "nickname": ''
//   })
//   const [token, setToken] = useState('')

//   function handleInput(e) {
//     console.log(e.target.name);
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   }

//   const signIn = () => {
//     // 伺服器+路由
//     (async() => {
//       // console.log(`${host}/users/sign_in`);
//       // axios [method] , api path, data
//       const res = await axios.post(`${host}/users/sign_in`, form)
//         // console.log(res);
//         // console.log(res.data.token);
//         setToken(res.data.token)
//         const {token} = res.data
//         document.cookie = `token=${token}`
//     })()
//   }

//   return (
//     // <div>
//     //   <h3>登入</h3>
//     //   <input id="signInEmail" type="email" name="email" placeholder="Email" onChange={handleInput} />
//     //   <label htmlFor='signInEmail'>Email---{form.email}</label>
//     //   <br />
//     //   <input id="singInPassword" type="password" name="password"  placeholder="Password" onChange={handleInput} />
//     //   <label htmlFor='singInPassword'>Password---{form.password}</label>
//     //   <br />
//     //   <button type="button" onClick={signIn}>Sign In</button>
//     //   <br />
//     //   <p>Token: <br />{token}</p>
//     // </div>
//     <div>
//         <form className="formControls" action="index.html">
//             <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
//             <label className="formControls_label" htmlFor="email">Email</label>
//             <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required  onChange={handleInput} />
//             <p>1</p>{form.email?'1':'2'}
//             <span>此欄位不可留空</span>
//             <label className="formControls_label" htmlFor="pwd">密碼</label>
//             <input className="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" required  onChange={handleInput} />
//             <input className="formControls_btnSubmit" type="button"  onClick={signIn} value="登入" />
//             <a className="formControls_btnLink" href="#signUpPage">註冊帳號</a>
//         </form>
//     </div>
//   )
// }

// function CheckOut () {

//   const [loginStatus, setLoginStatus] = useState(false)
//   const [token, setToken] = useState('')

//   const checkOut = () => {

//     (async() => {
//       // axios [method] , api path, data
//       const res = await axios.get(`${host}/users/checkout`, {
//         headers: {
//           Authorization: token
//         }
//       })
//       console.log(res)
//       setLoginStatus(true)
//       // getTodo();
//     })()
//   }

//   return(
//     <div>
//       <h3>驗證</h3>
//       <input id="token" type="text" name="token" placeholder="token" onChange={(e) => {setToken(e.target.value)}}/>
//       <label htmlFor='token'></label>
//       <br />
//       <button type="button" onClick={checkOut}>Check Out</button>
//       <br />
//       {loginStatus?"登入成功" : ""}
//       <br />
//     </div>
//   )
// }

// function SignOut () {

//   const [token, setToken] = useState('')
//   const [logOutStatus, setLogOutStatus] = useState(false)

//   const signOut = () => {
//     // 伺服器+路由
//     (async() => {
//       try{
//       console.log(`${host}/users/sign_out`);
//       // axios [method] , api path, data
//       const res = await axios.post(`${host}/users/sign_out`,{}, {
//         headers: {
//           Authorization: token
//         }
//       })
//         setLogOutStatus(!logOutStatus)
//         // document.cookie = `token=;`
//       } catch (error){
//         console.log(error)
//       }
//     })()
//   }
//   return(
//     <div>
//       <h3>登出</h3>
//       <input id="signOut" type="text" name="signOut" placeholder="token" onChange={(e) => {setToken(e.target.value)}}/>
//       <label htmlFor='signOut'></label>
//       <br />
//       <button type="button" onClick={signOut}>Sign Out</button>
//       <br />
//       {logOutStatus?"登出成功" : ""}
//     </div>
//   )
// }

// function TodoList ({token}) {
//   console.log('todolist')
//   useEffect(() => {
//     getTodo();
//   }, []);

//   const [list, setList] = useState([])

//   const [todo, setTodo] = useState('')

//   const [newTodo, setNewTodo] = useState({
//     id: null,
//     description: ''
//   })

//   const [todoEdit, setTodoEdit] = useState({
//     content: ''
//   })

//   const addTodo = async () => {
//     // if (loginStatus && todo.length>0){
//     //   setList([...list, {
//     //     id: new Date().getTime(),
//     //     description: todo,
//     //     status: false
//     //   }])
//     // setTodo('')
//     const postTodo = {
//       content: todo,
//     };  
//     console.log(postTodo)
//     const response = await axios.post(`${host}/todos/`, postTodo, {
//       headers: {
//         Authorization: token,
//       },
//     });
//     console.log(response)
//     // setList(response.data.data);
//     getTodo();
//     setTodo('');
//   }

//   const getTodo = async () => {
//     const response = await axios.get(`${host}/todos/`, {
//       headers: {
//         Authorization: token,
//       },
//     });
//     console.log('data',response.data.data)
//     setList(response.data.data);
//     console.log('list',list)
//   }

//   const updateStatus = async (todoList) => {
//     // const updateList = list.map((listItem) => {
//     //   if (listItem.id === todoList.id){
//     //     return({
//     //       ...listItem,
//     //       status: !listItem.status,
//     //     })
//     //   }
//     //   return listItem
//     // })
//     // console.log(updateList)
//     // setList(updateList)
//     await axios.patch(`${host}/todos/${todoList.id}/toggle`,{}, {
//       headers: {
//         Authorization: token,
//       },
//     });
//     getTodo();
//   }

//   const updateTodo = async (todoList) => {
//     // if (newTodo.description.length>0){
//     //   const newUpdateTodo = list.map((listItem) => {
//     //     // console.log('按',todoList.id)
//     //     // console.log(listItem.id)
//     //     return(newTodo.id === listItem.id?{
//     //       ...listItem,
//     //       description: newTodo.description,
//     //     }:
//     //     {...listItem}
//     //     )
//     //   })
//     //   // console.log(newUpdateTodo)
//     //   setList(newUpdateTodo)
//     //   setNewTodo('')
//     // }
//     // console.log('')
//     console.log('按鈕id',todoList.id)
//     console.log('更新內容',newTodo.description)
//     // console.log(newTodo.id)
//     if (newTodo.id === todoList.id){
//       // console.log('in')
//       console.log('put上去的更新內容',todoEdit)
//       try {
//         await axios.put(`${host}/todos/${todoList.id}`, todoEdit, {
//           headers: {
//             Authorization: token,
//           },
//         });
//       } catch (error){
//         console.log(error)
//       }
//       getTodo();
//       setNewTodo({id: null, content: ''});
//     }
//   }

//   const deleteTodo = async (todoList) => {
//     await axios.delete(`${host}/todos/${todoList.id}`, {
//       headers: {
//         Authorization: token,
//       },
//     });
//     // const del = list.filter((deleteTodo) => deleteTodo.id !== todoList.id)
//     // setList(del)
//     getTodo();
//   }

//   const handleChange = (e, todoList) => {
//     console.log('更新值id',todoList.id)
//     setNewTodo({
//       id: todoList.id,
//       // description: e.target.value
//     })
//     setTodoEdit({content: e.target.value})
//     // console.log(newTodo)
//     // setNewTodo(e.target.value)
//   }

//   return(
//     <div>
//       <input type="text" id="todo" name='todo' value={todo} onChange={(e) => {
//         // console.log(e.target.value)
//         setTodo(e.target.value)
//       }} />
//       <label htmlFor="todo"></label>
//       <button type='button' onClick={addTodo}>Add Todo</button>
//       <list>
//         <ul>
//           {
//             list.map((todoList) => {
//               return (
//                 <li key={todoList.id}>

//                   {todoList.content}<span> </span>{todoList.status ? "完成" : "未完成"}|

//                   {/* 更新內容 */}
//                   <input type="text" id="updateText" placeholder="更新值" onChange={(e) => {
//                     handleChange(e, todoList)
//                   }} />
//                   <label htmlFor="updateText"></label>
                  
//                   {/* 刪除 */}
//                   <button type="button" onClick={() => {
//                     deleteTodo(todoList)
//                   }
//                   }>Delete</button>

//                   {/* 更新 */}
//                   <button type="button" onClick={() => {
//                     updateTodo(todoList)
//                   }} >Update</button>

//                   {/* 狀態 */}
//                   <button type='button' onClick={() => {
//                     updateStatus(todoList)
//                   }}>Toggle Status</button>

//                 </li>
//               )
//             })
//           }
//         </ul>
//       </list>
//     </div>
//   )
// }

function API() {

  // const [token, setToken] = useState('');
  // const TodoToken = document.cookie
  //   .split('; ')
  //   .find((row) => row.startsWith('token='))
  //   ?.split('=')[1];
  // useEffect(() => {
  //   if (TodoToken) {
  //     setToken(TodoToken);
  //     // getTodo();
  //   }
  // }, []);

  return (<>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Todo" element={<Todo />} />
    </Routes>
      {/* <CheckOut /> */}
      {/* <SignOut /> */}
      {/* {
        token && <TodoList token={token}/>
      } */}
    {/* <div>
      <div>
        <SignUp />
        <SignIn />
        <CheckOut />
        <SignOut />
      </div>
      <hr />
      <div>
        <h3>Todo list</h3>
        {
          token && <TodoList token={token}/>
        }
      </div>
    </div> */}
  </>)
}

export default API
