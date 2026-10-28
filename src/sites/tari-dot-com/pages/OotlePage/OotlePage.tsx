'use client';

import { useEffect, useState } from 'react';
import {
    Wrapper,
    Band,
    BandFill,
    BandText,
    Hero,
    HeroGlow,
    HeroGrid,
    HeroInner,
    Eyebrow,
    EyebrowDot,
    Headline,
    Kicker,
    Lede,
    CtaRow,
    Button,
    CountdownCard,
    CdLabel,
    CdDate,
    CdGrid,
    CdCell,
    CdNum,
    CdUnit,
    CdFoot,
    OrbitWrap,
    Marquee,
    MarqueeTrack,
    Section,
    SecTag,
    SecTitle,
    SecLede,
    Cards,
    Card,
    CardIco,
    CardNum,
    Steps,
    Step,
    StepBadge,
    StepCode,
    Contest,
    Confetti,
    BackToTop,
} from './styles';

const LAUNCH_DATE = new Date('2026-11-11T00:00:00Z');

function pad(n: number) {
    return String(n).padStart(2, '0');
}

function useCountdown(target: Date) {
    const [diff, setDiff] = useState(() => target.getTime() - Date.now());

    useEffect(() => {
        const update = () => setDiff(target.getTime() - Date.now());
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, [target]);

    const total = Math.max(0, Math.floor(diff / 1000));
    return {
        days: pad(Math.floor(total / 86400)),
        hours: pad(Math.floor((total % 86400) / 3600)),
        mins: pad(Math.floor((total % 3600) / 60)),
        secs: pad(total % 60),
    };
}

export default function OotlePage() {
    const { days, hours, mins, secs } = useCountdown(LAUNCH_DATE);
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const track = document.getElementById('marqueeTrack');
        if (track) track.innerHTML += track.innerHTML;
    }, []);

    useEffect(() => {
        const onScroll = () => setShowBackToTop(window.scrollY > 600);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <Wrapper>
            <BandFill>
                <Band>
                    <BandText>
                        <strong>The Ootle</strong> — Tari&apos;s Layer 2 — launches November 11th.{' '}
                        <a href="https://ootle.tari.com/" target="_blank" rel="noreferrer">
                            Start building now
                        </a>
                    </BandText>
                </Band>
            </BandFill>

            <Hero>
                <HeroGlow />
                <HeroGrid />

                <OrbitWrap>
                    <svg
                        width="800"
                        height="800"
                        viewBox="0 0 800 800"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <circle cx="400" cy="400" r="150" stroke="#0c0718" strokeOpacity="0.12" strokeWidth="2" />
                        <circle
                            cx="400"
                            cy="400"
                            r="240"
                            stroke="#0c0718"
                            strokeOpacity="0.09"
                            strokeWidth="2"
                            strokeDasharray="6 10"
                        />
                        <circle cx="400" cy="400" r="330" stroke="#0c0718" strokeOpacity="0.07" strokeWidth="2" />

                        <g className="spin-fast">
                            <circle cx="400" cy="160" r="26" fill="#813bf5" />
                            <circle cx="400" cy="160" r="40" stroke="#813bf5" strokeOpacity="0.4" strokeWidth="2" />
                        </g>

                        <g className="spin-mid">
                            <rect
                                x="540"
                                y="380"
                                width="40"
                                height="40"
                                rx="10"
                                fill="#0c0718"
                                transform="rotate(45 560 400)"
                            />
                            <circle cx="260" cy="400" r="10" fill="#0c0718" fillOpacity="0.5" />
                            <circle cx="596" cy="204" r="8" fill="#5a1fd6" fillOpacity="0.6" />
                            <circle cx="204" cy="596" r="8" fill="#5a1fd6" fillOpacity="0.6" />
                        </g>

                        <g className="spin-slow">
                            <circle cx="73" cy="400" r="6" fill="#813bf5" />
                            <circle cx="727" cy="400" r="6" fill="#813bf5" />
                            <circle cx="400" cy="727" r="6" fill="#813bf5" />
                            <circle cx="400" cy="73" r="6" fill="#813bf5" />
                            <path
                                d="M118 118 L682 682 M682 118 L118 682"
                                stroke="#0c0718"
                                strokeOpacity="0.05"
                                strokeWidth="1.5"
                            />
                        </g>

                        <g className="hex-core">
                            <path
                                d="M400 300 L495 350 L495 450 L400 500 L305 450 L305 350 Z"
                                fill="#0c0718"
                                stroke="#813bf5"
                                strokeWidth="3"
                            />
                            <path
                                d="M400 335 L462 367 L462 433 L400 465 L338 433 L338 367 Z"
                                fill="#813bf5"
                                fillOpacity="0.16"
                            />
                            <circle cx="400" cy="400" r="18" fill="#813bf5" />
                        </g>
                    </svg>
                </OrbitWrap>

                <HeroInner>
                    <div>
                        <Eyebrow>
                            <EyebrowDot />
                            Tari Layer 2 &middot; Smart Contracts
                        </Eyebrow>

                        <Headline>
                            <span className="stroke">The</span>
                            <br />
                            Ootle
                            <br />
                            <span className="purple">Is Coming.</span>
                        </Headline>

                        <Kicker>
                            Layer 2 launches <span>November 11th</span>
                        </Kicker>

                        <Lede>
                            Ootle is Tari&apos;s smart-contract layer — a WASM execution environment written in Rust,
                            built for agentic payments, tapplets, and on-chain templates. Same privacy. Same fairness.
                            Now programmable.
                        </Lede>

                        <CtaRow>
                            <Button className="primary" href="https://ootle.tari.com/" target="_blank" rel="noreferrer">
                                Start building
                            </Button>
                            <Button
                                className="ghost"
                                href="https://community.tari.com/t/ootle-launch-date-and-launch-contest-rules/323"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Join the builder contest
                            </Button>
                        </CtaRow>
                    </div>

                    <CountdownCard>
                        <CdLabel>Mainnet launch in</CdLabel>
                        <CdDate>November 11, 2026</CdDate>
                        <CdGrid>
                            <CdCell>
                                <CdNum>{days}</CdNum>
                                <CdUnit>Days</CdUnit>
                            </CdCell>
                            <CdCell>
                                <CdNum>{hours}</CdNum>
                                <CdUnit>Hours</CdUnit>
                            </CdCell>
                            <CdCell>
                                <CdNum>{mins}</CdNum>
                                <CdUnit>Minutes</CdUnit>
                            </CdCell>
                            <CdCell>
                                <CdNum>{secs}</CdNum>
                                <CdUnit>Seconds</CdUnit>
                            </CdCell>
                        </CdGrid>
                        <CdFoot>
                            Already on <strong>esmeralda</strong> testnet — ship your template before the gun.{' '}
                            <a href="https://ootle.tari.com/" target="_blank" rel="noreferrer">
                                Read the docs &rarr;
                            </a>
                        </CdFoot>
                    </CountdownCard>
                </HeroInner>
            </Hero>

            <Marquee aria-hidden="true">
                <MarqueeTrack id="marqueeTrack">
                    <span>Rust</span>
                    <span>&bull;</span>
                    <span>WASM Templates</span>
                    <span>&bull;</span>
                    <span>Agentic Payments</span>
                    <span>&bull;</span>
                    <span>Tapplets</span>
                    <span>&bull;</span>
                    <span>Privacy Preserved</span>
                    <span>&bull;</span>
                    <span>Nov 11</span>
                    <span>&bull;</span>
                </MarqueeTrack>
            </Marquee>

            <Section>
                <SecTag>What is the Ootle</SecTag>
                <SecTitle>
                    Smart contracts that feel like <em>Tari.</em>
                </SecTitle>
                <SecLede>
                    The Ootle is Tari&apos;s Layer 2 execution environment. It brings programmability to the network
                    without giving up what makes Tari different — no personal info, no gatekeepers, just you and the
                    protocol.
                </SecLede>

                <Cards>
                    <Card>
                        <CardNum>01</CardNum>
                        <CardIco>
                            <svg
                                width="26"
                                height="26"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="16 18 22 12 16 6" />
                                <polyline points="8 6 2 12 8 18" />
                            </svg>
                        </CardIco>
                        <h3>Rust Native</h3>
                        <p>
                            Templates are written in Rust and compiled to WASM. Full type safety, real performance, and
                            an ergonomic template library that handles resources and events for you.
                        </p>
                    </Card>
                    <Card className="accent">
                        <CardNum className="accent">02</CardNum>
                        <CardIco>
                            <svg
                                width="26"
                                height="26"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
                            </svg>
                        </CardIco>
                        <h3>Agentic Payments</h3>
                        <p>
                            Built from day one for autonomous agents that pay each other, coordinate on-chain, and
                            settle value — the Ootle&apos;s first-class use case is machines transacting.
                        </p>
                    </Card>
                    <Card>
                        <CardNum>03</CardNum>
                        <CardIco>
                            <svg
                                width="26"
                                height="26"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </CardIco>
                        <h3>Security First</h3>
                        <p>
                            Access control, event emission, and resource management are baked into the template library
                            — the safe path is also the easy path.
                        </p>
                    </Card>
                </Cards>
            </Section>

            <Section style={{ paddingTop: 0, paddingBottom: 40 }}>
                <SecTag>Get ready</SecTag>
                <SecTitle>
                    Three steps to <em>mainnet.</em>
                </SecTitle>
                <SecLede>
                    Everything you need is live on the esmeralda testnet right now. Start before the launch and
                    you&apos;ll launch with us.
                </SecLede>

                <Steps>
                    <Step>
                        <StepBadge>[ 01 ]</StepBadge>
                        <div>
                            <h3>Set up your wallet</h3>
                            <p>
                                Install a Tari wallet and connect to the esmeralda testnet. Required before publishing
                                anything.
                            </p>
                        </div>
                        <StepCode>esmeralda</StepCode>
                    </Step>
                    <Step>
                        <StepBadge>[ 02 ]</StepBadge>
                        <div>
                            <h3>Write your template</h3>
                            <p>
                                Define state, resources, and transitions in Rust with <strong>tari_template_lib</strong>
                                , then compile to WASM.
                            </p>
                        </div>
                        <StepCode>cargo build --target wasm32</StepCode>
                    </Step>
                    <Step>
                        <StepBadge>[ 03 ]</StepBadge>
                        <div>
                            <h3>Publish &amp; execute</h3>
                            <p>
                                Submit your compiled template to the network. Anyone can run it — your logic becomes the
                                protocol&apos;s logic.
                            </p>
                        </div>
                        <StepCode>ootle.tari.com</StepCode>
                    </Step>
                </Steps>
            </Section>

            <Contest>
                <Confetti className="c1">&#9672;</Confetti>
                <Confetti className="c2 light">&#10022;</Confetti>
                <Confetti className="c3 light">&#9673;</Confetti>
                <Confetti className="c4">&#10023;</Confetti>
                <h2>
                    Build the first <span>Ootle tapplet.</span>
                </h2>
                <p>
                    The Ootle launch contest is live. Templates, tapplets, and tools — bring your best work before
                    November 11th and win big.
                </p>
                <Button
                    className="primary"
                    href="https://community.tari.com/t/ootle-launch-date-and-launch-contest-rules/323"
                    target="_blank"
                    rel="noreferrer"
                >
                    See contest rules
                </Button>
            </Contest>

            {showBackToTop && (
                <BackToTop onClick={scrollToTop} aria-label="Back to top">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="12" y1="19" x2="12" y2="5" />
                        <polyline points="5 12 12 5 19 12" />
                    </svg>
                </BackToTop>
            )}
        </Wrapper>
    );
}
