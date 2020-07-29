## MVP  
Pop out side bar that has features of:
Showing Function definitions and references - showing enclosing function names
Param Types
Hierarchical view of css 
Show connected state

### Edge Case  
What if you have two definitions - show both definitions


## Feature 

### Side Bar 
package.json > contributes : {}
https://code.visualstudio.com/api/references/contribution-points#contributes.viewsContainers

### Function Definition 

### References with Enclosing Function Info

### Param Types 

### Hierarchical CSS
-- can search for css
maybe tree view

### State
maybe tree view

## Notes
JSON?


## API Resources
https://code.visualstudio.com/api/language-extensions/programmatic-language-features
https://code.visualstudio.com/api/language-extensions/language-server-extension-guide
https://code.visualstudio.com/api/references/vscode-api

## Run tests

* Open the debug viewlet (`Ctrl+Shift+D` or `Cmd+Shift+D` on Mac) and from the launch configuration dropdown pick `Extension Tests`.
* Press `F5` to run the tests in a new window with your extension loaded.
* See the output of the test result in the debug console.
* Make changes to `src/test/suite/extension.test.js` or create new test files inside the `test/suite` folder.
  * The provided test runner will only consider files matching the name pattern `**.test.ts`.
  * You can create folders inside the `test` folder to structure your tests any way you want.
