require ('babel-register');
require ('babel-polyfill');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = 'achieve diary will flash demise slush congress crack allow rival issue scrub';
const infuraProjectId= '6f8111f77b08489a8d3a8433579e1a6a';

module.exports = {
    networks:{
        goerli: {
            provider: () => new HDWalletProvider(mnemonic, `https://goerli.infura.io/v3/${infuraProjectId}`),
            network_id:5,
            chain_id:5,
            gas:5500000,
            confirmation:2,
            timeoutBlocks:200,
            skipDryRun:true
        },
        development: {
            host: "127.0.0.1:7545",
            port: "7545",
            network_id: '*' // Match any network id
    }
    },
    contracts_directory: './src/contracts/',
    contracts_build_directory: './src/truffle_abis',
    compilers: {
        solc: {
            version: "^0.5.0",
            optimizer: {
                enabled: true,
                runs: 200
            },
        }
    }
}