const localized = {
    en: {
        not_owner: 'You are not permitted to use this command!',
        evaluate_error: 'While evaluating an error occurred: ```js\n{err}```'
    },
    ru: {
        not_owner: 'У вас нет прав чтобы использовать эту команду!',
        evaluate_error: 'При выполнении произошла ошибка: ```js\n{err}```'
    }
}

function getLocalized(locale) {
    return localized[locale];
}

const evaluate = function evaluate(str, message, dep) {
    const doReply = val => {
        if(val instanceof Error) {
            message.channel.send(`Error (Callback): \`\`\`js\n${val}\`\`\``);
        } else {
            message.channel.send(`Callback: \`\`\`js\n${val}\`\`\``);
        }
    };
    
    const getMethods = (obj) => {
        let properties = new Set();
        let currentObj = obj;
        do {
            Object.getOwnPropertyNames(currentObj).map(item => properties.add(item));
        } while ((currentObj = Object.getPrototypeOf(currentObj)));
        return [...properties.keys()].filter(item => typeof obj[item] === 'function').join().split(',').join('!!NL!!');
    }
    
    with (dep) {
        let inspected = require('util').inspect(eval(str), { depth: 0 })
            .replace(new RegExp('!!NL!!', 'g'), '\n');
        if(!inspected) inspected = 'undefined';
        return inspected;
    }
}

module.exports.eval = evaluate;

module.exports.Eval = class Eval {
    constructor (owners, locale) {
        if(locale != 'en') {
			if(locale != 'ru') {
				throw new Error('Locale must be \'ru\' or \'en\'');
			}
        }
        this.owners = owners;
        this.locale = locale;
    }

    async run(message, dep) {
        if(!(this.owners.includes(`${message.member.id}`))) {
            message.channel.send(getLocalized(this.locale).not_owner);
            return;
        }
        try {
            let code = message.content.trim().split(' ').slice(1).join(' ');
            let evaluated = await evaluate(code, message, dep);
            await message.channel.send('```js\n' + evaluated + '```');
        } catch (e) {
            await message.channel.send(getLocalized(this.locale).evaluate_error.replace('{err}', e));
        }
    }
}