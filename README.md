# zxw-editor

### Author: Zachary Justin Wartell, Ph.D.
- App: https://www.zacharywartell.net/zxw-editor
- Git: https://github.com/ZacharyWartell/zxw-editor
- License: [LICENSE.md](LICENSE.md)

zxw-editor is an experimental 'in-place' HTML editor.

- zxw-editor.html can be saved to a local file in Chrome.  The resulting saved local .html file
   can be openned directly in Chrome and further edited in Chrome.  The saved local .html embeds
   the zxw-editor code itself.  Therefore once saved, the saved .html is completely standalone and editable by the embedded the zxw-editor UI.                    
    - zxw-editor is a [static webpage](https://en.wikipedia.org/wiki/Static_web_page).
    - zxw-editor does _not_ communicate to any server.    
- zxw-editor neither requires nor uses any 3rd party framework (React, Vue, Angular). 
- zxw-editor leverages [contentedible](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/contenteditable) and [showSaveFilePicker](https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker) to save edits to the webpage (i.e. the local DOM) to a local file.
- Caveats:
    - zxw-editor assumes the user is comfortable and familiar with using the Chrome Inspector to edit the DOM in addition to editing the contentedible ``` <div> ``` directly using the browser's inherent
  [contentedible](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/contenteditable) editing features.
    - zxw-editor is only tested on the Chrome browser.
    - zxw-editor is alpha software and has bugs.
       - A standard CS 101 assignment at MIT is to write a program that prints itself.  This is tricky to realize how to do and is a important exercise in programming.
         The more complex the programming language the tricker it is to implement.  Getting zxw-editor to essentially do this must accomodate HTML, embedded JavaScript <script> and embedded
         CSS <style> elements.  A present, I continue to find use cases where the current zxw-editor fails to save the DOM to an .html without corrupting something due to
         XMLSerializer's automated conversion of various operator characters to HTML entities (i.e. ">" => "&gt;").  But yet zxw-editor is working for a number of simple .html documents
         that I write and it increasingly is replacing my use of MS Word, LaTeX or third party HTML WYSIWYG editors (which keep reaching an end-of-support stage, for example Bluegriffon).

## Todo
- \todo reorg the GitHub pages to only include the 'app'
- \todo zxw-editor needs a few minor tweaks to make it a proper [PWA](https://web.dev/explore/progressive-web-apps).
- \todo Integrate the Editor toolbar from my other zxw-mvc project.
- \todo keeping testing and debugging zxw-editor's handling of the 'program-that-prints-itself' challenge.





