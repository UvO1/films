import InfoStyle from "./styles.module.css"

interface IInfo {
    title: string,
    text: string | number,
    card: boolean
}

export const Info = (props: IInfo) => {

    return(
        <>
            {(!props.card) && 
            (<div className={InfoStyle.line}>
                <span className={InfoStyle.title}>{props.title}</span>
                <span className={InfoStyle.info}>{props.text}</span>
            </div>)
            }
            {props.card && 
                (<div className={ `${props.title == "Описание" ? InfoStyle.line_long + ' ' +  InfoStyle.line_column : InfoStyle.line_long}` }>
                    <span className={InfoStyle.title_long}>{props.title}{":"}</span>
                    <span className={InfoStyle.info_long}>{props.text}</span>
                </div>)
            }
        </>
    )
    
}