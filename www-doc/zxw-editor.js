/**
@author Zachary Justin Wartell, 2026.
@license Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
@git https://github.com/ZacharyWartell/zxw-editor
*/


const ZXW_EDITOR_HTML=
`
    <!-- zxw-editor BEGIN #4 -->
    <!--
         All code delimited by 
             <!- - zxw-editor BEGIN -- !>
         and
             <!- - zxw-editor END -- !>
         
         are @license Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.         
            - @git https://github.com/ZacharyWartell/zxw-editor
            - @author Zachary Justin Wartell, 2026.
     -->
    <!-- zxw-editor BEGIN <header> -->
    <header class="zxw-editor" style="border: 1px black solid; padding: 2px; resize: block; overflow: hidden; max-height: fit-content;">
        <div style="border: 1px black solid; padding: 2px; text-align: center;">
            <b><a target="_blank" href="https://github.com/ZacharyWartell/zxw-editor">zxw-editor</a></b> <sup><a target="_blank" href="https://github.com/ZacharyWartell/zxw-editor/commits/main/"><!--APPVERSION-->0.1.30</a><span>(α)</span></sup>
            | Author:
            Zachary Wartell, License:
            <a rel="license" target="_blank" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative
                Commons
                Attribution-NonCommercial-ShareAlike 4.0 International License</a>
        </div>
        <menu style="margin-bottom: 0px;">
            <button disabled="" id="OpenButton">Open</button>
            <button id="SaveButton">Save</button>
            <button id="RedactSaveButton">Redact &amp; Save</button>
            <div style="border: 1px solid black; display: inline-block;">
                <label for="EditMode">Edit Mode</label>
                <input type="checkbox" id="EditMode" value="EditMode" />
            </div>
            <button id="HelpButton" onclick="window.helpDialog.showModal();">Help</button>
        </menu>
    </header>
    <!-- zxw-editor EHD <header> -->
    <!-- zxw-editor END #4 -->

<!-- zxw-editor BEGIN #5 -->
    <!--
         All code delimited by 
             <!- - zxw-editor BEGIN -- !>
         and
             <!- - zxw-editor END -- !>
         
         are @license Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.         
            - @git https://github.com/ZacharyWartell/zxw-editor
            - @author Zachary Justin Wartell, 2026.
     -->
    <!-- zxw-editor BEGIN <dialog> -->
    <div class="zxw-editor">
        <dialog id="HelpDialog">
            <h1 style="text-align: center;">User Guide</h1>

            <section>
                <h2>Overview</h2>
                <div style="text-align: center;">
                    α-<span><!--APPVERSION-->0.1.30</span>
                </div>
                <p>
                    zxw-editor is an experimental 'in-place' HTML editor.
                </p>
                <ul>
                    <li>zxw-editor.html can be saved to a local file in Chrome. The resulting saved local .html file
                        can be openned directly in Chrome and further edited in Chrome. The saved local .html embeds
                        the zxw-editor code itself. Therefore once saved, the saved .html is completely standalone and
                        editable.
                        <ul>
                            <li>zxw-editor is a single page, <a href="https://en.wikipedia.org/wiki/Static_web_page" target="_blank">static webpage</a>.</li>
                            <li>zxw-editor does <em>not</em> communicate to any server.</li>
                            <li>zxw-editor (at least under Chrome) can be installed as a <a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps" target="_blank">Progressive Web App</a>,
                                see <a target="_blank" href="https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DDesktop">support.google.com</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        zxw-editor neither requires nor uses any 3rd party framework (React, Vue, Angular).
                    </li>
                    <li>
                        zxw-editor leverages <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/contenteditable" target="_blank">contentedible</a>
                        and
                        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker" target="_blank">showSaveFilePicker</a>
                        to save edits to the webpage (i.e. the local DOM) to a local file.
                    </li>
                </ul>
                Caveats:
                <ul>
                    <li> zxw-editor assumes the user is comfortable and familiar with using the
                        <a href="https://developer.chrome.com/docs/devtools/dom" target="_blank">Chrome Inspector </a>

                        to edit the DOM in addition to editing the contentedible &lt;div&gt; directly using the
                        browser's inherent
                        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/contenteditable" target="_blank">contentedible</a>
                        editing features.
                    </li>
                    <li>zxw-editor is only tested on the Chrome browser.</li>
                    <li>zxw-editor is alpha(α) software. A common Computer Science 101 programming assignment at universities
                        like MIT is to write a program that prints out an exact replica of itself. This is tricky.
                        The more complicated the programming language being used, the trickier it is.
                        Undoubtedly, the zxw-editor 'save-itself-to-a-file' algorithm still does not handle all
                        situations.
                    </li>
                </ul>
            </section>
            <section>
                <h2>GUI</h2>
                <hr />
                <ul id="GUI" data-non-saved-content="">
                </ul>
                <hr />
            </section>
            <button commandfor="HelpDialog" command="close">Close</button>
        </dialog>
    </div>
    <!-- zxw-editor END <dialog> -->
    <!-- zxw-editor END #5 -->  
`;
/**
Note On: "A Document that prints itself"
Note, the user of capitalization of SCRIPT and STYLE in the JavaScript comments and `` scripts is necessary to prevent 
the saveDOM function from split the DOM serialized string within JavaScript comments and `` strings.
*/
let fileHandle = null;
let DOCS = "";

