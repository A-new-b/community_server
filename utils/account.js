const { types } = require('@arcblock/mcrypto');
const { fromRandom, WalletType } = require('@arcblock/forge-wallet');
// const GraphQLClient = require('@arcblock/graphql-client');

// const host = 'http://127.0.0.1:8210';
// const client = new GraphQLClient({ endpoint: `${host}/api` });

const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout));

exports.createAccount= (name,client) =>{
    const type = WalletType({
        role: types.RoleType.ROLE_ACCOUNT,
        pk: types.KeyType.ED25519,
        hash: types.HashType.SHA3,
    });

    const wallet_name=fromRandom(type);



    function registerUser(userName, userWallet) {
        return client.declare({
            moniker: `${userName}_test`,
            wallet: userWallet,
        });
    }

    try {
        let hash = registerUser(name, wallet_name);
        setTimeout(function(){}, 3000);
        return wallet_name
    } catch (err) {
            if (Array.isArray(err.errors)) {
                console.log(err.errors);
                return err.errors;
            }
            console.error(err);
            return err;
        }
};

const type = WalletType({
    role: types.RoleType.ROLE_ACCOUNT,
    pk: types.KeyType.ED25519,
    hash: types.HashType.SHA3,
});
