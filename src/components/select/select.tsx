import { useMemo, useState } from "react";
import SelectStyle from "./styles.module.css"

interface ISelect{
    title: string,
    placeholder: string,
    elements?: {},
    onChange: () => void
}

export const Select = (props: ISelect) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(props.placeholder);

    function handleOpen(){
        if(open) setOpen(false);
        else setOpen(true);
    }

    function handleChoose(id: string){
        setValue(props.elements[id]);
        props.onChange(id);
    }

    return(
        <div className={SelectStyle.wrap} onClick={handleOpen}>
            <span className={SelectStyle.title}>{props.title}</span>
            <div className={SelectStyle.area}>
                <span className={SelectStyle.placeholder}>{value}</span>
                <img className={`${open? SelectStyle.icon + ' ' + SelectStyle.icon_rotate : SelectStyle.icon}`} id="icon" src="/src/assets/select.svg"/>
            </div>
            {open && 
                <div className={SelectStyle.select_elems}>
                    {Object.keys(props.elements).map(id => (
                        <div key={id} className={SelectStyle.row} onClick={() => handleChoose(id)}>
                            {props.elements[id]}
                        </div>
                    ))}
                </div>
            }
         </div>
    );
}