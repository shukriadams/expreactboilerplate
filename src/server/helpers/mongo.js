const 

    settings = require(_$+ 'helpers/settings'),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,

    
    /** 
     * Gets a mongo collection, and db instance for closing.
     */
    _getCollection = async function(collectionName){
        return new Promise(function(resolve, reject){
            try {
                MongoClient.connect(settings.mongoConnectionString, { poolSize : settings.poolSize }, function(err, db) {
                    if (err)
                        return reject(err);

                    resolve({ 
                        db, 
                        collection : db.collection(collectionName)
                    });
                });
            } catch(ex){
                reject(ex);
            }
        });
    },


    /**
     * Use this to set up database structures, import default 
     */
    initialize = async function(){
        return new Promise(async function(resolve, reject){
            try {
                MongoClient.connect(settings.mongoConnectionString, { poolSize : settings.poolSize }, function(err, db) {
                    if (err)
                        return reject(err);

                    db.collection('mytable').createIndex( { 'column1': 1, 'column2' : 1 }, { unique: true, name : 'mytable_unique_compound' });

                    resolve();
                });
            } catch(ex){
                reject(ex);
            }
        });
    },


    /**
     * Args :
     * table, and then any number of arguments used by mongo's native aggregate method, example "aggregate, where, sort, limit".
     */
    aggregate = async function(collectionName, aggregator){
        // advanced mongo queries are a sequence of objects, ex : aggregator, where, sort, limit, etc. Convert to array so we can do this dynamically
        let args = Array.from(arguments).slice(1);

        return new Promise(async function(resolve, reject){
            try {
                const mongo = await _getCollection(collectionName);
                mongo.collection.aggregate(...args, function(err, records){
                    if (err)
                        return reject(err);
                    
                    mongo.db.close();
                    resolve(records);
                });

            } catch(ex){
                reject(ex);
            }
        });
    }, 


    /**
     * 
     */ 
    distinct = async function(collectionName, field, query){
        return new Promise(async function(resolve, reject){
            try {
                const mongo = await _getCollection(collectionName);
                mongo.collection.distinct(field, query, function(err, records){
                    if (err)
                        return reject(err);
                    
                    mongo.db.close();
                    resolve(records);
                });

            } catch(ex){
                reject(ex);
            }
        });
    },


    /**
     * 
     */ 
    getById = async function(collectionName, id){
        return new Promise(async function(resolve, reject){
            try {
                const mongo = await _getCollection(collectionName);
                mongo.collection.findOne({ _id : new ObjectID(id) },function(err, record){
                    if (err)
                        return reject(err);
                    
                    mongo.db.close();
                    resolve(record);
                });

            } catch(ex){
                reject(ex);
            }
        });
    },

    
    /**
     * 
     */ 
    find = async function(collectionName, query = {}){
        return new Promise(async function(resolve, reject){
            try {
                const mongo = await _getCollection(collectionName);
                mongo.collection.find(query).toArray(function(err, records){
                    if (err)
                        return reject(err);
                    
                    mongo.db.close();
                    resolve(records);
                });

            } catch(ex){
                reject(ex);
            }
        });
    },    

      
    /**
     * 
     */ 
    findOne = async function(collectionName, query){
        return new Promise(async function(resolve, reject){
            try {
                const mongo = await _getCollection(collectionName);
                mongo.collection.find(query).toArray(function(err, records){
                    if (err)
                        return reject(err);
                    
                    mongo.db.close();
                    if (records.length > 1)
                        return reject(`One or zero records expected, ${records.length} found`);

                    if (records.length)
                        return resolve(records[0]);
                    
                    resolve(null);
                });
            } catch(ex){
                reject(ex);
            }
        });
    }, 

      
    /**
     * 
     */ 
    remove = async function remove(collectionName, record){
        return new Promise(async function(resolve, reject){
            try {
                const mongo = await _getCollection(collectionName);

                mongo.collection.deleteOne({ _id : new ObjectID(record.id) }, function(err){
                    if (err)
                        return reject(err);
                    
                    mongo.db.close();
                    resolve();
                });
            } catch(ex){
                reject(ex);
            }
        });
    },

   
    /**
     * 
     */ 
    update = async function update(collectionName, record){
        return new Promise(async function(resolve, reject){
            try {
                const mongo = await _getCollection(collectionName);

                mongo.collection.updateOne({ _id : new ObjectID(record.id) }, record, function(err){
                    if (err)
                        return reject(err);
                    
                    mongo.db.close();
                    resolve();
                });
            } catch(ex){
                reject(ex);
            }
        });
    },

    
    /**
     * 
     */ 
    insert = async function(collectionName, record){
        return new Promise(async function(resolve, reject){
            try {
                const mongo = await _getCollection(collectionName);

                mongo.collection.insertOne(record, function(err, result){
                    if (err)
                        return reject(err);
                    
                    mongo.db.close();
                    resolve(result);
                });
            } catch(ex){
                reject(ex);
            }
        });
    };

module.exports = {
    find,
    findOne,
    distinct,
    aggregate,
    initialize,
    insert,
    update,
    remove,
    getById
}
