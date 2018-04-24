import { db } from './firebase'

// User API
export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email
  })

export const doInitializePortfolio = (key, id, name, percent_change_1h, percent_change_24h, percent_change_7d, price_btc, price_usd, rank, symbol) =>
  db.ref(`users/${key}/portfolio/coin1`).set({
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

export const doInitializeStats = (key, wins, losses) =>
  db.ref(`users/${key}/portfolio/coin1`).set({
    wins,
    losses
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

export const doCreateLeague = (creatorUser, playerOneUser, playerTwoUser, playerThreeUser, playerFourUser) =>
  db.ref('league').push().set({
    creatorUser,
    playerOneUser,
    playerTwoUser,
    playerThreeUser,
    playerFourUser
  })

export const addLeagueToUsers = (key, playerOneUser, playerTwoUser, playerThreeUser, playerFourUser) =>
  db.ref(`users/${key}/league`).set({
    playerOneUser,
    playerTwoUser,
    playerThreeUser,
    playerFourUser
  })

export const onceGetCoin = (index) =>
  db.ref(`coins/${index}`).once('value')

export const onceGetCoins = () =>
  db.ref('coins').once('value')

export const doSetCoinInPortfolio = (key, coin, id, name, percent_change_1h, percent_change_24h, percent_change_7d, price_btc, price_usd, rank, symbol) =>
  db.ref(`users/${key}/portfolio/${coin}`).set({
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

export const doDeletePortfolio = (key) =>
  db.ref(`users/${key}/portfolio`).remove()
