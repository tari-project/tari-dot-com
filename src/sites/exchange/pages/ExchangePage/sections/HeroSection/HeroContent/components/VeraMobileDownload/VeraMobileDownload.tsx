import WindowsIcon from '@/ui-shared/components/Icons/WindowsIcon';
import {
    CaptcahWrapper,
    CirclesBG,
    CopyDivider,
    CtaContainer,
    CTAContent,
    CTACopy,
    CTAEyebrow,
    CtaWrapper,
    Divider,
    EmailButton,
    EmailForm,
    EmailInput,
    EmailWrapper,
    Eyebrow,
    FormCopy,
    GradientText,
    RobotImage,
    Wrapper,
} from './VeraMobileDownload.styles';
import RobotDownload from './robotDownload.png';
import MacIcon from '@/ui-shared/components/Icons/MacIcon';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCaptcha } from '@/ui-shared/hooks/useCaptcha';
import { useSendDownloadLink } from '@/services/api/useSendDownloadLink';

const animations = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
};

export default function VeraMobileDownload() {
    const [showEmail, setShowEmail] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const { mutateAsync: sendDownloadLink, isPending } = useSendDownloadLink();
    const [email, setEmail] = useState('');
    const { markup, token, reset } = useCaptcha();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendDownloadLink({ email, token }).then((r) => {
            if (r.success) {
                setSubmitSuccess(true);
            } else {
                reset();
            }
        });
    };

    const submitIsDisabled = !token || submitSuccess || isPending;
    return (
        <Wrapper>
            <Eyebrow>
                Put your computer to work earning Tari (XTM), a revolutionary new cryptocurrency.
                Tari is fast, safe, and so easy to use, that your Grandma can do it.
            </Eyebrow>
            <AnimatePresence mode="wait">
                {showEmail ? (
                    <motion.div {...animations} key="email">
                        <EmailForm onSubmit={handleSubmit}>
                            <EmailInput
                                type="email"
                                placeholder="Email address"
                                required={true}
                                disabled={submitSuccess}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            {submitSuccess ? (
                                <FormCopy>
                                    {' '}
                                    ✅ <strong>Almost there!</strong> Check your inbox to confirm your email.
                                </FormCopy>
                            ) : (
                                <EmailButton type="submit" disabled={submitIsDisabled}>
                                    Send Download Link
                                </EmailButton>
                            )}
                            <FormCopy>
                                {' '}
                                Or, download on PC or Mac At <GradientText>tari.com/veera</GradientText>
                            </FormCopy>
                            {submitSuccess ? null : <CaptcahWrapper>{markup}</CaptcahWrapper>}
                        </EmailForm>
                    </motion.div>
                ) : (
                    <motion.div {...animations} key="cta">
                        <CtaContainer>
                            <CtaWrapper>
                                <CTAContent>
                                    <CTAEyebrow>
                                        Download on{' '}
                                        <span>
                                            PC <WindowsIcon fill="#fff" />
                                        </span>{' '}
                                        or{' '}
                                        <span>
                                            Mac <MacIcon fill="#fff" />
                                        </span>{' '}
                                        at
                                    </CTAEyebrow>
                                    <CTACopy>TARI.COM/VEERA</CTACopy>
                                </CTAContent>
                                <CirclesBG />
                            </CtaWrapper>
                            <RobotImage src={RobotDownload.src} />
                        </CtaContainer>
                        <CopyDivider>
                            <div />
                            <span>Or</span>
                            <div />
                        </CopyDivider>
                        <EmailWrapper>
                            <GradientText onClick={() => setShowEmail(true)}>Email Me the Link</GradientText>
                        </EmailWrapper>
                        <Divider />
                    </motion.div>
                )}
            </AnimatePresence>
        </Wrapper>
    );
}
