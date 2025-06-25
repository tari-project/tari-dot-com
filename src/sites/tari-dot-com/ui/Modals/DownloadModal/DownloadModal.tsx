'use client';
import { useUIStore } from '@/stores/useUiStore';
import BaseModal from '../BaseModal/BaseModal';
import {
    ContentGroup,
    Divider,
    DividerLine,
    DividerText,
    DownloadButton,
    DownloadButtons,
    Form,
    TariLogoImage,
    Text,
    TextGroup,
    Title,
    FormFields,
    SubmitButton,
    Input,
    SuccessMessage,
} from './styles';
import WindowsIcon from '@/ui-shared/components/Icons/WindowsIcon';
import MacIcon from '@/ui-shared/components/Icons/MacIcon';
import LinuxIcon from '@/ui-shared/components/Icons/LinuxIcon';
import tariLogoImage from './images/tariLogo.png';
import { sendGTMEvent } from '@next/third-parties/google';
import ActiveMiners from '../../Header/ActiveMiners/ActiveMiners';
import { useExchangeData } from '@/services/api/useExchangeData';
import { useEffect, useState } from 'react';
import { useSubscribeNewsletter } from '@/services/api/useSubscribeNewsletter';
import { useCaptcha } from '@/ui-shared/hooks/useCaptcha';
import { useSearchParams } from 'next/navigation';
import { useDownloadUniverse } from '@/services/api/useDownloadUniverse';

