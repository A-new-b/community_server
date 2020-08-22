// const endpoint = process.env.FORGE_API_HOST || 'http://127.0.0.1:8210'; // testnet

// const client = new GraphqlClient(`${endpoint}/api`);

exports.addAssert=(wallet_name,client)=>{

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
    return assetAddress;
};

exports.readAssert=(assetAddress,client)=>{
    const { state } = client.getAssetState({ address: assetAddress });
    console.log('asset state', state);
};

exports.updateAssert=(wallet_name,assetAddress,info,client)=>{
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