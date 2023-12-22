import React from 'react'
import ProductForm from '../_components/ProductForm'
import { callNon } from '@/library/api';
import { funcLogin } from '@/library/funcLogin';

const AddProduct = async () => {
    const langTable = await callNon("/api/languages", "GET");
    const loginInfo = funcLogin.checkAuthentication();
    const isAuthorize = await funcLogin.checkAuthorize(loginInfo.user, 'products');

    return (
        <div><ProductForm
            langTable={JSON.stringify(langTable)}
            isAuthorize={isAuthorize}
        /></div>
    )
}

export default AddProduct