import nacl from "tweetnacl"
import nonceGenerator from "./nonce"

export default function openBox(c, pk, sk) {
	var epk = c.subarray(0, nacl.box.publicKeyLength)
	var nonce = nonceGenerator(epk, pk)

	var boxData = c.subarray(nacl.box.publicKeyLength)
	const openBox = nacl.box.open
	return openBox(boxData, nonce, epk, sk)
}
