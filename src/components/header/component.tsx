import HeaderStyle from "./styles.module.css"
import { Button } from "../button/component";
import { useEffect, useState } from "react";
import { Modal } from "../modal/modal";
import { Authorize } from "../authorize/authorize";
import { useDispatch, useSelector } from "react-redux";
import { change, selectAuthorizedInfo} from "../../entities/slices";

export const Header = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [authorization, setAuthorization] = useState(null);
    const dispatch = useDispatch();
    const isAuthorized: boolean  = useSelector((state) => selectAuthorizedInfo(state));

    useEffect(() => {
        const temp_token = localStorage.getItem("token");
        if(temp_token) {
            setAuthorization(true);
            change(true);
        }
        else {
            setAuthorization(false);
            change(false);
        }
    }, [isAuthorized]);

    useEffect(() => {
        const temp_token = localStorage.getItem("token");
        if(temp_token) {
            setAuthorization(true);
            change(true);
        }
        else {
            setAuthorization(false);
            change(false);
        }
    }, []);

    const handleOpenAuthorize = (value: boolean) => {
        setIsVisible(value);
    }

    const handleUnAuthorized = () => {
        localStorage.removeItem("token");
        localStorage.clear();
        dispatch(change(false));
        setAuthorization(false);
    }

    return(
        <>
        <div className={HeaderStyle.area}>
                <span className={HeaderStyle.title}>Фильмопоиск</span>
                <div className={HeaderStyle.account_wrap}>
                    <div className={HeaderStyle.person}>
                        <img src="/src/assets/person.svg"/>
                    </div>
                    {(authorization === true) ? (<Button invert = {true} text = "Выйти" onClick={() => handleUnAuthorized()}/>) : 
                        (<Button invert = {false} text = "Войти" onClick={() => handleOpenAuthorize(true)}/>)}
                </div>
        </div>
        {isVisible && (<Modal><Authorize onClose = {() => handleOpenAuthorize(false)}/></Modal>)}
        </>
    );
};