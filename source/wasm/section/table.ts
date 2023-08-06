import { EncodeU32 } from "../type.js";


export default class TableSection {

	constructor() {
	}

	toBinary () {
		const size = 0;
		return [TableSection.typeID, ...EncodeU32(size)];
	}

	static typeID = 4;
}