import Web3 from "web3";
import ReturnTokenURI from "./ReturnTokenURI";
import './NFT.scss';
import { AVAX_SPORE_ABI, SPORE_MARKET_ABI } from '../../utils/SporeAbis';
import { useState, useEffect } from 'react';
import { ContractAddesses } from '../../utils/addresses';
import { approveContract } from '../../utils/wallet';
import { MarketPlaceView } from "./MarketPlace/MarketPlace";
import { ethers } from "ethers";
import axios from 'axios';
import { API_COVALENTHQ, AVAX_NETWORK_RPC } from "../../utils/constants";
import { MarketStat } from "./NFT.style";
import MyParticles from "../../components/Particles/Particles";
import UnlockMetamask from "../../components/UnlockMetamask/UnlockMetamask";
import InstallMetamask from "../../components/InstallMetamask/InstallMetamask";
import { Helmet } from "react-helmet";



const win = window as any
const docu = document as any
win.ava = new Web3(AVAX_NETWORK_RPC)

async function approve() {
  const SporeAddress = ContractAddesses.AVAX_SPORE_MAINNET;
  const SporeNFTMarketaddress = ContractAddesses.AVAX_MARKET_MAINNET;
  var amount = ethers.BigNumber.from(docu.getElementById("_approveFee").value).mul(10 ** 9);
  await approveContract(SporeAddress, AVAX_SPORE_ABI, SporeNFTMarketaddress, amount)
}

async function NFTbuy() {
  const SporeMarketv1 = new win.web3.eth.Contract(
    SPORE_MARKET_ABI,
    ContractAddesses.AVAX_MARKET_MAINNET
  );
  var _tokenID = docu.getElementById("_tokenID").value;
  var account = await win.web3.eth.getAccounts();
  account = account[0];
  const bazaar = await SporeMarketv1.methods.Bazaar(_tokenID).call();
  try {
    await SporeMarketv1.methods
      .buy(_tokenID)
      .send({ from: account, gasPrice: 225000000000, value: bazaar.price });
  } catch (error) {
    alert(error);
  }
}



