//https://github.com/nostr-protocol/nips/blob/master/01.md

// Nostr Object type === event
// const nostrEvent = {
//   "id": <32-bytes lowercase hex-encoded sha256 of the serialized event data>,
//   "pubkey": <32-bytes lowercase hex-encoded public key of the event creator>,
//   "created_at": <unix timestamp in seconds>,
//   "kind": <integer between 0 and 65535>,
//   "tags": [
//     [<arbitrary string>...],
//     // ...
//   ],
//   "content": <arbitrary string>,
//   "sig": <64-bytes lowercase hex of the signature of the sha256 hash of the serialized event data, which is the same as the "id" field>
// }

// UTF-8 for encoding

// TAGS 'p' pubkey, 'e' event, 'a' replaceable event
// Kinds '0' user metadata, '1' text note, 

// Client to relay messages
// ["EVENT", <event JSON as defined above>], used to publish events.
// ["REQ", <subscription_id>, <filters1>, <filters2>, ...], used to request events and subscribe to new updates.
// ["CLOSE", <subscription_id>], used to stop previous subscriptions.

// Filters JSON object 
// {
//     "ids": <a list of event ids>,
//     "authors": <a list of lowercase pubkeys, the pubkey of an event must be one of these>,
//     "kinds": <a list of a kind numbers>,
//     "#<single-letter (a-zA-Z)>": <a list of tag values, for #e — a list of event ids, for #p — a list of pubkeys, etc.>,
//     "since": <an integer unix timestamp in seconds. Events must have a created_at >= to this to pass>,
//     "until": <an integer unix timestamp in seconds. Events must have a created_at <= to this to pass>,
//     "limit": <maximum number of events relays SHOULD return in the initial query>
//   }

// Relay to client messages
// ["EVENT", <subscription_id>, <event JSON as defined above>], used to send events requested by clients.
// ["OK", <event_id>, <true|false>, <message>], used to indicate acceptance or denial of an EVENT message.
// ["EOSE", <subscription_id>], used to indicate the end of stored events and the beginning of events newly received in real-time.
// ["CLOSED", <subscription_id>, <message>], used to indicate that a subscription was ended on the server side.
// ["NOTICE", <message>], used to send human-readable error messages or other things to clients.