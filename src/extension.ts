// The module 'vscode' contains the VS Code extensibility API
import * as vscode from "vscode";
import { HelloWorldPanel } from "./HelloWorldPanel";
import { SidebarProvider } from "./SidebarProvider";

export function activate(context: vscode.ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("vstodo-sidebar", sidebarProvider)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("vstodo-2.helloWorld", () => {
      HelloWorldPanel.createOrShow(context.extensionUri);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("vstodo-2.addTodo", () => {
      const { activeTextEditor } = vscode.window;

      if (!activeTextEditor) {
        vscode.window.showInformationMessage("No active text editor");
        return;
      }

      const selectedText = activeTextEditor.document.getText(
        activeTextEditor.selection
      );

      sidebarProvider._view?.webview.postMessage({
        type: "new-todo",
        value: selectedText
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("vstodo-2.refresh", async () => {
      // kill & reopen sidebar
      // HelloWorldPanel.kill();
      // HelloWorldPanel.createOrShow(context.extensionUri);

      await vscode.commands.executeCommand("workbench.action.closeSidebar");
      await vscode.commands.executeCommand(
        "workbench.view.extension.todo-tree-container"
      );
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
