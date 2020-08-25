const { types } = require('@arcblock/mcrypto');
const { fromRandom, WalletType } = require('@arcblock/forge-wallet');
const GraphqlClient = require('@arcblock/graphql-client');

const endpoint = process.env.FORGE_API_HOST || 'http://127.0.0.1:8210'; // testnet

const client = new GraphqlClient(`${endpoint}/api`);


const type = WalletType({
    role: types.RoleType.ROLE_ACCOUNT,
    pk: types.KeyType.ED25519,
    hash: types.HashType.SHA3,
});//钱包

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


exports.addAssert=(wallet_name)=>{
    try{
        let [hash, assetAddress] = client.createAsset({
            moniker: 'asset',
            readonly: false, // if we want to update the asset, we should set this to false
            transferrable: false,
            data: {
                typeUrl: 'json',
                value: {
                    key: 'value',
                    blood_sugar:'1',
                    blood_pressure_s:'1',
                    blood_pressure_d:'1',
                },
            },
            wallet: wallet_name,
        });
        console.log('view asset state', `/node/explorer/assets/${assetAddress}`);
        console.log('create asset tx', `/node/explorer/txs/${hash}`);
        setTimeout(function(){}, 3000);
        return assetAddress;
    } catch (err) {
        if (Array.isArray(err.errors)) {
            console.log(err.errors);
            return err.errors;
        }
        console.error(err);
        return err;
    }
};

exports.readAssert=(assetAddress)=>{
    const { state } = client.getAssetState({ address: assetAddress });
    console.log('asset state', state);
};

exports.updateAssert=(wallet_name,assetAddress,info)=>{
    let hash =  client.updateAsset({
        address: assetAddress,
        moniker: 'asset_updated',
        data: {
            typeUrl: 'json',
            value: info,
        },
        wallet: wallet_name,
    });
    console.log('view asset state', `/node/explorer/assets/${assetAddress}`);
    console.log('update asset tx', `/node/explorer/txs/${hash}`);
};