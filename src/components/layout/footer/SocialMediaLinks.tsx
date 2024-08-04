import React from 'react';
import { ButtonGroup, ButtonGroupProps, IconButton } from '@chakra-ui/react';
import { GithubOne, Zijinyunying } from '@icon-park/react';


export const SocialMediaLinks = (props: ButtonGroupProps) => {
	return (
		<ButtonGroup variant="ghost" {...props}>
			<IconButton
				as="a"
				href="https://github.com/xun0411/Short-URL"
				aria-label="GitHub"
				target="_blank"
				icon={<GithubOne size="20px" />}
			/>
			<IconButton
				as="a"
				href="https://github.com/xun0411"
				aria-label="Homepage"
				target="_blank"
				icon={<Zijinyunying size="20px" />}
			/>
		</ButtonGroup>
	);
}