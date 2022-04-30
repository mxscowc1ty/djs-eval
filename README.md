# @moscowcity/djs-eval

This package helps you quickly evaluate any thing via discord.js bot.

  - 2 lines setup!
  - Multilanguage!

### Installation

Package requires [Node.js](https://nodejs.org/) v10+ to run.

Install package using this command:
```sh
$ npm install @moscowcity/djs-eval
```
### Usage
First, declare requirement.

```js
const _eval = require('@moscowcity/djs-eval');
```
Then create command:
```js
const _evalCommand = new _eval.Eval([ 'owner', 'Ids' ], 'locale'); // Locales: ru/en
```
Only 1 thing left, call 'run' function. 2nd argument
```js
_evalCommand.run(messageObject);
```

To run with dependencies (client, message, args, etc) use this:
```js
_evalCommand.run(messageObject, {bot: client, etc: 'etc'});
```

### Example eval command
```js
const _eval = require("@moscowcity/djs-eval");
const Eval = new _eval.Eval(["323424226889433088"], "ru");

module.exports.run = async (client, message) => {
  const evaluated = await Eval.run(message, { bot: 0 });
  message.channel.send({ content: '```JS\n' + evaulated + '```'}); // or message.reply('```JS\n' + evaulated + '```');
};
```

Imagine that message content is:
```js
const moment = require("moment")
moment(Date.now()).format("DD.MM.YYYY HH:mm")
```

If author id is not the same as specified, output message:
```js
You are not permitted to use this command!
```

If everything is correct, output message:
```js
06.08.2021 11:47 // example
```

### Included methods
Reply from code with .catch(), or just send callback
use 'doReply()' or 'doReply' in your code.
To make callback with error, use doReply in .catch():
```js
doReply('test');
or
doSomething().then(doSomethingElse()).catch(doReply);
```
To get all methods of class, use 'getMethods(obj)'
```js
doReply(getMethods(require('@moscowcity/djs-eval')))
```