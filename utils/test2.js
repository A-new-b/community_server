const GraphqlClient = require('@arcblock/graphql-client');
const { fromRandom } = require('@arcblock/forge-wallet');
const { verifyTxAsync, verifyAccountAsync, verifyAssetAsync } = require('@arcblock/tx-util');

const endpoint = process.env.FORGE_API_HOST || 'http://127.0.0.1:8210'; // testnet

const client = new GraphqlClient(`${endpoint}/api`);

(async () => {
try {
    const owner = fromRandom();
    console.log({ owner: owner.toAddress() });

    // 1. declare owner
    let hash = await client.declare({ moniker: 'owner2', wallet: owner });
    console.log('declare.owner.result', hash);
    console.log('view owner account', `${endpoint}/node/explorer/accounts/${owner.toAddress()}`);

    await verifyAccountAsync({ address: owner.toAddress(), chainId: 'China', chainHost: '' });
    // 2. create asset for owner

    let assetAddress;
    [hash, assetAddress] = await client.createAsset({
        moniker: 'asset',
        readonly: false, // if we want to update the asset, we should set this to false
        transferrable: false,
        data: {
            typeUrl: 'json',
            value: {
                key: 'value',
                sn: Math.random(),
            },
        },
        wallet: owner,
    });
    console.log('view asset state', `${endpoint}/node/explorer/assets/${assetAddress}`);
    console.log('create asset tx', `${endpoint}/node/explorer/txs/${hash}`);
} catch (err) {
    console.error(err);
    console.log(JSON.stringify(err.errors));
}
})();

// wait for asset state consolidates