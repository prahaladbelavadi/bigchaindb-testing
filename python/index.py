from bigchaindb_driver import BigchainDB
from bigchaindb_driver.crypto import generate_keypair

bdb = BigchainDB(
    'https://test.bigchaindb.com',
    headers={'app_id': 'Get credentials from testnet.bigchaindb.com',
             'app_key': 'by signing up and going to your Applications screen'})
alice = generate_keypair()
tx = bdb.transactions.prepare(
    operation='CREATE',
    signers=alice.public_key,
    asset={'data': {'message': ''}})
signed_tx = bdb.transactions.fulfill(
    tx,
    private_keys=alice.private_key)
bdb.transactions.send(signed_tx)
