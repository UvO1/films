import { useEffect, useRef, useState } from "react";
import AuthorizeStyle from "./styles.module.css"
import { Button } from "../button/component";
import { change, useGetAuthorizationMutation } from "../../entities/slices";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthorizedInfo } from "../../entities/slices";

interface IAuthorize{
    onClose: () => void
}

export const Authorize = (props: IAuthorize) => {
    const [login, setLogin] = useState("");
    const loginInput = useRef(null);
    const passwordInput = useRef(null);
    const [password, setPassword] = useState("");
    const [getAuthorization] = useGetAuthorizationMutation();
    const dispatch = useDispatch();
    const isAuthorized  = useSelector((state) => selectAuthorizedInfo(state));
    
    useEffect(() => {
    }, [isAuthorized]);

    const handleGetAuthorization = () => {
        getAuthorization({
            user: {
                "username": loginInput.current.value,
                "password": passwordInput.current.value
            }
        }).then((data) => {
            localStorage.setItem("token", data["data"]["token"]);
            props.onClose();
            dispatch(change(true));
            }
        )
        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <div className={AuthorizeStyle.area}>
            <div className={AuthorizeStyle.form}>
                <div className={AuthorizeStyle.head}>
                    <span className={AuthorizeStyle.title}>Авторизация</span>
                    <img className={AuthorizeStyle.close}src="/src/assets/close.svg" onClick={props.onClose}/>
                </div>
                <form>
                    <label className={AuthorizeStyle.auth_label}>Логин</label>
                    <div className={AuthorizeStyle.auth_input}> 
                        <input placeholder="Введите логин" value={login} ref={loginInput} onChange={e => setLogin(e.target.value)}/>
                    </div>
                    <label className={AuthorizeStyle.auth_label}>Пароль</label>
                    <div className={AuthorizeStyle.auth_input}> 
                        <input placeholder="Введите пароль" value={password} ref={passwordInput} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className={AuthorizeStyle.buttons}>
                        <Button text = "Войти" type = "enter" invert = {false}  onClick={handleGetAuthorization}/>
                        <div className={AuthorizeStyle.cancel}>
                            <Button text = "Отменить" invert = {true} onClick={props.onClose}/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}