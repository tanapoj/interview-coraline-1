import {} from ''

import Head from 'next/head'

import { Container } from '../components/Container'


interface IndexProps {

}

const Index: React.FC<IndexProps> = ({}) => {
    return (
        <>
            <Head>
                <title>Test</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                Container
            </Container>
        </>
    )
}

export default Index