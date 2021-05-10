import React from "react";
// @ts-ignore
import Flippy, {FrontSide, BackSide} from 'react-flippy';
import css from './Flippy.module.css'
import {cardGradeTC} from "../../../m2-BLL/06-reducer-cards/reducer-cards";
import { SelectedFluppy } from "./SelectedFlippy";

type FlippysPropsType = {
    button: boolean
    answer: string
    finishQuestion: string
    showAnswer: string
}

export class Flippys extends React.Component<FlippysPropsType> {


    render() {
        return (
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
                <div className={css.boxFlippyFront}>
                    <FrontSide
                        style={{
                            backgroundColor: 'rgba(43, 46, 46, 0.6)',
                            imageOrientation: 'inherit',
                            backgroundPosition: "50% 50%",
                            borderRadius: '15px',
                            border: '0 solid',
                            color: 'white',
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
                        <div style={{display: this.props.button ? 'none' : '', marginTop: '20px'}}>

                            {this.props.answer}
                        </div>
                        <div>
                            {this.props.showAnswer === 'Для ознакомления функционала нажмите на кнопку LEARN' ? this.props.showAnswer : ''}
                            {this.props.showAnswer === 'Здесь будет написан Ответ(После нажатия на карточку). Для начала нажмите кнопку LEARN' ? this.props.showAnswer : ''}
                        </div>
                        <div style={{display: this.props.button ? 'none' : ''}}>
                            <SelectedFluppy />
                        </div >

                    </FrontSide>
                </div>

                <div className={css.boxFlippyBack}>
                    <BackSide
                        style={{
                            backgroundColor: 'rgba(43, 46, 46, 0.6)',
                            imageOrientation: 'inherit',
                            backgroundPosition: "50% 50%",
                            borderRadius: '15px',
                            border: '0 solid',
                            color: 'white',
                            width: '400px',
                            height: '500px',
                            fontWeight: 600,
                            marginTop: '-10px',
                            fontSize: '20px',
                            textShadow: '0 0 30px whitesmoke',
                            alignItems: 'center',
                            boxShadow: '0 0 30px 5px black',
                            display: 'flex',
                            flexDirection: 'column',
                            textaAlign: 'center',
                        }}>
                        Quistion:
                        <div style={{marginTop: '20px'}}>
                            {this.props.finishQuestion}
                        </div>

                    </BackSide>
                </div>

            </Flippy>
        )
    }

}