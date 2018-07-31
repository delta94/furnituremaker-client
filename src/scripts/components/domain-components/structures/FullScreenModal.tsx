import * as React from 'react';

import styled from 'styled-components';

type ModalWrapperProps = React.DOMAttributes<unknown> & { readonly visibled: boolean };
type ModalWrapperType = React.ComponentType<ModalWrapperProps>;
const ModalWrapper: ModalWrapperType = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, );
    display: flex;
    justify-content:center;
    align-items: center;
    z-index: 9;
    overflow: auto;
    display: ${(props) => props.visibled ? 'block' : 'none'};
`;

export interface FullScreenModalProps {
    readonly visibled: boolean;
    readonly onClose: () => void;
}

export class FullScreenModal extends React.Component<FullScreenModalProps> {
    static readonly defaultProps: FullScreenModalProps = {
        visibled: false,
        onClose: () => { /** Need implement */ }
    };

    render() {
        return (
            <ModalWrapper
                visibled={this.props.visibled}
                onClick={this.props.onClose}
            >
                {this.props.children}
            </ModalWrapper>
        );
    }
}