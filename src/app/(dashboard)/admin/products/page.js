import React from 'react'
import ProductList from './_components/ProductList'
import { callNon } from '@/library/api';
import { funcLogin } from '@/library/funcLogin';
import getConfig from 'next/config';

const ProductPage = async () => {
    const langTable = await callNon("/api/languages", "GET");
    // const dataTable = await callNon("/api/products", "GET");
    const loginInfo = funcLogin.checkAuthentication();
    const isAuthorize = await funcLogin.checkAuthorize(loginInfo.user, 'products');
    const products = await callNon("/api/products", "GET");

    return (
        <div>
            <ProductList
                langTable={JSON.stringify(langTable)}
                dataTable={products.data}
                isAuthorize={isAuthorize}
                user={loginInfo.user}
                roles={getConfig().serverRuntimeConfig.userRoles}
            />
        </div>
    )
}

export default ProductPage