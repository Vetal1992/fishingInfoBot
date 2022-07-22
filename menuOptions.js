module.exports = {
    fishOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Карась', callback_data: "Карась " }, { text: 'Щука', callback_data: "Щука " }, { text: 'Лящ', callback_data: "Лящ " }],
                [{ text: 'Судак', callback_data: "Судак " }, { text: 'Короп', callback_data: "Короп " }, { text: 'Голавлик', callback_data: "Голавлик " }],
                [{ text: 'Окунь', callback_data: "Окунь " }, { text: 'Лин', callback_data: "Лин " }, { text: 'Сом', callback_data: "Сом " }],
                [{ text: 'Налим', callback_data: "Налим " }, { text: 'БілийАмур', callback_data: "БілийАмур " }],
            ]
        })
    },
    whenYouGoing: {
        parse_mode: 'HTML',
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Зараз', callback_data: 'Зараз' }, { text: 'Завтра', callback_data: 'Завтра' }, { text: 'Післязавтра', callback_data: 'Післязавтра' }]
            ]
        })
    },
    unswearMenu: {
        parse_mode: 'HTML',
        reply_markup: {
            keyboard: [
                [{ text: 'Аналіз шансу на кльов' }],
                [{ text: `Обрати область` }]
            ]
        }
    },
    howWorkingBotKeyboard: {
        parse_mode: 'HTML',
        reply_markup: {
            keyboard: [
                [{ text: 'НА ГОЛОВНУ' }, { text: 'Рівень води' }],
                [{ text: `Швидкість течії` }, { text: 'Прозорість' }],
                [{ text: `Трохи про температуру` }, { text: 'Опади' }]
            ]
        }
    },
    firstMenu: {
        parse_mode: 'HTML',
        reply_markup: {
            keyboard: [
                [{ text: 'Почати роботу' }],
                [{ text: 'Додаткові параметри' }, { text: 'Риба інфо' }],
                [{ text: `Зв'язок з адміном` }]
            ]
        }
    },
    adminMenu: {
        parse_mode: 'HTML',
        reply_markup: {
            keyboard: [
                [{ text: 'Почати роботу' }, { text: 'Наші місця' }],
                [{ text: 'Додаткові параметри' }, { text: 'Риба інфо' }],
                [{ text: 'Відправити повідомлення' }, { text: 'Кількість користувачів' }]
            ]
        }
    },
    friendsMenu: {
        parse_mode: 'HTML',
        reply_markup: {
            keyboard: [
                [{ text: 'Почати роботу' }],
                [{ text: 'Риба інфо' }],
                [{ text: 'Додаткові параметри' }, { text: 'Наші місця' }]
            ]
        }
    },
    modeHTML: {
        parse_mode: 'HTML'
    },
}