export default function DownloadModal() {
    const { showDownloadModal, setShowDownloadModal, isVeera } = useUIStore();
    const { data: exchange } = useExchangeData();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const { mutateAsync: subscribeNewsletter } = useSubscribeNewsletter();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { token, markup, reset } = useCaptcha('light');
    const { handleDownloadClick } = useDownloadUniverse();

    const searchParams = useSearchParams();

    useEffect(() => {
        const veeraEmailRef = searchParams.get('veeraEmailRef');
        if (!isSuccess && veeraEmailRef) {
            setIsSuccess(true);
        }
    }, [isSuccess, searchParams]);

    const windowsLink =
        exchange?.download_link_win ||
        `https://airdrop.tari.com/api/miner/download/windows?universeReferral=${isVeera ? 'veera' : 'tari-dot-com'}`;
    const macLink =
        exchange?.download_link_mac ||
        `https://airdrop.tari.com/api/miner/download/macos?universeReferral=${isVeera ? 'veera' : 'tari-dot-com'}`;
    const linuxLink =
        exchange?.download_link_linux ||
        `https://airdrop.tari.com/api/miner/download/linux?universeReferral=${isVeera ? 'veera' : 'tari-dot-com'}`;

    const handleClick = (platform?: string) => {
        sendGTMEvent({ event: 'download_button_clicked', platform: platform });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (email && token) {
                await subscribeNewsletter({ email, name, token, veera: isVeera }).then((r) => {
                    if (r.success) {
                        const veeraEmailRef = r.veeraEmailRef;
                        setIsSuccess(true);

                        // Update URL search params with veeraEmailRef
                        if (isVeera && veeraEmailRef) {
                            const url = new URL(window.location.href);
                            url.searchParams.set('veeraEmailRef', veeraEmailRef);
                            window.history.pushState({}, '', url.toString());
                        }

                        // Auto-download for Veera after successful email submission
                        if (isVeera) {
                            // Detect user's platform and trigger download
                            const userAgent = navigator.userAgent.toLowerCase();
                            let downloadUrl = '';

                            if (userAgent.includes('win')) {
                                downloadUrl = windowsLink;
                            } else if (userAgent.includes('mac')) {
                                downloadUrl = macLink;
                            } else {
                                downloadUrl = linuxLink;
                            }

                            // Trigger download
                            const link = document.createElement('a');
                            const url = new URL(downloadUrl);
                            url.searchParams.set('veeraEmailRef', veeraEmailRef);
                            url.searchParams.set('universeReferral', 'veera');

                            link.href = url.toString();
                            link.download = '';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);

                            const platform = userAgent.includes('win') ? 'windows' : userAgent.includes('mac') ? 'macos' : 'linux';
                            sendGTMEvent({ event: 'download_button_clicked', platform, exchange: 'veera' });
                        }
                    } else {
                        reset();
                    }
                });
            }
        } catch (error) {
            reset();
            console.error(error);
        }
        setIsLoading(false);
    };

    return (
        <BaseModal show={showDownloadModal} setShow={setShowDownloadModal}>
            <ContentGroup>
                <TariLogoImage src={tariLogoImage.src} alt="Tari Logo" />

                {!isSuccess && (
                    <TextGroup>
                        <Title>{isVeera ? 'Ready to start earning?' : 'your download has started'}</Title>
                        <Text>
                            {isVeera
                                ? 'Submit your email ID associated with Veera to start earning rewards'
                                : 'Now, stay up to date with the latest Tari news, contests, and drops.'}
                        </Text>
                        <Form onSubmit={handleSubmit}>
                            <FormFields>
                                <Input
                                    type="text"
                                    placeholder="Name"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </FormFields>
                            {markup}
                            <SubmitButton type="submit" disabled={isLoading || isSuccess || !token}>
                                <span>
                                    Let’s do it!{' '}
                                    <svg
                                        width="21"
                                        height="20"
                                        viewBox="0 0 21 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M20.5 10C20.5 4.4774 16.0226 0 10.5 0C4.9774 0 0.5 4.4774 0.5 10C0.5 15.5226 4.9774 20 10.5 20C16.0226 20 20.5 15.5226 20.5 10ZM10.2764 14.3923C10.2047 14.3212 10.1477 14.2366 10.1087 14.1434C10.0696 14.0502 10.0493 13.9502 10.0489 13.8492C10.0485 13.7482 10.068 13.6481 10.1063 13.5546C10.1446 13.4611 10.201 13.376 10.2721 13.3043L12.7875 10.7692H6.36538C6.16137 10.7692 5.96572 10.6882 5.82146 10.5439C5.6772 10.3997 5.59615 10.204 5.59615 10C5.59615 9.79599 5.6772 9.60033 5.82146 9.45607C5.96572 9.31181 6.16137 9.23077 6.36538 9.23077H12.7875L10.2721 6.69567C10.201 6.62389 10.1446 6.53879 10.1064 6.44524C10.0681 6.35169 10.0486 6.25152 10.0491 6.15045C10.0495 6.04937 10.0699 5.94938 10.109 5.85617C10.1481 5.76296 10.2051 5.67837 10.2769 5.60721C10.3487 5.53606 10.4338 5.47974 10.5274 5.44147C10.6209 5.40321 10.7211 5.38374 10.8222 5.38419C11.0263 5.38509 11.2217 5.46704 11.3654 5.61202L15.1822 9.45817C15.3252 9.60226 15.4054 9.79702 15.4054 10C15.4054 10.203 15.3252 10.3977 15.1822 10.5418L11.3654 14.388C11.2942 14.4599 11.2096 14.517 11.1163 14.5561C11.023 14.5952 10.923 14.6156 10.8218 14.616C10.7207 14.6164 10.6204 14.5968 10.5269 14.5585C10.4333 14.5201 10.3482 14.4636 10.2764 14.3923Z"
                                            fill="black"
                                        />
                                    </svg>
                                </span>
                            </SubmitButton>

                            <ActiveMiners theme="light" />
                        </Form>
                    </TextGroup>
                )}

                {isSuccess &&
                    (isVeera ? (
                        <SuccessMessage>
                            <Title>{'Your download has started'}</Title>
                            <Text>
                                <strong>You’re all set!</strong> your <strong>Veera</strong> rewards are on the way.
                            </Text>
                        </SuccessMessage>
                    ) : (
                        <SuccessMessage>
                            <Text>
                                <strong>You’re all set!</strong> We’ll send you the latest Tari news, contests, and
                                drops.
                            </Text>
                        </SuccessMessage>
                    ))}

                {(!isVeera || isSuccess) && (
                    <>
                        <Divider>
                            <DividerLine />
                            <DividerText>Having trouble? Here are your download links.</DividerText>
                            <DividerLine />
                        </Divider>

                        <DownloadButtons>
                            <DownloadButton href={windowsLink} onClick={() => handleClick('windows')}>
                                WINDOWS <WindowsIcon fill="#fff" />
                            </DownloadButton>
                            <DownloadButton href={macLink} onClick={() => handleClick('macos')}>
                                MAC <MacIcon fill="#fff" />
                            </DownloadButton>
                            <DownloadButton href={linuxLink} onClick={() => handleClick('linux')}>
                                Linux <LinuxIcon fill="#fff" />
                            </DownloadButton>
                        </DownloadButtons>
                    </>
                )}
            </ContentGroup>
        </BaseModal>
    );
}
