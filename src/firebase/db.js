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
