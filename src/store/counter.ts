import { observable, computed, action, runInAction } from 'mobx';
import axios from 'axios'
export default class CounterStore {
    @observable public counter = 4;

    constructor() {
        setTimeout(() => {
            console.log(this.counter);
            runInAction( () => this.counter += 1);
        }, 1000)
    }

    @action
    addCounter = (): void => {
        this.counter += 1;
    };

    static async getUser() {
        try {
            const response = await axios.get('http://localhost:4399/age');
            CounterStore.getName();
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    static async getName() {
        try {
            const response = await axios.get('http://localhost:4399/name?id=1')
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    @action
    getInfo = () : void => {
        CounterStore.getUser()
    };

    @action
    addCounterAsync = (): void => {
        setTimeout(() => {
            console.log(this.counter);
            runInAction( () => this.counter += 1);
        }, 1000)
    }
}
