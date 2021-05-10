import SuperInputText from "../../Common/InputAndButton/c1-SuperInputText/SuperInputText";
import SuperButton from "../../Common/InputAndButton/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../Common/InputAndButton/c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../../Common/InputAndButton/c4-SuperEditableSpan/SuperEditableSpan";
import SuperSelect from "../../Common/InputAndButton/c5-SuperSelect/SuperSelect";
import SuperRadio from "../../Common/InputAndButton/c6-SuperRadio/SuperRadio";
import SuperRange from "../../Common/InputAndButton/c7-SuperRange/SuperRange";
import React, {useState} from "react";
import SuperInputTextOld from "../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import SuperButtonOld from "../../Common/InputAndButton/c2-SuperBottonOld/SuperButtonOld";
import {Modal} from "../../Common/Modal/Modal";
import  './TestComponent.module.css'
// @ts-ignore
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import {cardGradeTC} from "../../../m2-BLL/06-reducer-cards/reducer-cards";
import { SuperTextArea } from "../../Common/InputAndButton/c10-SuperTextArea/SuperTextArea";

export const TestComponent = () =>{

    const [modalActive,setModalActive]=useState<boolean>(true)

    const select = (value:boolean) =>{
        setModalActive(value)
    }
    const onChangeHangler =(e:any) =>{
        console.log(e.currentTarget)
    }




    // Start TextArea
    const [value,setValue]=useState<string>('hello')
    const onChangeText = (e:string)=>{
        console.log(e)
        setValue(e)
    }
    // End   TextArea

    return(
        <div >
            <SuperTextArea width={'250px'} heigth={'100px'} backgroundColor={'wheat'} onChangeText={onChangeText} valueStart={value} placeholder={'qwestion'}/>
            {/*<Modal  active={modalActive} setActive={select}>*/}
            {/*</Modal>*/}
            {/*<SuperInputTextOld />*/}
            {/*<button id='ButtonTrue' onClick={()=>select(true)} > Modal ACTIVE</button>*/}
            {/*<SuperButtonOld title={'add'}   />*/}
            {/*<SuperButtonOld title={'v'}/>*/}
            {/*<SuperButtonOld title={'v'} transform={true}/>*/}

            {/*<SuperInputText title={'alert'}/>*/}
            {/*<SuperButton title={'push'}/>*/}
            {/*<SuperCheckbox/>*/}
            {/*<SuperEditableSpan/>*/}
            {/*<SuperSelect options={['1','2','3']}/>*/}
            {/*<SuperRadio options={[1,2,3,4,5]}/>*/}
            {/*<SuperRange/>*/}
        </div>
    )
}


type FlippysPropsType ={
    button:boolean
    answer:string
    finishQuestion:string
    showAnswer:string
}

export class Flippys extends React.Component<FlippysPropsType> {



    render() {
        return(
        <Flippy
            flipOnHover={false} // default false
            flipOnClick={true} // default false 12
            flipDirection="horizontal" // horizontal or vertical
            // @ts-ignore
            ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
            // if you pass isFlipped prop component will be controlled component.
            // and other props, which will go to div
            isFlipped={this.props.button}
        >
            <FrontSide
                style={{

                    backgroundColor: 'rgba(43, 46, 46, 0.6)',
                    imageOrientation: 'inherit',
                    backgroundPosition: "50% 50%",
                    borderRadius: '15px',
                    border: '0 solid',
                    color:'white',
                    width: '400px',
                    height: '500px',
                    marginTop: '30px',
                    fontWeight: 600,
                    fontSize: '20px',
                    textShadow: '0 0 30px whitesmoke',
                    alignItems: 'center',
                    boxShadow: '0 0 30px 5px black',
                    display: 'flex',
                    flexDirection: 'column',
                    textaAlign: 'center',

                }}
            >
                Answer:
                <div style={{display: this.props.button?'none':'',marginTop:'20px'}}>

                    {this.props.answer}
                </div>
                <div >
                    {this.props.showAnswer =='Для ознакомления функционала нажмите на кнопку LEARN' ? this.props.showAnswer : ''  }
                    { this.props.showAnswer =='Здесь будет написан Ответ(После нажатия на карточку). Для начала нажмите кнопку LEARN' ? this.props.showAnswer:''  }
                </div>

            </FrontSide>

            <BackSide
                style={{
                    backgroundColor: 'rgba(43, 46, 46, 0.6)',
                    imageOrientation: 'inherit',
                    backgroundPosition: "50% 50%",
                    borderRadius: '15px',
                    border: '0 solid',
                    color:'white',
                    width: '400px',
                    height: '500px',
                    fontWeight: 600,
                    marginTop:'-10px',
                    fontSize: '20px',
                    textShadow: '0 0 30px whitesmoke',
                    alignItems: 'center',
                    boxShadow: '0 0 30px 5px black',
                    display: 'flex',
                    flexDirection: 'column',
                    textaAlign: 'center',
                }}>
                Quistion:
                <div style={{marginTop:'20px'}}>
                    {this.props.finishQuestion}
                </div>

            </BackSide>
        </Flippy>
        )
    }

}
