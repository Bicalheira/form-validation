export function validate(input) {
	const inputType = input.dataset.type;

	if (validators[inputType]) {
		validators[inputType](input);
	}
}

const validators = {
	birthday: (input) => {
		validateBirthday(input);
	},
};

function validateBirthday(input) {
	const getDate = new Date(input.value);

	let message = "";

	!ageMajority(getDate) ? (message = "Você deve ser maior que dezoito (18) anos para se cadastrar") : (message = "");

	input.setCustomValidity(message);
}

function ageMajority(date) {
	const actualDate = new Date();
	const ageMajority = new Date(date.getUTCFullYear() + 18, date.getUTCMonth() + date.getUTCDate());

	return ageMajority <= actualDate;
}
