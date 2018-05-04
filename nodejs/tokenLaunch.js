const BigchainDB = require('bigchaindb-driver')
const bip39 = require('bip39')

const API_PATH = 'https://test.bigchaindb.com/api/v1/'
const conn = new BigchainDB.Connection(API_PATH,
  { app_id: '7ba52071',
    app_key: '0c7a068cbfb26495f2d587f3d3edc6d7' })

    const nTokens = 10000
    let tokensLeft
    const tokenCreator = new BigchainDB
    .Ed25519Keypair(bip39.mnemonicToSeed('seedPhrase').slice(0,32))

    function tokenLaunch() {
        // Construct a transaction payload
        const tx = BigchainDB.Transaction.makeCreateTransaction({
                token: 'TT (Tutorial Tokens)',
                number_tokens: nTokens
            },
            // Metadata field, contains information about the transaction itself
            // (can be `null` if not needed)
            {
                datetime: new Date().toString()
            },
            // Output: Divisible asset, include nTokens as parameter
            [BigchainDB.Transaction.makeOutput(BigchainDB.Transaction
              .makeEd25519Condition(tokenCreator.publicKey), nTokens.toString())],
            tokenCreator.publicKey
        )

        // Sign the transaction with the private key of the token creator
        const txSigned = BigchainDB.Transaction
          .signTransaction(tx, tokenCreator.privateKey)

        // Send the transaction off to BigchainDB
        conn.postTransactionCommit(txSigned)
            .then(res => {
                tokensLeft = nTokens
                document.body.innerHTML ='<h3>Transaction created</h3>';
                // txSigned.id corresponds to the asset id of the tokens
                document.body.innerHTML +=txSigned.id
            })
    }
