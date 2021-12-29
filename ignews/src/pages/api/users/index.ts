/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
	const users = [
		{ id: 1, name: 'John Doe' },
		{ id: 2, name: 'Jane Doe' },
		{ id: 3, name: 'Jay Doe' },
	];

	return res.json(users);
};
