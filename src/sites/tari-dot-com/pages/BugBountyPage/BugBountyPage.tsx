'use client';

import { Wrapper, Section, Body, Heading, List, ListItem, ExternalLink } from './styles';

export default function BugBountyPage() {
    return (
        <Wrapper>
            <Section>
                <Heading>Bug Bounty Program</Heading>

                <Body>
                    The{' '}
                    <ExternalLink href="https://github.com/tari-project/bounties">Tari Bug Bounty Program</ExternalLink>{' '}
                    is designed for a community-centric problem-solving approach for the Tari ecosystem.
                </Body>

                <Body>
                    At Tari, security is fundamental to our mission. We highly value the contributions of ethical
                    hackers who help us uphold the highest standards of security across the Tari ecosystem. While Tari
                    has undergone rigorous professional audits and formal verification, it operates on evolving
                    technology that may still contain undiscovered vulnerabilities.
                </Body>

                <Body>
                    We encourage the community to actively audit our smart contracts and infrastructure and responsibly
                    disclose any security concerns. This program is designed to incentivize responsible security
                    research, outlining the expectations for ethical vulnerability disclosure and the rewards available
                    for eligible findings.
                </Body>

                <Heading as="h3">Rewards</Heading>

                <Body>
                    Tari offers substantial rewards for vulnerabilities that could lead to the loss or freezing of
                    assets or otherwise cause harm to users. The reward amount is determined based on the severity and
                    exploitability of the vulnerability. Eligible discoveries may receive rewards ranging from $X to $X,
                    in accordance with the terms outlined below.
                </Body>

                <Heading as="h3">Scope</Heading>

                <Body>
                    <strong>Primary Scope:</strong>
                </Body>

                <Body>
                    The primary focus of the bug bounty program is vulnerabilities impacting the on-chain Tari Protocol,
                    deployed on Ethereum Mainnet, specifically for the contract addresses listed in this developer
                    documentation. This scope is subject to change as new contracts are deployed or existing contracts
                    are deprecated.
                </Body>

                <Body>
                    <strong>Out-of-scope</strong> items include:
                </Body>

                <List>
                    <ListItem>
                        Vulnerabilities in third-party contracts built on top of Tari (e.g., smart contract wallets).
                    </ListItem>
                    <ListItem>Issues that require admin key ownership.</ListItem>
                </List>

                <Body>
                    <strong>Secondary Scope:</strong>
                </Body>

                <Body>
                    The program also includes vulnerabilities affecting the Tari Interface hosted at{' '}
                    <ExternalLink href="https://tari.com">tari.com</ExternalLink>, particularly those that could lead to
                    unauthorized account access or asset manipulation.
                </Body>

                <Body>
                    <strong>Out of Scope:</strong>
                </Body>

                <Body>
                    * Vulnerabilities affecting test environments (Rinkeby, other testnets, and staging servers), unless
                    they also impact the Tari Protocol or Interface in a way that could put user funds at risk.
                </Body>

                <Heading as="h3">Disclosure Process</Heading>

                <Body>
                    All vulnerability disclosures should be submitted to{' '}
                    <ExternalLink href="mailto:info@tari.com">info@tari.com</ExternalLink> with detailed steps for
                    reproducing the issue. Reports may be submitted in written or video format to ensure clarity. Tari
                    will acknowledge all valid submissions promptly.
                </Body>

                <Heading as="h3">Eligibility Requirements</Heading>

                <Body>To qualify for a bounty reward, you must:</Body>

                <List>
                    <ListItem>
                        Identify a previously unreported, original, and non-public vulnerability within the defined
                        scope.
                    </ListItem>
                    <ListItem>
                        Provide a detailed disclosure that enables Tari engineers to reproduce and resolve the issue
                        efficiently.
                    </ListItem>
                    <ListItem>Be at least 18 years old.</ListItem>
                    <ListItem>
                        Submit your report individually or with documented company approval (if submitting on behalf of
                        an organization).
                    </ListItem>
                    <ListItem>Not be subject to U.S. sanctions or reside in a U.S.-embargoed country.</ListItem>
                    <ListItem>
                        Not be a current or former Tari employee, vendor, contractor, or affiliate of a vendor or
                        contractor.
                    </ListItem>
                </List>

                <Heading as="h3">Rules of Engagement</Heading>

                <Body>
                    To encourage ethical security research and distinguish good-faith efforts from malicious activity,
                    researchers must:
                </Body>

                <List>
                    <ListItem>
                        Follow program terms and any other applicable agreements. If conflicts arise, the bug bounty
                        program terms take precedence.
                    </ListItem>
                    <ListItem>Report vulnerabilities promptly.</ListItem>
                    <ListItem>
                        Avoid causing harm, including privacy violations, service disruptions, or data loss.
                    </ListItem>
                    <ListItem>
                        Use only <ExternalLink href="mailto:info@tari.com">info@tari.com</ExternalLink> for all
                        communications regarding vulnerabilities.
                    </ListItem>
                    <ListItem>
                        Maintain confidentiality regarding discovered vulnerabilities until they are patched.
                    </ListItem>
                    <ListItem>
                        Limit testing to in-scope systems and avoid interacting with accounts not explicitly authorized
                        for testing.
                    </ListItem>
                    <ListItem>Refrain from extortion, blackmail, or any unlawful activities.</ListItem>
                </List>

                <Heading as="h3">What You Can Expect from Tari</Heading>

                <Body>
                    When engaging with Tari under{' '}
                    <ExternalLink href="https://github.com/tari-project/bounties">this program</ExternalLink>, we commit
                    to:
                </Body>

                <List>
                    <ListItem>
                        Offering competitive rewards for eligible findings, with payouts determined based on severity
                        and exploitability at Tari&apos;s discretion.
                    </ListItem>
                    <ListItem>
                        Providing Safe Harbour for researchers who comply with program guidelines, ensuring Tari will
                        not pursue legal action against those acting in good faith.
                    </ListItem>
                    <ListItem>
                        Validating and acknowledging reports promptly, including an initial response and further
                        investigation.
                    </ListItem>
                    <ListItem>Addressing vulnerabilities on time.</ListItem>
                    <ListItem>
                        Recognizing your contributions if you are the first to report a valid vulnerability that results
                        in a code or configuration change.
                    </ListItem>
                </List>

                <Body>
                    All decisions regarding eligibility, reward amounts, and payout determinations are made at
                    Tari&apos;s sole discretion. Tari reserves the right to reject submissions and modify the terms of
                    this program at any time.
                </Body>
            </Section>
        </Wrapper>
    );
}
