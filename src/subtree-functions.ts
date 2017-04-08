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

export function moveSubtreeUp(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {

}

export function moveSubtreeDown(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {

}

export function moveSubtree(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, direction: string) {
    const document = textEditor.document;
    const cursorPos = Utils.getCursorPosition();
    const curLine = Utils.getLine(document, cursorPos);
    const prefix = Utils.getPrefix(curLine);
    let beginningOfSection;
    let endOfSection;

    if(prefix.startsWith("*")) {    //if heading
        beginningOfSection = new vscode.Position(cursorPos.line, 0);
        endOfSection = Utils.findEndOfContent(document, cursorPos, prefix);
    } else {
        beginningOfSection = Utils.findBeginningOfSectionWithHeader(document, cursorPos, prefix);
        endOfSection = Utils.findEndOfSection(document, cursorPos, prefix);
    }

    const subtreeRange = new vscode.Range(beginningOfSection, endOfSection);
    const subtreeContent = document.getText(subtreeRange);
    // console.log(`${beginningOfSection.line}, ${endOfSection.line}`);
    // console.log(subtreeContent);
    // if(direction === "UP") {
    //     const prevSubtreeRange =
    // } else if(direction === "DOWN"){

    // }
}

// export function findSubtreeRange() {
//     let beginningOfSection;
//     let endOfSection;

//     if(prefix.startsWith("*")) {    //if heading
//         beginningOfSection = new vscode.Position(cursorPos.line, 0);
//         endOfSection = Utils.findEndOfContent(document, cursorPos, prefix);
//     } else {
//         beginningOfSection = Utils.findBeginningOfSectionWithHeader(document, cursorPos, prefix);
//         endOfSection = Utils.findEndOfSection(document, cursorPos, prefix);
//     }
// }

export function moveSubtreeUp(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {

}

export function moveSubtreeDown(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {

}