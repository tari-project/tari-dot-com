'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TabContainer, TabItem, Tabs, TabContent, CopyBoxContainer, CodeContainer } from './styles';
import CopyBox from '../CopyBox/CopyBox';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// export const devtoolsTabs = [
//     {
//         label: 'Node.js',
//         language: 'js',
//         content:
//             '# Install Node.js 18+ and npm\ncurl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -\nsudo apt-get install -y nodejs\n\n# Install gRPC packages\nnpm install @grpc/grpc-js @grpc/proto-loader\n\n# Install additional utilities\nnpm install axios lodash',
//     },
// ];

interface TabProps {
    label: string;
    language?: 'javascript' | 'python' | 'rust' | 'php' | 'bash' | 'text';
    content: string | React.ReactNode;
}

interface CodeBoxProps {
    tabs: TabProps[];
}

function CodeBox({ tabs }: CodeBoxProps) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <TabContainer>
            <Tabs>
                {tabs.map((tab, index) => (
                    <TabItem key={index} $isActive={activeTab === index} onClick={() => setActiveTab(index)}>
                        {tab.label}
                    </TabItem>
                ))}
            </Tabs>
            <TabContent>
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.3 } }}
                        exit={{ opacity: 0, transition: { duration: 0.3 } }}
                        style={{ willChange: 'opacity', width: '100%', position: 'relative' }}
                    >
                        <CopyBoxContainer>
                            <CopyBox content={tabs[activeTab].content?.toString() || ''} />
                        </CopyBoxContainer>
                        <CodeContainer>
                            <SyntaxHighlighter
                                language={tabs[activeTab].language || 'text'}
                                style={docco}
                                customStyle={{
                                    backgroundColor: 'transparent',
                                    width: '100%',
                                }}
                                showLineNumbers
                                wrapLines
                                lineNumberStyle={{ color: 'rgba(0,0,0,0.3)', fontSize: '0.8em' }}
                            >
                                {tabs[activeTab].content?.toString() || ''}
                            </SyntaxHighlighter>

                            {/* <code>{tabs[activeTab].content}</code> */}
                        </CodeContainer>
                    </motion.div>
                </AnimatePresence>
            </TabContent>
        </TabContainer>
    );
}

export default CodeBox;
