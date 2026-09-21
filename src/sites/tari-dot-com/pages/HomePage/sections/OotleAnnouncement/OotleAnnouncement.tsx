import { Wrapper, Holder, Band } from './styles';

export default function OotleAnnouncement() {
    return (
        <Wrapper>
            <Band>
                <Holder>
                    <div>
                        <strong>The Ootle</strong>, Tari&apos;s Layer 2, launches on November 11th.&nbsp;
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
