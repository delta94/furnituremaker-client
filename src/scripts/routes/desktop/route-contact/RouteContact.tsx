import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { AppPage, PageProps, readyState, withStoreValues } from '@/app';
import { AntdBreadcrumb, AntdIcon, Container, Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import { DefaultLayout } from '@/layout';

type RouteContactProps =
    Pick<CommonStoreProps, 'setStore'> &
    RouteComponentProps<{}> &
    PageProps;

@readyState()
@withStoreValues<RouteContactProps>('setStore')
export class RouteContact extends AppPage<RouteContactProps> {
    constructor(props: RouteContactProps) {
        super(props);
        const { setStore } = this.props;
        setStore({
            [nameof<CommonStoreProps>(o => o.drawerVisible)]: false
        });
    }

    render() {
        return (
            <Page>
                <DefaultLayout breadcrumb={this.renderBreadcrumb()}>
                    <Container>
                        {null}
                    </Container>
                </DefaultLayout>
            </Page>
        );
    }

    renderBreadcrumb() {
        return (
            <AntdBreadcrumb>
                <AntdBreadcrumb.Item>
                    <Link to="/"><AntdIcon type="home" /></Link>
                </AntdBreadcrumb.Item>
                <AntdBreadcrumb.Item>Liên hệ</AntdBreadcrumb.Item>
            </AntdBreadcrumb>
        );
    }
}