import React  from 'react';


function TaskForm(props) {


    return (




            <form className={'add_form'}>
                <input type="text" className="main_input" placeholder='Текст задачи' onChange={props.changeInputText}/>

                <div className="btn_wrap">
                    <button
                        className="main_button"
                        onClick={props.addTask}
                    >Добавить задачу</button>

                    <button
                        className="main_button gray_theme"
                        onClick={props.cancel}
                    >Отмена</button>
                </div>
            </form>




    );
}

export default TaskForm;
