import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter as Router, Route } from 'react-router-dom'

import Home from "./App"

ReactDOM.render(
    <Router>
        <div>
            <main>
                <Route exact path="/" component={Home} />
            </main>
        </div>
    </Router>, 
    document.getElementById("root")
    
)
