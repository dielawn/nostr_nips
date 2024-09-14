import relays from "./relays";
  
// Connect to relays
  const relayConnections = relays.map((relayUrl) => {
    const ws = new WebSocket(relayUrl);
  
    // When connection opens
    ws.onopen = () => {
      console.log(`Connected to ${relayUrl}`);
      // Here, you can subscribe to specific Nostr events or send data.
    };
  
    // When a message is received
    ws.onmessage = (event) => {
      console.log(`Message from ${relayUrl}:`, event.data);
      const data = JSON.parse(event.data);

      if (data[0] === 'EVENT' && data[2].kind === 3) {
        console.log('Contact list received:', data[2].tags);
        // contact list stored in tags
      }
      if (data[0] === 'EVENT' && data[2].kind === 1) {
        console.log('Note received', data[2].content)
      }
    };
  
    // When connection closes
    ws.onclose = () => {
      console.log(`Disconnected from ${relayUrl}`);
    };
  
    // When an error occurs
    ws.onerror = (error) => {
      console.error(`Error with ${relayUrl}:`, error);
    };
  
    return ws;
  });
  
 // Subscribe to 10 notes
 const reqTenNotes = JSON.stringify([
    'REQ', 'subscription_id', { kinds: [1], limit:10 }
 ])

 relayConnections.forEach((ws) => {
    ws.send(reqTenNotes)
 })

 // Post a message
 const newEventMessage = JSON.stringify([
  'EVENT', {
    id: 'event_id',
    pubkey: 'posters pubkey',
    created_at: Math.floor(Date.now() / 1000),
    kind: 1,
    tags: [],
    content: 'hello Nostr',
    sig: 'posters signature'
  }
 ])

 relayConnections.forEach((ws) => {
  ws.send(newEventMessage)
 })


// Request users contacts
const reqContacts = JSON.stringify([
  'REQ', 'contact_list', { kind: 3, authors: ['pubkey of list owner'] }
 ])
// Send request
 relayConnections.forEach((ws) => {
  ws.send(reqContacts)
 })
// Get response
ws.onmessage = (event) => {
  
}


