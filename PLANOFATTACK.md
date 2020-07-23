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
maybe tree view

### State
maybe tree view



## API Resources
https://code.visualstudio.com/api/extension-guides/tree-view


https://code.visualstudio.com/api/references/vscode-api#languages.registerDefinitionProvider

https://code.visualstudio.com/api/language-extensions/programmatic-language-features

https://microsoft.github.io/language-server-protocol/
specification#textDocument_references

https://microsoft.github.io/language-server-protocol/specification#textDocument_typeDefinition

https://microsoft.github.io/language-server-protocol/specification#textDocument_documentLink

html/css/jsx
https://code.visualstudio.com/api/language-extensions/embedded-languages


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