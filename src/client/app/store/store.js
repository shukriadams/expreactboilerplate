import { combineReducers, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'localforage';
import list from './reducers/list';

const persistConfig = {
    key: 'root',
    storage,
    blacklist : ['list']
};

let reducers = combineReducers({
    list
});

const persistedReducer = persistReducer( persistConfig, reducers );

let store = createStore(persistedReducer);

persistStore(store, {}, function(){
    
});

export default store;