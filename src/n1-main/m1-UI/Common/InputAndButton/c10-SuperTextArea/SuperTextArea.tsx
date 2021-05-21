import css from './SuperTextArea.module.css'

type SuperTextAreaPropsType = {
    valueStart:string
    onChangeText:(e:string)=>void
    placeholder?:string
    width?:string
    heigth?:string
    backgroundColor?:string
}

export const SuperTextArea = (props:SuperTextAreaPropsType) =>{

    const onText =(e:any)=>{
        props.onChangeText && props.onChangeText(e)
    }
    let width =props.width?props.width : '18px'
    let heigth =props.heigth
    let backgroundColor =props.backgroundColor
    return (
        <div className={css.textArea}>
            <textarea
                style={{
                    width:width,
                    height:heigth,
                    backgroundColor:backgroundColor,
                    outline:"none", fontSize:'20px',padding:'3px',borderRadius:'5px',fontWeight:600}}
                value={props.valueStart}
                onChange={e=>onText(e.currentTarget.value)}
                placeholder={props.placeholder}/>
        </div>
    )
}