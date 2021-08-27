import { useEffect } from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";
import store from "./store";
import {Provider} from 'react-redux';
import { loadUser } from "./actions/auth";
import PrivateRoute from './components/common/PrivateRoute';
import Home from "./components/pages/home";
import DataInput from "./components/pages/dataInput"; 
import SuitabilityCalculation from "./components/pages/suitabilityCalculation";
import Visualization from "./components/pages/visualization";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import User from './components/pages/user';
import Navbar from './components/layout/navbar';
import Project from './components/pages/project';
import Setting from './components/pages/setting';

function Routes() {
    useEffect(() => {store.dispatch(loadUser());}, [])
    return (
        <Provider store={store}>
        <HashRouter>
            <Navbar />
            <Switch>
                <Route path='/' exact component={Home} />
                <PrivateRoute path='/dataInput' exact component={DataInput} />
                <PrivateRoute path='/suitabilityCalculation' exact component={SuitabilityCalculation} />
                <PrivateRoute path='/visualization' exact component={Visualization} />
                <PrivateRoute path='/user' exact component={User} />
                <PrivateRoute path='/project' exact component={Project} />
                <PrivateRoute path='/setting' exact component={Setting} />
                <Route path='/signup' exact component={Signup} />
                <Route path='/login' exact component={Login} />
            </Switch>
        </HashRouter>
        </Provider>
    );
}

export default Routes;