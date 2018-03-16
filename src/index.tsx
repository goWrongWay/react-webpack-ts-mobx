import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Loadable from 'react-loadable';


const LoadableHello = Loadable({
    loader: () => import(/* webpackChunkName: "hello" */ './components/Hello'),
    loading: () => <div>loading ...</div>
});

ReactDOM.render(
    <LoadableHello compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);