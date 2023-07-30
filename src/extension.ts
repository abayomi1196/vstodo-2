// The module 'vscode' contains the VS Code extensibility API
import * as vscode from "vscode";
import { HelloWorldPanel } from "./HelloWorldPanel";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vstodo-2" is now active!');

  context.subscriptions.push(
    vscode.commands.registerCommand("vstodo-2.helloWorld", () => {
      HelloWorldPanel.createOrShow(context.extensionUri);
      vscode.window.showInformationMessage("Hello from VSTodo-2!");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("vstodo-2.askQuestion", async () => {
      const response = await vscode.window.showInformationMessage(
        "How was your day?",
        "Good",
        "Bad"
      );

      if (!response) {
        vscode.window.showInformationMessage("So u refused to choose.");
      } else if (response === "Good") {
        vscode.window.showInformationMessage("Nice start to a nice day.");
      } else {
        vscode.window.showInformationMessage("Great day nonetheless.");
      }
    })
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
