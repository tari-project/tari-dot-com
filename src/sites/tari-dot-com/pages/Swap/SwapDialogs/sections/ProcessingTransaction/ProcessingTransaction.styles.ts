import styled from 'styled-components';
import { SwapStatus } from './ProcessingTransaction';

export const StatusValue = styled.div<{ $status: SwapStatus }>`
    font-family: Poppins, sans-serif;
    font-weight: bold;
    font-size: 14px;
    line-height: 117%;
    letter-spacing: -3%;
    color: ${({ $status: status }) => {
        switch (status) {
            case 'processingapproval':
            case 'processingswap':
                return '#FF7700';
            case 'success':
                return '#36C475';
            case 'error':
                return '#ff0000';
            default:
                return '#000000';
        }
    }};
`;

export const ProcessingDetailsWrapper = styled.div`
    padding: 20px;
`;
