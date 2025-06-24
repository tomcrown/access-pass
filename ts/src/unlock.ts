import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { decodeSuiPrivateKey } from '@mysten/sui.js/cryptography';

const client = new SuiClient ({ url: getFullnodeUrl('testnet') });

const { secretKey } = decodeSuiPrivateKey('suiprivkey1qza8ay8cts039ecz6nlsjfkmw5xyejmwtdtlhgs0sjp3ysteqc0zs306jze');
const keyPair = Ed25519Keypair.fromSecretKey(secretKey);

const PACKAGE_ID = '0xd19a580f34548c2873b721853142d820e4a1a1ab4c01b219f244f7485527dd1d';
const MODULE_NAME = 'access_pass';
const FUNCTION_NAME = 'unlock_secret';
const ACCESS_PASS_ID = '0x3d983aad449836265f7427f5cd23bff5e76af7d1c8bac9c1d7085d30e1b134f8'; 


async function callUnlock() {
    const tx = new TransactionBlock();

    tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::${FUNCTION_NAME}`,
        arguments: [tx.object(ACCESS_PASS_ID)],
    });


    const result = await client.signAndExecuteTransactionBlock({
        signer: keyPair,
        transactionBlock: tx
    });

    console.log('unlock successful');
    console.log('Result', result);

}

callUnlock().catch(console.error);