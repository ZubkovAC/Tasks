import React from 'react';
import './App.css';

import { Redirect, Route} from "react-router-dom";
import {Navbar} from "./n1-main/m1-UI/Route/Routes";
import {TestComponent} from "./n1-main/m1-UI/Common/TestComponent";

function App() {
    return (
        <div className="App">
                <div style={{float:'left',margin:'40px'}}  >
                    <Navbar/>
                </div>

                <div style={{margin:'40px'}} >
                    <Route path={"/"} exact render={() => <Redirect to={'/'}/>}/>
                    <Route path={'/testComponent'} render={() => <TestComponent/>}/>
                </div>


        </div>
    );
}

export default App;
