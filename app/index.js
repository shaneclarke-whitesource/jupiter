import 'helix-ui/dist/css/helix-ui.css';
import React from "react";
import { render } from 'react-dom';
import '@webcomponents/webcomponentsjs/webcomponents-bundle.js';
import App from "./containers/App.js";

const initializeJupiter = () => {
    const content = (
        <div id="jupiter-wrapper" className="u-flex-grow">
            <App/>
        </div>
    );
    render(content, document.getElementById("jupiter"));
};

initializeJupiter();
