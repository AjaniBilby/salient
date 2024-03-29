import { EncodeU32 } from "~/wasm/type.ts";
import { FuncRef } from "~/wasm/funcRef.ts";


export default class StartSection {
	static typeID = 8;
	ref: null | FuncRef;

	constructor () {
		this.ref = null;
	}

	static toBinary (ref: null | FuncRef) {
		const buf = [];

		if (ref === null) {
			buf.push(0);
		} else {
			buf.push(1);
			buf.push(...EncodeU32(ref.get()))
		}

		return [
			StartSection.typeID,
			...EncodeU32(buf.length),
			...buf
		];
	}
}