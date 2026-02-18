# zxw-editor

### Author: Zachary Justin Wartell, Ph.D.
- Git: https://github.com/ZacharyWartell/zxw-editor
- License: [LICENSE.md](LICENSE.md)

Experimental 'in-place', HTML editor.

- zxw-editor.html can be opened as a local file in Chrome.  The resulting HTML page can be edited in Chrome and then saved to the same or another local .html file.
    - zxw-editor is a [static webpage](https://en.wikipedia.org/wiki/Static_web_page).
    - zxw-editor does _not_ communicate to any server.    
- Leverages [contentedible](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/contenteditable) and [showSaveFilePicker](https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker) to save edits to webpages (the local DOM) to a local file
- Caveats:
    - Assumes user is comfortable and familiar with using the Chrome Inspector to edit the DOM in addition to editing the contentedible ``` <div> ``` directly using the browsers inherent
  [contentedible](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/contenteditable) editing features.
    - Tested with Chrome browser

## Todo
- \todo need a few minor tweaks to make it a proper [PWA](https://web.dev/explore/progressive-web-apps)


