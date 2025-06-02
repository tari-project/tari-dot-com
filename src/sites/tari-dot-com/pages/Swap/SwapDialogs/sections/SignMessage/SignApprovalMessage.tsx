import { HeaderWrapper, StatusWrapper } from './SignApprovalMessage.styles';
import Metamask from '../../icons/mm-fox';
import TransactionModal from '../../TransactionModal/TransactionModal';
import LoadingDots from '../../components/LoadingDots';

interface Props {
    isOpen: boolean;
    setIsOpen?: (isOpen: boolean) => void;
}
export const SignApprovalMessage = ({ isOpen, setIsOpen }: Props) => {
    return (
        // Prevent close on click outside just for this modal
        <TransactionModal show={isOpen} handleClose={() => setIsOpen?.(false)} noClose>
            <HeaderWrapper>
                <Metamask width="65" />
                <h3>Sign Message</h3>
                <p>Please sign the message in your wallet to continue.</p>
            </HeaderWrapper>
            <StatusWrapper>
                <Metamask width="24" />
                Waiting for wallet response
                <LoadingDots />
            </StatusWrapper>
        </TransactionModal>
    );
};
