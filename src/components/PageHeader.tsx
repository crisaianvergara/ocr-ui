import styles from '@/styles/PageHeader.module.scss';

import Link from 'next/link';

import { theme, Menu } from 'antd';
import type { MenuProps } from 'antd';

const items: MenuProps['items'] = [
    {
        label: (
            <Link className={styles.navLink} href="/">
                Home
            </Link>
        ),
        key: 'home',
    },
    {
        label: (
            <Link className={styles.navLink} href="/users">
                Users
            </Link>
        ),
        key: 'users',
    },
    {
        label: (
            <Link className={styles.navLink} href="/receipts">
                Receipts
            </Link>
        ),
        key: 'scan-receipt',
    }
];

const PageHeader = () => {
    return (
        <div className={styles.container}>
            <Menu className={styles.menu} mode="horizontal" items={items} theme="dark" />
        </div >
    )
}

export default PageHeader

