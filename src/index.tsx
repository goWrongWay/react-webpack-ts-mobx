import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Loadable from 'react-loadable';
import store from './store'
import { observable, configure, action, autorun } from 'mobx';
import { Provider, observer, inject } from 'mobx-react';

configure({ enforceActions: true })
class AppState {
    @observable timer = 4;

    constructor() {
       setInterval(() => {
            this.timer += 1;
        }, 1000);

    }

    resetTimer() {
        this.timer = 0;
    }
}

const LoadableHello = Loadable({
    loader: () => import(/* webpackChunkName: "hello" */ './components/Hello'),
    loading: () => <div>loading ...</div>
});


const appState = new AppState();
console.log(store);
ReactDOM.render(
    <Provider {...store}>
        <LoadableHello compiler="TypeScript" framework="Rea0c20t" />
    </Provider>,
    document.getElementById("example")
);