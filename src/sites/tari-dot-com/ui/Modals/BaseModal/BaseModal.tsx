import { BoxWrapper, CloseButton, Cover, Wrapper } from './styles';

import CloseIcon from './icons/CloseIcon';
import { AnimatePresence } from 'motion/react';

interface Props {
    show: boolean;
    setShow: (show: boolean) => void;
    children: React.ReactNode;
}

export default function BaseModal({ show, setShow, children }: Props) {
    return (
        <AnimatePresence>
            {show && (
                <Wrapper>
                    <BoxWrapper
                        initial={{ opacity: 0, y: '100px' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        <CloseButton onClick={() => setShow(false)}>
                            <CloseIcon />
                        </CloseButton>
                        {children}
                    </BoxWrapper>

                    <Cover
                        onClick={() => setShow(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                </Wrapper>
            )}
        </AnimatePresence>
    );
}
