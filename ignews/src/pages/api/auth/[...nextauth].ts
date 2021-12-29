import { query } from 'faunadb';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { fauna } from '../../../services/fauna';

export default NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	secret: process.env.SECRET,
	callbacks: {
		signIn: async ({ user }) => {
			try {
				await fauna.query(
					query.If(
						// condition
						query.Not(query.Exists(query.Match(query.Index('user_by_email'), query.Casefold(user.email)))),
						// then
						query.Create(query.Collection('users'), { data: { email: user.email } }),
						// else
						query.Get(query.Match(query.Index('user_by_email'), query.Casefold(user.email)))
					)
				);

				return true;
			} catch (error) {
				console.error(error);
				return false;
			}
		},
	},
});
