const { types } = require('@arcblock/mcrypto');
const { fromRandom, WalletType } = require('@arcblock/forge-wallet');
// const GraphQLClient = require('@arcblock/graphql-client');

// const host = 'http://127.0.0.1:8210';
// const client = new GraphQLClient({ endpoint: `${host}/api` });


const type = WalletType({
    role: types.RoleType.ROLE_ACCOUNT,
    pk: types.KeyType.ED25519,
    hash: types.HashType.SHA3,
});
