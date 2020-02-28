import React, {useEffect, useState} from 'react';
import Sidebar from "./components/Sidebar/sidebar";
import {Switch, Route} from 'react-router-dom'
import ToDoTaskItem from "./components/ToDoTaskItem/ToDoTaskItem";
import {GetTasks} from "./store/actions/ActionValue";
import {connect} from "react-redux";

function App(props) {

    const [todosDB, setTodosDB] = useState([]);
    const [loader, setLoader] = useState(true);
    const [loginInput, setLoginInput] = useState(null);
    const [passInput, setPassInput] = useState(null);

    const [stateLog, setStateLog] = useState(localStorage.getItem('isLogin'));


    const pass = [
        {
            login: 'open',
            password: '1234'
        }
    ]



    useEffect(() => {
        setStateLog(localStorage.getItem('isLogin'))
    }, [localStorage.getItem('isLogin')])


    useEffect(
        () => {
            props.GetTasks()
            setTimeout(() => {
                setLoader(false)
            }, 1000)
        }, []
    )

    useEffect(
        () => {
            setTodosDB(props.tasksDBRedux)
        }
    )




    const loginForm = (e) => {
        e.preventDefault()
        let login = false,
            password = false;
        pass.forEach((key, index) => {

            if (pass[index].login === loginInput) {
                let item = document.querySelector('.login_form input[type="text"]')
                if (item.classList.contains('error')){
                    item.classList.remove('error')
                }
                login = true
            } else {
               let item = document.querySelector('.login_form input[type="text"]')

                item.classList.add('error')

                if (item.classList.contains('error')){
                    item.classList.remove('error')
                    setTimeout(()=>{
                        item.classList.add('error')
                    },100)
                }

            }

            if (pass[index].password === passInput) {
                let item = document.querySelector('.login_form input[type="password"]')
                if (item.classList.contains('error')){
                    item.classList.remove('error')
                }

                password = true
            } else {
                let item = document.querySelector('.login_form input[type="password"]')

                item.classList.add('error')

                if (item.classList.contains('error')){
                    item.classList.remove('error')
                    setTimeout(()=>{
                        item.classList.add('error')
                    },100)
                }

            }

        })
        if (login && password) {
            localStorage.setItem('isLogin', true)
            setStateLog(true)
        }

    }

    const logOut = () => {
        localStorage.setItem('isLogin', false)
        setStateLog(false)
    }

    return (
        <div>
            {
                loader ? (
                    <div className="loader">
                        <svg className="circular">
                            <circle className="path" cx="50" cy="50" r="20" fill="none"/>
                        </svg>
                    </div>

                ) : (
                    stateLog === 'true' ? (
                        <div className="todo">

                            <button className={'logout_btn'} onClick={logOut}>выход</button>

                            <Sidebar todosArr={todosDB}/>

                            <div className="todo__tasks">


                                <Switch>
                                    <Route path='/todo/:id'>
                                        {
                                            todosDB.length !== 0 ?
                                                (props) => {


                                                    let todosItem = todosDB.filter(function (item) {
                                                        return item.taskKey === props.match.params.id;
                                                    });
                                                    setTimeout(() => {
                                                        let SidebarItems = document.querySelectorAll('.todo__sidebar .todo__sidebar-item');

                                                        SidebarItems.forEach((elem) => {
                                                            if (elem.classList.contains('active')) {
                                                                elem.classList.remove('active')
                                                            }
                                                        });
                                                        if (!!document.querySelector('.' + props.match.params.id)) {
                                                            document.querySelector('.' + props.match.params.id).classList.add('active')

                                                        } else {
                                                            props.history.push('/')
                                                        }


                                                    }, 200)
                                                    return (

                                                        todosItem.map(todoItem => {
                                                            return (
                                                                <ToDoTaskItem
                                                                    key={todoItem.id}
                                                                    id={todoItem.taskKey}
                                                                    title={todoItem.taskItem.title}
                                                                    taskList={todoItem.taskItem.taskList}
                                                                    colorClass={todoItem.taskItem.colorClass}
                                                                    showAdd={true}
                                                                />
                                                            )
                                                        })

                                                    )


                                                } : null

                                        }
                                    </Route>

                                    <Route exact path='/'>
                                        {
                                            todosDB.length !== 0 ?
                                                () => {


                                                    setTimeout(() => {
                                                        let SidebarItems = document.querySelectorAll('.todo__sidebar .todo__sidebar-item');

                                                        SidebarItems.forEach((elem) => {
                                                            if (elem.classList.contains('active')) {
                                                                elem.classList.remove('active')
                                                            }
                                                        });

                                                        document.querySelector('.todo__sidebar-item.first').classList.add('active')

                                                    }, 200)
                                                    return (
                                                        todosDB.map(todoItem => {
                                                            return (
                                                                <ToDoTaskItem
                                                                    key={todoItem.id}
                                                                    id={todoItem.taskKey}
                                                                    title={todoItem.taskItem.title}
                                                                    taskList={todoItem.taskItem.taskList}
                                                                    colorClass={todoItem.taskItem.colorClass}
                                                                    showAdd={false}
                                                                />
                                                            )
                                                        })
                                                    )
                                                } : <div className="empty_wrap">
                                                    <h1 className="empty_title">Задачи отсутствуют</h1>
                                                </div>


                                        }
                                    </Route>
                                </Switch>


                            </div>
                            {/* /.todo__tasks */}


                        </div>
                    ) : (
                        <form className="login_form">
                            <h1>Login</h1>
                            <input type="text" className="main_input" placeholder={'Username'} onChange={(e) => {
                                setLoginInput(e.target.value)
                            }}/>
                            <input type="password" className="main_input" placeholder={'Password'} onChange={(e) => {
                                setPassInput(e.target.value)
                            }}/>
                            <button className="main_button" onClick={loginForm}>Login</button>

                        </form>
                    )

                )
            }

        </div>
    );
}


function mapStateToProps(state) {
    return {
        tasksDBRedux: state.tasks.tasks
    }
}

function mapDispatchToProps(dispatch) {
    return {
        GetTasks: () => dispatch(GetTasks())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