const NFT = (props: any) => {
  const [bazaar, setBazaar] = useState(new Array<any>());
  const [buys, setBuys] = useState(new Array<any>());
  const [tokensOfOwner, setTokensOfOwner] = useState(new Array<any>());
  const [balance, setBalance] = useState(0);
  const [isnetworkID, setisnetworkID] = useState({});
  const [itemId, setItemId] = useState<number>();
  const [isWeb3, setisWeb3] = useState({});
  const [buysQuantity, setBuysQuantity] = useState(0);
  const [sumTotal, setSumtotal] = useState(0);
  const [bazaarPrices, setBazaarPrices] = useState(new Array<any>());
  const [floorPrice, setFloorPrice] = useState(0);

  const getBuysData = async () => {
    await axios.get(API_COVALENTHQ).then(async (res) => {
      const abiDecoder = require('abi-decoder'); // NodeJS
      abiDecoder.addABI(SPORE_MARKET_ABI);
      
      res.data.data.items.map(async (item: any) => {
        const transaction = await win.ava.eth.getTransaction(item.tx_hash);
        
        const decodedData = abiDecoder.decodeMethod(transaction.input);
        
        if (decodedData !== undefined && decodedData.name === "buy") {  
          
          if (transaction.value !== "0"){
            
            setBuys((previousBuys)=> {return [...previousBuys,transaction.value] } )
          }
         
        }
      })
      // console.log(transactions.length)
      // if (transactions.length === 0) {
      //   transactions.push(12.5 * (10 ** 18));
      // } 
     
      
    })  
    .catch(error => {
      console.error(error)
    })
  }

  useEffect(() => {
    async function startup() {
      const totalCharacters = 72
      const SporeMarketv1 = new win.ava.eth.Contract(
        SPORE_MARKET_ABI,
        ContractAddesses.AVAX_MARKET_MAINNET
      );

      let web3 = win.web3;
      if (win.ethereum) {
        win.web3 = new Web3(win.ethereum);
        win.ethereum.enable();
      }
      if (typeof web3 !== "undefined") {
        // Use Mist/MetaMask's provider
        web3 = new Web3(web3.currentProvider);
      } else {
        setisWeb3(true);
      }

      if (win.web3.currentProvider.chainId === undefined) {
        setisWeb3(false);
      }
      else {
        setisWeb3(true);
      }

      

      const nid = win.web3.currentProvider.chainId
      if (nid === "0xa86a") {
        setisnetworkID(true);
      } else {
        setisnetworkID(false);
      }

      const promises = [];
      for (let i = 0; i <= totalCharacters - 1; i++) {
        const characterForSale = SporeMarketv1.methods.Bazaar(i).call();
        promises.push(characterForSale);
      }
      


      Promise.all(promises).then((values) => {
        setBazaar(values)
        values.filter ((value)=> { if (value.price !== "0") {return setBazaarPrices((previousPrice)=> {return [...previousPrice,value.price] } ) }})
        
        
      });

      const promises2 = [];
      

        const accounts = await win.ethereum.request({ method: "eth_accounts" });
        //We take the first address in the array of addresses and display it
        const account = accounts[0];
        const balance = await SporeMarketv1.methods.balanceOf(account).call();
        const tokensOfOwnerTemp = await SporeMarketv1.methods
          .tokensOfOwner(account)
          .call();
        setBalance(balance);
        setTokensOfOwner(tokensOfOwnerTemp);
    }
    
    getBuysData();
    startup()
      
  }, [])

 
  // if (bazaarPrices.length > 0) { 
  //   setFloorPrice(Math.min(...bazaarPrices));
  //   console.log(bazaarPrices)
  // };

  useEffect(() => {
    if (bazaarPrices.length > 0) {
      setFloorPrice(Math.min(...bazaarPrices)/10**18)
    }
  }, [bazaarPrices])


  var image: any;

  if (balance > 0) {
    image = <ReturnTokenURI tokensOfOwner={tokensOfOwner} />;
  } else {
    image = <> You dont own any NFTs yet! </>;
  }
  useEffect (() => {

    let sum: number = 43.5;
    buys.forEach(a => sum += +a / 10 ** 18);
    setSumtotal(sum);

    const _buysQuantity = buys[buys.length-1] / 10 ** 18;
    setBuysQuantity(_buysQuantity);
    
    

   } , [buys])
  


  const Metadata = () => (
    <Helmet>
      <title>Spore NFT Marketplace - Spore</title>
      <meta name="description" content="Spore™ is an NFT platform on the Avalanche network and the developer of the hyperdeflationary SPORE currency." />
      <meta name="keywords" content="Spore, NFT, Avalanche, BSC" />
    </Helmet>
  )

  return (
    <>
      <Metadata />
      <div className='container information overflow-hidden position-relative'>
       <MyParticles />
        <h2 className='feature pb-4 py-5 text-center'>
          Spore NFT Marketplace
        </h2>

        <div className='row pb-5'>
          <div className='col-md-4'>
            <MarketStat>
              <span>Last traded price:</span>
              <h4>{buysQuantity || 0}  <img className="mr-2" id="cur-logo" height="28px" width="28px" src="avalanche-logo.png" alt="Avalanche Network"></img></h4>
            </MarketStat>
          </div>

          <div className='col-md-4'>
            <MarketStat>
              <span>Floor Price:</span>
              <h4>{floorPrice}  <img className="mr-2" id="cur-logo" height="28px" width="28px" src="avalanche-logo.png" alt="Avalanche Network"></img></h4>
            </MarketStat>
          </div>

          <div className='col-md-4'>
            <MarketStat>
              <span>Total volume:</span>
              <h4>{sumTotal}  <img className="mr-2" id="cur-logo" height="28px" width="28px" src="avalanche-logo.png" alt="Avalanche Network"></img></h4>
            </MarketStat>
          </div>
        </div>
      </div>

      <section className='bg-white-darker'>
        <div className="container information py-5">
          <div className='row py-5'>
            <div className='col-md-12'>
              <div className="row pb-5">
                <MarketPlaceView bazaar={bazaar} onSelected={(nftId: number) => setItemId(nftId) } />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  id="_approveFee"
                  value="100000000000"
                  className="form-control"
                />
                <div className="input-group-append">
                  <button onClick={approve} className="btn btn-primary">Approve Fee</button>
                </div>
              </div>
              <p className="text-muted">
                <b>*Note: </b>Default is 10 million SPORE, that will be burned whenever any NFT is bought.</p>
              <div className="input-group">
                <input
                  type="text"
                  id="_tokenID"
                  value={itemId}
                  placeholder="NFT_ID (ex: 0)"
                  className="form-control"
                />
                <div className="input-group-append">
                  <button onClick={NFTbuy} className="btn btn-primary">Buy NFT</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isWeb3 ? (
        <section className="bg-white">
          <div className="container informations py-5">
            <div className="row py-5">
              <div className="col-md-12 text-center">
                <h2>Your NFTs <small className="text-muted font-italic">({isnetworkID ? balance : 0})</small></h2>
              </div>
              {
                isnetworkID ? (

                 
            <div className="row">
                 

                {image}</div>
                
                
                ) :

                  (<div className="col-md-12 text-center"> <UnlockMetamask message="Wrong Network, please switch" /> </div>)
              }
            </div>
          </div>
        </section>
      )
        :
        (<InstallMetamask />)
      }
    </>
  );
}
export default NFT
