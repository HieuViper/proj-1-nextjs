/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module upPic
 */
import { Plugin, type Editor } from 'ckeditor5/src/core';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import upPicCommand from './upPickCommand';
 //import image from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
// import { useLogin } from "../../store/login";


export default class UpPic extends Plugin {

    init() {
        console.log('upPic was initialized');
        // const { loginForm, setLoginForm } = useLogin();    //use to set global state allowing enable the login form.
        // console.log('loginForm', loginForm);
        const editor = this.editor;
        this.editor.commands.add( 'upPicCommand', new upPicCommand( editor ));
        editor.ui.componentFactory.add( 'upPic', () => {
            const button = new ButtonView();
            button.set( {
                label: 'showDialog',
                // icon: image,
                withText: true,
                tooltip: true
            } );

            button.on( 'execute', () => {
                editor.model.change( writer => {
                    // const imageElement = writer.createElement( 'image', {
                    //     src: '/uploads/nov2023/4kpic.jpg'
                    // });
                    // editor.model.insertObject( imageElement );
                    // editor.model.insertContent( writer.createText('Inserted Content here') );

                    //setLoginForm( true );
                    editor.execute('upPicCommand');
                    editor.fire('showDialog');
                });
            } );
            return button;
        } );
    };
}
