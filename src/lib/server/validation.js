/**
 * Request body validation for the API routes.
 *
 * The previous endpoints trusted whatever JSON arrived — /api/update-email
 * inserted any string it was given straight into the mailing list, and the
 * contact endpoint would happily email an empty form. Validating server-side
 * matters because the client checks are only a convenience; the endpoint is
 * reachable directly.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class ValidationError extends Error {
	constructor(message) {
		super(message);
		this.name = 'ValidationError';
	}
}

function str(value) {
	return typeof value === 'string' ? value.trim() : '';
}

export function validateEmail(body) {
	const email = str(body?.email);

	if (!email) throw new ValidationError('An email address is required.');
	if (email.length > 254) throw new ValidationError('That email address is too long.');
	if (!EMAIL.test(email)) throw new ValidationError('That email address looks incorrect.');

	return { email };
}

export function validateContact(body) {
	const firstName = str(body?.firstName);
	const lastName = str(body?.lastName);
	const email = str(body?.email);
	const number = str(body?.number);
	const message = str(body?.message);

	if (firstName.length < 2) throw new ValidationError('Please enter your first name.');
	if (lastName.length < 1) throw new ValidationError('Please enter your last name.');
	if (!EMAIL.test(email)) throw new ValidationError('Please enter a valid email address.');
	if (number.replace(/\D/g, '').length < 10)
		throw new ValidationError('Please enter a valid phone number.');
	if (message.length < 10) throw new ValidationError('Please tell us a little more.');
	if (message.length > 5000) throw new ValidationError('That message is too long.');

	return { firstName, lastName, email, number, message };
}
