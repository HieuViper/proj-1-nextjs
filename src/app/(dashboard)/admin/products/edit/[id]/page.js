import React from 'react'
import ProductForm from '../../_components/ProductForm'
import { funcLogin } from '@/library/funcLogin';
import { callNon } from '@/library/api';

const EditProduct = async ({ params }) => {
    const product = await callNon(`/api/products/${params.id}`, "GET");
    // const product_categories = await callNon("/api/products_categories/", "GET");
    const loginInfo = funcLogin.checkAuthentication();
    const isAuthorize = await funcLogin.checkAuthorize(loginInfo.user, 'products');
    const langTable = await callNon("/api/languages", "GET");

    return (
        <div>
            <ProductForm
                product={product}
                // product_categories={product_categories}
                langTable={JSON.stringify(langTable)}
                isAuthorize={isAuthorize}
            /></div>
    )
}

export default EditProduct