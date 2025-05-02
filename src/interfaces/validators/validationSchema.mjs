import { checkSchema } from "express-validator"


export const validatesLoginUser = checkSchema ({
  email: {
    in: ['body'],
    isEmail: {
      errorMessage: "Email inválido",
      notEmpty: {
        errorMessage: "O campo Email precisa ser preenchido",
      },
    }
    },
    password: {
      in: ['body'],
      notEmpty: {
        errorMessage: "O campo senha não pode estar vazio",
      },
      isLength: {
        options: { min: 6 },
        errorMessage: "A senha precisa ter no mínimo 6 caracteres",
      },
      matches: {
        options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/,
        errorMessage:
          "A senha deve conter letra maiúscula, minúscula e caractere especial",
      },
    }
})