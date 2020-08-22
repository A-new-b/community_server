const { types } = require('@arcblock/mcrypto');
const { fromRandom, WalletType } = require('@arcblock/forge-wallet');
// const GraphQLClient = require('@arcblock/graphql-client');

// const host = 'http://127.0.0.1:8210';
// const client = new GraphQLClient({ endpoint: `${host}/api` });

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

    let hash = registerUser(name, wallet_name);
    console.log('register tx:', hash);
    // try {
    //
    //     } catch (err) {
    //         if (Array.isArray(err.errors)) {
    //             console.log(err.errors);
    //         }
    //         console.error(err);
    //     }
    // };
    return wallet_name
};

const type = WalletType({
    role: types.RoleType.ROLE_ACCOUNT,
    pk: types.KeyType.ED25519,
    hash: types.HashType.SHA3,
});
