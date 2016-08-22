// global includes
import 'three';

import 'css/reset.css';
import 'css/flexboxgrid.min.css';
import 'css/style.css';
import 'css/main.scss';

// init all react components and app
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';
import { Router, Route, browserHistory } from 'react-router';

// requirement for Material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// main components
import Root from 'root';
import Content from 'layouts/content';

// pages
import Index from 'pages/index';
import Visualizer from 'pages/visualizer/visualizer';
import Login from 'auth/login';


render(
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path="/" component={ Root }>
                <Route component={ Content }>
                        <Route path="/" component={ Index }/>
                        <Route path="/login" component={ Login }/>
                        <Route path="/visualizer" component={ Visualizer }/>
                        <Route path="/visualizer/:visName" component={ Visualizer }/>
                </Route>
            </Route>
        </Router>
    </Provider>,

    document.getElementById('app')
);
