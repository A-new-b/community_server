const GraphQLClient = require('@arcblock/graphql-client');
const account=require('./account');
const assert=require('./asset');

const host = 'http://127.0.0.1:8210';
const client = new GraphQLClient({ endpoint: `${host}/api` });
let wallet_name=account.createAccount('jue2',client);
console.log(wallet_name.toJSON());
const client2 = new GraphQLClient({ endpoint: `${host}/api` });
let asserts=assert.addAssert(JSON.parse(JSON.stringify(wallet_name.toJSON())),client2);
console.log(asserts);
let info=assert.readAssert(asserts,client);
console.log(info);

