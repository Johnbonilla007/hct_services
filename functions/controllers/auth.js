const { Op } = require("sequelize");
const httpCode = require('../commons/HttpStatusCode.enum');
const info = require("../commons/Info.enum");
const messages = require("../commons/resources/messages");
const { encrypPasswordAsync, comparePassSync, isValidPassword } = require('../commons/utilities');

const { User, Affiliate } = require('../infrastructure/models');

const user_pass_required = {
    code: httpCode.BAD_REQUEST,
    message: 'El nombre de usuario y contaseña son requeridos!'
}

const user_not_exist = { code: httpCode.BAD_REQUEST, message: messages.userNotExist };
const invalid_password = { code: httpCode.BAD_REQUEST, message: messages.invalidPassword };

const getUserAsync = async (username, email) => await User.findOne({
    where: {
        [Op.or]: [ // Hace una consulta con un OR ==> (username OR email)
            {
                username: {
                    [Op.eq]: username,
                },
            },
            {
                email: {
                    [Op.eq]: email,
                },
            },
        ],
    }
});

// Cuando la respuesta es OK el titulo por default es CONFIRMACION

const signup = async (req, res, next) => {
    const { username, password, email, identification_card, name,
        phone, city, address, company } = req.body;

    if (!(username || email) || !password)
        return next(user_pass_required)

    if (!isValidPassword(password))
        return next(invalid_password);

    const user = await getUserAsync(username, email);
    if (user)
        return next({ code: httpCode.OK, title: info.ADVERTENCIA, message: messages.existUser })


    const hash = await encrypPasswordAsync(password);

    const newUser = {
        username, password: hash, email: email || null,
        Affiliate: {
            identification_card, name, email, phone, city,
            address, company
        }
    };

    const createdUser = await User.create(newUser, { include: Affiliate });

    const response = {
        uid: createdUser.uid,
        email: createdUser.email
    }

    next({ code: httpCode.OK, message: messages.createdSuccess('Usuario'), response });
}

const signin = async (req, res, next) => {
    const { username, password, email } = req.body;

    if (!(username || email) || !password)
        return next(user_pass_required)


    const user = await getUserAsync(username, email);
    if (!user)
        return next(user_not_exist);


    if (!comparePassSync(password, user.password))
        return next({ code: httpCode.BAD_REQUEST, message: messages.incorrectPassword })

    const response = {
        uid: user.uid,
    }

    next({ code: httpCode.OK, message: messages.successLogin, response })
}

const changePassword = async (req, res, next) => {
    const { username, password, email } = req.body;

    if (!(username || email) || !password)
        return next(user_pass_required);

    if (!isValidPassword(password))
        return next(invalid_password);

    const user = await getUserAsync(username, email);
    if (!user)
        return next(user_not_exist);


    if (comparePassSync(password, user.password))
        return next({ code: httpCode.BAD_REQUEST, message: messages.passMatchCurrent });


    const hash = await encrypPasswordAsync(password);

    user.update({ password: hash });

    next({ code: httpCode.OK, message: messages.updateSuccess('Contraseña') })
}


module.exports = auth = {
    signup,
    signin,
    changePassword
}