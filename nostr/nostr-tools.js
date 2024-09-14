import { RelayPool } from 'nostr-tools';

// List of relay URLs
const relays = [
  'wss://relay.damus.io',
  'wss://nostr-pub.wellorder.net',
  'wss://nostr-relay.wlvs.space'
];

// Create a new relay pool
const pool = new RelayPool(relays);

// Connect to relays and handle events
pool.on('open', (relay) => {
  console.log(`Connected to relay: ${relay.url}`);
});

pool.on('message', (message, relay) => {
  console.log(`Received message from ${relay.url}:`, message);
});

// Handle errors or connection closures
pool.on('error', (error, relay) => {
  console.error(`Error on relay ${relay.url}:`, error);
});

pool.on('close', (relay) => {
  console.log(`Disconnected from relay: ${relay.url}`);
});
