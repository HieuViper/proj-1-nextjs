// import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
// import { ClassicEditor }  from '@ckeditor/ckeditor5-editor-classic';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';

import { CKEditor } from "@ckeditor/ckeditor5-react";

import imageCompression from "browser-image-compression";
//import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import React from "react";
// import { UpPic } from "./plugins/UploadImg";



const fileSizeCompress = [150, 350, 700];

const Editor = ({ value, onChange }) => {
  const editorInstance = React.createRef();

  return (
    <CKEditor
      onReady={ async (editor) => {
        console.log('you are in Ready of Editor');
        // editor.config.extraPlugins = [UploadImg];
        // await editor.initPlugins(UploadImg);
        // editor.plugins.add('UploadImg', UploadImg);
        // let i=0;
        //  editor.ui.view.toolbar.items.map( (item) => {
        //   console.log('item ', i);
        //   i++;
        //    console.log('item:', item.element.innerHTML);

        //  });

          // const imageButton = editor.ui.view.toolbar.items.get(16);//16
          // console.log('ineer HTML of image button:', imageButton.element.innerHTML);

          // imageButton.on('click', () => {
          //   // setDisplayForm(true);
          //   console.log('you have click on image button');
          // });
        // console.log('toolbar element:',editor.ui.view.toolbar.element);
        // console.log('all items name:', Array.from( editor.ui.componentFactory.names() ));
        //console.log("built in plugins:", DecoupledEditor.defaultConfig);




        // console.log(editor.plugins.get('activePlugins'));


        // editor.ui
        //   .getEditableElement()
        //   .parentElement.insertBefore(
        //     editor.ui.view.toolbar.element,
        //     editor.ui.getEditableElement()
        //   );
        // editor.editing.view.change((writer) => {
        //   writer.setStyle(
        //     "height",
        //     "500px",
        //     editor.editing.view.document.getRoot()
        //   );
        //}
       // );
        // const uploadAdapter = (loader) => {
        //   return {
        //     upload: () => {
        //       return new Promise((resolve, reject) => {
        //         console.log("reject :", reject);
        //         console.log("resolve :", resolve);
        //         const body = new FormData();
        //         loader.file.then(async (file) => {
        //           console.log("file upload : ", file);
        //           let filename = file.name.split(".");
        //           // compress file
        //           // depend on 3 sizing 150,350,700 up to now
        //           for (let i = 0; i < fileSizeCompress.length; i++) {
        //             const formData = new FormData();
        //             const compressedFile = await imageCompression(file, {
        //               maxSizeMB: 1,
        //               maxWidthOrHeight: fileSizeCompress[i],
        //               useWebWorker: true,
        //             });
        //             var file1 = new File(
        //               [compressedFile],
        //               `${filename[0]}_${fileSizeCompress[i]}.${filename[1]}`,
        //               {
        //                 type: "image/png",
        //                 lastModified: new Date().getTime(),
        //               }
        //             );
        //             formData.append("file", file1);
        //             await fetch("/api/editor/image", {
        //               method: "POST",
        //               body: formData,
        //             });
        //           }

        //           //original file
        //           body.append("file", file);
        //           await fetch("/api/editor/image", {
        //             method: "POST",
        //             body,
        //           })
        //             .then(async (res) => {
        //               const image = await res.json();
        //               console.log(
        //                 "🚀 ~ file: Editor.js:66 ~ .then ~ image:",
        //                 image
        //               );
        //               const sizes = "(max-width: 600px) 100vw, 50vw";
        //               resolve({
        //                 default: `${image.url}`,
        //                 150: `${image.url150}`,
        //                 350: `${image.url350}`,
        //                 700: `${image.url700}`,
        //                 attributes: {
        //                   // sizes: sizes,
        //                   // alt: 'althello'
        //                 }
        //               });
        //             })
        //             .catch((err) => {
        //               reject(err);
        //             });
        //         });
        //       });
        //     },
        //   };
        // };
        // editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        //   return uploadAdapter(loader);
        // };
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
      // onInit={ ( editor ) => {
      //   console.log('on Init CKEditor');
      //   editorInstance.current = editor;
      //   editor.config.extraPlugins = [UploadImg];
      // }}

      // editor={DecoupledEditor}
      editor={ ClassicEditor }
      data={value}
      config={{
        plugins: [ Essentials, Paragraph, Bold, Italic ],
        toolbar: {
          items: [
            'bold', 'italic'
          ],
          shouldNotGroupWhenFull: true
        }
        // enterMode: 2,
        //  plugins: [

        //             UpPic
        // ],
      //    toolbar: {
      //     items: [
      //           'selectAll', 'undo', 'redo', 'heading', 'alignment',
      //           // 'alignment:left', 'alignment:right', 'alignment:center', 'alignment:justify',
      //           '|', 'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
      //           '|', 'bold', 'italic',
      //           '|', 'strikethrough', 'underline',
      //           '|', 'blockQuote', 'link',
      //           // 'ckfinder', 'uploadImage',
      //           '|', 'imageUpload', 'imageTextAlternative', 'toggleImageCaption', 'resizeImage',
      //           // 'resizeImage:original',
      //           // 'resizeImage:25', 'resizeImage:50',
      //           // 'resizeImage:75',
      //           // 'imageResize',
      //           // '|', 'imageStyle:inline', 'imageStyle:alignLeft', 'imageStyle:alignRight', 'imageStyle:alignCenter', 'imageStyle:side',
      //           // 'imageStyle:alignBlockLeft', 'imageStyle:alignBlockRight', 'imageStyle:block',
      //            'imageStyle:wrapText', 'imageStyle:breakText',
      //            '|', 'indent', 'outdent', 'numberedList', 'bulletedList',
      //            '|', 'mediaEmbed',
      //            '|', 'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells'
      //      ],
      //     shouldNotGroupWhenFull: true
      //  }
      }}
    />
  );
};

export default Editor;
