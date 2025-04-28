'use client';

import { useState } from 'react';
import { Wrapper, Question, Answer, ToggleIcon, AnswerPadding, QuestionText } from './styles';
import { AnimatePresence } from 'motion/react';

export interface FAQEntryProps {
    question: string;
    answer: string;
    lightMode?: boolean;
    disableAnimation?: boolean;
}

export default function FAQEntry({ question, answer, lightMode, disableAnimation }: FAQEntryProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const wrapperMotionProps = disableAnimation
        ? {}
        : {
              initial: { scale: 0.8, opacity: 0, y: 50 },
              whileInView: { scale: 1, opacity: 1, y: 0 },
              transition: { duration: 0.5, ease: [0.15, 0, 0, 0.97] },
          };

    const answerMotionProps = {
        initial: {
            opacity: 0,
            scaleY: 0,
            height: 0,
            y: -10,
        },
        animate: { opacity: 1, scaleY: 1, height: 'auto', y: -10 },
        exit: { opacity: 0, scaleY: 0, height: 0, y: -10 },
        transition: { duration: 0.3, ease: 'circInOut' },
    };

    return (
        <Wrapper {...wrapperMotionProps} $lightMode={lightMode}>
            <Question onClick={toggleOpen}>
                <QuestionText>{question}</QuestionText>

                <ToggleIcon>
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51 51" fill="none">
                            <circle cx="25.5" cy="25.5" r="25" stroke="currentColor" />
                            <path
                                d="M31.945 26.8479H26.9794H23.5114H18.5459V23.6426H23.5114H26.9794H31.945V26.8479Z"
                                fill="currentColor"
                            />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51 51" fill="none">
                            <circle cx="25.5" cy="25.5" r="25" stroke="currentColor" />
                            <path
                                d="M31.945 26.8476H26.9794V31.9445H23.5114V26.8476H18.5459V23.6423H23.5114V18.5454H26.9794V23.6423H31.945V26.8476Z"
                                fill="currentColor"
                            />
                        </svg>
                    )}
                </ToggleIcon>
            </Question>

            <AnimatePresence>
                {isOpen && (
                    <Answer {...answerMotionProps}>
                        <AnswerPadding dangerouslySetInnerHTML={{ __html: answer }} />
                    </Answer>
                )}
            </AnimatePresence>
        </Wrapper>
    );
}
