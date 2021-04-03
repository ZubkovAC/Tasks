import css from './Error404.module.css'
import React from 'react';

export const Error = () =>{
    return (
        <div className={css.App}>
            <div className={css.space}>
                Er<span className={css.R}>r</span>o<span>r</span>
            </div>
            <div>
                <span className={css.off}>4</span>0
                <div id='hangEdge'>
                    <span>4</span>
                </div>
            </div>
        </div>
    )
}