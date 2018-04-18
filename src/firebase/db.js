import { db } from './firebase'

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email
  })

export const onceGetUsers = () =>
  db.ref('users').once('value')

// Other Entity APIs ...
export const doUpdateCoinData = (key, id, name, symbol, rank, priceUSD, priceBTC, marketCapUSD, availableSupply, totalSupply, maxSupply, percentChange1hr, percentChange24hr, percentChange7d, lastUpdated) =>
  db.ref(`coins/${key}`).set({
    id,
    name,
    symbol,
    rank,
    priceUSD,
    priceBTC,
    marketCapUSD,
    availableSupply,
    totalSupply,
    maxSupply,
    percentChange1hr,
    percentChange24hr,
    percentChange7d,
    lastUpdated
  })

export const doCreateLeague = (leagueKey, creatorUser, playerOneUser, playerTwoUser, playerThreeUser, playerFourUser) =>
  db.ref(`league/${leagueKey}`).set({
    creatorUser,
    playerOneUser,
    playerTwoUser,
    playerThreeUser,
    playerFourUser
  })

export const onceGetCoin = (index) =>
  db.ref(`coins/${index}`).once('value')

export const doSetCoinInPortfolio = (key, coin, id, name, percent_change_1h, percent_change_24h, percent_change_7d, price_btc, price_usd, rank, symbol) =>
  db.ref(`users/${key}/${coin}`).set({
    id,
    name,
    percent_change_1h,
    percent_change_24h,
    percent_change_7d,
    price_btc,
    price_usd,
    rank,
    symbol
  })
