import '@/styles/globals.scss';

import type { AppProps } from 'next/app'

import PageLayout from '@/components/PageLayout'

import { Provider } from 'react-redux';
import { wrapper } from '@/reducers/store';

export default function App({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const { pageProps } = props;
    return (
        <PageLayout>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </PageLayout>
    )
}
