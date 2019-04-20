import { combineReducers, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'localforage';
import screenshot from './reducers/myReducer';

const persistConfig = {
    key: 'root',
    storage,
    blacklist : []
};

let reducers = combineReducers({
    screenshot
});

const persistedReducer = persistReducer( persistConfig, reducers );

let store = createStore(persistedReducer);

persistStore(store, {}, function(){
    
});

export default store;