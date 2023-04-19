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
            <Content style={{ padding: '66px' }}>
                {children}
            </Content>
            <Footer>
                <PageFooter />
            </Footer>
        </Layout>
    )
}

export default PageLayout
