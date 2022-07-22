require('dotenv').config()
const TelegramBotBenzApi = require('node-telegram-bot-api')
const { mainMenu } = require('./mainMenu')
const { wickliPressure, skyNow, oblastiOption, watherTemp, specialPlaces, images } = require('./mainOptions');
const { unswearMenu } = require('./menuOptions')
const { fish, modeHTML, fishPhoto } = require('./mainOptionsConfigure')
const { myAxiosSky, sendingAll, myAxiosPressure, callbackData } = require('./axiosData')
const token = process.env.TOKEN;
const axios = require('axios');
const cheerio = require('cheerio');
const { json } = require('express/lib/response');
const sqlite3 = require('sqlite3').verbose();
let a = 0;
let b = 0;
let when = 'Сьогодні'
let twoDaysBefore = ''
let oneDaysBefore = ''
let pressureNow = []
// let arr1 = ['opel', 'peugeot', 'lincoln']
// let arr2 = [20, 15, 50]
// const kek = arr1.reduce((acc, el, i) => {
//     return { ...acc, [el]: arr2[i] };
// }, {});
// console.log('kek', kek)
// let ll = Object.fromEntries(arr1.map((item, index) => ([item, arr2[index]])))
// console.log('ll:', ll)

let fishOption = {}
const db = new sqlite3.Database('db.sqlite3');
const bot = new TelegramBotBenzApi(token, { polling: true })
const dbUsers = new sqlite3.Database('dbUsers.sqlite3');

bot.setMyCommands([
    { command: '/start', description: 'start pleasure' },
])
const choiseOblast = async (chatId) => {
    await bot.sendMessage(chatId, 'Бот збере дані по вашій області і прорахує шанси на кльов', oblastiOption)
}
const delay = (ms) => {
    return new Promise(r => setTimeout(() => r(), ms))
}
function createDatabases() {
    for (key in skyNow) {
        db.exec(`CREATE TABLE IF NOT EXISTS ${key} (cityName TEXT, pressure INTEGER)`);
        const stmt = db.prepare(`INSERT INTO ${key} VALUES (?,?)`);
        axios.get(skyNow[key]).then(html => {
            const $ = cheerio.load(html.data)
            let wind = []
            $(`td`).each((i, elem) => {
                wind.push($(elem).text())
            })
            stmt.run(`${key}`, wind[2])
        }).catch(e => console.error(e))
        db.exec(`DELETE FROM ${key} WHERE rowid in (SELECT rowid from ${key} rowid limit 1)`)
    }
}
setInterval(createDatabases, 3600000)

