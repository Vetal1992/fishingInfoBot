const { firstMenu, adminMenu, howWorkingBotKeyboard, modeHTML, fishOptions, whenYouGoing, friendsMenu } = require('./menuOptions')
const { watherOpacity, infoForTemp, precipitation, watherSpeed, watherLevel } = require('./weatherOther')
const { howWorkingBot } = require('./snastiOptions')
const sqlite3 = require('sqlite3').verbose();
const admin = 444452344
const friends = [942116083, 131780376, 521546639, 895363578, 302785783]

async function mainMenu(bot, chatId, text, msg, fishOption, delay, choiseOblast, specialPlaces, messageForUsers) {
    switch (text) {
        case ('Трохи про температуру'): { return bot.sendMessage(chatId, infoForTemp, modeHTML) }
        case ('Опади'): { return bot.sendMessage(chatId, precipitation, modeHTML) }
        case ('Швидкість течії'): { return bot.sendMessage(chatId, watherSpeed, modeHTML) }
        case ('Рівень води'): { return bot.sendMessage(chatId, watherLevel, modeHTML) }
        case ('Прозорість'): { return bot.sendMessage(chatId, watherOpacity, modeHTML) }
        case ('НА ГОЛОВНУ'): {
            return chatId === admin
                ? bot.sendMessage(admin, 'Вітаю на початковому екрані', adminMenu)
                : (friends.includes(msg.from.id)
                    ? bot.sendMessage(chatId, 'Вітаю на початковому екрані', friendsMenu)
                    : bot.sendMessage(chatId, 'Вітаю на початковому екрані', firstMenu))
        }
        case ('Наші місця'): { return bot.sendMessage(chatId, 'Місця рибалки для еліти', specialPlaces) }
        case ('Обрати область'): { return choiseOblast(chatId) }
        case ('Відправити повідомлення'): { return bot.sendMessage(admin, `Для відправки повідомлення всім користувачам, введіть повідомлення яке хочете відправити і допишіть кодове слово "йцукен"`) }
        case (`Зв'язок з адміном`): { return bot.sendMessage(chatId, `Ваші зауваження і пропозиції можете написати сюди: @Vitalii_Chernish`) }
        case ('Риба інфо'): {
            return chatId === admin
                ? bot.sendMessage(admin, 'риба', fishOptions)
                : bot.sendMessage(chatId, `Тут зібрані рекомендації щодо лову.`, fishOptions)
        }
        case ('/start'): {
            const lastName = msg.from.last_name ? msg.from.last_name : '!'
            return msg.from.id === admin
                ? bot.sendMessage(chatId, 'Hello admin!', adminMenu)
                : (friends.includes(msg.from.id)
                    ? bot.sendMessage(chatId, `Hi ${msg.from.first_name}` + lastName, friendsMenu)
                    : bot.sendMessage(chatId, `Hi ${msg.from.first_name}` + lastName, firstMenu))
        }
        case ('Додаткові параметри'): { return bot.sendMessage(chatId, howWorkingBot, howWorkingBotKeyboard) }
        case ('Аналіз шансу на кльов'): {
            bot.sendMessage(chatId, 'Бот розраховує шанс на кльов', fishOption)
            await delay(500)
            if (friends.includes(msg.from.id)) {
                return bot.sendMessage(chatId, 'Зосередьтесь на кількох варіантах, успіхів.', friendsMenu)
            }
            if (msg.from.id === admin) {
                return bot.sendMessage(chatId, 'Зосередьтесь на кількох варіантах, успіхів.', adminMenu)
            }
            return bot.sendMessage(chatId, 'Зосередьтесь на кількох варіантах, успіхів.', firstMenu)
        }
        case ('Почати роботу'): {
            bot.sendMessage(chatId, 'Коли плануєте йти на рибалку?', whenYouGoing)
        }
    }
    if (text.match('йцукен')) {
        messageForUsers()
    }
}

module.exports = {
    mainMenu
}