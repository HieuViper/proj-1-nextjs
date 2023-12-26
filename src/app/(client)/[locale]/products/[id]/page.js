import SlideShow from '@/components/SlideShow'
import { Button, Input, Tag } from 'antd'
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import React from 'react'
import SlideCard from '@/components/SlideCard';
const Product = () => {
    // const { decreaseQty, increaseQty, qty, onAdd } = useStateContext();
    const decreaseQty = () => { }
    const increaseQty = () => { }
    const onAdd = () => { }
    const qty = 1
    const product = {
        list_image: [
            { url: "https://zadez.vn/wp-content/uploads/2023/08/GP-803B-Black_Square_1-1024x1024.webp" },
            { url: "https://zadez.vn/wp-content/uploads/2023/08/GP-803B-White_Square_1-1024x1024.webp" },
            { url: "https://zadez.vn/wp-content/uploads/2023/08/GP-803B-Black_Square_2-1024x1024.webp" },
            { url: "https://zadez.vn/wp-content/uploads/2023/08/GP-803B-White_Square_2-1024x1024.webp" },
            { url: "https://zadez.vn/wp-content/uploads/2023/08/3.webp" },
            { url: "https://zadez.vn/wp-content/uploads/2023/08/2.webp" },
            { url: "https://zadez.vn/wp-content/uploads/2023/08/4.webp" },
            { url: "https://zadez.vn/wp-content/uploads/2023/08/5.webp" },
            { url: "https://zadez.vn/wp-content/uploads/2023/08/6.webp" },
        ],
        id: 128,
        product_code: "803",
        main_image: "https://zadez.vn/wp-content/uploads/2023/08/GP-803B-Black_Square_1-1024x1024.webp",
        sub_image: "https://zadez.vn/wp-content/uploads/2023/08/GP-803B-White_Square_1-1024x1024.webp",
        categories: "1",
        price: 850000,
        discount_price: 850000,
        product_author: "",
        modified_by: null,
        product_position: 1,
        active: true,
        status: "in",
        color: "red",
        driver: "avx",
        createdAt: "2023-12-24T15:03:42.000Z",
        updatedAt: "2023-12-24T15:51:59.000Z",
        manufacturerId: null,
        product_languages: [
            {
                id: 117,
                name: "ENC - BLUETOOTH HEADSET",
                short: "Tai nghe không dây cao cấp với công nghệ ENC - Environmental Noise Cancellation hiện đại, trọng lượng siêu nhẹ 176 gram mang đến cảm giác đeo thoải mái trong thời gian dài. Kết nối Bluetooth 5.2 và chế độ EQ Bass cho chất lượng âm thanh tuyệt hảo. Hãy trải nghiệm ngay !",
                description: "<p style=\"margin-left:0px;\">- Silicone rubber on both sides.</p><p style=\"margin-left:0px;\">- Chipset Pixart PMW 3325.</p><p style=\"margin-left:0px;\">- Durability of buttons up to 20 million clicks.</p><p style=\"margin-left:0px;\">- 16.8 million colors RGB LEDs.</p><figure class=\"table\"><table><tbody><tr><td>With PixArt technology, you can go up to 10000 DPI for large screen and perform tilt tracking to avoid unnecessary tracking during angled drops, tilt slams, and rapid flicks. Both features will help you surpassing the competition.</td><td>Silicone on both sides enhances your gripping style for superior aim and flexing. All Battle Royale, FPS, MOBA, MMO, and other fast-paced games all advantage from this item.</td><td>Every component has been designed from the bottom up using hyper-durable materials engineered to endure for years, with high-grade polyme and 20 million click switches as our most premium mouse.</td><td>RGB LED displays 16.8 million vibrant, vivid colors that can be used in conjunction with other gaming accessories. To provide a competitive display that will boost your RGB to the next level, choose from millions of colors and effects from reactive lighting.</td></tr></tbody></table></figure><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;\"><strong>Technical Details</strong></p><figure class=\"table\"><table><tbody><tr><td>Connectivity</td><td>USB</td></tr><tr><td>Sensitivity</td><td>1000/1500/2000/3000/5000/10000 DPI</td></tr><tr><td>Cable length</td><td>1.8m</td></tr><tr><td>Chipset</td><td>Pixart PMW3325</td></tr><tr><td>Max Acceleration</td><td>20 G/sec</td></tr><tr><td>Max Speed</td><td>100 inch/sec</td></tr><tr><td>Response Frequency</td><td>125/500/1000 Hz (1 ms)</td></tr><tr><td>LEDs</td><td>RGB Lighting - 16.8 Million colors</td></tr><tr><td>Switch Type<br>&nbsp;</td><td>None</td></tr><tr><td>Switch&nbsp;Lifecycle</td><td>up to 20 Million clicks</td></tr><tr><td>Weight</td><td>4.409 oz</td></tr><tr><td>Dimensions</td><td>Length: 125 mm / 4.92 inch<br>Grip width: 73 mm/2.87 inch<br>Height: 43.5 mm/1.71 inch</td></tr><tr><td>Feature</td><td>- Ergonomic design, reducing user's wrist impact<br>- 7 function keys configurable via software<br>- Durable and anti-interference cable<br>- FPS: 12000, Report Rate: 125/500/1000 Hz<br>- Button durability &gt; 20 milion presses<br>- Scroll durability &gt; 200.000 roll</td></tr><tr><td>Included components</td><td>- Box (retail format)<br>- Mouse<br>- User documentation</td></tr><tr><td>Compatible Devices</td><td>Windows 7, 8, 10 or later<br>macOS 10.5 or later</td></tr><tr><td>Warranty</td><td>12 months, 1 switch 1</td></tr><tr><td>Activation Warranty</td><td>Activation of warranty online by Serial Number at website</td></tr></tbody></table></figure><p><strong>Gallery</strong></p><p><img src=\"https://web-api.zadez.vn/uploads/1685439013383_banner 1.png\"></p><p><img src=\"https://web-api.zadez.vn/uploads/1685439013535_banner 2.png\"></p><figure class=\"image\"><img src=\"https://web-api.zadez.vn/uploads/1685439013440_banner 3.png\"></figure><figure class=\"image\"><img src=\"https://web-api.zadez.vn/uploads/1685439013539_banner 4.png\"></figure>",
                productId: 128,
                languageCode: "vi",
            },
        ]
    }
    const product_langs = product.product_languages[0]
    const similarProduct = [{
        product_code: "999",
        main_image: "https://zadez.us/cdn/shop/products/G-151M_500x.png?v=1638523572",
        price: "999999",
        product_languages: [
            {
                id: 1,
                name: "Macbook Bro`",
                short: "Tai nghe không dây cao cấp với công nghệ ENC - Environmental Noise Cancellation hiện đại, trọng lượng siêu nhẹ 176 gram mang đến cảm giác đeo thoải mái trong thời gian dài. Kết nối Bluetooth 5.2 và chế độ EQ Bass cho chất lượng âm thanh tuyệt hảo. Hãy trải nghiệm ngay !",
                description: "description",
                productId: 128,
                languageCode: "vi",
            },
        ]
    },
    {
        product_code: "999",
        main_image: "https://zadez.us/cdn/shop/products/G-151M_500x.png?v=1638523572",
        price: "999999",
        product_languages: [
            {
                id: 1,
                name: "Macbook Bro`",
                short: "Tai nghe không dây cao cấp với công nghệ ENC - Environmental Noise Cancellation hiện đại, trọng lượng siêu nhẹ 176 gram mang đến cảm giác đeo thoải mái trong thời gian dài. Kết nối Bluetooth 5.2 và chế độ EQ Bass cho chất lượng âm thanh tuyệt hảo. Hãy trải nghiệm ngay !",
                description: "description",
                productId: 128,
                languageCode: "vi",
            },
        ]
    }, {
        product_code: "999",
        main_image: "https://zadez.us/cdn/shop/products/G-151M_500x.png?v=1638523572",
        price: "999999",
        product_languages: [
            {
                id: 1,
                name: "Macbook Bro`",
                short: "Tai nghe không dây cao cấp với công nghệ ENC - Environmental Noise Cancellation hiện đại, trọng lượng siêu nhẹ 176 gram mang đến cảm giác đeo thoải mái trong thời gian dài. Kết nối Bluetooth 5.2 và chế độ EQ Bass cho chất lượng âm thanh tuyệt hảo. Hãy trải nghiệm ngay !",
                description: "description",
                productId: 128,
                languageCode: "vi",
            },
        ]
    },
    {
        product_code: "999",
        main_image: "https://zadez.us/cdn/shop/products/G-151M_500x.png?v=1638523572",
        price: "999999",
        product_languages: [
            {
                id: 1,
                name: "Macbook Bro`",
                short: "Tai nghe không dây cao cấp với công nghệ ENC - Environmental Noise Cancellation hiện đại, trọng lượng siêu nhẹ 176 gram mang đến cảm giác đeo thoải mái trong thời gian dài. Kết nối Bluetooth 5.2 và chế độ EQ Bass cho chất lượng âm thanh tuyệt hảo. Hãy trải nghiệm ngay !",
                description: "description",
                productId: 128,
                languageCode: "vi",
            },
        ]
    },
    {
        product_code: "999",
        main_image: "https://zadez.us/cdn/shop/products/G-151M_500x.png?v=1638523572",
        price: "999999",
        product_languages: [
            {
                id: 1,
                name: "Macbook Bro`",
                short: "Tai nghe không dây cao cấp với công nghệ ENC - Environmental Noise Cancellation hiện đại, trọng lượng siêu nhẹ 176 gram mang đến cảm giác đeo thoải mái trong thời gian dài. Kết nối Bluetooth 5.2 và chế độ EQ Bass cho chất lượng âm thanh tuyệt hảo. Hãy trải nghiệm ngay !",
                description: "description",
                productId: 128,
                languageCode: "vi",
            },
        ]
    }]
    return (
        <div className='px-4 md:px-20 py-20'>
            <div className='grid grid-cols-5 gap-10'>
                <div className='col-span-5 md:col-span-3'>
                    <SlideShow listImage={product.list_image} />
                </div>
                <div className='col-span-5 md:col-span-2'>
                    <h1 className='text-3xl font-bold pb-2 text-center md:text-start'>
                        {product_langs.name}
                    </h1>
                    <div className='pb-4'>
                        {product_langs.short}
                    </div>
                    <div className='pb-2'>
                        {product.status == "in" ? <Tag color='green'>Còn hàng</Tag>
                            : <Tag color='red'>Hết hàng</Tag>}
                    </div>
                    <div className='text-2xl font-medium pb-2'> GIÁ: {product.price} VND</div>
                    <div className='flex py-2 gap-3'>
                        <div>Chọn màu:</div>
                        {/* <div><span className=''><ColorPicker open={false} /></span></div> */}
                        <div className='w-8 h-8 p-[1px] flex justify-center items-center rounded-full cursor-pointer border hover:border-blue-500 duration-200'>
                            <div className=' w-6 h-6 bg-blue-500 rounded-full'></div>
                        </div>
                        <div className='w-8 h-8 p-[1px] flex justify-center items-center rounded-full cursor-pointer border hover:border-red-500 duration-200'>
                            <div className=' w-6 h-6 bg-red-500 rounded-full'></div>
                        </div>
                        <div className='w-8 h-8 p-[1px] flex justify-center items-center rounded-full cursor-pointer border hover:border-green-500 duration-200'>
                            <div className=' w-6 h-6 bg-green-500 rounded-full'></div>
                        </div>
                    </div>
                    {/* <div className='flex pb-2'>
                        <div className=''>
                            <Input 
                                maxLength={3}
                            style={{ width: '40%' }}
                                addonBefore={<MinusOutlined />}
                                addonAfter={<PlusOutlined />}
                                defaultValue={qty} />
                            </div>

                    </div> */}
                    <div className='pb-2'> <Button type='primary' block>Mua ngay</Button></div>
                    <div className='pb-2'> <Button block  >Thêm vào giỏ hàng</Button ></div>
                </div>
            </div>
            <div>
                {product_langs.short}
            </div>
            <div className='flex justify-center items-center'>

                <div
                    dangerouslySetInnerHTML={{ __html: product_langs.description }}
                />
            </div>
            {/* SIMILAR PRODUCT */}
            <div className='pt-10 px-2 md:10'>
                <h2 className='text-lg font-normal'>Sản phẩm tượng tự</h2>
                <SlideCard products={similarProduct} />
            </div>
        </div>
    )
}

export default Product