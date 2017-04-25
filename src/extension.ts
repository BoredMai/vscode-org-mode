'use strict';
import * as vscode from 'vscode';
import * as HeaderFunctions from './header-functions';
import * as TimestampFunctions from './timestamp-functions';
import * as MarkupFunctions from './markup-functions';
import * as SubtreeFunctions from './subtree-functions';
import {
    incrementContext,
    decrementContext
} from './modify-context';
import * as PascuaneseFunctions from './pascuanese-functions';

export function activate(context: vscode.ExtensionContext) {
    let insertHeadingRespectContentCmd = vscode.commands.registerTextEditorCommand('org.insertHeadingRespectContent', HeaderFunctions.insertHeadingRespectContent);
    let insertChildCmd = vscode.commands.registerTextEditorCommand('org.insertSubheading', HeaderFunctions.insertChild);
    let demoteLineCmd = vscode.commands.registerTextEditorCommand('org.doDemote', HeaderFunctions.demoteLine);
    let promoteLineCmd = vscode.commands.registerTextEditorCommand('org.doPromote', HeaderFunctions.promoteLine);
    let promoteSubtreeCmd = vscode.commands.registerTextEditorCommand('org.promoteSubtree', SubtreeFunctions.promoteSubtree);
    let demoteSubtreeCmd = vscode.commands.registerTextEditorCommand('org.demoteSubtree', SubtreeFunctions.demoteSubtree);
    let moveSubtreeUpCmd = vscode.commands.registerTextEditorCommand('org.moveSubtreeUp',
            (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) =>
            SubtreeFunctions.moveSubtree(textEditor, edit, "UP")
        );
    let moveSubtreeDownCmd = vscode.commands.registerTextEditorCommand('org.moveSubtreeDown',
        (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) =>
        SubtreeFunctions.moveSubtree(textEditor, edit, "DOWN")
    );

    let insertTimestampCmd = vscode.commands.registerTextEditorCommand('org.timestamp', TimestampFunctions.insertTimestamp);

    let incrementContextCmd = vscode.commands.registerTextEditorCommand('org.incrementContext', incrementContext);

    let decrementContextCmd = vscode.commands.registerTextEditorCommand('org.decrementContext', decrementContext);

    const boldCmd = vscode.commands.registerTextEditorCommand('org.bold', MarkupFunctions.bold);
    const italicCmd = vscode.commands.registerTextEditorCommand('org.italic', MarkupFunctions.italic);
    const underlineCmd = vscode.commands.registerTextEditorCommand('org.underline', MarkupFunctions.underline);
    const codeCmd = vscode.commands.registerTextEditorCommand('org.code', MarkupFunctions.code);
    const verboseCmd = vscode.commands.registerTextEditorCommand('org.verbose', MarkupFunctions.verbose);
    const literalCmd = vscode.commands.registerTextEditorCommand('org.literal', MarkupFunctions.literal);
    const butterflyCmd = vscode.commands.registerTextEditorCommand('org.butterfly', PascuaneseFunctions.butterfly);

    context.subscriptions.push(insertHeadingRespectContentCmd);
    context.subscriptions.push(insertChildCmd);

    context.subscriptions.push(demoteLineCmd);
    context.subscriptions.push(promoteLineCmd);

    context.subscriptions.push(promoteSubtreeCmd);
    context.subscriptions.push(demoteSubtreeCmd);

    context.subscriptions.push(moveSubtreeUpCmd);
    context.subscriptions.push(moveSubtreeDownCmd);

    context.subscriptions.push(insertTimestampCmd);
    context.subscriptions.push(incrementContextCmd);
    context.subscriptions.push(decrementContextCmd);

    context.subscriptions.push(boldCmd);
    context.subscriptions.push(italicCmd);
    context.subscriptions.push(underlineCmd);
    context.subscriptions.push(codeCmd);
    context.subscriptions.push(verboseCmd);
    context.subscriptions.push(literalCmd);
    context.subscriptions.push(butterflyCmd);
}

export function deactivate() {
}