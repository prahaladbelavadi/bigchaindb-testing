const driver = require('bigchaindb-driver')

const alice = new driver.Ed25519Keypair()
const conn = new driver.Connection(
    'https://test.bigchaindb.com/api/v1/',
    { app_id: '7ba52071',
      app_key: '0c7a068cbfb26495f2d587f3d3edc6d7' })
const tx = driver.Transaction.makeCreateTransaction(
    { message: 'Hello World' },
    null,
    [ driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(alice.publicKey))],
    alice.publicKey)
const txSigned = driver.Transaction.signTransaction(tx, alice.privateKey)
conn.postTransactionCommit(txSigned)
