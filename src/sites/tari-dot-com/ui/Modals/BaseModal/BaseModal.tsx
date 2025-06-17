import { BoxWrapper, CloseButton, Cover, Padding, Wrapper } from './styles';
import { useEffect } from 'react';

import CloseIcon from './icons/CloseIcon';
import { AnimatePresence } from 'motion/react';

interface Props {
    show: boolean;
    setShow: (show: boolean) => void;
    children: React.ReactNode;
}

export default function BaseModal({ show, setShow, children }: Props) {
    useEffect(() => {
        if (show) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [show]);

    return (
        <AnimatePresence>
            {show && (
                <Wrapper>
                    <Padding>
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
                    </Padding>
                </Wrapper>
            )}
        </AnimatePresence>
    );
}
