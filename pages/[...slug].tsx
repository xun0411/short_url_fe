import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';

import { LoadType } from '../src/@types/Response.types';

import type { ResultData } from '../src/@types/Response.types';


const ShortUrlHandler = () => {
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        if (slug) {
            const path = Array.isArray(slug) ? slug.join('/') : slug;

            const getLongUrl = async () => {
                try {
                    const res: AxiosResponse<ResultData, any> = await axios.get(`/api/urldata/getOneUrl?short_url=${path}`);
                    // console.log('/api/urldata/getOneUrl', res.data);

                    if (res.data.loadType === LoadType.SUCCEED) {
                        const longUrl = (res.data.data[0] as any).long_url;
                        window.location.href = longUrl;
                    }
                    else {
                        // 404
                        document.location.href = '/';
                    }
                } catch (error) {
                    console.error('Error fetching URL:', error);
                    document.location.href = '/';
                }
            };
            getLongUrl();
        }
    }, [slug]);


    return (
        <div>
            <h1>Redirecting...</h1>
        </div>
    );
};

export default ShortUrlHandler;
