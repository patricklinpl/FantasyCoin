import axios from 'axios'
import { db } from '../firebase'

const ENDPOINT = `https://api.coinmarketcap.com/v1/ticker/`

/**
* Pass the Coin Market Cap API endpoint to firebase
*/
const updateCoinData = async () => {
  console.log('IN UPDATE COIN DATA')
  try {
    var coinData = []
    await axios.get(ENDPOINT).then(res => {
      coinData = res.data
    })
    console.log(coinData[0].id)

    for (var i = 0; i <= coinData.length; i++) {
      db.doUpdateCoinData(i, coinData[i].id, coinData[i].name, coinData[i].symbol, coinData[i].rank, coinData[i].price_usd, coinData[i].price_btc, coinData[i].market_cap_usd, coinData[i].available_supply, coinData[i].total_supply, coinData[i].max_supply, coinData[i].percent_change_1h, coinData[i].percent_change_1h, coinData[i].percent_change_7d, coinData[i].last_updated)
    }
  } catch (error) {
    console.log(console.log('ERROR: updateCoinData() ' + error.message))
  }
}

// const getCoin = async (index) => {
//   console.log('IN UPDATE COIN DATA')
//   try {
//     var coinData = []
//     await axios.get(ENDPOINT).then(res => {
//       coinData = res.data
//     })
//     console.log(coinData[0].id)

//     for (var i = 0; i <= coinData.length; i++) {
//       db.doUpdateCoinData(i, coinData[i].id, coinData[i].name, coinData[i].symbol, coinData[i].rank, coinData[i].price_usd, coinData[i].price_btc, coinData[i].market_cap_usd, coinData[i].available_supply, coinData[i].total_supply, coinData[i].max_supply, coinData[i].percent_change_1h, coinData[i].percent_change_1h, coinData[i].percent_change_7d, coinData[i].last_updated)
//     }
//   } catch (error) {
//     console.log(console.log('ERROR: updateCoinData() ' + error.message))
//   }
// }

export {
  updateCoinData
}
