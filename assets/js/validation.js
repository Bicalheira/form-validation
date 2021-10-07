export function validate(input) {
	const inputType = input.dataset.type;

	if (validators[inputType]) {
		validators[inputType](input);
	}

	if (input.validity.valid) {
		input.parentElement.classList.remove("input-container--invalido");
		input.parentElement.querySelector(".input-mensagem-erro").innerHTML = "";
	} else {
		input.parentElement.classList.add("input-container--invalido");
		input.parentElement.querySelector(".input-mensagem-erro").innerHTML = showErrorMessage(inputType, input);
	}
}

const errorTypes = [
	// "badInput",
	"customError",
	"patternMismatch",
	// "rangeOverflow",
	// "rangeUnderflow",
	// "stepMismatch",
	// "tooLong",
	// "tooShort",
	"typeMismatch",
	"valueMissing",
];

const errorMessages = {
	name: {
		valueMissing: "O campo nome não pode estar vazio",
	},
	email: {
		valueMissing: "O campo e-mail não pode estar vazio",
		typeMismatch: "O e-mail digitado não é valido",
	},
	password: {
		valueMissing: "O campo senha não pode estar vazio",
		patternMismatch:
			"A senha deve conter entre 6 a 12 caracteres, deve conter pelo menos uma letra maiuscula, um número e não deve conter simbolos",
	},
	birthday: {
		valueMissing: "O campo de data de nascimento não pode estar vazio",
		customError: "Você deve ser maior que dezoito (18) anos para se cadastrar",
	},
};

const validators = {
	birthday: (input) => {
		validateBirthday(input);
	},
};

function showErrorMessage(inputType, input) {
	let message = "";

	errorTypes.forEach((error) => {
		if (input.validity[error]) {
			message = errorMessages[inputType][error];
		}
	});

	return message;
}

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
