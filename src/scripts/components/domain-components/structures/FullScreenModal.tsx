import * as React from 'react';
import styled from 'styled-components';

// tslint:disable-next-line:no-any
type ModalWrapperProps = React.DOMAttributes<HTMLDivElement> & { readonly visibled: boolean };
type ModalWrapperType = React.ComponentType<ModalWrapperProps>;
const ModalWrapper: ModalWrapperType = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content:center;
    align-items: center;
    z-index: 99;
    overflow: auto;
    transition: visibility 0s, opacity 0.5s;
    visibility : ${(props: ModalWrapperProps) => props.visibled ? 'visible' : 'hidden'};
    opacity : ${(props) => props.visibled ? 1 : 0};
`;

const ModalContent = styled.div`
    background-color: #fff;
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 20px;
`;

const ModalOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2 );
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
            <ModalWrapper visibled={this.props.visibled}>
                <ModalOverlay onClick={this.props.onClose} />
                <ModalContent>
                    {this.props.children}
                </ModalContent>
            </ModalWrapper>
        );
    }
}