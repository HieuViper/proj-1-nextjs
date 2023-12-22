import React from 'react'
import ProductCatList from './_components/ProductCatList'
import { callNon } from '@/library/api';
import { funcLogin } from '@/library/funcLogin';
import getConfig from 'next/config';

const ProductCatPage = async () => {
    const langTable = await callNon("/api/languages", "GET");
    const loginInfo = funcLogin.checkAuthentication();
    const isAuthorize = await funcLogin.checkAuthorize(loginInfo.user, 'products_categories');

    return (
        <div><ProductCatList
            langTable={JSON.stringify(langTable)}
            isAuthorize={isAuthorize}
            user={loginInfo.user}
            roles={getConfig().serverRuntimeConfig.userRoles}
        /></div>
    )
}

export default ProductCatPage