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
	cpf: {
		valieMissing: "O campo de CPF não pode estar vazio",
		customError: "O CPF digitado não é válido",
	},
};

const validators = {
	birthday: (input) => {
		validateBirthday(input);
	},
	cpf: (input) => {
		validateCpf(input);
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

function validateCpf(input) {
	const formattedCpf = input.value.replace(/\D/g, "");

	let message = "";

	if (!checkRepeatedCpf(formattedCpf) || !checkCpfStructure(formattedCpf)) {
		message = "O CPF digitado não é válido";
	}

	input.setCustomValidity(message);
}

function checkRepeatedCpf(cpf) {
	const repeatedValues = [
		"00000000000",
		"11111111111",
		"22222222222",
		"33333333333",
		"44444444444",
		"55555555555",
		"66666666666",
		"77777777777",
		"88888888888",
		"99999999999",
	];

	let validateCpf = true;

	repeatedValues.forEach((value) => {
		if (value === cpf) {
			validateCpf = false;
		}
	});

	return validateCpf;
}

function checkCpfStructure(cpf) {
	const multiply = 10;

	return checkVerifierNumber(cpf, multiply);
}

function checkVerifierNumber(cpf, multiply) {
	if (multiply >= 12) {
		return true;
	}

	let sum = 0;
	let aux = multiply;

	const cpfNumber = cpf.substr(0, multiply - 1).split("");
	const verifierDigit = cpf.charAt(multiply - 1);

	for (let i = 0; aux > 1; aux--) {
		sum += cpfNumber[i] * aux;
		i++;
	}

	if (verifierDigit == digitConfirm(sum)) {
		return checkVerifierNumber(cpf, multiply + 1);
	}

	return false;
}

function digitConfirm(sum) {
	let remainder = 11 - (sum % 11);

	if (remainder === 10 || remainder === 11) {
		remainder = 0;
	}

	return remainder;
}
