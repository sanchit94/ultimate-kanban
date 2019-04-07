export const loadInitialState = () => {
    return {
        type: "redux-async-initial-state/STATE_LOADING_START" // Action to be dispatched so that the intial state is loaded automatically.
    }
}