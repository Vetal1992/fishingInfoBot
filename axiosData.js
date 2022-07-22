const axios = require('axios');
const cheerio = require('cheerio');
const { makyshatnik, boyl, fletFider, kwok, spiningSom, paternoster, donkaSom1, donkaSom2, soska, pryjina, ybiycaKarasia, linFider, linVydka } = require('./snastiOptions')

async function myAxiosSky(skyNowKey, cloudInSky, wind) {
    await axios.get(skyNowKey).then(html => {
        const $ = cheerio.load(html.data)
        $(`h3`).each((i, elem) => {
            cloudInSky.push($(elem).text())
        })
        $(`td`).each((i, elem) => {
            wind.push($(elem).text())
        })
    })
}
const sendingAll = (usersNameArr, bot, usersIdArr, mes) => {
    let usersObj = usersNameArr.reduce((acc, el, i) => {
        return { ...acc, [el]: { id: usersIdArr[i] } }
    }, {})
    for (key in usersObj) {
        bot.sendMessage(usersObj[key].id, 'Привіт ' + key + '!\n' + mes)
    }
}
async function myAxiosPressure(wickliPressureKey, pressureSum, pressFromBase, windWeeckly, pressureNow) {
    try {
        await axios.get(wickliPressureKey).then(html => {
            const $ = cheerio.load(html.data)
            $('.item-table').each((i, elem) => {
                pressureNow.push($(elem).text().match(/\d\d\d/gmi))
            })
            $(`.wind-speed-list`).each((i, elem) => {
                windWeeckly.push($(elem).text().match(/\d /gmi))
            })
        })
        let pressureNowParseInt = pressureNow[0].map(el => {
            return parseInt(el)
        })
        let pressureArr = pressFromBase.concat(pressureNowParseInt)
        pressureArr[0] - pressureArr[1] == 0 ? pressureSum.push(0) : pressureSum.push(pressureArr[0] - pressureArr[1])
        pressureArr[1] - pressureArr[2] == 0 ? pressureSum.push(0) : pressureSum.push(pressureArr[1] - pressureArr[2])
        pressureArr[2] - pressureArr[3] == 0 ? pressureSum.push(0) : pressureSum.push(pressureArr[2] - pressureArr[3])
        pressureArr[3] - pressureArr[4] == 0 ? pressureSum.push(0) : pressureSum.push(pressureArr[3] - pressureArr[4])
    } catch (e) {
        console.error('myAxiosPressureYesterday:', e)
    }
}

function callbackData(bot, chatId, data) {
    switch (data) {
        case ('Донна снасть Пружина'): {
            return bot.sendPhoto(chatId, './media/donkaPryjina.jpg', {
                parse_mode: 'HTML',
                caption: pryjina
            })
        }
        case ('Вбивця карася'): {
            return bot.sendPhoto(chatId, './media/ybiycaKarasia.jpg', {
                parse_mode: 'HTML',
                caption: ybiycaKarasia
            })
        }
        case ('соска'): {
            return bot.sendPhoto(chatId, './media/soska.jpg', {
                parse_mode: 'HTML',
                caption: soska
            })
        }
        case ('Патерностер'): {
            return bot.sendPhoto(chatId, './media/paternoster.jpg', {
                parse_mode: 'HTML',
                caption: paternoster
            })
        }
        case ('флет фідер'): {
            return bot.sendPhoto(chatId, './media/flatFider.png', {
                parse_mode: 'HTML',
                caption: fletFider
            })
        }
        case ('Макушатник'): {
            return bot.sendPhoto(chatId, './media/makyshatnik.jpg', {
                parse_mode: 'HTML',
                caption: makyshatnik
            })
        }
        case ('бойл'): {
            return bot.sendPhoto(chatId, './media/boyl.jpg', {
                parse_mode: 'HTML',
                caption: boyl
            })
        }
        case ('Снасті на щуку в розробці'): {
            return bot.sendMessage(chatId, 'Якщо можете підготувати пост на цю тему, будь ласка, напишіть автору')
        }
        case ('Ловля лина на фідер'): {
            return bot.sendPhoto(chatId, './media/paternoster.jpg', {
                parse_mode: 'HTML',
                caption: linFider
            })
        }
        case ('Ловля лина на вудку'): {
            return bot.sendPhoto(chatId, './media/linVydka.jpg', {
                parse_mode: 'HTML',
                caption: linVydka
            })
        }
        case ('Донна снасть на сома'): {
            return bot.sendPhoto(chatId, './media/donkaSom1.jpg', {
                parse_mode: 'HTML',
                caption: donkaSom1
            })
        }
        case ('за допомогою буя'): {
            return bot.sendPhoto(chatId, './media/donkaSom2.jpg', {
                parse_mode: 'HTML',
                caption: donkaSom2
            })
        }
        case ('Лов з човна на квок'): {
            return bot.sendPhoto(chatId, './media/kwok.jpg', {
                parse_mode: 'HTML',
                caption: kwok
            })
        }
        case ('Тролінгова снасть на сома'): {
            return bot.sendPhoto(chatId, './media/spiningSom.jpg', {
                parse_mode: 'HTML',
                caption: spiningSom
            })
        }
    }
}
module.exports = {
    myAxiosSky,
    sendingAll,
    myAxiosPressure,
    callbackData,
}