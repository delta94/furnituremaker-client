import styled from 'styled-components';

interface PrimaryButtonProps {
    readonly width: string;
}

export const PrimaryButton: React.ComponentType<PrimaryButtonProps> = styled.button`
    background: #EFB416;
    height: 60px;
    line-height: 60px;
    width: ${(props: PrimaryButtonProps) => props.width ? props.width : 'auto'};
    padding: 0 15px;
`;