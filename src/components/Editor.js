
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

const Editor = ({ value, onChange }) => {
    return (
        <CKEditor
            onReady={(editor) => {
                editor.ui
                    .getEditableElement()
                    .parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());
                editor.editing.view.change((writer) => {
                    writer.setStyle('height', '500px', editor.editing.view.document.getRoot());
                });
                const uploadAdapter = (loader) => {
                    return {
                        upload: () => {
                            return new Promise((resolve, reject) => {
                                console.log('reject :', reject);
                                console.log('resolve :', resolve);
                                const body = new FormData();
                                loader.file.then(async (file) => {
                                    body.append('file', file);
                                    await fetch("/api/image", {
                                        method: "POST",
                                        body,
                                    })
                                        .then(async (res) => {
                                            const image = await res.json();
                                            resolve({ default: `${image.url}` })
                                        })
                                        .catch((err) => {
                                            reject(err);
                                        });
                                });
                            });
                        },
                    };
                };
                editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                    return uploadAdapter(loader);
                };
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                onChange(data)
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