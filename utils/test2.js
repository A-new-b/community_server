const GraphqlClient = require('@arcblock/graphql-client');
const { fromRandom } = require('@arcblock/forge-wallet');
const { verifyTxAsync, verifyAccountAsync, verifyAssetAsync } = require('@arcblock/tx-util');

const endpoint = process.env.FORGE_API_HOST || 'http://127.0.0.1:8210'; // testnet

const client = new GraphqlClient(`${endpoint}/api`);

(async () => {
    try {
        const owner = fromRandom();
        console.log({owner: owner.toAddress()});

        // 1. declare owner
        let hash = await client.declare({moniker: 'owner', wallet: owner});
        console.log('declare.owner.result', hash);
        console.log('view owner account', `${endpoint}/node/explorer/accounts/${owner.toAddress()}`);

        const res = await client.getChainInfo();

        await verifyAccountAsync({ address: owner.toAddress(), chainId: res.info.id, chainHost: `${endpoint}/api` });

        console.log("yes");
    }catch (e) {
        console.log(e)
    }
})();