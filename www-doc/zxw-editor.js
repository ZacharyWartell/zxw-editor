/**
@author Zachary Justin Wartell, 2026.
@license Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
@git https://github.com/ZacharyWartell/zxw-editor
*/

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
function zxw_editor_main() {
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
//window.helpDialog = helpDialog;