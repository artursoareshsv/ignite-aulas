import { query } from 'faunadb';
import { fauna } from '../../../services/fauna';
import { stripe } from '../../../services/stripe';

export async function saveSubscription(subscriptionId: string, costumerId: string) {
	const userRef = fauna.query(query.Select('ref', query.Get(query.Match(query.Index('user_by_stripe_costumer_id'), costumerId))));
	const subscription = await stripe.subscriptions.retrieve(subscriptionId);

	const subscriptionData = {
		id: subscription.id,
		userId: userRef,
		status: subscription.status,
		price_id: subscription.items.data[0].price.id,
	};

	await fauna.query(query.Create(query.Collection('subscriptions'), { data: subscriptionData }));
}
