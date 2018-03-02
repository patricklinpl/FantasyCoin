import axios from 'axios'

const BASE_URL = 'http://api.coinmarketcap.com/v1'

/**
* Returns an array of all crypto currencies
*
* @returns {Array}
*/
async function getAllCoinTickers () {
  console.log('test')
  try {
    const tickers = []
    const response = await axios.get(BASE_URL + '/ticker')
    for (var i in response) {
      tickers.push(response[i].symbol)
      console.log('test')
      return tickers
    }
  } catch (error) {
    console.log(error)
  }
}

// async function getCoinPrice () {

// }

// async function getCoinPrice () {

// }

export {getAllCoinTickers}
