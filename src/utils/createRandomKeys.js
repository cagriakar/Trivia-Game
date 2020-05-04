export default function createRandomKeys(upTo, otherThan) {
	let randKey1 = Math.floor(Math.random() * upTo)

	let randKey2 = Math.floor(Math.random() * upTo)

	while (randKey1 === otherThan) {
		randKey1 = Math.floor(Math.random() * upTo)
	}
	while (randKey2 === randKey1 || randKey2 === otherThan) {
		randKey2 = Math.floor(Math.random() * upTo)
	}

	const randKeys = new Set([randKey1, randKey2])

	return randKeys
}
