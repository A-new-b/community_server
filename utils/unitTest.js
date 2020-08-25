const GraphQLClient = require('@arcblock/graphql-client');
const assert=require('./asset');

const host = 'http://127.0.0.1:8210';
const client = new GraphQLClient({ endpoint: `${host}/api` });
let wallet_name=assert.createAccount('jue4',client);
console.log(wallet_name.toJSON());
let asserts=assert.addAssert(JSON.parse(JSON.stringify(wallet_name.toJSON())),client);
console.log(asserts);
let info=assert.readAssert(asserts,client);
console.log(info);

