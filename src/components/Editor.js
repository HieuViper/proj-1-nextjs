import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ size: ['small', false, 'large', 'huge'] }]
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'color': [] }, { 'background': [] }],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],

        [{ 'align': [] }],
        ['link', 'code', "image", "video"],
    ],
    // imageUploader: {
    //     upload: (file) => {
    //         return new Promise((resolve, reject) => {
    //             const formData = new FormData();
    //             formData.append("image", file);

    //             fetch(
    //                 "https://web-api.zadez.vn/articles/upload/",
    //                 {
    //                     method: "POST",
    //                     body: formData
    //                 }
    //             )
    //                 .then((response) => response.json())
    //                 .then((result) => {
    //                     console.log(result);
    //                     resolve(result.data.url);
    //                 })
    //                 .catch((error) => {
    //                     reject("Upload failed");
    //                     console.error("Error:", error);
    //                 });
    //         });
    //     }
    // },

};

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'code',
    "font",
    "size",
    "image",
    "video",
    'color',
    'background',
    'align'
];

const Editor = ({ value, onChange, placeholder }) => {
    return (
        <>
            <ReactQuill
                theme="snow"
                value={value || ''}
                modules={modules}
                formats={formats}
                onChange={onChange}
                placeholder={placeholder}

            />
        </>
    );
};

export default Editor;