const start = () => {
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        const admin = 444452344
        let usersIdArr = [];
        let usersNameArr = [];

        dbUsers.exec(`CREATE TABLE IF NOT EXISTS users (chatID INTEGER, name TEXT)`);
        const stmt = dbUsers.prepare(`INSERT INTO users VALUES (?,?)`);
        dbUsers.each(`SELECT rowid AS id, chatID, name FROM users ORDER BY chatID`, (err, row) => {
            usersIdArr.push(row.chatID);
            usersNameArr.push(row.name);
        });
        async function messageForUsers() {
            await delay(1500)
            const mes = text.replace(/йцукен/msg)
            mes == '' ? bot.sendMessage(admin, 'Ви намагаєтесь відправити пусте повідомлення!') : sendingAll(usersNameArr, bot, usersIdArr, mes)
        }
        async function usersArrUncludes() {
            await delay(1000)
            if (text === 'Кількість користувачів') {
                bot.sendMessage(admin, 'Кількість користувачів: ' + usersIdArr.length)
            }
            if (!usersIdArr.includes(chatId)) {
                stmt.run(`${chatId}`, msg.from.first_name)
            } else if (usersIdArr.includes(chatId)) { return }
        }


        usersArrUncludes()
        mainMenu(bot, chatId, text, msg, fishOption, delay, choiseOblast, specialPlaces, messageForUsers)
    })
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        let dateNow = new Date().getHours()
        callbackData(bot, chatId, data)
        if (data === 'Зараз') {
            a = 0
            b = 1
            when = 'Сьогодні'
            return choiseOblast(chatId)
        }
        if (data === 'Завтра') {
            a = 1
            b = 2
            when = 'Завтра'
            twoDaysBefore = 'вчора - сьогодні'
            oneDaysBefore = 'сьогодні - завтра'
            return choiseOblast(chatId)
        }
        if (data === 'Післязавтра') {
            a = 2
            b = 3
            when = 'Післязавтра'
            twoDaysBefore = 'сьогодні - завтра'
            oneDaysBefore = 'завтра - післязавтра'
            return choiseOblast(chatId)
        }

        //indiwidual message for fish
        for (key in fish) {
            let fishPhotoKey = fishPhoto[key]
            if (data == key) {
                let message = `${key.toUpperCase()} \n<b>Кращий час для ловлі</b> - ${fish[key].bestTime} \n<b>Чутливість до зміни тиску</b> - ${fish[key].pressure}`
                    + `\n<b>Снасті</b> - ${fish[key].tackle}`
                    + `\n<b>Де шукати</b> - ${fish[key].place}`
                    + `\n<b>Наживка</b>  ${fish[key].lures}`
                    + `\n<b>Прикормка</b> - ${fish[key].bait}`
                    + `\n<b>Розмір крючків</b> - від ${fish[key].hooks[0]} до ${fish[key].hooks[1]}`
                    + `\n<b>Товщина лески</b> - від ${fish[key].fishingLine[0]} до ${fish[key].fishingLine[1]}`
                bot.sendPhoto(chatId, fishPhotoKey, {
                    parse_mode: 'HTML',
                    caption: message
                })
                await delay(1500)
                bot.sendMessage(chatId, 'Популярні снасті на цю рибу:', fish[key].equipments)
            }
        }
        for (key in watherTemp) {
            if (data === key) {
                bot.sendMessage(chatId, `Збираю дані, це може зайняти до 7 секунд. Будь ласка, зачекайте.`)
                let watherKey = watherTemp[key]
                let wickliPressureKey = wickliPressure[key]
                let imageKey = images[key]
                let skyNowKey = skyNow[key]
                let pressureSum = []
                let cloudInSky = []
                let windWeeckly = []
                let wind = []
                let tempData = ''
                let tempNow = ''
                myAxiosSky(skyNowKey, cloudInSky, wind)
                await delay(1500)
                let skyMessage = `\nНебо: <b>${cloudInSky[0]}</b>`
                let windMessage = `\nВітер: <b>${wind[1]}</b>`
                let pressFromBase = []
                db.each(`SELECT rowid AS id, pressure FROM ${key}  ORDER BY pressure`, (err, row) => {
                    pressFromBase.push(row.pressure)
                });
                myAxiosPressure(wickliPressureKey, pressureSum, pressFromBase, windWeeckly, pressureNow)
                await delay(1500)
                async function myAxiosTemp() {
                    try {
                        await axios.get(watherKey).then(html => {
                            const $ = cheerio.load(html.data)
                            $('#temp1').each((i, elem) => {
                                tempNow += $(elem).text().match(/\d\d.\d/)
                            })
                        })
                    } catch (e) {
                        console.error('myAxiosTemp:', e)
                    }
                }
                myAxiosTemp()
                await delay(1500)
                let pressureTrend = []
                let fishes = []
                let rating = []
                let pressureTotal = ''
                let nightHours = [22, 23, 24, 0, 1, 2, 3, 4].includes(dateNow)
                let eveningHours = [18, 19, 20, 21].includes(dateNow)
                let morningHours = [5, 6, 7].includes(dateNow)
                let latestMorningHours = [8, 9, 10, 11].includes(dateNow)
                let dayHours = [12, 13, 14, 15, 16, 17].includes(dateNow)

                const mainData = () => {
                    const whatFish = (temp) => {
                        pressureSum[a] !== 0 ? (pressureSum[a] < 0 ? pressureTrend.push(' спад') : pressureTrend.push(' зростання'))
                            : pressureTrend.push(' тиск стабільний')
                        pressureSum[b] !== 0 ? (pressureSum[b] < 0 ? pressureTrend.push(' спад') : pressureTrend.push(' зростання'))
                            : pressureTrend.push(' тиск стабільний')
                        for (key in fish) {
                            fishKey = fish[key]
                            const pressTotal = () => {
                                fishKey.rating = 0
                                if (Math.abs(pressureSum[a]) >= 0 || Math.abs(pressureSum[b]) >= 0) {
                                    if (Math.abs(pressureSum[a]) >= 2 || Math.abs(pressureSum[b]) >= 2) {
                                        if (Math.abs(pressureSum[a]) >= 3 || Math.abs(pressureSum[b]) >= 3) {
                                            if (Math.abs(pressureSum[a]) >= 5 || Math.abs(pressureSum[b]) >= 5) {
                                                if (Math.abs(pressureSum[a]) >= 8 || Math.abs(pressureSum[b]) >= 8) {
                                                    fishKey.rating += 1
                                                    pressureTotal = ('За попередні 48 годин були стрибки тиску більше 8мм. І хоч СОМ та МІНЬ можуть клювати при таких змінах, краще розслабитись та пожарити шашлики.')
                                                    return pressureTotal
                                                }
                                                fishKey.rating += 3
                                                pressureTotal = ('За попередні 48 годин були великі стрибки тиску, але шанс на кльов лишається.')
                                                return pressureTotal
                                            }
                                            fishKey.rating += 8
                                            pressureTotal = ('За попередні 48 годин були стрибки тиску, але більшість риб можуть клювати.')
                                            return pressureTotal
                                        }
                                        fishKey.rating += 13
                                        pressureTotal = ('За попередні 48 годин були незначні стрибки тиску, тому шанс кльову досить високий.')
                                        return pressureTotal
                                    }
                                    fishKey.rating += 20
                                    pressureTotal = ('За попередні 48 годин стрибків тиску практично нема, кльов по цьому показнику має бути прекрасний. ')
                                    return pressureTotal
                                }
                            }
                            pressTotal()

                            if (nightHours) { +tempNow >= 20 && fishKey.bestTime.match(/(теплі ночі)/gmi) ? fishKey.rating += 5 : fishKey.rating }
                            if (morningHours) { fishKey.bestTime.match(/(світанок|ранок)/gmi) ? fishKey.rating += 8 : fishKey.rating }
                            if (eveningHours) { fishKey.bestTime.match(/(вечір|заходом|ввечері)/gmi) ? fishKey.rating += 8 : fishKey.rating }
                            if (when === 'Сьогодні') {
                                if (fishKey.pressureMin <= wind[2] && fishKey.pressureMax >= wind[2]) { fishKey.rating += 20 }
                            }
                            if (when === 'Завтра' || when === 'Післязавтра') {
                                if (fishKey.pressureMin <= pressureNow[0][a] && fishKey.pressureMax >= pressureNow[0][a]) { fishKey.rating += 20 }
                            }
                            if (fishKey.tempMin <= temp && fishKey.tempMax >= temp) {
                                fishKey.bestTempMin <= temp && fishKey.bestTempMax >= temp ? fishKey.rating += 10 : fishKey.rating += 5
                            }
                            if (pressureTrend[b] === ' спад') { fishKey.rating += 10 }
                            if (pressureTrend[b] === ' тиск стабільний') { fishKey.rating += 20 }
                            if (when = 'Сьогодні') {
                                if (skyMessage.match(/(хмарність|охмуро)/gmi) && fishKey.bestTime.match(/(пасмурну)/gmi)) { fishKey.rating += 8 }
                                if (skyMessage.match(/(ясно|соняч)/gmi) && fishKey.bestTime.match(/(ясну|ясна|ясно|вдень)/gmi)) { fishKey.rating += 8 }
                            }
                            if (windWeeckly[0][a].match(/(^1 |^2 |^3 )/gmi)) { fishKey.rating += 7 }
                            if (windWeeckly[0][a].match(/(^4 |^5 |^6 )/gmi)) { fishKey.rating += 3 }
                            fishes.push(key)
                            rating.push(fishKey.rating)
                        }
                        let xxx = fishes.reduce((acc, el, i) => {
                            return [...acc, { fish: el, rating: rating[i] }]
                        }, [])
                        xxx.sort((a, b) => a.rating < b.rating ? 1 : -1)

                        const addForFishButtons = () => {
                            fishesButtons = xxx.map(el => {
                                return [{ text: `${el.fish.toUpperCase()} ` + '.' + ' Шанс на кльов: ' + el.rating, callback_data: el.fish }]
                            })
                            fishOption = {
                                reply_markup: JSON.stringify({
                                    inline_keyboard: fishesButtons,
                                })
                            }
                        }
                        addForFishButtons()
                        return
                    }
                    const messageFormation = () => {
                        async function calculateTodayPrognoz() {
                            whatFish(tempNow)
                            if (nightHours) {
                                let unswear = `<u> Нічна рибалка у <b>${data.toUpperCase()}</b> області</u>.${skyMessage}. ${windMessage} `
                                    + `\nТиск зараз: <b>${wind[2]}</b> \nСередня температура води зараз: <b>${tempNow}°C</b> \n<u>Тенденція зміни тиску:</u> `
                                    + `\nпозавчора - вчора: <b>${pressureTrend[0]}</b> на ${pressureSum[0]}мм \nвчора - сьогодні: <b>${pressureTrend[1]}</b>`
                                    + ` на ${pressureSum[1]}мм\n${tempData} \n${pressureTotal} `
                                bot.sendPhoto(chatId, imageKey, {
                                    parse_mode: 'HTML',
                                    caption: unswear
                                })
                                await delay(1000)
                                bot.sendMessage(chatId, `Натисніть "аналіз кльову", щоб подивитись на якій рибі краще зосередитись.`, unswearMenu)
                            }
                            if (morningHours) {
                                let unswear = `<u>Хто рано встає в того риба клює. В <b>${data.toUpperCase()}</b> області</u>.${skyMessage}. ${windMessage} `
                                    + `\nТиск зараз: <b>${wind[2]}</b> \nСередня температура води зараз: <b>${tempNow}°C</b> \n<u>Тенденція зміни тиску:</u> `
                                    + `\nпозавчора - вчора: <b>${pressureTrend[0]}</b> на ${pressureSum[0]}мм \nвчора - сьогодні: <b>${pressureTrend[1]}</b>`
                                    + ` на ${pressureSum[1]}мм\n${tempData} \n${pressureTotal} `
                                bot.sendPhoto(chatId, imageKey, {
                                    parse_mode: 'HTML',
                                    caption: unswear
                                })
                                await delay(1000)
                                bot.sendMessage(chatId, `Натисніть "аналіз кльову", щоб подивитись на якій рибі краще зосередитись.`, unswearMenu)
                            }
                            if (latestMorningHours) {
                                let unswear = `<u> Рибалка пізнім ранком може бути не такою результативною як з світанку. В <b>${data.toUpperCase()}</b> області</u>.${skyMessage}. ${windMessage} `
                                    + `\nТиск зараз: <b>${wind[2]}</b> \nСередня температура води зараз: <b>${tempNow}°C</b> \n<u>Тенденція зміни тиску:</u> `
                                    + `\nпозавчора - вчора: <b>${pressureTrend[0]}</b> на ${pressureSum[0]}мм \nвчора - сьогодні: <b>${pressureTrend[1]}</b>`
                                    + ` на ${pressureSum[1]}мм\n${tempData} \n${pressureTotal} `
                                bot.sendPhoto(chatId, imageKey, {
                                    parse_mode: 'HTML',
                                    caption: unswear
                                })
                                await delay(1000)
                                bot.sendMessage(chatId, `Натисніть "аналіз кльову", щоб подивитись на якій рибі краще зосередитись.`, unswearMenu)
                            }
                            if (dayHours) {
                                let unswear = `<u>Сьогодні у день, в <b>${data.toUpperCase()}</b> області</u>.${skyMessage}. ${windMessage} `
                                    + `\nТиск зараз: <b>${wind[2]}</b> \nСередня температура води зараз: <b>${tempNow}°C</b> \n<u>Тенденція зміни тиску:</u> `
                                    + `\nпозавчора - вчора: <b>${pressureTrend[0]}</b> на ${pressureSum[0]}мм \nвчора - сьогодні: <b>${pressureTrend[1]}</b>`
                                    + ` на ${pressureSum[1]}мм\n${tempData} \n${pressureTotal} `
                                bot.sendPhoto(chatId, imageKey, {
                                    parse_mode: 'HTML',
                                    caption: unswear
                                })
                                await delay(1000)
                                bot.sendMessage(chatId, `Натисніть "аналіз кльову", щоб подивитись на якій рибі краще зосередитись.`, unswearMenu)
                            }
                            if (eveningHours) {
                                let unswear = `<u>Вечірня рибалка у <b>${data.toUpperCase()}</b> області</u>.${skyMessage}. ${windMessage} `
                                    + `\nТиск зараз: <b>${wind[2]}</b> \nСередня температура води зараз: <b>${tempNow}°C</b> \n<u>Тенденція зміни тиску:</u> `
                                    + `\nпозавчора - вчора: <b>${pressureTrend[0]}</b> на ${pressureSum[0]}мм \nвчора - сьогодні: <b>${pressureTrend[1]}</b>`
                                    + ` на ${pressureSum[1]}мм\n${tempData} \n${pressureTotal} `
                                bot.sendPhoto(chatId, imageKey, {
                                    parse_mode: 'HTML',
                                    caption: unswear
                                })
                                await delay(1000)
                                bot.sendMessage(chatId, `Натисніть "аналіз кльову", щоб подивитись на якій рибі краще зосередитись.`, unswearMenu)
                            }
                        }
                        async function calculateFuturePrognoz(when) {
                            whatFish(tempNow)

                            let unswear = `<u>${when} у <b>${data.toUpperCase()}</b> області</u>.\nНебо: на майбутні дати цей показник не вираховується. \n${when} вітер: <b>${windWeeckly[0][a]}м/с</b> `
                                + `\n${when} тиск: <b>${pressureNow[0][a]}мм</b> \nСередня температура води зараз: <b>${tempNow}°C</b>\nТемпература води рідко змінюється більш ніж на 0.5градуси за добу, тому при прогнозі враховується сьогодняшня температура \n<u>Тенденція зміни тиску:</u> `
                                + `\n${twoDaysBefore}: <b>${pressureTrend[0]}</b> на ${pressureSum[a]}мм \n${oneDaysBefore}: <b>${pressureTrend[1]}</b>`
                                + ` на ${pressureSum[b]}мм\n${tempData} \n${pressureTotal}`
                            bot.sendPhoto(chatId, imageKey, {
                                parse_mode: 'HTML',
                                caption: unswear
                            })
                            await delay(1000)
                            bot.sendMessage(chatId, `Натисніть "аналіз кльову", щоб подивитись на якій рибі краще зосередитись.`, unswearMenu)
                        }
                        if (when === 'Сьогодні') {
                            calculateTodayPrognoz()
                        }
                        if (when === 'Завтра' || when === 'Післязавтра') {
                            calculateFuturePrognoz(when)
                        }
                    }
                    messageFormation()
                }
                mainData()
            }
        }
    })
}

start() 