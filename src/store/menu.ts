import {observable, autorun, action, runInAction} from 'mobx';
import axios from 'axios'

export default class CounterStore {
    @observable menuList: any[];

    constructor() {
        this.menuList = []
    }

    async menuApi() {
        try {
            const response = await axios.get('http://localhost:4399/menu')
            runInAction(() => {
                this.menuList = response.data.data[1]['data']
            })
        } catch (error) {
            console.error(error);
        }
    };

    @action
    getMenuList = (): void => {
        this.menuApi()
    };
}
