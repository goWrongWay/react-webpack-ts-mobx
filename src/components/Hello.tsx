import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Loadable from 'react-loadable';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

export interface HelloProps {
    compiler: string;
    framework: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <div>
            <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;

            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
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