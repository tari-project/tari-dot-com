import {
    Wrapper,
    Holder,
    Section,
    MembersGrid,
    MemberCard,
    MemberIcon,
    MemberName,
    MemberRole,
    MemberBio,
    CategoryTitle,
    ExternalLink,
} from './styles';

const coreContributors = [
    {
        name: 'blackwolfsa',
        role: 'Code CC',
        bio: 'Principal developer of Tari’s L1. Critical to Minotari’s ongoing development and maintenance.',
        iconSeed: 'blackwolfsa',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill="#813bf5"
                    fillOpacity="0.9"
                />
            </svg>
        ),
    },
    {
        name: 'sprucetree',
        role: 'Code CC',
        bio: 'Principal developer of Tari Universe. Balances product design with engineering requirements.',
        iconSeed: 'sprucetree',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="#813bf5" strokeWidth="2" />
                <path d="M12 7V12L15 15" stroke="#813bf5" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        name: 'Fox',
        role: 'Code CC',
        bio: 'Led the transition from RFCs to TIPs and established the Core Contributor program. Also a council member.',
        iconSeed: 'fox',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L20 9V21H4V9L12 3Z" stroke="#813bf5" strokeWidth="2" strokeLinejoin="round" />
                <path d="M9 21V15H15V21" stroke="#813bf5" strokeWidth="2" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        name: 'animalst',
        role: 'Code CC',
        bio: 'Lead developer of Ootle and principal engineer of Tari’s L2. Helps developers on Discord and the forum.',
        iconSeed: 'animalst',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#813bf5"
                    strokeWidth="2"
                />
                <path
                    d="M8 12C8 12 10 15 12 15C14 15 16 12 16 12"
                    stroke="#813bf5"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <circle cx="9" cy="9" r="1.25" fill="#813bf5" />
                <circle cx="15" cy="9" r="1.25" fill="#813bf5" />
            </svg>
        ),
    },
    {
        name: 'Naveen',
        role: 'Product CC',
        bio: 'Founder of Tari Labs. Long involvement in product development from Yats to Tari Universe.',
        iconSeed: 'naveen',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="4" stroke="#813bf5" strokeWidth="2" />
                <path d="M8 12H16M12 8V16" stroke="#813bf5" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        name: 'Impala',
        role: 'Infrastructure CC',
        bio: 'Operates mining pools and nodes, publishes open-source tools, and helps troubleshoot wallet, network, and pool issues.',
        iconSeed: 'impala',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L20 9V21H4V9L12 3Z" stroke="#813bf5" strokeWidth="2" strokeLinejoin="round" />
                <path d="M9 21V15H15V21" stroke="#813bf5" strokeWidth="2" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        name: 'kinkajou',
        role: 'Project CC',
        bio: 'Coordinates upgrades, community events, and developer support. Also a council member.',
        iconSeed: 'kinkajou',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill="#813bf5"
                    fillOpacity="0.9"
                />
            </svg>
        ),
    },
    {
        name: 'ZhaoXi',
        role: 'Community CC',
        bio: 'Builds the Chinese-speaking Tari community, coordinates moderators, and supports TariTalk.',
        iconSeed: 'zhaoxi',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="#813bf5" strokeWidth="2" />
                <path d="M12 7V12L15 15" stroke="#813bf5" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        name: 'Terence',
        role: 'Community CC',
        bio: 'Administrator of Tari Chinese and Tari Million Club. Writes practical community guides.',
        iconSeed: 'terence',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#813bf5"
                    strokeWidth="2"
                />
                <path
                    d="M8 12C8 12 10 15 12 15C14 15 16 12 16 12"
                    stroke="#813bf5"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <circle cx="9" cy="9" r="1.25" fill="#813bf5" />
                <circle cx="15" cy="9" r="1.25" fill="#813bf5" />
            </svg>
        ),
    },
    {
        name: 'Yushan Ren',
        role: 'Community CC',
        bio: 'Manages Chinese community channels, supports users, and writes technical guides on privacy and nodes.',
        iconSeed: 'yushan',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="4" stroke="#813bf5" strokeWidth="2" />
                <path d="M8 12H16M12 8V16" stroke="#813bf5" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
];

export default function CoreContributorsPage() {
    return (
        <Wrapper>
            <Holder>
                <h1>Core Contributors</h1>
                <h2>The builders who keep the Tari protocol moving forward</h2>

                <Section>
                    <h3>Who They Are</h3>
                    <p>
                        Core Contributors are trusted community members who have demonstrated sustained, high-quality
                        contributions. They take responsibility for specific areas of the project, help make
                        on-the-ground decisions, and form the electorate that chooses the Tari Council.
                    </p>
                    <p>
                        The program covers code, product, infrastructure, project coordination, ecosystem work, and
                        community building. Membership is earned through consistent work, not automatically granted by
                        completing a task list.
                    </p>
                    <MembersGrid>
                        {coreContributors.map((member) => (
                            <MemberCard key={member.name}>
                                <MemberIcon $seed={member.iconSeed}>{member.icon}</MemberIcon>
                                <MemberName>{member.name}</MemberName>
                                <MemberRole>{member.role}</MemberRole>
                                <MemberBio>{member.bio}</MemberBio>
                            </MemberCard>
                        ))}
                    </MembersGrid>
                </Section>

                <Section>
                    <h3>How to Become a Core Contributor</h3>
                    <p>
                        There is no automatic path. Candidates must be nominated by an existing Core Contributor or
                        Council member, with evidence of contributions and disclosed sponsorship. Nominations undergo a
                        public discussion and voting period, and admission requires sustained trust from the existing
                        body.
                    </p>
                    <p>
                        For background, see{' '}
                        <ExternalLink
                            href="https://rfc.tari.com/Process/TIP-PROC-0006_core_contributor_program"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            TIP-0006: Core Contributor Program
                        </ExternalLink>
                        .
                    </p>
                </Section>

                <Section>
                    <h3>Learn More</h3>
                    <p>
                        A community introduction to the program and its current members is available on{' '}
                        <ExternalLink
                            href="https://taritalk.xyz/posts/who-is-building-tari-core-contributors/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            TariTalk
                        </ExternalLink>
                        .
                    </p>
                    <p>
                        Nomination and governance discussions happen on the{' '}
                        <ExternalLink
                            href="https://community.tari.com/c/governance/10"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Tari Community Forum
                        </ExternalLink>
                        .
                    </p>
                </Section>
            </Holder>
        </Wrapper>
    );
}
