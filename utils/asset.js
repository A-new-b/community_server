const { types } = require('@arcblock/mcrypto');
const { fromRandom, WalletType } = require('@arcblock/forge-wallet');
const GraphqlClient = require('@arcblock/graphql-client');
const { verifyTxAsync, verifyAccountAsync, verifyAssetAsync } = require('@arcblock/tx-util');


const endpoint = process.env.FORGE_API_HOST || 'http://127.0.0.1:8210'; // testnet

const client = new GraphqlClient(`${endpoint}/api`);


exports.createAccount= async (name,client) =>{
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
        console.log(`account ${hash}`);
        return {wallet_name,hash};
    } catch (err) {
        if (Array.isArray(err.errors)) {
            console.log(err.errors);
            return err.errors;
        }
        console.error(err);
        return err;
    }
};


exports.addAssert=async (wallet_name)=>{
    try{
        const info = await client.getChainInfo();
        await verifyAccountAsync({ address: wallet_name.toAddress(), chainId: info.info.id, chainHost: `${endpoint}/api` });
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
        return {assetAddress,hash};
    } catch (err) {
        if (Array.isArray(err.errors)) {
            console.log(err.errors);
            return err.errors;
        }
        console.error(err);
        return err;
    }
};

exports.readAssert=async (assetAddress,hash)=>{
    const info = await client.getChainInfo();
    await verifyTxAsync({ hash, chainId: info.info.id, chainHost: `${endpoint}/api` });
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