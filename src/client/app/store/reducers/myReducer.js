let defaultState = {

}

export default function screenshot(state = defaultState, action) {

    switch (action.type) {

        case 'DO_THING': {
            return action;
        }

        default:{
            return state;
        }
    }
}