## Go further

 * [Publish your extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) on the VSCode extension marketplace.
 * Automate builds by setting up [Continuous Integration](https://code.visualstudio.com/api/working-with-extensions/continuous-integration).


 Workflow
 Right click -> Inspect / Parse
 Workbench will toggle 
 Click on def or reference

Commands [https://code.visualstudio.com/api/extension-capabilities/common-capabilities]

https://code.visualstudio.com/api/references/vscode-api#commands
https://code.visualstudio.com/api/references/contribution-points#contributes.commands
https://code.visualstudio.com/api/references/contribution-points#contributes.menus
https://code.visualstudio.com/api/extension-guides/command

WorkBench Tree Views [https://code.visualstudio.com/api/extension-capabilities/extending-workbench]

https://code.visualstudio.com/api/references/contribution-points#contributes.viewsContainers
https://code.visualstudio.com/api/references/contribution-points#contributes.views
https://code.visualstudio.com/api/extension-guides/tree-view
https://github.com/microsoft/vscode-extension-samples/tree/master/tree-view-sample

Language Features
https://code.visualstudio.com/api/references/vscode-api#languages.registerDefinitionProvider
https://code.visualstudio.com/api/language-extensions/programmatic-language-features
https://code.visualstudio.com/api/language-extensions/embedded-languages

--------

commands.registerCommand('extension.sayHello', () => {
    window.showInformationMessage('Hello World!');
});
Second, bind the command identifier to a title under which it will show in the palette (package.json).

{
    "contributes": {
        "commands": [{
            "command": "extension.sayHello",
            "title": "Hello World"
        }]
    }
}


--------

registerReferenceProvider(selector: DocumentSelector, provider: ReferenceProvider): Disposable

ReferenceContext#
Value-object that contains additional information when requesting references.

PROPERTIES
includeDeclaration: boolean

ReferenceProvider#
The reference provider interface defines the contract between extensions and the find references-feature.

METHODS
provideReferences(document: TextDocument, position: Position, context: ReferenceContext, token: CancellationToken): ProviderResult<Location[]>

Register a reference provider.

Multiple providers can be registered for a language. In that case providers are asked in parallel and the results are merged. A failing provider (rejected promise or exception) will not cause a failure of the whole operation.

Parameter	Description
selector: DocumentSelector	
A selector that defines the documents this provider is applicable to.

provider: ReferenceProvider	
A reference provider.

Returns	Description
Disposable	
A disposable that unregisters this provider when being disposed.

--------

registerTypeDefinitionProvider(selector: DocumentSelector, provider: TypeDefinitionProvider): Disposable

TypeDefinitionProvider#
The type definition provider defines the contract between extensions and the go to type definition feature.

Register a type definition provider.

Multiple providers can be registered for a language. In that case providers are asked in parallel and the results are merged. A failing provider (rejected promise or exception) will not cause a failure of the whole operation.

Parameter	Description
selector: DocumentSelector	
A selector that defines the documents this provider is applicable to.

provider: TypeDefinitionProvider	
A type definition provider.

Returns	Description
Disposable	
A disposable that unregisters this provider when being disposed.

--------

registerDeclarationProvider(selector: DocumentSelector, provider: DeclarationProvider): Disposable

The declaration of a symbol representation as one or many locations or location links.
The declaration provider interface defines the contract between extensions and the go to declaration feature.

Register a declaration provider.

Multiple providers can be registered for a language. In that case providers are asked in parallel and the results are merged. A failing provider (rejected promise or exception) will not cause a failure of the whole operation.

Parameter	Description
selector: DocumentSelector	
A selector that defines the documents this provider is applicable to.

provider: DeclarationProvider	
A declaration provider.

Returns	Description
Disposable	
A disposable that unregisters this provider when being disposed.

--------

registerDefinitionProvider(selector: DocumentSelector, provider: DefinitionProvider): Disposable

Definition#
The definition of a symbol represented as one or many locations. For most programming languages there is only one location at which a symbol is defined.

Definition: Location | Location[]

DefinitionLink#
Information about where a symbol is defined.

Provides additional metadata over normal location definitions, including the range of the defining symbol

DefinitionLink: LocationLink

DefinitionProvider#
The definition provider interface defines the contract between extensions and the go to definition and peek definition features.

Register a definition provider.

Multiple providers can be registered for a language. In that case providers are asked in parallel and the results are merged. A failing provider (rejected promise or exception) will not cause a failure of the whole operation.

Parameter	Description
selector: DocumentSelector	
A selector that defines the documents this provider is applicable to.

provider: DefinitionProvider	
A definition provider.

Returns	Description
Disposable	
A disposable that unregisters this provider when being disposed.


--------

DocumentLink#
A document link is a range in a text document that links to an internal or external resource, like another text document or a web site.

CONSTRUCTORS
new DocumentLink(range: Range, target?: Uri): DocumentLink

PROPERTIES
range: Range

target?: Uri

tooltip?: string

DocumentLinkProvider<T>#
The document link provider defines the contract between extensions and feature of showing links in the editor.

METHODS
provideDocumentLinks(document: TextDocument, token: CancellationToken): ProviderResult<T[]>

resolveDocumentLink(link: T, token: CancellationToken): ProviderResult<T>

--------

https://code.visualstudio.com/api/references/vscode-api#tasks -- prob won't need

--------

createTreeView<T>(viewId: string, options: TreeViewOptions<T>): TreeView<T>

Create a TreeView for the view contributed using the extension point views.

Parameter	Description
viewId: string	
Id of the view contributed using the extension point views.

options: TreeViewOptions<T>	
Options for creating the TreeView

Returns	Description
TreeView<T>	
a TreeView.

--------

registerTreeDataProvider<T>(viewId: string, treeDataProvider: TreeDataProvider<T>): Disposable

Register a TreeDataProvider for the view contributed using the extension point views. This will allow you to contribute data to the TreeView and update if the data changes.

Note: To get access to the TreeView and perform operations on it, use createTreeView.

Parameter	Description
viewId: string	
Id of the view contributed using the extension point views.

treeDataProvider: TreeDataProvider<T>	
A TreeDataProvider that provides tree data for the view

Returns	Description
Disposable	

--------

showTextDocument(document: TextDocument, column?: ViewColumn, preserveFocus?: boolean): Thenable<TextEditor>

showTextDocument(document: TextDocument, options?: TextDocumentShowOptions): Thenable<TextEditor>

showTextDocument(uri: Uri, options?: TextDocumentShowOptions): Thenable<TextEditor>

https://code.visualstudio.com/api/references/vscode-api#CallHierarchyItem
https://code.visualstudio.com/api/references/vscode-api#TreeView


The View title menu - view/title
The View item menu - view/item/context
The Extensions view context menu - extension/context

https://code.visualstudio.com/api/references/contribution-points#Sorting-of-groups
https://code.visualstudio.com/api/references/contribution-points#contributes.keybindings

https://code.visualstudio.com/api/references/activation-events#onView

https://code.visualstudio.com/api/references/commands

https://code.visualstudio.com/api/references/icons-in-labels