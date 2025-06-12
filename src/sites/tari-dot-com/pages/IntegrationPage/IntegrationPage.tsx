'use client';

import {
    Holder,
    Note,
    Wrapper,
    Columns,
    // IconWrapper,
    NetworkPill,
    NetworkPillContainer,
    NumberIcon,
    SectionDivider,
    NoteDivider,
    Image,
} from './styles';
import CodeBox from '@/ui-shared/components/CodeBox/CodeBox';
import Sidebar from '@/ui-shared/components/Sidebar/Sidebar';
import { devtoolsTabs } from './data/devtoolsSetup';
import { installBinariesTabs } from './data/installBinaries';
import { initializeNode } from './data/initializeNode';
import { createMonitoringWallet } from './data/createMonitoringWallet';
import { coldStorageWallet } from './data/coldStorageWallet';
import { generateDepositAddress } from './data/generateDepositAddress';
import { incomingTransactions } from './data/incomingTransactions';
import { validateWithdrawalRequest } from './data/validateWithdrawalRequest';
import { multilayerSecurityArchitecture } from './data/multilayerSecurityArchitecture';
import { processApprovedWithdrawals } from './data/processApprovedWithdrawals';
import { dockerDeployment } from './data/dockerDeployment';
import { commonIssues } from './data/commonIssues';
import { walletAPIMethods } from './data/walletAPIMethods';
import { basenodeAPIMethods } from './data/basenodeAPIMethods';
import { menuItems } from './data/menuItems';
import Image1 from './images/overview.svg';
import Image2 from './images/architecture.svg';
import Image3 from './images/depositflow.svg';
import Image4 from './images/withdrawalflow.svg';

