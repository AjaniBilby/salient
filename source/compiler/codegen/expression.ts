import chalk from "chalk";

import type * as Syntax from "../../bnf/syntax.d.ts";
import { Intrinsic, f32, f64, i32, i64, u32, u64 } from "../intrinsic.ts";
import { AssertUnreachable } from "../../helper.ts";
import { Instruction } from "../../wasm/index.ts";
import { SourceView } from "../../parser.ts";
import { Context } from "./context.ts";

export function CompileExpr(ctx: Context, syntax: Syntax.Term_Expr, expect?: Intrinsic) {
	return CompileArg(ctx, syntax.value[0], expect);
}


function CompileArg(ctx: Context, syntax: Syntax.Term_Expr_arg, expect?: Intrinsic) {
	const prefix = syntax.value[0].value[0];
	const val = syntax.value[1];
	switch (val.type) {
		case "constant":       return CompileConstant(ctx, val, prefix, expect);
		case "expr_brackets":  throw new Error("1Unimplemented");
		case "expr_val":       throw new Error("2Unimplemented");
		default: AssertUnreachable(val);
	}
}

function CompileConstant(ctx: Context, syntax: Syntax.Term_Constant, prefix?: Syntax.Term_Expr_prefix, expect?: Intrinsic) {
	const val = syntax.value[0];
	switch (val.type) {
		case "boolean": throw new Error("4Unimplemented");
		case "float":   return CompileConstFloat(ctx, val, prefix, expect);
		case "integer": return CompileConstInt(ctx, val, prefix, expect);
		case "string":  throw new Error("6Unimplemented");
		default: AssertUnreachable(val);
	}
}


function CompileConstInt(ctx: Context, syntax: Syntax.Term_Integer, prefix?: Syntax.Term_Expr_prefix, expect?: Intrinsic) {
	let num = Number(syntax.value[0].value);

	if (isNaN(num)) {
		console.error(
			`${chalk.red("Error")}: Invalid number ${syntax.value[0].value}\n`
			+ SourceView(ctx.file.path, ctx.file.name, syntax.ref)
		)
		Deno.exit(1);
	}

	const unsigned = expect === u32 || expect === u64;
	if (prefix) {
		const op = prefix.value[0].value;
		switch (op) {
			case "!":
				console.error(
					`${chalk.red("Error")}: Cannot negate an integer\n`
					+ SourceView(ctx.file.path, ctx.file.name, syntax.ref)
				)
				Deno.exit(1);
				break;
			case "-":
				if (unsigned) {
					console.error(
						`${chalk.red("Error")}: Cannot have a negative unsigned integer\n`
						+ SourceView(ctx.file.path, ctx.file.name, syntax.ref)
					)
					Deno.exit(1);
				}

				num *= -1;
				break;
			default: AssertUnreachable(op);
		}
	}

	if (expect === i64) {
		ctx.block.push(Instruction.const.i64(num));
		if (unsigned) return u64;
		return i64;
	}

	ctx.block.push(Instruction.const.i32(num));
	if (unsigned) return u32;
	return i32;
}

function CompileConstFloat(ctx: Context, syntax: Syntax.Term_Float, prefix?: Syntax.Term_Expr_prefix, expect?: Intrinsic) {
	let num = Number(syntax.value[0].value);

	if (isNaN(num)) {
		console.error(
			`${chalk.red("Error")}: Invalid number ${syntax.value[0].value}\n`
			+ SourceView(ctx.file.path, ctx.file.name, syntax.ref)
		)
		Deno.exit(1);
	}

	if (prefix) {
		const op = prefix.value[0].value;
		switch (op) {
			case "!":
				console.error(
					`${chalk.red("Error")}: Cannot negate an integer\n`
					+ SourceView(ctx.file.path, ctx.file.name, syntax.ref)
				)
				Deno.exit(1);
			case "-":
				num *= -1;
				break;
			default: AssertUnreachable(op);
		}
	}

	if (expect === f64) {
		ctx.block.push(Instruction.const.f64(num));
		return f64;
	}

	ctx.block.push(Instruction.const.f32(num));
	return f32;
}