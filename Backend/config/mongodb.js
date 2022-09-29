const { MongoClient } = require('mongodb');


const url = 'mongodb://anonym:secret@localhost:27017?authSource=admin';
const client = new MongoClient(url, {
    useUnifiedTopoLogy: true
});

(async () => {
    try {
        await client.connect();
        console.log('connect to mongodb success');
    } catch (e) {
        console.log(e);
    }
})();


const db =client.db('eduwork-native');

module.exports = db;