export default function IntegrationPage() {
    return (
        <Wrapper>
            <Columns>
                <Sidebar menuTitle="Table of Contents" menuItems={menuItems} />
                <Holder>
                    <h1>Complete Tari Exchange Integration Guide</h1>

                    <Note $variant="default">
                        <strong>What You'll Learn: </strong>
                        <NoteDivider />
                        This comprehensive guide covers everything needed to integrate Minotari (XTM) into your
                        cryptocurrency exchange, from node setup to transaction monitoring and fund management. Every
                        example includes pseudocode for security understanding and grpcurl commands for testing.
                    </Note>
                    <Note $variant="warning">
                        ⚠️ <strong>Security Warning:</strong>
                        <NoteDivider />
                        This guide contains placeholder credentials and URLs marked as "PLACEHOLDER" or
                        "secure_password_here". Replace ALL placeholders with actual values and use secure credential
                        management (environment variables, secrets managers) in production. Never use hardcoded
                        credentials.
                    </Note>

                    <SectionDivider />
                    <h2 id="overview-architecture">🏗️ 1. Overview & Architecture</h2>
                    <Image src={Image1.src} alt="Overview and Architecture" />
                    <h3>🎯 Integration Components</h3>
                    <ul>
                        <li>
                            <strong>Minotari Base Node:</strong> Syncs with the Tari network and provides blockchain
                            data
                        </li>
                        <li>
                            <strong>Read-Only Wallet:</strong> Monitors incoming deposits without spending ability
                        </li>
                        <li>
                            <strong>Cold Storage Wallet:</strong> Secure wallet for processing withdrawals
                        </li>
                        <li>
                            <strong>gRPC Interface:</strong> API communication layer
                        </li>
                    </ul>

                    <h3>🌐 Network Support</h3>
                    <NetworkPillContainer>
                        <NetworkPill>🐢 Mainnet</NetworkPill>
                        <NetworkPill>📟 Testnet</NetworkPill>
                        <NetworkPill>🌈 Nextnet</NetworkPill>
                    </NetworkPillContainer>

                    <SectionDivider />
                    <h2 id="development-environment-setup">⚙️ 2. Development Environment Setup</h2>

                    <Note $variant="warning">
                        <strong>⚠️ Prerequisites:</strong>
                        <NoteDivider />
                        Before starting, ensure you have administrative access to your deployment environment and
                        understand basic cryptocurrency security principles.
                    </Note>

                    <h3>🔧 System Requirements</h3>
                    <ul>
                        <li>
                            <strong>OS:</strong> Linux (Ubuntu 20.04+), macOS (10.15+), or Windows 10+
                        </li>
                        <li>
                            <strong>RAM:</strong> Minimum 4GB, Recommended 8GB+
                        </li>
                        <li>
                            <strong>Storage:</strong> 50GB+ SSD for blockchain data
                        </li>
                        <li>
                            <strong>Network:</strong> Stable internet connection
                        </li>
                    </ul>

                    <h3>🛠️ Development Tools Setup</h3>
                    <CodeBox tabs={devtoolsTabs} />

                    <h3>📦 Install Tari Binaries</h3>
                    <CodeBox tabs={installBinariesTabs} />

                    <SectionDivider />
                    <h2 id="node-setup-configuration">🖥️ 3. Node Setup & Configuration</h2>

                    <Note $variant="info">
                        <strong>📍 Step 1:</strong>
                        <NoteDivider />
                        Setting up your Minotari base node is the foundation of your exchange integration. This node
                        will sync with the Tari network and provide blockchain data.
                    </Note>

                    <h3>🚀 Initial Node Setup</h3>

                    <h4>Pre-Setup Checklist:</h4>
                    <div>
                        <ul>
                            <li>Server meets minimum requirements</li>
                            <li>Firewall configured for Tari ports (18141, 18142, 18143)</li>
                            <li>Tor installed (Linux/macOS) or IP configured</li>
                            <li>Backup strategy planned</li>
                        </ul>
                    </div>

                    <h4>
                        <NumberIcon>1</NumberIcon>Initialize the Node
                    </h4>
                    <CodeBox tabs={initializeNode} />
                    <SectionDivider />
                    <h2 id="wallet-creation-management">💼 4. Wallet Creation & Management</h2>

                    <Note $variant="info">
                        <strong>💡 Concept:</strong>
                        <NoteDivider />
                        Your exchange needs two types of wallets: a read-only monitoring wallet for tracking deposits,
                        and a secure cold storage wallet for processing withdrawals.
                    </Note>

                    <h3>🔐 Wallet Architecture</h3>
                    <Image src={Image2.src} alt="Wallet Architecture" />
                    <h4>
                        <NumberIcon>1</NumberIcon>Create Monitoring Wallet
                    </h4>
                    <CodeBox tabs={createMonitoringWallet} />
                    <h4>
                        <NumberIcon>2</NumberIcon>Cold Storage Wallet Setup
                    </h4>

                    <Note $variant="warning">
                        <strong>🔒 Security Critical:</strong>
                        <NoteDivider />
                        The cold storage wallet should be on an air-gapped system or secure hardware wallet for maximum
                        security.
                    </Note>
                    <CodeBox tabs={coldStorageWallet} />

                    <SectionDivider />
                    <h2 id="deposit-monitoring">📥 5. Deposit Monitoring</h2>

                    <Note $variant="info">
                        <strong>💡 Concept:</strong>
                        <NoteDivider />
                        Users send funds to your exchange's one-sided address with a payment ID. Your system monitors
                        for these transactions and credits user accounts.
                    </Note>

                    {/* <h3>🔄 Deposit Flow</h3> */}
                    <Image src={Image3.src} alt="Deposit Flow" />
                    <h2>Diagram</h2>
                    <h4>
                        <NumberIcon>1</NumberIcon>Generate Deposit Address
                    </h4>
                    <CodeBox tabs={generateDepositAddress} />

                    <h4>
                        <NumberIcon>2</NumberIcon>Monitor for Incoming Transactions
                    </h4>
                    <CodeBox tabs={incomingTransactions} />

                    <SectionDivider />
                    <h2 id="withdrawal-processing">💸 6. Withdrawal Processing</h2>

                    <Note $variant="warning">
                        <strong>🔐 Security Alert:</strong>
                        <NoteDivider />
                        Withdrawal processing involves the cold storage wallet. Implement proper authorization, rate
                        limiting, and multi-signature approval processes.
                    </Note>

                    {/* <h3>🔄 Withdrawal Flow</h3> */}

                    <Image src={Image4.src} alt="Withdrawal Flow" />

                    <h4>
                        <NumberIcon>1</NumberIcon>Validate Withdrawal Request
                    </h4>

                    <CodeBox tabs={validateWithdrawalRequest} />

                    <h4>
                        <NumberIcon>2</NumberIcon>Process Approved Withdrawals
                    </h4>

                    <Note $variant="info">
                        <strong>🔒 Cold Storage Operation:</strong>
                        <NoteDivider />
                        This step requires access to the cold storage wallet. Ensure proper security protocols are
                        followed.
                    </Note>
                    <CodeBox tabs={processApprovedWithdrawals} />

                    <SectionDivider />
                    <h2 id="security-best-practices">🔐 7. Security Best Practices</h2>

                    <Note $variant="warning">
                        <strong>⚠️ Critical:</strong>
                        <NoteDivider />
                        Cryptocurrency exchange security requires defense in depth. Multiple layers of security are
                        essential to protect user funds.
                    </Note>

                    <h3>🛡️ Multi-Layer Security Architecture</h3>
                    <CodeBox tabs={multilayerSecurityArchitecture} />

                    <SectionDivider />
                    <h2 id="production-deployment">🚀 8. Production Deployment</h2>

                    <div className="info">
                        <strong>📋 Production Ready:</strong> Deploying Tari in production requires careful planning,
                        monitoring, and redundancy. This section covers Docker, Kubernetes, and monitoring setups.
                    </div>

                    <h3>🐳 Docker Deployment</h3>
                    <CodeBox tabs={dockerDeployment} />

                    <SectionDivider />
                    <h2 id="troubleshooting">🔧 9. Troubleshooting</h2>

                    <Note $variant="info">
                        <strong>🔧 Common Issues:</strong>
                        <NoteDivider />
                        This section covers the most frequently encountered problems and their solutions when
                        integrating Tari into exchanges.
                    </Note>

                    <h3>🐛 Common Issues and Solutions</h3>
                    <CodeBox tabs={commonIssues} />

                    <SectionDivider />
                    <h2 id="complete-api-reference">📚 10. Complete API Reference</h2>

                    <Note $variant="info">
                        <strong>📋 Complete Reference:</strong>
                        <NoteDivider />
                        All gRPC methods available for Tari wallet and base node integration with pseudocode and grpcurl
                        examples.
                    </Note>

                    <h3>💼 Wallet API Methods</h3>
                    <CodeBox tabs={walletAPIMethods} />

                    <h3>⛓️ Base Node API Methods</h3>
                    <CodeBox tabs={basenodeAPIMethods} />

                    <Note $variant="success">
                        <strong>🎉 Congratulations!</strong>
                        <NoteDivider />
                        You've completed the comprehensive Tari exchange integration guide with pseudocode explanations
                        and grpcurl testing examples. You now have all the tools and knowledge needed to successfully
                        integrate Minotari (XTM) into your cryptocurrency exchange with a deep understanding of each
                        operation.
                    </Note>

                    <h3>📞 Support and Resources</h3>

                    <ul>
                        <li>
                            <strong>Documentation:</strong>{' '}
                            <a href="https://rfc.tari.com" target="_blank">
                                https://rfc.tari.com
                            </a>
                        </li>
                        <li>
                            <strong>GitHub Repository:</strong>{' '}
                            <a href="https://github.com/tari-project/tari" target="_blank">
                                https://github.com/tari-project/tari
                            </a>
                        </li>
                        <li>
                            <strong>Discord Community:</strong>{' '}
                            <a href="https://discord.gg/tari" target="_blank">
                                https://discord.gg/tari
                            </a>
                        </li>
                        <li>
                            <strong>Downloads:</strong>{' '}
                            <a href="https://tari.com/downloads/" target="_blank">
                                https://tari.com/downloads/
                            </a>
                        </li>
                        <li>
                            <strong>grpcurl Documentation:</strong>{' '}
                            <a href="https://github.com/fullstorydev/grpcurl" target="_blank">
                                https://github.com/fullstorydev/grpcurl
                            </a>
                        </li>
                    </ul>

                    <Note $variant="info">
                        <strong>💡 Next Steps:</strong>
                        <NoteDivider />
                        <ul>
                            <li>Test all pseudocode logic before implementing</li>
                            <li>Use grpcurl examples to validate your gRPC setup</li>
                            <li>Test the integration thoroughly on testnet</li>
                            <li>Implement comprehensive monitoring and alerting</li>
                            <li>Set up proper backup and disaster recovery procedures</li>
                            <li>Conduct security audits before going live</li>
                            <li>Join the Tari community for ongoing support</li>
                        </ul>
                    </Note>
                </Holder>
            </Columns>
        </Wrapper>
    );
}
