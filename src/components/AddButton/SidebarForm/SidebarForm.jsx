import React  from 'react';


function SidebarForm(props) {

    return (

        <form className={'sidebar_form'}>
            <input type="text" className="main_input" placeholder='Название папки' onChange={props.changeInputFolderName} maxLength={'20'}/>

            <div className="colors_wrap">
                <div className="radio_color">
                    <input type="radio" value={'gray'} id={'radio_color1'} name={'colors'} defaultChecked={'true'} onChange={props.changeRadioColor}/>
                    <label htmlFor="radio_color1" className={'gray'}/>
                </div>
                <div className="radio_color">
                    <input type="radio" value={'green'} id={'radio_color2'} name={'colors'} onChange={props.changeRadioColor}/>
                    <label htmlFor="radio_color2" className={'green'}/>
                </div>
                <div className="radio_color">
                    <input type="radio" value={'blue'} id={'radio_color3'} name={'colors'} onChange={props.changeRadioColor}/>
                    <label htmlFor="radio_color3" className={'blue'}/>
                </div>
                <div className="radio_color">
                    <input type="radio" value={'pink'} id={'radio_color4'} name={'colors'} onChange={props.changeRadioColor}/>
                    <label htmlFor="radio_color4" className={'pink'}/>
                </div>
                <div className="radio_color">
                    <input type="radio" value={'light_green'} id={'radio_color5'} name={'colors'} onChange={props.changeRadioColor}/>
                    <label htmlFor="radio_color5" className={'light_green'}/>
                </div>
                <div className="radio_color">
                    <input type="radio" value={'lilac'} id={'radio_color6'} name={'colors'} onChange={props.changeRadioColor}/>
                    <label htmlFor="radio_color6" className={'lilac'}/>
                </div>
                <div className="radio_color">
                    <input type="radio" value={'black'} id={'radio_color7'} name={'colors'} onChange={props.changeRadioColor}/>
                    <label htmlFor="radio_color7" className={'black'}/>
                </div>
                <div className="radio_color">
                    <input type="radio" value={'red'} id={'radio_color8'} name={'colors'} onChange={props.changeRadioColor}/>
                    <label htmlFor="radio_color8" className={'red'}/>
                </div>
            </div>

            <div className="btn_wrap">
                <button
                    className="main_button"
                    onClick={props.addFolder}
                >Добавить</button>

                <button
                    className="main_button gray_theme"
                    onClick={props.cancel}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                        d="M6.24741 5L9.73899 1.50842C9.9047 1.343 9.99791 1.11853 9.99812 0.884393C9.99832 0.650251 9.90551 0.425617 9.74009 0.259907C9.57468 0.0941973 9.35021 0.000986589 9.11606 0.000779811C8.88192 0.000573033 8.65729 0.0933872 8.49158 0.258804L5 3.75038L1.50842 0.258804C1.34271 0.0930948 1.11796 0 0.883613 0C0.649264 0 0.424514 0.0930948 0.258804 0.258804C0.0930948 0.424514 0 0.649264 0 0.883613C0 1.11796 0.0930948 1.34271 0.258804 1.50842L3.75038 5L0.258804 8.49158C0.0930948 8.65729 0 8.88204 0 9.11639C0 9.35074 0.0930948 9.57549 0.258804 9.7412C0.424514 9.90691 0.649264 10 0.883613 10C1.11796 10 1.34271 9.90691 1.50842 9.7412L5 6.24962L8.49158 9.7412C8.65729 9.90691 8.88204 10 9.11639 10C9.35074 10 9.57549 9.90691 9.7412 9.7412C9.90691 9.57549 10 9.35074 10 9.11639C10 8.88204 9.90691 8.65729 9.7412 8.49158L6.24741 5Z"/>
                    </svg>
                </button>
            </div>
        </form>




    );
}

export default SidebarForm;
