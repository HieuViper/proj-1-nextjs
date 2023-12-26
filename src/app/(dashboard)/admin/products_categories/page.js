import React from 'react'
import ProductCatList from './_components/ProductCatList'
import { callNon } from '@/library/api';
import { funcLogin } from '@/library/funcLogin';
import getConfig from 'next/config';

const ProductCatPage = async () => {
    const langTable = await callNon("/api/languages", "GET");
    const product_cat = await callNon("/api/products_categories", "GET");
    console.log('product_cat123 :', product_cat);
    const loginInfo = funcLogin.checkAuthentication();
    const isAuthorize = await funcLogin.checkAuthorize(loginInfo.user, 'products_categories');

    return (
        <div><ProductCatList
            langTable={JSON.stringify(langTable)}
            isAuthorize={isAuthorize}
            user={loginInfo.user}
            product_cat={product_cat.data}
            roles={getConfig().serverRuntimeConfig.userRoles}
        /></div>
    )
}

export default ProductCatPage