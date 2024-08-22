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

function itemRender(currentRoute, params, items, paths) {
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
        'van-hoc': 'Văn Học',
        'khoa-hoc': 'Khoa Học',
        'thieu-nhi': 'Thiếu Nhi',
        'kinh-te': 'Kinh Tế',
        'ky-nang': ' Kỹ Năng',
        'truyen-tranh': 'Truyện Tranh',
        'sach-giao-khoa': 'Sách Giáo Khoa & Sách Tham Khảo',
        'van-phong-pham': 'Văn Phòng Phẩm'
    };

    const categoryDisplay = categoryNames[category];

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
                            <NavbarComponent items={NavbarItems} />
                        </WrapperNavbar>
                        <WrapperSubNavbar>
                            <div>Tiện ích</div>
                            <NavbarComponent items={NavbarSubItems} />
                        </WrapperSubNavbar>
                    </div>
                </Col>
                <Col span={20}>
                    <WrapperCategory>
                        <h1>{categoryDisplay}</h1>
                    </WrapperCategory>
                    <WrapperCardProduct>
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
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