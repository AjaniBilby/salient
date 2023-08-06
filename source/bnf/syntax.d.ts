import type _Shared from './shared.js';
export type _Literal = { type: "literal", value: string, start: number, end: number, count: number, ref: _Shared.ReferenceRange };
export type Term_Program = {
	type: 'program',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		{ type: '(...)*', value: Array<{
	type: '(...)',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		Term_Stmt_top
	]
}>, start: number, end: number, count: number, ref: _Shared.ReferenceRange }
	]
}
export declare function Parse_Program (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Program,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Stmt_top = {
	type: 'stmt_top',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		Term_Function
	]
}
export declare function Parse_Stmt_top (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Stmt_top,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_W = {
	type: 'w',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		(_Literal & {value: "\x20"} | _Literal & {value: "\x09"} | Term_Nl | Term_Comment)
	]
}
export declare function Parse_W (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_W,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Nl = {
	type: 'nl',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		(_Literal & {value: "\x0d\x0a"} | _Literal & {value: "\x0a"})
	]
}
export declare function Parse_Nl (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Nl,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Digit = {
	type: 'digit',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		_Literal
	]
}
export declare function Parse_Digit (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Digit,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Digit_nz = {
	type: 'digit_nz',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		_Literal
	]
}
export declare function Parse_Digit_nz (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Digit_nz,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Letter = {
	type: 'letter',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		(_Literal | _Literal)
	]
}
export declare function Parse_Letter (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Letter,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Comment = {
	type: 'comment',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		(Term_Comment_single | Term_Comment_multi)
	]
}
export declare function Parse_Comment (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Comment,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Comment_single = {
	type: 'comment_single',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		_Literal & {value: "\x2f\x2f"},
		_Literal,
		{ type: '(...)?', value: [] | [Term_Nl], start: number, end: number, count: number, ref: _Shared.ReferenceRange }
	]
}
export declare function Parse_Comment_single (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Comment_single,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Comment_multi = {
	type: 'comment_multi',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		_Literal & {value: "\x2f\x2a"},
		{ type: '(...)*', value: Array<(_Literal & {value: "\x5c\x2a"} | _Literal)>, start: number, end: number, count: number, ref: _Shared.ReferenceRange },
		_Literal & {value: "\x2a\x2f"}
	]
}
export declare function Parse_Comment_multi (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Comment_multi,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Constant = {
	type: 'constant',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		(Term_Boolean | Term_String | Term_Float | Term_Integer)
	]
}
export declare function Parse_Constant (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Constant,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_String = {
	type: 'string',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		Term_String_text
	]
}
export declare function Parse_String (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_String,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_String_text = {
	type: 'string_text',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		{ type: '(...)*', value: Array<({
	type: '(...)',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		_Literal & {value: "\x5c"},
		_Literal
	]
} | _Literal)>, start: number, end: number, count: number, ref: _Shared.ReferenceRange }
	]
}
export declare function Parse_String_text (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_String_text,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Boolean = {
	type: 'boolean',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		(_Literal & {value: "true"} | _Literal & {value: "false"})
	]
}
export declare function Parse_Boolean (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Boolean,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Void = {
	type: 'void',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		_Literal & {value: "void"}
	]
}
export declare function Parse_Void (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Void,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Integer = {
	type: 'integer',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		{ type: '(...)?', value: [] | [_Literal & {value: "\x2d"}], start: number, end: number, count: number, ref: _Shared.ReferenceRange },
		_Literal
	]
}
export declare function Parse_Integer (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Integer,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Integer_u = {
	type: 'integer_u',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		({
	type: '(...)',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		Term_Digit_nz,
		{ type: '(...)*', value: Array<Term_Digit>, start: number, end: number, count: number, ref: _Shared.ReferenceRange }
	]
} | Term_Zero)
	]
}
export declare function Parse_Integer_u (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Integer_u,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Zero = {
	type: 'zero',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		_Literal & {value: "0"}
	]
}
export declare function Parse_Zero (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Zero,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Float = {
	type: 'float',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		_Literal,
		_Literal & {value: "\x2e"},
		_Literal,
		{ type: '(...)?', value: [] | [{
	type: '(...)',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		_Literal & {value: "e"},
		_Literal
	]
}], start: number, end: number, count: number, ref: _Shared.ReferenceRange }
	]
}
export declare function Parse_Float (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Float,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Variable = {
	type: 'variable',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		_Literal
	]
}
export declare function Parse_Variable (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Variable,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Name = {
	type: 'name',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		{ type: '(...)+', value: [(Term_Letter | _Literal & {value: "\x5f"})] & Array<(Term_Letter | _Literal & {value: "\x5f"})>, start: number, end: number, count: number, ref: _Shared.ReferenceRange },
		{ type: '(...)*', value: Array<(Term_Letter | Term_Digit | _Literal & {value: "\x5f"})>, start: number, end: number, count: number, ref: _Shared.ReferenceRange }
	]
}
export declare function Parse_Name (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Name,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Data_type = {
	type: 'data_type',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		_Literal
	]
}
export declare function Parse_Data_type (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Data_type,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Function = {
	type: 'function',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		Term_Func_head,
		(Term_Func_body | _Literal & {value: "\x3b"})
	]
}
export declare function Parse_Function (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Function,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Func_head = {
	type: 'func_head',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		_Literal,
		Term_Func_args
	]
}
export declare function Parse_Func_head (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Func_head,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Func_args = {
	type: 'func_args',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		{ type: '(...)?', value: [] | [{
	type: '(...)',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		Term_Func_arg,
		{ type: '(...)*', value: Array<{
	type: '(...)',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		Term_Func_arg
	]
}>, start: number, end: number, count: number, ref: _Shared.ReferenceRange }
	]
}], start: number, end: number, count: number, ref: _Shared.ReferenceRange }
	]
}
export declare function Parse_Func_args (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Func_args,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Func_arg = {
	type: 'func_arg',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		_Literal,
		Term_Data_type
	]
}
export declare function Parse_Func_arg (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Func_arg,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Func_body = {
	type: 'func_body',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		{ type: '(...)*', value: Array<{
	type: '(...)',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		Term_Func_stmt
	]
}>, start: number, end: number, count: number, ref: _Shared.ReferenceRange }
	]
}
export declare function Parse_Func_body (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Func_body,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Func_stmt = {
	type: 'func_stmt',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		Term_Func_call
	]
}
export declare function Parse_Func_stmt (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Func_stmt,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Func_call = {
	type: 'func_call',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		_Literal,
		Term_Func_call_body
	]
}
export declare function Parse_Func_call (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Func_call,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Func_call_body = {
	type: 'func_call_body',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		{ type: '(...)?', value: [] | [{
	type: '(...)',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		Term_Expr,
		{ type: '(...)*', value: Array<{
	type: '(...)',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		Term_Expr
	]
}>, start: number, end: number, count: number, ref: _Shared.ReferenceRange }
	]
}], start: number, end: number, count: number, ref: _Shared.ReferenceRange }
	]
}
export declare function Parse_Func_call_body (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Func_call_body,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Expr = {
	type: 'expr',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		Term_Expr_arg,
		{ type: '(...)*', value: Array<{
	type: '(...)',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		_Literal,
		Term_Expr_arg
	]
}>, start: number, end: number, count: number, ref: _Shared.ReferenceRange }
	]
}
export declare function Parse_Expr (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Expr,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Expr_prefix = {
	type: 'expr_prefix',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		(_Literal & {value: "\x21"} | _Literal & {value: "\x2d"})
	]
}
export declare function Parse_Expr_prefix (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Expr_prefix,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Expr_infix = {
	type: 'expr_infix',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		(_Literal & {value: "\x26\x26"} | _Literal & {value: "\x7c\x7c"} | _Literal & {value: "\x3d\x3d"} | _Literal & {value: "\x21\x3d"} | _Literal & {value: "\x3c\x3d"} | _Literal & {value: "\x3e\x3d"} | _Literal & {value: "\x3c"} | _Literal & {value: "\x3e"} | _Literal & {value: "\x25"} | _Literal & {value: "\x2a"} | _Literal & {value: "\x2f"} | _Literal & {value: "\x2b"} | _Literal & {value: "\x2d"} | _Literal & {value: "\x2d\x3e"})
	]
}
export declare function Parse_Expr_infix (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Expr_infix,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Expr_arg = {
	type: 'expr_arg',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		{ type: '(...)?', value: [] | [Term_Expr_prefix], start: number, end: number, count: number, ref: _Shared.ReferenceRange },
		(Term_Constant | Term_Expr_brackets | Term_Expr_val)
	]
}
export declare function Parse_Expr_arg (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Expr_arg,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Expr_val = {
	type: 'expr_val',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		Term_Variable,
		{ type: '(...)?', value: [] | [Term_Func_call_body], start: number, end: number, count: number, ref: _Shared.ReferenceRange }
	]
}
export declare function Parse_Expr_val (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Expr_val,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}

export type Term_Expr_brackets = {
	type: 'expr_brackets',
	start: number,
	end: number,
	count: number,
	ref: _Shared.ReferenceRange,
	value: [
		Term_Expr
	]
}
export declare function Parse_Expr_brackets (i: string, refMapping?: boolean): _Shared.ParseError | {
	root: _Shared.SyntaxNode & Term_Expr_brackets,
	reachBytes: number,
	reach: null | _Shared.Reference,
	isPartial: boolean
}