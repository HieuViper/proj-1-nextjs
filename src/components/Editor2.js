import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
// import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";


const editorConfiguration = {
    toolbar: [

    ],
    enterMode: 2,
};

function Editor2( { value, onChange, printImg, insPic  } ) {

    //when editor is ready
    async function onEditorReady( editor ) {
      //Display UI
      editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
      //Set Hight for editor UI
      editor.editing.view.change((writer) => {
        writer.setStyle(
          "height",
          "700px",
          editor.editing.view.document.getRoot()
        );
      });

      editor.on( 'showDialog', ( event ) => {
        console.log(' event: ', event.name);
        console.log('selection position:',editor.model.document.selection.getFirstPosition());

        printImg( editor );
      });
      editor.on( 'insPic', ( event ) => {
        insPic( editor );
      });
    }

    return (
        <CKEditor
        onReady={onEditorReady}
        editor={ Editor }
        config={{
            enterMode: 2,
            shouldNotGroupWhenFull: true
            }}
        data={ value }
        onChange={ (event, editor ) => {
            const data = editor.getData();
            onChange( data );
            // props.onChange( data );
            // console.log('event on change:', event.name);
            // console.log( { event, editor, data } );
        } }

        />
    )
}

export default Editor2;