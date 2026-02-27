# zxw-editor

### Author: Zachary Justin Wartell, Ph.D.
- App: https://www.zacharywartell.net/zxw-editor
- Git: https://github.com/ZacharyWartell/zxw-editor
- License: [LICENSE.md](LICENSE.md)

zxw-editor is an experimental 'in-place' HTML editor.

- zxw-editor.html can be saved to a local file in Chrome.  The resulting saved local .html file
   can be openned directly in Chrome and further edited in Chrome.  The saved local .html embeds
   the zxw-editor code itself.  Therefore once saved, the saved .html is completely standalone.                    
    - zxw-editor is a [static webpage](https://en.wikipedia.org/wiki/Static_web_page).
    - zxw-editor does _not_ communicate to any server.    
- zxw-editor neither requires nor uses any 3rd party framework (React, Vue, Angular). 
- zxw-editor leverages [contentedible](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/contenteditable) and [showSaveFilePicker](https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker) to save edits to the webpage (i.e. the local DOM) to a local file.
- Caveats:
    - zxw-editor assumes the user is comfortable and familiar with using the Chrome Inspector to edit the DOM in addition to editing the contentedible ``` <div> ``` directly using the browser's inherent
  [contentedible](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/contenteditable) editing features.
    - zxw-editor only tested on the Chrome browser.

## Todo
- \todo reorg the GitHub pages to only include the 'app'
- \todo zxw-editor needs a few minor tweaks to make it a proper [PWA](https://web.dev/explore/progressive-web-apps).
- \todo Integrate the Editor toolbar from my other zxw-mvc project.




