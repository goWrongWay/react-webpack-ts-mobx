import * as React from "react";
import {RouteComponentProps} from "react-router"
import * as ReactDOM from "react-dom";
import * as Loadable from 'react-loadable';

// import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

export interface HelloProps {
    compiler: string;
    framework: string;
    counter?: any
}



// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.

@inject("counter") @observer
class Hello extends React.Component<HelloProps, {}> {
    render() {
        console.log(this.props.counter);
        return <div>
            <h1>Hello from {this.props.compiler} and12111 {this.props.framework}!</h1>
            <p>
                {this.props.counter.counter}
            </p>
            <button onClick={this.props.counter.addCounter}>点我加1</button>
            <button onClick={this.props.counter.addCounterAsync}>异步加一</button>
            <button onClick={this.props.counter.getInfo}>异步请求</button>
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home1</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/topics">Topics</Link>
                        </li>
                    </ul>

                    <hr/>

                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/topics" component={Topics}/>
                </div>
            </Router>
        </div>
    }
}

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

const About = () => (
    <div>
        <h2>About</h2>
    </div>
);

interface match {url: string, params: any}
const Topics = (props: match) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${props.url}/rendering`}>Rendering with React</Link>
            </li>
            <li>
                <Link to={`${props.url}/components`}>Components</Link>
            </li>
            <li>
                <Link to={`${props.url}/props-v-state`}>Props v. State</Link>
            </li>
        </ul>

        <Route path={`${props.url}/:topicId`} component={Topic} />
        <Route
            exact
            path={props.url}
            render={() => <h3>Please select a topic.</h3>}
        />
    </div>
);

const Topic = (props: match) => (
    <div>
        <h3>{props.params.topicId}</h3>
    </div>
);



export default Hello;