DOCS +=
    `@##GUI
<span>Save</span>| Save the DOM to an .html file. 
If the DOM has not been saved during in this browser session, 
open <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker" target="_blank">showSaveFilePicker</a> dialog to select save file.
    <p>
        For SCRIPT elements the innerText content, the save operation
        avoids letting XMLSerializer convert operator characters to HTML entities (i.e. do not change > to \u0026 gt;").
        This is necessary since SCRIPT content is typically JavaScript text.
    </p>        
`;
/**
 @brief saveDOM saves the current DOM to .html file whose file handle is 'handle' using XMLSerializer.
    For <SCRIPT> and <SCRIPT> elements the content, avoid letting XMLSerializer convert operator characters 
    to HTML entities (i.e. do not change > to "&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;gt;")

    Note the used of unicode escape sequences in some of the strings below are necessary to avoid
    replacing characters in situations they should not be replaced.
    */
async function saveDOM(handle) {
    // Create a FileSystemWritableFileStream to write to.
    const writable = await handle.createWritable();

    /** create DocumentFragments that will temporarily hold and hide all data-non-saved-content HTMLElements 
     *  this is seemingly a necessary complication of making a single-page, static .html file that can save itself.
     */
    const rs = document.querySelectorAll("*[data-non-saved-content]");
    const rfs = []; // redactedFragments

    for (let r of rs) {
        const f = document.createDocumentFragment();
        let n = r.children[0];
        for (let n = r.children[0]; n !== null;) {
            const next = n.nextSibling;
            f.appendChild(n);
            n = next;
        }
        rfs.push(f);
    }

    // Write the contents of the file to the stream.
    let wholeDoc = new XMLSerializer().serializeToString(document);

    // handle script fixups
    //let splits = wholeDoc.split(/\u003C\u002Fscript\u003E|\u003Cscript\u003E/);
    //let splitsStartScript = wholeDoc.split(/\u003Cscript[^\u003E]*\u003E/);  // start script tag
    let splitsStartScript = wholeDoc.split(/\u003Cscript\u003E/);  // start script tag            
    wholeDoc = "";
    wholeDoc += splitsStartScript[0];
    for (let i = 1; i < splitsStartScript.length; i++) {
        const splitsEndScript = splitsStartScript[i].split(/[^>]\u003C\/script\u003E/); // end script tag
        if (splitsEndScript.length == 1) {
            wholeDoc += splitsEndScript[0];
        }
        else if (splitsEndScript.length == 2) {
            const fixup = splitsEndScript[0].replaceAll("\u0026gt;", ">").replaceAll("\u0026lt;", "<").replaceAll("\u0026amp;", "&");
            wholeDoc += "\u003Cscript\u003E" + fixup + "\u003C\u002Fscript\u003E";
            wholeDoc += splitsEndScript[1];
        }
    }
    // wholeDoc = "";
    // for (let i = 0; i < splits.length; i++) {
    //     if (i % 2 == 0) {// odd members are not <SCRIPT> elements
    //         wholeDoc += splits[i];
    //     }
    //     else {// even members are <SCRIPT> elements, so undo XMLSerializer conversion of certain characters into htmt entities (i.e. > to &amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;gt; )
    //         /**
    //          *  \todo this list is incomplete, need to find listing inte HTML spec's page and convert it into code...
    //          */
    //         const fixup = splits[i].replaceAll("\u0026gt;", ">").replaceAll("\u0026lt;", "<");
    //         wholeDoc += "\u003Cscript\u003E" + fixup + "\u003C\u002Fscript\u003E";
    //     }
    // }

    // handle style fixups
    splits = wholeDoc.split(/\u003C\u002Fstyle\u003E|\u003Cstyle\u003E/);
    wholeDoc = "";
    for (let i = 0; i < splits.length; i++) {
        if (i % 2 == 0) {// odd members are not <STYLE> elements
            wholeDoc += splits[i];
        }
        else {// even members are <STYLE> elements, so undo XMLSerializer conversion of certain characters into htmt entities (i.e. > to &amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;gt; )
            /**
             *  \todo this list is incomplete, need to find listing inte HTML spec's page and convert it into code...
             */
            const fixup = splits[i].replaceAll("\u0026gt;", "\u003E").replaceAll("\u0026lt;", "\u003C");
            wholeDoc += "\u003Cstyle\u003E" + fixup + "\u003C\u002Fstyle\u003E";
        }
    }

    /**
     * these are needed/useful when zxw-edtior.html is server over http, but must be removed
     * when saving to a local .html file that will later be openned from the local file system
     * (CORS policy will not allow <link> to be loaded when a browser is opening a local file)
     */
    const removals = [
        ``,
        ``,
        ``];
    for (let r of removals) {
        const tmp = wholeDoc.replace(r, "");
        wholeDoc = tmp;
    }

    await writable.write(wholeDoc);
    await writable.close();

    /** put back all data-non-saved-content HTMLElements child nodes */
    let i = 0;
    for (let r of rs) {
        for (let c of rfs[i].childNodes)
            r.appendChild(c);
        i++;
    }
    console.log("saveDOM complete");
}

    async function saveCallback() {
    if (fileHandle !== null)
        await saveDOM(fileHandle);
    else {
        const splits = document.documentURI.split("/");
        //const dir = FileSystemDirectoryHandle.getDirectoryHandle(decodeURIComponent(document.documentURI).replace(/\/.*\.html/,""));
        const options =
        {
            //startIn: dir, //decodeURIComponent(document.documentURI),
            suggestedName: decodeURIComponent(splits[splits.length - 1])
        };
        await window.showSaveFilePicker(options).then(
            async (handle_) => {
                fileHandle = handle_;
                console.log(handle_);
                await saveDOM(fileHandle);
            });
    }
}
/**
 * @brief redactSaveCallback
 */
