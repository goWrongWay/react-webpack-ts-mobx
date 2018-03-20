import {observable, autorun, action, runInAction} from 'mobx';
import axios from 'axios'

export default class CounterStore {
    @observable public counter: number;
    @observable menuList : any[];

    constructor() {
        this.menuList = []
        setTimeout(() => {
            console.log(this.counter);
            runInAction(() => this.counter = 0);
        }, 1000)
    }

    @action
    addCounter = (): void => {
        this.counter += 1;
    };

    async getUser() {
        try {
            const response = await axios.get('http://localhost:4399/age');
            this.getName();
        } catch (error) {
            console.error(error);
        }
    }

    async getName() {
        try {
            const response = await axios.get('http://localhost:4399/name?id=1')
        } catch (error) {
            console.error(error);
        }
    };

    async navApi() {
        try {
            const response = await axios.get('http://localhost:4399/nav')
            runInAction(() => {
                this.menuList = response.data.data[1]['data']
            })
        } catch (error) {
            console.error(error);
        }
    };

    @action
    getInfo = (): void => {
        this.getUser()
    };

    @action
    getNav = (): void => {
        this.navApi()
    };

    @action
    addCounterAsync = (): void => {
        setTimeout(() => {
            console.log(this.counter);
            runInAction(() => this.counter += 1);
        }, 1000)
    }
}
