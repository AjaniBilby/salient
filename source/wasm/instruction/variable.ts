// https://webassembly.github.io/spec/core/binary/instructions.html#variable-instructions
import { EncodeU32 } from "../type";
import { Byte } from "../helper";


export enum Type {
	localGet  = 0x20,
	localSet  = 0x21,
	localTee  = 0x22,
	globalGet = 0x23,
	globalSet = 0x24,
}

export class Variable {
	type: Type;
	x   : number;

	constructor(type: Type, idx: number) {
		this.type = type;
		this.x    = idx;
	}

	toBinary(): Byte[] {
		return [
			this.type,
			...EncodeU32(this.x)
		];
	}
}

const wrapper = {
	global: {
		get: (x: number) => new Variable(Type.globalGet, x),
		set: (x: number) => new Variable(Type.globalSet, x)
	},
	local: {
		get: (x: number) => new Variable(Type.localGet, x),
		set: (x: number) => new Variable(Type.localSet, x),
		tee: (x: number) => new Variable(Type.localTee, x),
	}
}
export default wrapper;