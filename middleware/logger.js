const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.log('The action: ', action);
    console.log('Previous state: ', store.getState());
    const returnValue = next(action);
    console.log('The new state: ', store.getState());
    console.groupEnd();
    return returnValue
};

export default logger;