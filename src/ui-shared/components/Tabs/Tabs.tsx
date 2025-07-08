'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TabContainer, TabItem, Tabs, TabContent } from './styles';

interface TabProps {
    label: string;
    content: React.ReactNode;
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
                        {tabs[activeTab].content}
                    </motion.div>
                </AnimatePresence>
            </TabContent>
        </TabContainer>
    );
}

export default CodeBox;
