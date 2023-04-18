import styles from '@/styles/PageHeader.module.scss';

import Link from 'next/link';

const PageHeader = () => {
    return (
        <div>
            <Link href="/">Zia-Apps</Link>
            <Link href="/scan-receipt">Scan Receipt</Link>
        </div>
    )
}

export default PageHeader

