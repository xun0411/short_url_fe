/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,

	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'https://netlab.isu.edu.tw:59562/api/:path*',
			},
		]
	},
};

module.exports = nextConfig;