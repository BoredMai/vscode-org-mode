import * as vscode from 'vscode';
import * as Utils from './utils';

export function promoteSubtree(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
    const document = textEditor.document;
    const cursorPos = Utils.getCursorPosition();
    let curLine = Utils.getLine(textEditor.document, cursorPos);
    let headerPrefix = Utils.getHeaderPrefix(curLine);

    let endOfContent = Utils.findEndOfContent(document, cursorPos, headerPrefix);

    if(headerPrefix) {
        for(let i = cursorPos.line; i < endOfContent.line + 1; ++i) {
            let curlineStart = new vscode.Position(i, 0);
            let lineHeaderPrefix = Utils.getHeaderPrefix(Utils.getLine(document, curlineStart));
            if(lineHeaderPrefix) {
                if(Utils.getStarPrefixCount(lineHeaderPrefix) > 1) {
                    edit.delete(new vscode.Range(curlineStart, new vscode.Position(i, 1)));
                }
            }
        }
    }
}

export function demoteSubtree(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
    const document = textEditor.document;
    const cursorPos = Utils.getCursorPosition();
    let curLine = Utils.getLine(textEditor.document, cursorPos);
    let headerPrefix = Utils.getHeaderPrefix(curLine);

    let endOfContent = Utils.findEndOfContent(document, cursorPos, headerPrefix);

    if(headerPrefix) {
        for(let i = cursorPos.line; i < endOfContent.line + 1; ++i) {
            let curlineStart = new vscode.Position(i, 0);
            if(Utils.getHeaderPrefix(Utils.getLine(document, curlineStart))) {
                edit.insert(curlineStart, "*");
            }
        }
    }
}

export function moveSubtree(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, direction: string) {
    const document = textEditor.document;
    const cursorPos = Utils.getCursorPosition();
    const curLine = Utils.getLine(document, cursorPos);
    const prefix = Utils.getPrefix(curLine);

    const subtreeRange = findSubtreeRange(document, cursorPos, prefix);
    const subtreeContent = document.getText(subtreeRange);
    // console.log(`${subtreeRange.start.line}, ${subtreeRange.end.line}`);
    // console.log(subtreeContent);
    // console.log("----");
    if(direction === "UP") {
        const prevSubtreeRange = findPrevSubtreeRange(document, subtreeRange);
        const prevSubtreeContent = document.getText(prevSubtreeRange);
        edit.delete(prevSubtreeRange)
        edit.insert(prevSubtreeRange.start, subtreeContent);
        edit.delete(subtreeRange)
        edit.insert(subtreeRange.start, prevSubtreeContent);
        textEditor.selections = [new vscode.Selection(prevSubtreeRange.start, prevSubtreeRange.start)];
        // console.log(`${prevSubtreeRange.start.line}, ${prevSubtreeRange.end.line}`);
        // console.log(prevSubtreeContent);
    } else if(direction === "DOWN"){
        const nextSubtreeRange = findNextSubtreeRange(document, subtreeRange);
        const nextSubtreeContent = document.getText(nextSubtreeRange);
        console.log(`${nextSubtreeRange.start.line}, ${nextSubtreeRange.end.line}`);
        console.log(nextSubtreeContent);
    }
}

export function findPrevSubtreeRange(document: vscode.TextDocument, curSubtree: vscode.Range) {
        if(curSubtree.start.line - 1 < 0) {
            return null;
        }
        const prevSubtreePos = new vscode.Position(curSubtree.start.line - 1, 0);
        const prevSubtreeLine = Utils.getLine(document, prevSubtreePos);
        const prefix = Utils.getPrefix(prevSubtreeLine);

        const prevSubtreeStart = Utils.findBeginningOfSectionWithHeader(document, prevSubtreePos, prefix);
        const prevSubtreeEnd = new vscode.Position(prevSubtreePos.line, prevSubtreeLine.length + 1);

        return new vscode.Range(prevSubtreeStart, prevSubtreeEnd);
}

export function findNextSubtreeRange(document: vscode.TextDocument, curSubtree: vscode.Range) {
        if(curSubtree.start.line + 1 > document.lineCount - 1) {
            return null;
        }
        const prevSubtreePos = new vscode.Position(curSubtree.start.line + 1, 0);
        const prevSubtreeLine = Utils.getLine(document, prevSubtreePos);
        const prefix = Utils.getPrefix(prevSubtreeLine);

        const prevSubtreeStart = Utils.findBeginningOfSectionWithHeader(document, prevSubtreePos, prefix);
        const prevSubtreeEnd = new vscode.Position(prevSubtreePos.line, prevSubtreeLine.length + 1);

        return new vscode.Range(prevSubtreeStart, prevSubtreeEnd);
}

export function findSubtreeRange(document: vscode.TextDocument, pos: vscode.Position, prefix: string) {
    let beginningOfSection;
    let endOfSection;

    if(prefix.startsWith("*")) {    //if heading, loose check
        beginningOfSection = new vscode.Position(pos.line, 0);
        endOfSection = Utils.findEndOfContent(document, pos, prefix);
    } else {
        beginningOfSection = Utils.findBeginningOfSectionWithHeader(document, pos, prefix);
        endOfSection = Utils.findEndOfSection(document, pos, prefix);
    }

    return new vscode.Range(beginningOfSection, endOfSection);
}