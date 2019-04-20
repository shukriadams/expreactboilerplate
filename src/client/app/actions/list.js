import store from './../store/store';
import ajax from './../helpers/ajax';

let populateList = function(){ 
    return store.dispatch({ type: 'POPULATE_LIST', items : [ 'one', 'two'] }); 
} 

export {
    populateList
}