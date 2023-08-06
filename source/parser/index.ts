import * as fs from "node:fs";
import chalk from "chalk";

import { ParseError, ReferenceRange, Reference } from "../bnf/shared.js";
import * as Syntax from "../bnf/syntax.js";


export function Parse(data: string, path: string, name: string): Syntax.Term_Program {
	const res = Syntax.Parse_Program(data, true);

	if (res instanceof ParseError) {
		console.error(`${chalk.red("FATAL ERROR")}: Syntax Parser Completely crashed`);
		process.exit(1);
	};

	if (res.isPartial) {
		console.error(
			chalk.red("Syntax Error") + "\n"
			+ SourceView( path, new ReferenceRange(res.reach, res.reach) )
			+ `\n  File: ${name}`
		);
		process.exit(1);
	}

	return res;
}

export function SourceView(path: string, range: ReferenceRange) {
	const source = ReadByteRange(path, range.start.index-200, range.end.index+200);

	const begin = ExtractLine(source, range.start).replace(/\t/g, "  ");

	if (range.start.line === range.end.line) {
		const margin = ` ${range.start.line} | `;

		const trimmed = begin.trim();
		const trimDiff = begin.length - trimmed.length;

		const underline = "\n"
			+ " ".repeat(margin.length + range.start.col - trimDiff -1)
			+ "^".repeat(Math.max(1, range.end.col - range.start.col));

		return margin + trimmed + underline;
	} else {
		const eLine = " " + range.end.line.toString();
		const sLine = range.start.line.toString().padStart(eLine.length, " ");

		const finish = ExtractLine(source, range.end).replace(/\t/g, "  ");;

		return sLine + " | " + begin + "\n"
			+ eLine + " | " + finish ;
	}
}

function ExtractLine(source: string, ref: Reference) {
	const begin = FindNewLine(source, ref.index, -1);
	const end   = FindNewLine(source, ref.index, 1);

	return source.slice(begin, end);
}

function FindNewLine(source: string, index: number, step: number) {
	while (index >= 0 && index < source.length && source[index] !== "\n") {
		index += step;
	}

	if (source[index] === "\n") {
		index -= step;
	}

	return index;
}


function ReadByteRange(path: string, start: number, end: number) {
	// Ensure end byte is not before the start byte
	if (end < start) throw new Error('End byte should be greater than start byte');

	start = Math.max(0, start);

	// Open the file for reading
	const fd = fs.openSync(path, 'r');

	const bufferSize = end - start + 1;
	const buffer = Buffer.alloc(bufferSize);

	// Read the specified byte range into the buffer
	fs.readSync(fd, buffer, 0, bufferSize, start);

	// Close the file
	fs.closeSync(fd);

	return buffer.toString();
}


export {
	ReferenceRange, Reference,
	ParseError,
	Syntax
}