import BugBountyPage from '@/sites/tari-dot-com/pages/BugBountyPage/BugBountyPage';
import { Metadata } from 'next';
import { canonicalUrl } from '@/utils/metadata';

export const metadata: Metadata = {
    title: 'Bug Bounty',
    description:
        'Learn about the Tari Bug Bounty Program — rewards, scope, disclosure process, eligibility requirements, and rules of engagement for ethical security research.',
    ...canonicalUrl('/bug-bounty'),
};

export default function Page() {
    return <BugBountyPage />;
}
