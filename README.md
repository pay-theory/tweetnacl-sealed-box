# libsodium Sealed Box for TweetNaCl.js

forked from [whs](https://github.com/whs/tweetnacl-sealed-box) by [Pay Theory](https://github.com/pay-theory/tweetnacl-sealed-box) for maintenance

This library implements [sealed box](https://doc.libsodium.org/public-key_cryptography/sealed_boxes) for TweetNaCl.

From libsodium's documentation:

>Sealed boxes are designed to anonymously send messages to a recipient given its public key.
>
>Only the recipient can decrypt these messages, using its private key. While the recipient can verify the integrity of the message, it cannot verify the identity of the sender.
>
>A message is encrypted using an ephemeral key pair, whose secret part is destroyed right after the encryption process.
>
>Without knowing the secret key used for a given message, the sender cannot decrypt its own message later. And without additional data, a message cannot be correlated with the identity of its sender.

## Usage

This module can be installed from npm:

```sh
npm install @paytheory/tweetnacl-sealedbox-js
```

For use in web browsers, use [sealedbox.web.js](sealedbox.web.js).

Then you can use it as follow:

```js
var tweetnacl = require('tweetnacl');
tweetnacl.sealedbox = require('tweetnacl-sealedbox-js');

// generate box key pair
var keyPair = tweetnacl.box.keyPair();

// encrypt the message
var sealed = tweetnacl.sealedbox.seal(buffer, keyPair.publicKey);
// sealed will have the size of buffer.length + tweetnacl.sealedbox.overheadLength

// decrypt the message
var result = tweetnacl.sealedbox.open(sealed, keyPair.publicKey, keyPair.secretKey);
```

The message buffer should be a `Uint8Array` or Node.js's `Buffer`. String encoding functions can be found in [tweetnacl-util-js](https://github.com/dchest/tweetnacl-util-js).

Note that `sealedbox.open` may return `null` if the sealed box is tampered.

This library should be interoperable with libsodium's implementation of sealed box (i.e. libsodium sealed box can be opened in this library and vice-versa).

## Security

This library does not zero out memory except for the ephemeral secret key. However, the JavaScript run time in use may not guaranteed that the memory is securely wiped.

_Software has not been audited for security use at your own risk._

## License

This library is licensed under the [MIT license](LICENSE.txt).
