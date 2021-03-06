import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Post from './pages/Post';
import NewPost from './pages/NewPost';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/cadastro" component={Cadastro} />
                <Route path="/post" component={Post} />
                <Route path="/new" exact component={NewPost} />
            </Switch>
        </BrowserRouter>
    );
}
