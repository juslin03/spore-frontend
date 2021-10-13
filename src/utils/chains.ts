import { IChainData } from './types';

const supportedChains: IChainData[] = [
  {
    name: 'Ethereum Mainnet',
    short_name: 'eth',
    chain: 'ETH',
    network: 'mainnet',
    chain_id: 1,
    chainId: 1,
    network_id: 1,
    rpc_url: 'https://mainnet.infura.io/v3/%API_KEY%',
    rpcUrl: 'https://mainnet.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Ropsten',
    short_name: 'rop',
    chain: 'ETH',
    network: 'ropsten',
    chain_id: 3,
    chainId: 3,
    network_id: 3,
    rpc_url: 'https://ropsten.infura.io/v3/%API_KEY%',
    rpcUrl: 'https://ropsten.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Rinkeby',
    short_name: 'rin',
    chain: 'ETH',
    network: 'rinkeby',
    chain_id: 4,
    chainId: 4,
    network_id: 4,
    rpc_url: 'https://rinkeby.infura.io/v3/%API_KEY%',
    rpcUrl: 'https://rinkeby.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Görli',
    short_name: 'gor',
    chain: 'ETH',
    network: 'goerli',
    chain_id: 5,
    chainId: 5,
    network_id: 5,
    rpc_url: 'https://goerli.infura.io/v3/%API_KEY%',
    rpcUrl: 'https://goerli.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Binance Smart Chain',
    short_name: 'bsc',
    chain: 'BSC',
    network: 'mainnet',
    chain_id: 0x38,
    chainId: 0x38,
    network_id: 0x38,
    rpc_url: 'https://bsc-dataseed.binance.org/',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    blockExploreURL: 'https://bscscan.com',
    native_currency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Smart Chain - Testnet',
    short_name: 'bsc',
    chain: 'BSC',
    network: 'testnet',
    chain_id: '97',
    chainId: '97',
    network_id: '97',
    rpc_url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    blockExploreURL: 'https://testnet.bscscan.com',
    native_currency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Avalanche',
    short_name: 'avax',
    chain: 'Avalanche',
    network: 'mainnet',
    chain_id: '0xa86a',
    chainId: '0xa86a',
    network_id: '0xa86a',
    rpc_url: 'https://bsc-dataseed1.defibit.io/',
    rpcUrl: 'https://bsc-dataseed1.defibit.io/',
    blockExploreURL: 'https://cchain.explorer.avax.network/',
    native_currency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Avalanche FUJI C-Chain',
    short_name: 'avax',
    chain: 'Avalanche',
    network: 'mainnet',
    chain_id: '43113',
    chainId: '43113',
    network_id: '43113',
    rpc_url: 'https://api.avax-test.network/ext/bc/C/rpc',
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    blockExploreURL: 'https://cchain.explorer.avax-test.network',
    native_currency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
];

export default supportedChains;
