
module.exports = {
    fishPhoto: {
        "Карась ": './media/fish/karasik.jpg',
        "Щука ": './media/fish/schyka.jpg',
        "Лящ ": './media/fish/liasch.png',
        "Судак ": './media/fish/sydak.jpg',
        "Короп ": './media/fish/karp.jpg',
        "Лин ": './media/fish/lin.jpg',
        "Голавлик ": './media/fish/golavl.jpg',
        "Окунь ": './media/fish/okyn.jpg',
        "Сом ": './media/fish/som.jpg',
        "Налим ": './media/fish/nalim.jpg',
        "БілийАмур ": './media/fish/beliyAmyr.jpg',
    },
    fish: {
        "Карась ": {
            predator: false,
            tempMin: 12,
            tempMax: 30,
            bestTempMin: 19,
            bestTempMax: 23,
            pressureMin: 755,
            pressureMax: 765,
            pressureChange: 8,
            rating: 0,
            pressure: `комфортний тиск має широкі рамки, саме тому коропові риби клюють частіше за інші види`,
            bestTime: `рано вранці, в спеку - ввечері, в похмуру теплу погоду вдень`,
            tackle: `Поплавкова вудка, фідер, донними вудками`,
            place: `У закритих водоймах, ставки, трав'янисті озера, кар'єри, затоки водоймищ, стариці, прогалини у кущів, біля корчів, у чагарниках тросняку`,
            lures: `\n<u>Зимою</u>: не клює;\n<u>Весною</u>: гнойовий хробак, опариш, потічник;\nЛітом: хробак, хлібний м'якуш, тісто, мотиль\nОсінь: хробак, хліб, тісто, мотиль, опариш.`,
            bait: `каша пшенична та гречана, макуха, висівки, хліб, сир, ароматизатори`,
            hooks: [2.5, 7],
            fishingLine: [0.15, 0.35],
            equipments: {
                parse_mode: 'HTML',
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{ text: `Донна снасть "Пружина"`, callback_data: 'Донна снасть Пружина' }],
                        [{ text: 'Вбивця карася', callback_data: "Вбивця карася" }],
                        [{ text: `Донна снасть "соска"`, callback_data: `соска` }],
                        [{ text: `петля Гарднера або Патерностер`, callback_data: `Патерностер` }],
                        [{ text: `Фідерна снасть "флет фідер"`, callback_data: 'флет фідер' }]
                    ]
                })
            },
        },
        "Щука ": {
            predator: true,
            tempMin: 4,
            tempMax: 23,
            bestTempMin: 13,
            bestTempMax: 16,
            pressureMin: 758,
            pressureMax: 764,
            pressureChange: 4,
            rating: 0,
            skyTrend: `У сонячну погоду вона краще реагує на блискучий сріблястий забарвлення блешні, а в похмуру — їй більше до вподоби тьмяні мідні тони`,
            pressure: `не повинно бути сильних стрибків`,
            bestTime: `ранок - на зорі, вечір, вдень у похмуру погоду`,
            tackle: `cпінінг, кухоль, жерлиця, доріжка, стрімким блиском`,
            place: `перекати, обриви - підмитий берег, кущі, що нависли над водою, заводи з травою, перекати, вири з корчами, осока - прибережні зарості, корчі-пні, у трави, на глибині`,
            lures: `\n<u>Зимою</u>: живець місцевих риб, блешні пірнаючі;\n<u>Весною</u>: живець місцевих риб, іноді черв'як, блешні, воблери, твістери;\n<u>Літом</u>: живець, жаби, пташині кишки, блешні, воблери, твістери;\n<u>Осінь</u>: живець, жаби, блешні, воблери, твістери.`,
            bait: `Не використовується`,
            hooks: [10, 16],
            fishingLine: [0.4, 0.7],
            equipments: {
                parse_mode: 'HTML',
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{ text: `Снасті на щуку в розробці`, callback_data: 'Снасті на щуку в розробці' }],
                    ]
                })
            },
        },
        "Лящ ": {
            predator: false,
            tempMin: 5,
            tempMax: 23,
            bestTempMin: 15,
            bestTempMax: 18,
            pressureMin: 755,
            pressureMax: 760,
            pressureChange: 2,
            rating: 0,
            pressure: `добре, якщо значення не змінюються або трохи зростають`,
            bestTime: `світанок, перед заходом сонця, вдень, в теплі ночі`,
            tackle: `поплавкова вудка, блешня, зимова вудка, донна вудка, фідер`,
            place: `глибокі ями, вир з мулом поруч із очеретом, гирла річок, глибокі затоки біля глиняних берегів`,
            lures: `\n<u>Зимою</u>: мотиль, черв'як;\n<u>Весною</u>: черв'як, опариш, мотиль;\n<u>Літом</u>: опариш, мотиль, смажені висівки, горох, мамалига, потічник, пензлики черв'яків, каша, тісто;\n<u>Осінь</u>: опариш, мотиль, короїд, черв'як, горох, парені зерна, тісто.`,
            bait: `Смажене висівки, каша, хліб, тісто, рубаний хробак`,
            hooks: [5, 8.5],
            fishingLine: [0.25, 0.4],
            equipments: {
                parse_mode: 'HTML',
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{ text: `Макушатник`, callback_data: 'Макушатник' }],
                        [{ text: `Донна снасть "соска"`, callback_data: `соска` }],
                        [{ text: `петля Гарднера або Патерностер`, callback_data: `Патерностер` }],
                        [{ text: `Фідерна снасть "флет фідер"`, callback_data: 'флет фідер' }]
                    ]
                })
            },
        },
        "Судак ": {
            predator: true,
            tempMin: 8,
            tempMax: 12,
            bestTempMin: 11,
            bestTempMax: 12,
            pressureMin: 758,
            pressureMax: 762,
            pressureChange: 4,
            rating: 0,
            pressure: `може падати, рости або не змінюватися, але значення мають бути в рамках норми`,
            bestTime: `ранок, вечір і тепла погода`,
            tackle: `Спінінг, вудка, кружки, закидушка донка, доріжка, стрімке`,
            place: `Перекати, тверде дно, кам'янисті гряди, коряжисті ями - вир, скати русел, плеси з твердим і піщаним дном`,
            lures: `\n<u>Зимою</u>: живець, блешня, що пірнає, черв'як;\n<u>Весною</u>: живець, жаба, короїд, черв'як, блешні, воблери, твістери;\n<u>Літом</u>: Живець, зрідка жаба, блешні, воблери, твістери;\n<u>Осінь</u>: Живець, зрідка жаба, блешні, воблери, твістери.`,
            bait: `Не використовується`,
            hooks: [8.5, 12],
            fishingLine: [0.5, 0.6],
            equipments: {
                parse_mode: 'HTML',
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{ text: `Снасті на хижу рибу в розробці`, callback_data: 'Снасті на щуку в розробці' }],
                    ]
                })
            },
        },
        "Короп ": {
            predator: false,
            tempMin: 10,
            tempMax: 30,
            bestTempMin: 20,
            bestTempMax: 23,
            pressureMin: 755,
            pressureMax: 765,
            pressureChange: 8,
            rating: 0,
            pressure: `комфортний тиск має широкі рамки, саме тому коропові риби клюють частіше за інші види`,
            bestTime: `світанок, вечірні зорі, теплі ночі. \n<b>Несприятливі періоди</b>: сильна спека; тумани, холодні ранки.`,
            tackle: `Поплавкова вудка, донними вудками, фідер`,
            place: `ставки з мулистим дном, у водоростях, межа між очеретяними чагарниками.`
                + 'Рибалки спеціально розчищають косами, граблями, волокушами невеликі «вікна» чистої води серед заростей. Важливо, щоб ці ділянки мали чисте дно. ',
            lures: `\n<u>Зимою</u>: Слабкий клювання, черв'як, шматочки рибки;\n<u>Весною</u>: хробак, каша, тісто, бойли;\n<u>Літом</u>: хробак, каша, ракова шийка, кукурудза, бойли;\n<u>Осінь</u>: хробак, картопля, кукурудза, мамалига.`,
            bait: `Макуха, рубаний черв'як, каша, кукурудза. \nОсновне завдання – зібрати гігантів до місця закидання й утримувати там.`,
            hooks: [6, 7],
            fishingLine: [0.4, 0.7],
            equipments: {
                parse_mode: 'HTML',
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{ text: `Макушатник`, callback_data: 'Макушатник' }],
                        [{ text: `Бойл`, callback_data: `бойл` }],
                    ]
                })
            },
        },
        "Лин ": {
            predator: false,
            tempMin: 10,
            tempMax: 30,
            bestTempMin: 20,
            bestTempMax: 23,
            pressureMin: 755,
            pressureMax: 765,
            pressureChange: 8,
            rating: 0,
            pressure: `комфортний тиск має широкі рамки, саме тому коропові риби клюють частіше за інші види`,
            bestTime: `світанок, вечірні зорі, теплі ночі`,
            tackle: `Основна снасть – поплавкова вудка. Але оскільки умови на водоймах різні, то використовуємо фідер і донку, річну мормишку і навіть жерлиці.`,
            place: `Ілисте дно, зарослі водоростями стариці, затоки, ільмені, кар'єри - зі слабкою течією, вікна у водоростях.`,
            lures: `\n<u>Зимою</u>: не ловиться/не клює;\n<u>Весною</u>: черв'як, гусениця, варена картопля, ракова шийка;\n<u>Літом</u>: черв'як, мотиль, каша, розпарені зерна, ракова шийка;\n<u>Осінь</u>: черв'як, мотиль, каша, плавлений сир.`
                + `\nЛовля лина вимагає особливого уміння, досвіду, наполегливості та терпіння. Хоча з карасем і сазаном його об'єднує одне сімейство коропових, але у нього зовсім інші звички.`,
            bait: `Рубані черв'яки, виповзки, варена картопля, каша, макуха, сир, хліб`,
            hooks: [4, 8.5],
            fishingLine: [0.25, 0.4],
            equipments: {
                parse_mode: 'HTML',
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{ text: `Ловля лина на вудку`, callback_data: 'Ловля лина на вудку' }],
                        [{ text: `Ловля лина на фідер`, callback_data: 'Ловля лина на фідер' }],
                    ]
                })
            },
        },
        "Голавлик ": {
            predator: true,
            tempMin: 14,
            tempMax: 20,
            bestTempMin: 14,
            bestTempMax: 20,
            pressureMin: 755,
            pressureMax: 765,
            pressureChange: 7,
            rating: 0,
            pressure: `може падати, рости або не змінюватися, але значення мають бути в рамках норми`,
            bestTime: `в ясну, тиху погоду, ранок, вечір`,
            tackle: `Поплавочна вудка, нахлист, донка, спіннінг`,
            place: `перекати, обриви, мости, круті - нависші берега, на границі швидкої течії`,
            lures: `\n<u>Зимою</u>: не клює;\n<u>Весною</u>: черв'яки, майський жук, короїд, блешня;\n<u>Літом</u>: комахи, метелик, цвіркун, рачне м'ясо, м'ясо ракушки, мотиль, зерна, мурашині яйця, білий хліб, блешня з вертлюгом\n<u>Осінь</u>: живець, піскарі, раки, жаби, стрекози, цвіркун, овес, черв'як.`,
            bait: `парений овес, висівки, мотиль, черв'яки, піскар, рачне м'ясо`,
            hooks: [5, 9],
            fishingLine: [0.3, 0.5],
            equipments: {
                parse_mode: 'HTML',
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{ text: `Снасті на хижу рибу в розробці`, callback_data: 'Снасті на щуку в розробці' }],
                    ]
                })
            },
        },
        "Окунь ": {
            predator: true,
            tempMin: 4,
            tempMax: 21,
            bestTempMin: 12,
            bestTempMax: 15,
            pressureMin: 758,
            pressureMax: 762,
            pressureChange: 2,
            rating: 0,
            pressure: `може падати, рости або не змінюватися, але значення мають бути в рамках норми`,
            bestTime: `ранок, вечір, в пасмурну погоду`,
            tackle: `Поплавкова вудка, блиснення на спінінг, закидушка, на блешню, кружальцями, доріжкою, стрімке блиснення`,
            place: `Ями, вир з корчами або валунами, тиха течія, коряжник, урвища, очеретяні озера, зарості латаття`,
            lures: `\n<u>Зимою</u>: мотиль, мальок, блешня, що пірнає, реп'ях, п'явка;\n<u>Весною</u>: черв'як, мотиль, личинка хруща, короїд, блешні дрібні, мальки, черв'яки, п'явка;\n<u>Літом</u>: мотиль, черв'як, коник, п'явка, дрібна рибка, блешні обертаються, мальок, черв'яки, рачне м'ясо;\n<u>Осінь</u>: черв'як, коник, бабка, короїд, бабка, дрібна рибка, рачне м'ясо, око окуня, блешні, мальок, блешні, що обертається і коливається.`,
            bait: `Мотиль, рубаний черв'як, бича кров`,
            hooks: [5, 10],
            fishingLine: [0.14, 0.22],
            equipments: {
                parse_mode: 'HTML',
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{ text: `Снасті на хижу рибу в розробці`, callback_data: 'Снасті на щуку в розробці' }],
                    ]
                })
            },
        },
        "Сом ": {
            predator: true,
            tempMin: 4,
            tempMax: 21,
            bestTempMin: 12,
            bestTempMax: 15,
            pressureMin: 750,
            pressureMax: 770,
            pressureChange: 20,
            rating: 0,
            pressure: `немає кореляції з відповідним значенням тиску для хорошого клювання`,
            bestTime: `Теплі ночі, вечірні заходи сонця, вранці`,
            tackle: `Донка - закидушка, жерлица кружок, спиннинг по дну, квок`,
            place: `Ями, вир на кордонах швидкої течії, глибокі захаращені місця`,
            lures: `\n<u>Зимою</u>: слабке клювання, шматочок м'яса, живець;\nВесною: риба живець, жаба, смажена птиця, блешня, хробак;\n<u>Літом</u>: несвіже м'ясо, рак, капустянка, блешня коливання;\n<u>Осінь</u>: на живця, свіже м'ясо, риба. \nВзагалі чим сильніше пахне приманка тим більше шансу на кльов`,
            bait: `Залучається квоком`,
            hooks: [18, 20],
            fishingLine: [0.8, 1],
            equipments: {
                parse_mode: 'HTML',
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{ text: `Донна снасть на сома для лову з берега`, callback_data: 'Донна снасть на сома' }],
                        [{ text: `Ловля сома за допомогою буя`, callback_data: 'за допомогою буя' }],
                        [{ text: `Лов з човна на квок`, callback_data: 'Лов з човна на квок' }],
                        [{ text: `Тролінгова снасть на сома`, callback_data: 'Тролінгова снасть на сома' }]
                    ]
                })
            },
        },
        "Налим ": {
            predator: true,
            tempMin: 4,
            tempMax: 21,
            bestTempMin: 12,
            bestTempMax: 15,
            pressureMin: 750,
            pressureMax: 770,
            pressureChange: 20,
            rating: 0,
            pressure: `немає кореляції з відповідним значенням тиску для хорошого клювання`,
            bestTime: `ранок, вечір, в пасмурну погоду`,
            tackle: `Донка, закидушка`,
            place: `Омути, пороги, глинисті ями, урвища берегів`,
            lures: `\n<u>Зимою</u>: йорж, курячі кишки, блешня, що пірнає, з підсадкою черв'яка;\nВесною: великий черв'як, виповзання, шматочки йоржа, м'ясо жаби, пташині кишки;\n<u>Літом</u>: слабке клювання;\n<u>Осінь</u>: піскарь, йорж, м'ясо не свіже, виповзок, жабеня, черв'яки.`,
            bait: `Не використовується`,
            hooks: [8, 12],
            fishingLine: [0.3, 0.6],
            equipments: {
                parse_mode: 'HTML',
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{ text: `Снасті на хижу рибу в розробці`, callback_data: 'Снасті на щуку в розробці' }],
                    ]
                })
            },
        },
        "БілийАмур ": {
            predator: false,
            tempMin: 12,
            tempMax: 30,
            bestTempMin: 16,
            bestTempMax: 23,
            pressureMin: 755,
            pressureMax: 765,
            pressureChange: 8,
            rating: 0,
            pressure: `комфортний тиск має широкі рамки, саме тому коропові риби клюють частіше за інші види`,
            bestTime: `світанок, вечірні зорі, теплі ночі`,
            tackle: `Поплавкова вудка, донними вудками, фідер`,
            place: `ставки з мулистим дном, у водоростях.`,
            lures: `\n<u>Зимою</u>: Слабкий клювання, черв'як, шматочки рибки;\nВесною: хробак, каша, тісто, бойли;\n<u>Літом</u>: хробак, каша, ракова шийка, кукурудза, бойли;\n<u>Осінь</u>: хробак, картопля, кукурудза, мамалига.`,
            bait: `Макуха, рубаний черв'як, каша, кукурудза`,
            hooks: [6, 7],
            fishingLine: [0.4, 0.7],
            equipments: {
                parse_mode: 'HTML',
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{ text: `Снасті в розробці`, callback_data: 'Снасті на щуку в розробці' }],
                    ]
                })
            },
        }
    }
};