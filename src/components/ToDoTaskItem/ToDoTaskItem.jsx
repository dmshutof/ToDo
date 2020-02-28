import React, {useEffect, useState} from 'react';

import CheckBoxItem from "./CheckBoxItem/CheckBoxItem";
import AddButton from "../AddButton/AddButton";
import axios from "axios";
import {GetTasks} from "../../store/actions/ActionValue";
import {connect} from "react-redux";
import Hamb from "../hamb/hamb";

function ToDoTaskItem(props) {

    const [inputValue, SetInputValue] = useState(props.title)
    const [defaultValue,setDefaultValue] = useState(props.title)
    const [inputDisabled, SetInputDisabled] = useState(true)


    const getAllTaskBySidebar = () => {
        let taskCollection = [];
        Object.keys(props.taskList).forEach((key, index) => {
            let task = {
                taskItem: props.taskList[key],
                id: index,
                taskKey: key
            };

            taskCollection.push(task);

        });
        let taskFilter  = taskCollection.filter(function (item) {
            return item.taskKey !== "0";
        })
        return taskFilter;
    };
    const [defaultStateDb,setDefaultStateDb] = useState(getAllTaskBySidebar())

    useEffect(()=>{
        setDefaultStateDb(getAllTaskBySidebar())
    },[props.taskList])


    useEffect(() => {
        let item = document.querySelector('.edit_input')
        item.setAttribute('size', item.value.length)
    })

    useEffect(() => {
        setDefaultValue(props.title)
    },[props.title])



    const OpenEditText = () => {

        document.querySelector('.edit_input_wrap').classList.add('opened');
        SetInputDisabled(false)
        let input = document.querySelector('.edit_input');
        if (input.hasAttribute('disabled')) {
            input.removeAttribute("disabled")
            input.focus();

        } else {

        }
    }

    const ChangeValue = (e) => {
        SetInputValue(e.target.value)
    }

    const CloseEdit = (e) => {
        let input = document.querySelector('.edit_input');
        document.querySelector('.edit_input_wrap').classList.remove('opened');
        SetInputValue(defaultValue)
        input.setAttribute('size', input.value.length)
        input.setAttribute("disabled", "")
        input.blur();
        SetInputDisabled(true)

    }
    const CloseEditSuccess = (e) => {
        let input = document.querySelector('.edit_input');
        document.querySelector('.edit_input_wrap').classList.remove('opened');
        input.setAttribute('size', input.value.length)
        input.setAttribute("disabled", "")
        input.blur();
        SetInputDisabled(true)

    }

    const EditName = ()=>{
        axios({
            method: 'patch',
            url: 'https://todo-36f9b.firebaseio.com/todos/'+props.id+'.json',
            data:{
                title: inputValue
            }

        }).then(()=>{
            props.GetTasks()
            CloseEditSuccess()
        });
    }


    return (
        <div className="todo__tasks-item">
            {
                document.body.clientWidth <1200 ?  <Hamb
                    colorClass={props.colorClass}
                />: null
            }

            <div className={'item_title'}>
                <div className="edit_input_wrap">
                    <input
                        type="text"
                        value={inputValue}
                        maxLength={'20'}
                        disabled
                        className={'edit_input ' + props.colorClass}
                        title={props.title}
                        onChange={ChangeValue}
                        //onInput={EditName}
                        // onBlur={CloseEdit}
                    />

                    {
                        inputDisabled ? (
                            <button className="edit_button open_btn" onClick={OpenEditText}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 15" fill="none">
                                    <path
                                        d="M0 12.0504V14.5834C0 14.8167 0.183308 15 0.41661 15H2.9496C3.05792 15 3.16624 14.9583 3.24123 14.875L12.34 5.78458L9.21542 2.66001L0.124983 11.7504C0.0416611 11.8338 0 11.9338 0 12.0504ZM14.7563 3.36825C14.8336 3.29116 14.8949 3.1996 14.9367 3.0988C14.9785 2.99801 15 2.88995 15 2.78083C15 2.6717 14.9785 2.56365 14.9367 2.46285C14.8949 2.36205 14.8336 2.27049 14.7563 2.19341L12.8066 0.24367C12.7295 0.166428 12.6379 0.105146 12.5372 0.0633343C12.4364 0.021522 12.3283 0 12.2192 0C12.1101 0 12.002 0.021522 11.9012 0.0633343C11.8004 0.105146 11.7088 0.166428 11.6318 0.24367L10.107 1.76846L13.2315 4.89304L14.7563 3.36825Z"
                                        fill="#DFDFDF"/>
                                </svg>
                            </button>
                        ) : (
                            <span>
                                <button className="edit_button" onClick={EditName}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" viewBox="0 0 11 8"
                                             fill="none">
                                            <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke={"#42B883"}
                                                  strokeWidth={'1.5'}/>
                                        </svg>
                                 </button>
                                <button className="edit_button close_edit" onClick={CloseEdit}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 10 10" fill="none">
                                        <path
                                            d="M6.24741 5L9.73899 1.50842C9.9047 1.343 9.99791 1.11853 9.99812 0.884393C9.99832 0.650251 9.90551 0.425617 9.74009 0.259907C9.57468 0.0941973 9.35021 0.000986589 9.11606 0.000779811C8.88192 0.000573033 8.65729 0.0933872 8.49158 0.258804L5 3.75038L1.50842 0.258804C1.34271 0.0930948 1.11796 0 0.883613 0C0.649264 0 0.424514 0.0930948 0.258804 0.258804C0.0930948 0.424514 0 0.649264 0 0.883613C0 1.11796 0.0930948 1.34271 0.258804 1.50842L3.75038 5L0.258804 8.49158C0.0930948 8.65729 0 8.88204 0 9.11639C0 9.35074 0.0930948 9.57549 0.258804 9.7412C0.424514 9.90691 0.649264 10 0.883613 10C1.11796 10 1.34271 9.90691 1.50842 9.7412L5 6.24962L8.49158 9.7412C8.65729 9.90691 8.88204 10 9.11639 10C9.35074 10 9.57549 9.90691 9.7412 9.7412C9.90691 9.57549 10 9.35074 10 9.11639C10 8.88204 9.90691 8.65729 9.7412 8.49158L6.24741 5Z"/>
                                        </svg>
                                </button>
                            </span>

                        )

                    }


                </div>
            </div>
            {
                getAllTaskBySidebar().length !==0 ? (
                        getAllTaskBySidebar().map((task, index) => {

                            if (task.taskItem.name) {
                                   return (
                                       <CheckBoxItem
                                           key={index}
                                           parentId={props.id}
                                           id={task.taskKey}
                                           name={task.taskItem.name}
                                           checked={task.taskItem.checked}
                                           getAllTaskBySidebar={getAllTaskBySidebar}
                                           defaultStateDb={defaultStateDb}
                                       />
                                   )
                            } else {
                                return null
                            }
                        })
                ) : <h1 className={'empty_title'}>Задачи отсутствуют</h1>

            }
            {
                props.showAdd ?
                    <AddButton

                        name={'Новая задача'}
                        parentId={props.id}
                        formItem={true}/* true - добавление задачи, false - добавление папки */
                    />
                    : null
            }
        </div>
    );
}


function mapDispatchToProps(dispatch) {
    return {
        GetTasks: () => dispatch(GetTasks())

    }
}

export default connect(null, mapDispatchToProps)(ToDoTaskItem);
