// The module 'vscode' contains the VS Code extensibility API
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vstodo-2" is now active!');

  let disposable = vscode.commands.registerCommand(
    "vstodo-2.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello from VSTodo-2!");
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
