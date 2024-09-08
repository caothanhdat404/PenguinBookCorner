import React from "react";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Row, Col, Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons';
import CardComponent from '../../components/CardComponent/CardComponent'
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent"
import { WrapperProductPage, WrapperBreadcrumd, WrapperCategory, WrapperCardProduct, WrapperFooter, WrapperNavbar, WrapperSubNavbar } from './style'

import { ReactComponent as Literature } from '../../assets/svg/literature.svg'
import { ReactComponent as Science } from '../../assets/svg/science.svg'
import { ReactComponent as Children } from '../../assets/svg/children.svg'
import { ReactComponent as Econnomy } from '../../assets/svg/economy.svg'
import { ReactComponent as Skill } from '../../assets/svg/skill.svg'
import { ReactComponent as Comic } from '../../assets/svg/comic.svg'
import { ReactComponent as Textbook } from '../../assets/svg/textbook.svg'
import { ReactComponent as Stationery } from '../../assets/svg/stationery.svg'

import FooterComponent from "../../components/FooterComponent/FooterComponent";

import { useQuery } from "@tanstack/react-query";

import * as ProductService from '../../services/ProductService'

const NavbarItems = [
    {
        key: '1',
        label: 'VĂN HỌC',
        icon: <Literature />,
        path: 'product/van-hoc'
    },
    {
        key: '2',
        label: 'KHOA HỌC',
        icon: <Science />,
        path: 'product/khoa-hoc'
    },
    {
        key: '3',
        label: 'THIẾU NHI',
        icon: <Children />,
        path: 'product/thieu-nhi'
    },
    {
        key: '4',
        label: 'KINH TẾ',
        icon: <Econnomy />,
        path: 'product/kinh-te'
    },
    {
        key: '5',
        label: 'KỸ NĂNG',
        icon: <Skill />,
        path: 'product/ky-nang'
    },
    {
        key: '6',
        label: 'TRUYỆN TRANH',
        icon: <Comic />,
        path: 'product/truyen-tranh'
    },
    {
        key: '7',
        label: 'SGK/STK',
        icon: <Textbook />,
        path: 'product/sach-giao-khoa'
    },
    {
        key: '8',
        label: 'VĂN PHÒNG PHẨM',
        icon: <Stationery />,
        path: 'product/van-phong-pham'
    },
    {
        key: '9',
        label: 'KHÁC',
    },
];

const NavbarSubItems = [
    {
        key: '1',
        label: 'Ưu đãi thẻ, ví',
    },
    {
        key: '2',
        label: 'Mua trước trả sau',
    },
];

const SpanFooter = [5, 5, 7, 7]

function itemRender(currentRoute, items, paths) {
    const isLast = currentRoute?.path === items[items.length - 1]?.path;

    return isLast ? (
        <span>{currentRoute.title}</span>
    ) : (
        <Link to={`/${paths.join("/")}`}>{currentRoute.title}</Link>
    );
}

const ProductPage = () => {
    const { category } = useParams();

    const categoryNames = {
        'van-hoc': 'Văn học',
        'khoa-hoc': 'Khoa học',
        'thieu-nhi': 'Thiếu nhi',
        'kinh-te': 'Kinh tế',
        'ky-nang': ' Kỹ năng',
        'truyen-tranh': 'Truyện tranh',
        'sach-giao-khoa': 'Sách giáo khoa & Sách tham khảo',
        'van-phong-pham': 'Văn phòng phẩm'
    };

    const categoryDisplay = categoryNames[category];

    const fetchProduct = async () => {
        const res = await ProductService.getProductType(categoryDisplay)
        return res
    }
    const { isLoading, data: products } = useQuery({ queryKey: ['product'], queryFn: fetchProduct })

    return (
        <WrapperProductPage>
            <WrapperBreadcrumd>
                <Breadcrumb
                    separator=">"
                    itemRender={itemRender}
                    items={[
                        {
                            path: '/',
                            title: <HomeOutlined />,
                        },
                        {
                            title: categoryDisplay,
                        },
                    ]}
                />
            </WrapperBreadcrumd>
            <Row>
                <Col span={4}>
                    <div style={{ position: 'sticky', left: 0, top: '116px' }}>
                        <WrapperNavbar>
                            <div>Danh mục</div>
                            <NavbarComponent items={NavbarItems} isNavigate />
                        </WrapperNavbar>
                        <WrapperSubNavbar>
                            <div>Tiện ích</div>
                            <NavbarComponent items={NavbarSubItems} isNavigate />
                        </WrapperSubNavbar>
                    </div>
                </Col>
                <Col span={20}>
                    <WrapperCategory>
                        <h1 style={{textTransform: 'capitalize'}}>{categoryDisplay}</h1>
                    </WrapperCategory>
                    <WrapperCardProduct>
                        {products?.data?.map((product) => {
                            return (
                                <CardComponent
                                    key={product._id}
                                    countInStock={product.countInStock}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    discount={product.discount}
                                    sold={product.sold}
                                    id={product._id}
                                />
                            )
                        })}
                    </WrapperCardProduct>
                    <WrapperFooter>
                        <FooterComponent span={SpanFooter} />
                    </WrapperFooter>
                </Col>
            </Row>
        </WrapperProductPage>
    );
}

export default ProductPage