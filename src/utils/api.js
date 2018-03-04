import axios from 'axios'

const BASE_URL = 'http://api.coinmarketcap.com/v1'

/**
* Returns an array of all crypto currencies
*
* @returns {Array}
*/

// function getBTC () {
//   return axios.get(BASE_URL + '/ticker')
// }

function getAllCoinTickers () {
  axios.get(BASE_URL + '/ticker')
    .then(res => {
      const coin = res.data[0]
      return coin
    })
}

const helpers = getAllCoinTickers()

// const getAllCoinTickers = () => (
//   axios.get(BASE_URL + '/ticker')
//     .then(response => {
//       console.log(response.data[0])
//       return response.data[0]
//     })
// )

// async function getCoinPrice () {

// }

// async function getCoinPrice () {

// }

export default helpers
