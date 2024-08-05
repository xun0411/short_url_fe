import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import {
    Center,
    Heading,
    Box,
    Stack,
    HStack,
    VStack,
    Button,
    IconButton,
    Spacer,
    Input,
    useColorModeValue,
    useToast,
    useClipboard
} from '@chakra-ui/react';
import { Check, Copy, Refresh } from '@icon-park/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import isUrl from 'is-url';

import { Layout } from '../src/components/layout';
import { NextChakraLink } from '../src/components/NextChakraLink';
import { LoadType } from '../src/@types/Response.types';

import type { AxiosResponse } from 'axios';
import type { NextPage } from 'next';
import type { ResultData } from '../src/@types/Response.types';


interface UrlData {
    user_id: number | null;             // 引用使用者的id    (INT)
    long_url: string;                   // 原始網址          string(1000)
    // created_at: string;              // 添加時間          Date
    expire_date: number | null;         // 過期時間(分)      (INT_UNSIGNED)
    password: string | null;            // 密碼              string(128)
}

export async function getStaticProps() {
    return {
        props: {},
    };
}


const Home: NextPage = () => {

    const toast = useToast();

    const inputActiveBg = useColorModeValue('gray.300', 'rgba(132,133,141,0.24)');
    const bgColor = useColorModeValue('gray.200', 'rgba(132,133,141,0.12)');

    const [longUrl, setUrl] = useState<string>('');
    const [shortUrl, setShortUrl] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const { hasCopied, onCopy } = useClipboard(shortUrl, 5000);


    const handleClick = async () => {

        setLoading(true);
        //------------------------------------------//
        const sendData: UrlData = {
            user_id: null,
            long_url: longUrl,
            expire_date: null,
            password: null
        };
        console.log(sendData);

        const res: AxiosResponse<ResultData, any> = await axios.post('/api/urldata/CreateOne', sendData);
        //------------------------------------------//
        setLoading(false);
        console.log(res.data);


        if (res.data.loadType == LoadType.SUCCEED) {
            setShortUrl(`${process.env.NEXT_PUBLIC_URL_HOST + (res.data.data[0] as any).short_url}`);
        }
        else if (res.data.loadType == LoadType.DATA_EXISTED) {
            setShortUrl(`${process.env.NEXT_PUBLIC_URL_HOST + (res.data.data[0] as any).short_url}`);
        }
        else {
            toast({
                title: 'shortError',
                status: 'error',
                position: 'top',
                isClosable: true,
            });
        }
    }

    return (
        <Layout>
            <Center>
                <Heading>
                    Short-URL
                </Heading>
            </Center>
            <VStack minH="30vh" padding={3} spacing={10} mt={'100px'}>
                <HStack
                    as={'form'}
                    spacing={0}
                    borderWidth={1}
                    rounded="lg"
                    backgroundColor={bgColor}
                    _focusWithin={{
                        backgroundColor: inputActiveBg,
                    }}
                    _hover={{
                        backgroundColor: inputActiveBg,
                    }}
                    width={{ base: '350px', md: '500px', lg: '700px' }}
                >
                    <Input
                        backgroundColor={'transparent'}
                        rounded="lg"
                        border={'none'}
                        variant="filled"
                        size={{ base: 'md', md: 'lg' }}
                        defaultValue={longUrl}
                        onChange={(e) => setUrl(e.currentTarget.value)}
                    />
                    <IconButton
                        type="submit"
                        aria-label={'search'}
                        icon={<Refresh />}
                        variant="ghost"
                        isDisabled={!isUrl(longUrl)}
                        onClick={handleClick}
                        isLoading={loading}
                    />
                </HStack>

                {shortUrl.length > 0 ? (
                    <>
                        <Box
                            w={{ base: 'xs', sm: 'sm', md: 'md', lg: '3xl' }}
                            p={{ base: 3, md: 7 }}
                            rounded="lg"
                            borderStyle="dotted"
                            borderWidth="3px"
                        >
                            <Stack
                                direction={{ base: 'column', md: 'row' }}
                                alignItems="center"
                                textAlign="center"
                            >
                                <NextChakraLink href={shortUrl} color="blue.500">
                                    {shortUrl}
                                </NextChakraLink>
                                <Spacer />
                                <CopyToClipboard text={shortUrl}>
                                    <Button
                                        w={{ base: '3xs', md: '25%' }}
                                        p={3}
                                        onClick={onCopy}
                                        leftIcon={hasCopied ? <Check fill="#7ed321" /> : <Copy />}
                                    >
                                        {hasCopied ? 'copied' : 'copy'}
                                    </Button>
                                </CopyToClipboard>
                            </Stack>
                        </Box>
                    </>
                ) : null}
            </VStack>
        </Layout>
    );
}
export default Home;