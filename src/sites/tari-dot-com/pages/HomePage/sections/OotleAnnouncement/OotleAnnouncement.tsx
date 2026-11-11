import { Wrapper, Holder, Band } from './styles';

export default function OotleAnnouncement() {
    return (
        <Wrapper>
            <Band>
                <Holder>
                    <div>
                        <a href="/ootle">The Ootle</a>, Tari&apos;s Layer 2, is live!{' '}
                        <a href="https://ootle.tari.com/" target="_blank" rel="noreferrer">
                            Start building now
                        </a>
                        , and{' '}
                        <a
                            href="https://community.tari.com/t/ootle-launch-date-and-launch-contest-rules/323"
                            target="_blank"
                            rel="noreferrer"
                        >
                            join our builder contests!
                        </a>
                    </div>
                </Holder>
            </Band>
        </Wrapper>
    );
}
