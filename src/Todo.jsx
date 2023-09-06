import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import empty from './components/empty.png'

const { VITE_BASEURL } = import.meta.env;

function Todo () {
  const [token, setToken] = useState('');
  const TodoToken = document.cookie
  .split('; ')
  .find((row) => row.startsWith('token='))
  ?.split('=')[1];
  // console.log('TodoToken', TodoToken)
  // console.log('token', token)
  useEffect(() => {
    if (TodoToken) {
      setToken(TodoToken);
      checkOut(TodoToken)
      getTodo(TodoToken);
    }
  }, []);

  

  const [list, setList] = useState([])

  const [tempList, setTempList] = useState([])
  const [finishList, setFinishList] = useState([])
  const [nonFinishList, setNonFinishList] = useState([])

  const [todo, setTodo] = useState('')

  const [newTodo, setNewTodo] = useState({
    id: null,
    description: ''
  })

  const [todoEdit, setTodoEdit] = useState({
    content: ''
  })

  const [finishQty, setFinishQty] = useState(0)

  const [listStatus, setListStatus] = useState([{"name": '全部', "status": 'active'}, {"name": '待完成', "status": ''}, {"name": '已完成', "status": ''}])

  const addTodo = async () => {
    const postTodo = {
      content: todo,
    };  
    try{
      const response = await axios.post(`${VITE_BASEURL}/todos/`, postTodo, {
        headers: {
          Authorization: TodoToken,
        },
      });
    }catch(error){
      console.log(error.response.data.message)
      alert('請輸入待辦事項')
    }
    // setList(response.data.data);
    getTodo(TodoToken);
    setTodo('');
  }

  const [nickname, setNickname] = useState('')
  const checkOut = async(TodoToken) => {
    try{
      const res = await axios.get(`${VITE_BASEURL}/users/checkout`, {
        headers: {
          Authorization: TodoToken
        }
      })
      // console.log(res)
      setNickname(res.data.nickname)
      // setLoginStatus(true)
      // getTodo();
    }catch(error){
      console.log(error.response.data.message)
    }
  }
  
  const getTodo = async (TodoToken) => {
    try{
      const response = await axios.get(`${VITE_BASEURL}/todos/`, {
        headers: {
          Authorization: TodoToken,
        },
      });
      const res  = response.data.data.filter((item) => {return item.status!=true})
      setFinishQty(res.length)
      setTempList(response.data.data);

      listStatus.map((tag) => {

        // if (tag.sta)
        // console.log(tag.name)
        // console.log(tag.status)
        if (tag.name === '全部' && tag.status === 'active') {
          // console.log('在全部')
          setList(response.data.data);
          // setTempList(response.data.data);
        }else if (tag.name === '待完成' && tag.status === 'active'){
          // console.log('在待完成')
          const NFlist  = response.data.data.filter((item) => {return item.status!=true})
          setList(NFlist)
          if (!NFlist.length) alert("請查看其他狀態")
        }else if (tag.name === '已完成' && tag.status === 'active') {
          // console.log('在已完成')
          const Flist  = response.data.data.filter((item) => {return item.status!=false})
          setList(Flist)
        }
      })
    }catch(error){
      console.log(error.response.data.message)
    }
  }

  const updateStatus = async (e,item) => {
    try{
      const res = await axios.patch(`${VITE_BASEURL}/todos/${item.id}/toggle`,{}, {
        headers: {
          Authorization: TodoToken,
        },
      });
      getTodo(TodoToken);
    }catch(error){
      console.log(error.response.data.message)
    }
  }

  useEffect(() => {
    // getTodo(TodoToken)
  }, [updateStatus]);

  const updateTodo = async (todoList) => {
    if (newTodo.id === todoList.id){
      try {
        await axios.put(`${VITE_BASEURL}/todos/${todoList.id}`, todoEdit, {
          headers: {
            Authorization: token,
          },
        });
      } catch (error){
        console.log(error)
      }
      getTodo();
      setNewTodo({id: null, content: ''});
    }
  }

  const deleteTodo = async (todoList) => {
    try{
      await axios.delete(`${VITE_BASEURL}/todos/${todoList.id}`, {
        headers: {
          Authorization: TodoToken,
        },
      });
      getTodo(TodoToken);
    }catch(error){
      console.log(error.response.data.message)
    }
  }

  const deleteAllFinishTodo = () => {
    // console.log('list',list)
    // console.log('temp', tempList)
    const newList = tempList.filter((list) => {return list.status !== false})
    // console.log('new', newList)
    newList.forEach (async (list) => {
      try{
        await axios.delete(`${VITE_BASEURL}/todos/${list.id}`, {
          headers: {
            Authorization: TodoToken,
          },
        });
        // console.log('delete',list)
        getTodo(TodoToken);
      }catch(error){
        console.log(error.response.data.message)
      }
    })
  }

  const handleChange = (e, todoList) => {
    console.log('更新值id',todoList.id)
    setNewTodo({
      id: todoList.id,
    })
    setTodoEdit({content: e.target.value})
  }

  const listStatusChange = (e) => {
    
    const newList = listStatus.map((item) => {
      // console.log(item.name)
      if(item.name === e.target.innerText){
        item.status='active'
        e.target.className = 'active'
      }else{
        item.status=''
        e.target.className = ''
      }

      return item
    })
    setListStatus(newList)
    getTodo(TodoToken)

  }

  return(
    <div id="todoListPage" className="bg-half">
      <nav>
        <h1><a style={{cursor: 'pointer'}}>ONLINE TODO LIST</a></h1>
        <ul>
            <li className="todo_sm"><a style={{cursor: 'pointer'}}><span>{nickname}的代辦</span></a></li>
            {/* <li className="todo_sm"><NavLink><span>{nickname}的代辦</span></NavLink></li> */}
            <li><a href="/Login">登出</a></li>
        </ul>
      </nav>
        <div className="conatiner todoListPage vhContainer">
          <div className="todoList_Content">
            <div className="inputBox">
              <input type="text" placeholder="請輸入待辦事項" value={todo} onChange={(e) => {setTodo(e.target.value)}}/>
              <a style={{cursor: 'pointer'}} onClick={addTodo}>
                  <i className="fa fa-plus" ></i>
              </a>
            </div>
        { tempList.length?
            <div className="todoList_list">
              <ul className="todoList_tab">
                <li><a style={{cursor: 'pointer'}} className={listStatus[0].status} onClick={(e) => listStatusChange(e)}>全部</a></li>
                <li><a style={{cursor: 'pointer'}} className={listStatus[1].status} onClick={(e) => listStatusChange(e)}>待完成</a></li>
                <li><a style={{cursor: 'pointer'}} className={listStatus[2].status} onClick={(e) => listStatusChange(e)}>已完成</a></li>
              </ul>
              <div className="todoList_items">
                {list.map((item) => {
                  return(
                    <ul key={item.id} className="todoList_item">
                      <li>
                        <label className="todoList_label">
                          <input className="todoList_input" type="checkbox" value="true" checked={item.status} onChange={(e) => updateStatus(e,item)}/>
                          <span>{item.content}</span>
                        </label>
                        <a style={{cursor: 'pointer'}}>
                          <i className="fa fa-times" onClick={() => {deleteTodo(item)}}></i>
                        </a>
                      </li>
                    </ul>
                  )
                })}
                <div className="todoList_statistics">
                  <p> {finishQty} 個待完成項目</p>
                  <a style={{cursor: 'pointer'}} onClick={deleteAllFinishTodo}>清除已完成項目</a>
                </div>
              </div>
            </div>
            :
            <>
            <div style={{display: 'flex' ,alignItems: 'center', justifyContent: 'center', height: '100px'}}>目前尚無待辦事項</div>
            {/* <img className="d-m-n" src="https://upload.cc/i1/2022/03/23/tj3Bdk.png" alt="empty" /> */}
            <img className="d-m-n" src={empty} alt="empty" />
            </>
        }
          </div>
        </div>
    </div>
      
  )
  function SignOut () {

    const [token, setToken] = useState('')
    const [logOutStatus, setLogOutStatus] = useState(false)

    const signOut = () => {
      // 伺服器+路由
      (async() => {
        try{
        console.log(`${hoVITE_BASEURLst}/users/sign_out`);
        // axios [method] , api path, data
        const res = await axios.post(`${VITE_BASEURL}/users/sign_out`,{}, {
          headers: {
            Authorization: token
          }
        })
          setLogOutStatus(!logOutStatus)
          // document.cookie = `token=;`
        } catch (error){
          console.log(error)
        }
      })()
    }
    return(
      <div>
        <h3>登出</h3>
        <input id="signOut" type="text" name="signOut" placeholder="token" onChange={(e) => {setToken(e.target.value)}}/>
        <label htmlFor='signOut'></label>
        <br />
        <button type="button" onClick={signOut}>Sign Out</button>
        <br />
        {logOutStatus?"登出成功" : ""}
      </div>
    )
  }
}

export default Todo