DOCS +=
    `@##GUI
<span>Redact \u0026 Save</span> | Save DOM to the target .html file, but do not save any HTML element with class attribute called 'Redacted'.        
If the DOM has not been saved during in this browser session, 
open <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker" target="_blank">showSaveFilePicker</a> dialog to select save file.
`;
async function redactSaveCallback() {
    const rs = document.querySelectorAll("*.Redacted");
    const rfs = []; // redactedFragments

    /** create DocumentFragments that will temporarily hold and hide all .Redacted HTMLElements */
    for (let r of rs) {
        const f = document.createDocumentFragment();
        let n = r.children[0];
        for (let n = r.children[0]; n !== null;) {
            //c.remove();
            const next = n.nextSibling;
            f.appendChild(n);
            n = next;
        }

        rfs.push(f);
    }
    console.log("redacted");
    await saveCallback();
    /** put back all .Redacted HTMLElements child nodes */
    let i = 0;
    for (let r of rs) {
        for (let c of rfs[i].childNodes)
            r.appendChild(c);
        i++;
    }
    console.log("unredacted");
    return;
}

function buildHelpDialog() {
    const docSplit = DOCS.split("@#");
    for (let s of docSplit) {
        let pair = s.split(/^(#[^\s]*)/);
        if (pair.length == 3) {
            let list = document.getElementById(pair[1].slice(1));
            const li = document.createElement("li");
            li.innerHTML = pair[2];
            list.appendChild(li);

        }
    }
}
DOCS +=
    `@##GUI
    <span>Edit Mode</span> | Toggle <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/contenteditable" target="_blank">contentedible</a>
    on and off of all HTML elements with the contentedible attribute.

    Chrome will only follow hyperlinks using the standard gestures, if Edit Mode is disabled.
`;

//const DEV_MODE=true;      
const DEV_MODE = false;
async function zxw_editor_main() {
    // Fetch the external HTML file
    if (false)
        await fetch('./git-modules/zxw-editor.git/www-doc/zxw-editor-header.html')
            .then(response => response.text())
            .then(data => {
            // Inject the HTML code into the container
            const frag=document.createDocumentFragment();
            frag.innerHTML=data;
            document.appendChild(frag);
            })
            .catch(error => console.error('Error loading HTML:', error));    
    else
    {
        //const frag=document.createDocumentFragment();
        const frag=document.createElement('div');
        frag.innerHTML=ZXW_EDITOR_HTML;
        frag.setAttribute("id","ZXW_EDITOR_HTML");
        const old = document.getElementById("ZXW_EDITOR_HTML");
        if (old !== null)
            old.remove();
        document.body.insertAdjacentElement('afterbegin',frag);
        const force=document.body.lastElementChild;
        console.log("test");
    }

    let helpDialog = document.getElementById("HelpDialog");
    //document.getElementById("OpenButton").addEventListener('click', openCallback);
    document.getElementById("SaveButton").addEventListener('click', saveCallback);
    document.getElementById("RedactSaveButton").addEventListener('click', redactSaveCallback);
    try {
        buildHelpDialog();
    }
    catch (e) {
        console.log("zxw-editor: Unable to build complete User Guide document");
    }

    window.helpDialog = helpDialog;

    document.getElementById("EditMode").addEventListener('input',
        (e) => {
            if (!DEV_MODE) {
                const ph = document.getElementById("PlaceHolder");
                if (ph !== null) ph.addEventListener('click',
                    (e) => {
                        const p = e.currentTarget.parentElement;
                        e.currentTarget.remove()
                        p.innerText = "... your content goes here ...";
                    });
            }

            const ces = document.querySelectorAll("*[contenteditable]");
            for (let ce of ces) {
                ce.setAttribute("contenteditable", e.currentTarget.checked ? "true" : "false");
            }
        }
    )


}
window.zxw_editor_main = zxw_editor_main;
//zxw_editor_main();
//window.helpDialog = helpDialog;
