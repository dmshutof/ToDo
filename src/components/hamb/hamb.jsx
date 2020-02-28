import React from 'react';

function Hamb(props) {

    const SidebarOpen = () => {
        document.documentElement.classList.toggle('sidebar_open')
    }

    return (

        <div
            className={"hamb "}
            onClick={SidebarOpen}
        >
            <span className={props.colorClass}/>
            <span className={props.colorClass}/>
            <span className={props.colorClass}/>
            <span className={props.colorClass}/>
        </div>



    );



}

export default Hamb;

