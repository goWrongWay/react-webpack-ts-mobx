import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Loadable from 'react-loadable';
import store from './store'
import { observable, configure, action, autorun } from 'mobx';
import { Provider, observer, inject } from 'mobx-react';

configure({ enforceActions: true })

const LoadableApp = Loadable({
    loader: () => import(/* webpackChunkName: "hello" */ './components/App'),
    loading: () => <div>loading ...</div>
});

ReactDOM.render(
    <Provider {...store}>
        <LoadableApp compiler="TypeScript" framework="Rea0c20t" />
    </Provider>,
    document.getElementById("root")
);