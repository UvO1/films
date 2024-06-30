import ButtonStyle from "./styles.module.css"

interface IButton{
    text: string,
    invert: boolean, 
    onClick: () => void
    type?: "enter"
}


export const Button = (props: IButton) => {

    const handleClick = (e) => {
        e.preventDefault();
        return props.onClick();
    }
    return(
        <button className={`${!props.invert ? ButtonStyle.button : ButtonStyle.button_invert}`} onClick={handleClick}>{props.text}
        </button>
    );
};