import styles from '@/styles/PageLayout.module.scss';

import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

const PageLayout = ({ children }: any) => {
    return (
        <Layout>
            <Header>
                <PageHeader />
            </Header>
            <Content>
                {children}
            </Content>
            <Footer>
                <PageFooter />
            </Footer>
        </Layout>
    )
}

export default PageLayout
