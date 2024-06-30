import StyleArrowPagination from "./styles.module.css"

interface IArrowPagination{
    active: boolean,
    type: "right" | "left",
    handlePageLeft?: () => void,
    handlePageRight?: () => void,
}

export const ArrowPagination = (props: IArrowPagination) => {

    const src: string = props.active ? "/src/assets/arrow_active.svg" : "/src/assets/arrow_inactive.svg";
    const area =  props.active ? StyleArrowPagination.area : (StyleArrowPagination.area + ' ' + StyleArrowPagination.area_inactive);
    const style = (props.type == "left") ? StyleArrowPagination.arrow_left : StyleArrowPagination.arrow;
    const func =  (props.type == "left") ? props.handlePageLeft : props.handlePageRight;

    return(
        <div onClick={func}>
            <div className={area}>
                <img src = {src} className={style}/>
            </div>
        </div>
    );
}