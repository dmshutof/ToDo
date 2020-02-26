import React, {useEffect, useState} from 'react';
import Sidebar from "./components/Sidebar/sidebar";
import {Switch, Route} from 'react-router-dom'
import ToDoTaskItem from "./components/ToDoTaskItem/ToDoTaskItem";
import {GetTasks} from "./store/actions/ActionValue";
import {connect} from "react-redux";

function App(props) {

    const [todosDB, setTodosDB] = useState([]);
    const [loader, setLoader] = useState(true);


    useEffect(
        ()=> {
            props.GetTasks()
            setLoader(false)
        },[]

    )
    useEffect(
        ()=> {
            setTodosDB(props.tasksDBRedux)

        }

    )


    return (
       <div>
           {
               loader? (
                   <div className="loader">
                       <svg className="circular">
                           <circle className="path" cx="50" cy="50" r="20" fill="none"/>
                       </svg>
                   </div>

               ):
                   (
                       <div className="todo">


                           <Sidebar todosArr={todosDB} />

                           <div className="todo__tasks">

                               <Switch>
                                   <Route path='/todo/:id'>
                                       {

                                       (props) =>{

                                           let todosItem = todosDB.filter(function(item) {
                                               return item.taskKey ===  props.match.params.id;
                                           });
                                           console.log('App.js todosDB', todosDB)
                                           return(
                                               todosItem.map(todoItem =>{
                                                   return(
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
                                       }
                                   }
                                   </Route>

                                   <Route exact path='/' >
                                       {
                                           todosDB.map(todoItem =>{
                                               return(
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

                                       }
                                   </Route>
                               </Switch>


                           </div>
                           {/* /.todo__tasks */}


                       </div>
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

