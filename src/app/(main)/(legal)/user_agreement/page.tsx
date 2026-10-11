import UserAgreement from '@/sites/tari-dot-com/pages/LegalPages/UserAgreement';
import { Metadata } from 'next';
import { canonicalUrl } from '@/utils/metadata';

export const metadata: Metadata = {
    title: 'User Agreement',
    description: 'View the Tari Labs user agreement.',
    ...canonicalUrl('/user_agreement'),
};

export default function Page() {
    return <UserAgreement />;
}
