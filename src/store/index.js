import { Dispatcher } from "flux"
import EventEmiter from "events"

class State extends EventEmiter {
    constructor(props) {
        super(props);
        this.detail = {};
        this.storyTypeList = []
    }
}
let obj = new State();
const state = obj;

let dispatcher = new Dispatcher();

dispatcher.register((action) => {
    switch (action.type) {
        case "setDetail":
            state.detail = action.payload;
            break;
        case "setStoryTypeList":
            state.storyTypeList = action.payload;
            break;
        default:
            return;
    }
})
export default {
    state,
    dis: dispatcher
}