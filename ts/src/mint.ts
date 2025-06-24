import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { decodeSuiPrivateKey } from '@mysten/sui.js/cryptography';

const client = new SuiClient ({ url: getFullnodeUrl('testnet') });

const { secretKey } = decodeSuiPrivateKey('suiprivkey1qza8ay8cts039ecz6nlsjfkmw5xyejmwtdtlhgs0sjp3ysteqc0zs306jze');
const keyPair = Ed25519Keypair.fromSecretKey(secretKey);

const PACKAGE_ID = '0xd19a580f34548c2873b721853142d820e4a1a1ab4c01b219f244f7485527dd1d';
const MODULE_NAME = 'access_pass';
const FUNCTION_NAME = 'mint_pass';


async function callMintPass() {
    const tx = new TransactionBlock();

    tx.moveCall({
        target: '0xd19a580f34548c2873b721853142d820e4a1a1ab4c01b219f244f7485527dd1d::access_pass::mint_pass',
        arguments: [tx.pure.string('VIP Pass')],
    });

    const result = await client.signAndExecuteTransactionBlock({
        signer: keyPair,
        transactionBlock: tx
    });

    console.log('Minted AccessPass');
    console.log('Result', result);
    
}


callMintPass().catch(console.error);
