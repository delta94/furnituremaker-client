import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { AntdBreadcrumb, AntdIcon, Container } from '@/components';
import { Page } from '@/restful';

const PageContentWrapper = styled.div`
    padding-top: 24px;
    .breacrumb {
        margin-bottom: 25px;
    }
`;

const PageTitle = styled.h1`
    color: #000;
    text-transform: uppercase;
    font-size: 18px;
`;

const PageContentContent = styled.div`
    display: block;
`;

export interface PageProps {
    readonly page: Page;
}

export class PageContent extends React.PureComponent<PageProps> {
    public render() {
        const { page } = this.props;
        return (
            <Container>
                <PageContentWrapper>
                    <div className="breacrumb">
                        {this.renderBreadcrumb()}
                    </div>
                    <div>
                        <PageTitle>{page.title}</PageTitle>
                        <PageContentContent>
                            {page.content}
                        </PageContentContent>
                    </div>
                </PageContentWrapper>
            </Container>
        );
    }

    renderBreadcrumb() {
        return (
            <AntdBreadcrumb>
                <AntdBreadcrumb.Item>
                    <Link to="/"><AntdIcon type="home" /></Link>
                </AntdBreadcrumb.Item>
                <AntdBreadcrumb.Item>Thư viện vật liệu</AntdBreadcrumb.Item>
            </AntdBreadcrumb>
        );
    }
}
