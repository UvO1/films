import StarStyle from "./styles.module.css"

interface IStar {
    star: boolean,
    number: number
}

export const Star = (props: IStar) => {
    return(
        <div className={StarStyle.area}>
            {props.star?  
                (<img className={StarStyle.star} src="/src/assets/star_active.svg"/>)
                : (<img className={StarStyle.star_inactive} src="/src/assets/star_inactive.svg"/>)
            }
            {props.star?  
                (<div className={StarStyle.number}>{props.number}</div>)
                : (<div className={StarStyle.number_inactive}>{props.number}</div>)
            }
            
        </div>
    )
}