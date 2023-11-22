import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import imageCompression from "browser-image-compression";

const fileSizeCompress = [150, 350, 700];

const Editor = ({ value, onChange }) => {
  return (
    <CKEditor
      onReady={(editor) => {
        editor.ui
          .getEditableElement()
          .parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
          );
        editor.editing.view.change((writer) => {
          writer.setStyle(
            "height",
            "500px",
            editor.editing.view.document.getRoot()
          );
        });
        const uploadAdapter = (loader) => {
          return {
            upload: () => {
              return new Promise((resolve, reject) => {
                console.log("reject :", reject);
                console.log("resolve :", resolve);
                const body = new FormData();
                loader.file.then(async (file) => {
                  console.log("file upload : ", file);
                  let filename = file.name.split(".");
                  // compress file
                  // depend on 3 sizing 150,350,700 up to now
                  for (let i = 0; i < fileSizeCompress.length; i++) {
                    const formData = new FormData();
                    const compressedFile = await imageCompression(file, {
                      maxSizeMB: 1,
                      maxWidthOrHeight: fileSizeCompress[i],
                      useWebWorker: true,
                    });
                    var file1 = new File(
                      [compressedFile],
                      `${filename[0]}_${fileSizeCompress[i]}.${filename[1]}`,
                      {
                        type: "image/png",
                        lastModified: new Date().getTime(),
                      }
                    );
                    formData.append("file", file1);
                    await fetch("/api/editor/image", {
                      method: "POST",
                      body: formData,
                    });
                  }

                  //original file
                  body.append("file", file);
                  await fetch("/api/image", {
                    method: "POST",
                    body,
                  })
                    .then(async (res) => {
                      const image = await res.json();
                      console.log(
                        "🚀 ~ file: Editor.js:66 ~ .then ~ image:",
                        image
                      );
                      const sizes = "(max-width: 600px) 100vw, 50vw";
                      resolve({
                        default: `${image.url}`,
                        150: `${image.url150}`,
                        350: `${image.url350}`,
                        700: `${image.url700}`,
                        attributes: {
                          sizes: sizes,
                        },
                      });
                    })
                    .catch((err) => {
                      reject(err);
                    });
                });
              });
            },
          };
        };
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
          return uploadAdapter(loader);
        };
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
      editor={DecoupledEditor}
      data={value}
      config={{
        enterMode: 2,
      }}
    />
  );
};

export default Editor;
