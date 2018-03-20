import * as React from "react";
import {RouteComponentProps} from "react-router"
import * as ReactDOM from "react-dom";
import * as Loadable from 'react-loadable';

// import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';

import Button from 'antd/lib/button'
import Menu from 'antd/lib/Menu';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

export interface AppProps {
    compiler: string;
    framework: string;
    counter?: any;
    menu?: any
}



// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.

@inject("counter", "menu") @observer
class App extends React.Component<AppProps, {}> {
    render() {
        return <div>
            <Menu>
                {
                    this.props.menu.menuList.length && this.props.menu.menuList.map((v : any, i: number) => {
                        return <MenuItemGroup key={i} title={v.title}>
                            {
                                v.item ?
                                    v.item.map((inner: any, num: number) => {
                                        return <Menu.Item key={num}>{inner.title}</Menu.Item>
                                    }) : null
                            }
                        </MenuItemGroup>
                    })
                }
            </Menu>
            <h1>Hello from {this.props.compiler} and12111 {this.props.framework}!</h1>
            <p>
                {this.props.counter.counter}
            </p>
            <Button onClick={this.props.counter.addCounter}>点我加1</Button>
            <Button onClick={this.props.counter.addCounterAsync}>异步加一</Button>
            <Button onClick={this.props.menu.getMenuList}>异步请求</Button>
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



export default App;
