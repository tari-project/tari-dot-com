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
    FunctionsGrid,
    FunctionCard,
    FunctionTitle,
    FunctionDescription,
    FunctionLead,
    TariLabsNote,
    ExternalLink,
} from './styles';

const councilMembers = [
    {
        name: 'Solix78',
        role: 'Business Development & Enterprise',
        bio: 'Early community member and top miner through testnet. NEM council alum and He3Labs co-founder. Brings enterprise deal flow and real-world adoption experience.',
        iconSeed: 'solix78',
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
        name: 'coin_artist',
        role: 'Creative & Ecosystem',
        bio: "The artist behind crypto's most famous puzzles and creator of Neon District. Brings creative direction and ecosystem design thinking.",
        iconSeed: 'coin_artist',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="#813bf5" strokeWidth="2" />
                <path d="M12 7V12L15 15" stroke="#813bf5" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        name: 'Fox',
        role: 'Open Source Governance',
        bio: 'Open source veteran and collaboration specialist. Helps build community governance, processes, and consensus frameworks.',
        iconSeed: 'fox',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L20 9V21H4V9L12 3Z" stroke="#813bf5" strokeWidth="2" strokeLinejoin="round" />
                <path d="M9 21V15H15V21" stroke="#813bf5" strokeWidth="2" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        name: 'Kinkajou',
        role: 'Community & Decentralization',
        bio: 'A miner from the earliest days who has never stopped fighting for decentralization and community. Ensures the protocol stays true to its roots.',
        iconSeed: 'kinkajou',
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
        name: 'Zhao Xi',
        role: 'Community Growth (APAC)',
        bio: 'Instigator of the Chinese Tari community. Drives regional growth and ensures the protocol reaches a global, borderless audience.',
        iconSeed: 'zhao-xi',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="4" stroke="#813bf5" strokeWidth="2" />
                <path d="M8 12H16M12 8V16" stroke="#813bf5" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        name: 'Vacant seat',
        role: 'Community seat',
        bio: 'This seat is currently unfilled after BoredElon stepped down. A new member will be announced after the Ootle launch.',
        iconSeed: 'vacant',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="4"
                    stroke="#813bf5"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                />
                <path d="M7 12H17M12 7V17" stroke="#813bf5" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
];

const councilFunctions = [
    {
        title: 'Governance & Decision Making',
        description:
            'The Council governs the community token allocation and produces decisions on behalf of contributors. Routine matters proceed by lazy consensus, substantive matters by rough consensus in public channels, and strategic matters require a 14-day discussion period plus a 7-day Final Comment Period with majority Council approval.',
        lead: 'All Council members',
    },
    {
        title: 'Funding & Resource Allocation',
        description:
            'Directs what gets funded and what gets built. Sets and enforces spending thresholds, ensuring no disbursement exceeds charter limits without the required level of community review.',
        lead: 'Solix78',
    },
    {
        title: 'Protocol Development',
        description:
            'Appoints and oversees workgroup leads responsible for protocol development. Ensures the protocol has funded contributors and a functioning technical roadmap.',
        lead: 'Fox',
    },
    {
        title: 'Infrastructure',
        description:
            'Ensures the protocol has reliable operational infrastructure, including nodes, services, and devops. Oversees technical contributors maintaining the network.',
        lead: 'Fox, Kinkajou',
    },
    {
        title: 'Community',
        description:
            'Supports newcomers, moderates public channels, organizes events, and drives education. Ensures the protocol has a clear public voice and healthy contributor culture.',
        lead: 'Kinkajou, Zhao Xi',
    },
    {
        title: 'Ecosystem & Partnerships',
        description:
            "Drives ecosystem growth, integrations, partnerships, and business development. Expands Tari's reach beyond core contributors into broader adoption.",
        lead: 'coin_artist, Solix78',
    },
];

export default function CouncilsPage() {
    return (
        <Wrapper>
            <Holder>
                <h1>Tari Council</h1>
                <h2>The people who steward the protocol on behalf of its contributors</h2>

                <Section>
                    <h3>Council Members</h3>
                    <p>
                        The Tari Council currently has six active community members, plus Tari Labs as the seventh equal
                        seat. One community seat is currently vacant after BoredElon stepped down; it will be filled
                        after the Ootle launch.
                    </p>
                    <MembersGrid>
                        {councilMembers.map((member) => (
                            <MemberCard key={member.name}>
                                <MemberIcon $seed={member.iconSeed}>{member.icon}</MemberIcon>
                                <MemberName>{member.name}</MemberName>
                                <MemberRole>{member.role}</MemberRole>
                                <MemberBio>{member.bio}</MemberBio>
                            </MemberCard>
                        ))}
                    </MembersGrid>

                    <TariLabsNote>
                        <p>
                            <strong>Tari Labs</strong> participates in the Council as a member, not as its authority.
                            Its voice carries the weight of its contributions, nothing more. Over time, an increasing
                            share of operational control shall pass to the Council, until the protocol belongs fully to
                            those who choose to do the work.
                        </p>
                    </TariLabsNote>
                </Section>

                <Section>
                    <h3>Council Functions</h3>
                    <p>
                        The Council exists to uphold the vision declared in the Tari Manifesto, steward the
                        protocol&apos;s tokenomics, direct resources toward the common benefit, and ensure governance
                        rests with those who build it.
                    </p>

                    <FunctionsGrid>
                        {councilFunctions.map((fn) => (
                            <FunctionCard key={fn.title}>
                                <FunctionTitle>{fn.title}</FunctionTitle>
                                <FunctionDescription>{fn.description}</FunctionDescription>
                                <FunctionLead>Led by: {fn.lead}</FunctionLead>
                            </FunctionCard>
                        ))}
                    </FunctionsGrid>
                </Section>

                <Section>
                    <h3>Learn More</h3>
                    <p>
                        The full charter is published in{' '}
                        <ExternalLink
                            href="https://rfc.tari.com/TIP-0002_tari_community_charter"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            TIP-0002: The Tari Community Charter
                        </ExternalLink>
                        . It defines the Council&apos;s authority, how members serve, how decisions are made, and how
                        the community holds the Council accountable.
                    </p>
                    <p>
                        Governance discussions happen on the{' '}
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
