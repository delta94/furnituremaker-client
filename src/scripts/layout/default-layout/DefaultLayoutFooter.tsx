import * as React from 'react';
import styled from 'styled-components';

import { Container, Img } from '@/components';

const FooterWrapper = styled.div`
    background: #EFEFEF;
    padding: 30px 0;
`;

const FooterWrapperRow = styled.div`
    background: #EFEFEF;
`;

export function DefaultLayoutFooter() {
    return (
        <FooterWrapper>
            <Container>
                <FooterWrapperRow>
                    <div style={{ marginBottom: 5 }}>
                        <Img height="40" file="/static/assets/footer-logo.png" />
                    </div>
                    <p style={{ color: '#979797' }}>
                        © furnituremaker • HoChiMinh, VietNam • Tel: 1-888-345-6789
                        <br />
                        Copyright © 2018 Tri Minh Co,ltd.
                    </p>
                </FooterWrapperRow>
            </Container>
        </FooterWrapper>
    );
}