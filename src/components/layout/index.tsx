import React, { ReactNode } from 'react';
import Head from 'next/head';
import { Box } from '@chakra-ui/react';

import { Header } from './header';
import { Footer } from './footer';


interface IProps {
	children: ReactNode
}

export const Layout = ({ children }: IProps) => {
	return (
		<>
			<Head>
				<title>URL-Shortener</title>
				<link rel="icon" href="../../../public/favicon.ico" />
			</Head>
			<Box>
				<Header />
				<Box
					as="main"
					mx="auto"
					minH="73vh"
					py="3"
				>
					{children}
				</Box>
				<Footer />
			</Box>
		</>
	);
}