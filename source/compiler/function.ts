import type { File, Namespace } from "./file.js";
import { Term_Access, Term_Function } from "../bnf/syntax.js";
import { ReferenceRange, SourceView } from "../parser.js";
import chalk from "chalk";
import { Intrinsic } from "./intrinsic.js";
import { FlatAccessToStr, FlattenAccess } from "./helper.js";
import { Instruction } from "../wasm/index.js";
import { Scope } from "./codegen/scope.js";


class Argument {
	name: string;
	type: Intrinsic;
	ref: ReferenceRange;

	constructor(name: string, type: Intrinsic, ref: ReferenceRange) {
		this.name = name;
		this.type = type;
		this.ref  = ref;
	}
}


export default class Function {
	owner: File;
	ast: Term_Function;
	name: string;

	isCompiled: boolean;
	isLinking:  boolean;
	isLinked:   boolean;

	arguments: Argument[];
	returns:   Intrinsic[];

	constructor(owner: File, ast: Term_Function) {
		this.owner = owner;
		this.name = ast.value[0].value[0].value;
		this.ast = ast;

		this.returns   = [];
		this.arguments = [];

		this.isLinking  = false;
		this.isLinked   = false;
		this.isCompiled = false;
	}

	getFile() {
		return this.owner;
	}

	declarationView(): string {
		return SourceView(this.owner.path, this.owner.name, this.ast.value[0].ref);
	}

	merge(other: Namespace) {
		console.error(
			(other instanceof Function
				? `${chalk.red("Error")}: Function overloads are not supported\n`
				: `${chalk.red("Error")}: Cannot share a name space between these two\n`)
			+ this.declarationView()
			+ other.declarationView()
		);

		this.owner.markFailure();
	}

	link() {
		if (this.isLinked) return;

		const head = this.ast.value[0];

		const arg_group = head.value[1].value[0].value[0];
		const raw_args = arg_group ? [
			arg_group.value[0],
			...arg_group.value[1].value.map(x => x.value[0])
		] : [] ;

		const types = LinkTypes(this.getFile(), raw_args.map(x => x.value[1]));
		if (types === null) return;

		for (let i=0; i<raw_args.length; i++) {
			this.arguments.push(new Argument(
				raw_args[i].value[0].value,
				types[i],
				raw_args[i].ref
			))
		}

		const rets = LinkTypes(this.getFile(),
			[head.value[2]]
		);
		if (rets === null) return;
		this.returns = rets;


		this.isLinked = true;
	}


	compile() {
		if (this.isCompiled) return;      // Already compiled
		if (!this.isLinked)  this.link(); // Link if not done already
		if (!this.isLinked)  return;      // Failed to link
		console.log(103, this);

		const project = this.getFile().owner;

		const func = project.module.makeFunction(
			this.arguments.map(x => x.type.bitcode),
			this.returns.map(x => x.bitcode)
		);

		const scope = new Scope();
		for (const arg of this.arguments) {
			scope.registerArgument(arg.name, arg.type, arg.ref)
		}

		func.code.push(Instruction.const.i32(0));
		func.code.push(Instruction.return());
	}
}




function LinkTypes(scope: File, syntax: Term_Access[]) {
	const out: Intrinsic[] = [];

	let failed = false;
	for (const arg of syntax) {
		const flat = FlattenAccess(arg);

		const res = scope.get(flat);
		if (res === null || !(res instanceof Intrinsic)) {
			console.error(
				`${chalk.red("Error")}: Cannot find type\n`
				+ SourceView(scope.path, scope.name, arg.ref)
			)
			failed = true;
			continue;
		}

		out.push(res);
	}

	if (failed) return null;
	return out;
}