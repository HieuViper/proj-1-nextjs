// abbreviation/abbreviationcommand.js

import { Command } from '@ckeditor/ckeditor5-core';

export default class upPicCommand extends Command {
    override execute( ) {
        const model = this.editor.model;
        // console.log('command of upPic is called');
        // const imageUtils = this.editor.plugins.get( 'ImageUtils' );
        // imageUtils.insertImage( { src: '/uploads/nov2023/4kpic.jpg',
        //     srcset: '/uploads/nov2023/ava3_150.jpeg 150w, /uploads/nov2023/ava3_350.jpeg 350w, /uploads/nov2023/ava3_700.jpeg 700w',
        // } );

    }
}
