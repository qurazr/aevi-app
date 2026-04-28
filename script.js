const tg = window.Telegram.WebApp;
tg.expand();

const LEVELS = ['A0', 'A1', 'A2', 'B1', 'B2'];

function q(text, opts, correct) {
    return { q: text, a: opts, c: correct };
}

const DB = {
'A0': [
{
    id: 'A0_L1', title: 'Урок 1: Глагол to be',
    theory: [
        '📘 <b>Глагол TO BE (быть)</b>\n\nЭто самый важный глагол в английском! Он показывает состояние.\n\n<b>Формы:</b>\n• I <b>am</b> (я есть)\n• He/She/It <b>is</b> (он/она/оно есть)\n• You/We/They <b>are</b> (ты/мы/они есть)\n\nПример: I am a student. (Я студент)',
        '📝 <b>Отрицания и вопросы</b>\n\n<b>Отрицание:</b> добавляем NOT\n• I am <b>not</b> happy\n• She is <b>not</b> (isn\'t) here\n• They are <b>not</b> (aren\'t) ready\n\n<b>Вопрос:</b> меняем местами\n• <b>Are</b> you ready? (Ты готов?)\n• <b>Is</b> she a doctor? (Она врач?)',
        '💡 <b>Запомни!</b>\n\nГлагол to be используется для:\n1. Описания: She <b>is</b> beautiful\n2. Профессии: I <b>am</b> a teacher\n3. Места: We <b>are</b> at home\n4. Возраста: He <b>is</b> 25\n\nНажми "К тесту", чтобы проверить знания!'
    ],
    questions: [
        q('I ___ a student.', ['am','is','are','be'], 0), q('She ___ my sister.', ['am','is','are','be'], 1), q('They ___ at home.', ['am','is','are','be'], 2), q('___ you happy?', ['Am','Is','Are','Be'], 2), q('He ___ not ready.', ['am','is','are','be'], 1), q('We ___ friends.', ['am','is','are','be'], 2), q('It ___ a cat.', ['am','is','are','be'], 1), q('___ she a doctor?', ['Am','Is','Are','Be'], 1), q('I ___ not tired.', ['am','is','are','be'], 0), q('You ___ very kind.', ['am','is','are','be'], 2), q('My name ___ Anna.', ['am','is','are','be'], 1), q('___ they students?', ['Am','Is','Are','Be'], 2), q('This ___ my book.', ['am','is','are','be'], 1), q('I ___ 20 years old.', ['am','is','are','be'], 0), q('She ___ not at work.', ['am','is','are','be'], 1), q('___ I late?', ['Am','Is','Are','Be'], 0), q('These ___ apples.', ['am','is','are','be'], 2), q('He ___ my brother.', ['am','is','are','be'], 1), q('We ___ not hungry.', ['am','is','are','be'], 2), q('___ it cold today?', ['Am','Is','Are','Be'], 1)
    ]
},
{
    id: 'A0_L2', title: 'Урок 2: Местоимения',
    theory: [
        '📘 <b>Личные местоимения</b>\n\nЗаменяют существительные:\n\n<b>Подлежащее:</b>\n• I (я)\n• You (ты, вы)\n• He (он)\n• She (она)\n• It (оно)\n• We (мы)\n• They (они)',
        '📝 <b>Притяжательные местоимения</b>\n\nПоказывают принадлежность:\n\n• <b>My</b> book (моя книга)\n• <b>Your</b> car (твоя машина)\n• <b>His</b> dog (его собака)\n• <b>Her</b> cat (её кошка)\n• <b>Our</b> house (наш дом)\n• <b>Their</b> friends (их друзья)',
        '💡 <b>Разница:</b>\n\nI <b>am</b> happy. (Я счастлив)\n<b>My</b> name is... (Моё имя...)\n\nHe <b>is</b> here. (Он здесь)\nThis is <b>his</b> bag. (Это его сумка)\n\nЗапомни: my/your/his/her — ВСЕГДА с существительным!'
    ],
    questions: [
        q('___ am a teacher.', ['I','Me','My','Mine'], 0), q('This is ___ book.', ['I','me','my','mine'], 2), q('___ is my friend.', ['He','Him','His','Hers'], 0), q('I like ___ car.', ['you','your','yours','ours'], 1), q('___ are students.', ['We','Us','Our','Ours'], 0), q('That is ___ cat.', ['she','her','hers','herself'], 1), q('___ name is John.', ['He','Him','His','Hers'], 2), q('They are ___ friends.', ['we','us','our','ours'], 2), q('___ is a doctor.', ['She','Her','Hers','Herself'], 0), q('I know ___.', ['they','them','their','theirs'], 1), q('___ house is big.', ['They','Them','Their','Theirs'], 2), q('Can you help ___?', ['I','me','my','mine'], 1), q('___ parents are nice.', ['We','Us','Our','Ours'], 2), q('This is not ___ bag.', ['I','me','my','mine'], 2), q('___ love music.', ['We','Us','Our','Ours'], 0), q('Is this ___ pen?', ['you','your','yours','ours'], 1), q('___ brother is tall.', ['He','Him','His','Hers'], 2), q('I see ___.', ['she','her','hers','herself'], 1), q('___ are happy.', ['They','Them','Their','Theirs'], 0), q('That is ___ idea.', ['we','us','our','ours'], 2)
    ]
},
{
    id: 'A0_L3', title: 'Урок 3: Артикли',
    theory: [
        '📘 <b>Неопределённый артикль A/AN</b>\n\nИспользуется с исчисляемыми существительными в единственном числе:\n\n• <b>a</b> + согласный: a book, a cat, a dog\n• <b>an</b> + гласный: an apple, an egg, an hour\n\nПереводится как "один / какой-то"',
        '📝 <b>Определённый артикль THE</b>\n\nИспользуется когда:\n1. Предмет уже упоминался\n2. Предмет единственный (the sun, the moon)\n3. Конкретный предмет\n\nПример: I have a book. <b>The</b> book is interesting.',
        '💡 <b>Когда НЕ нужен артикль:</b>\n\n• Имена: Anna (не the Anna)\n• Множественное число (вообще): Cats are cute\n• Абстрактные понятия: Love is beautiful\n\nЗапомни: a/an = один из многих, the = конкретный'
    ],
    questions: [
        q('I have ___ apple.', ['a','an','the','-'], 1), q('She is ___ doctor.', ['a','an','the','-'], 0), q('___ sun is hot.', ['A','An','The','-'], 2), q('This is ___ book.', ['a','an','the','-'], 0), q('I see ___ elephant.', ['a','an','the','-'], 1), q('___ moon is beautiful.', ['A','An','The','-'], 2), q('He has ___ car.', ['a','an','the','-'], 0), q('___ Earth is round.', ['A','An','The','-'], 2), q('It is ___ umbrella.', ['a','an','the','-'], 1), q('I want ___ coffee.', ['a','an','the','-'], 3), q('___ cat is on the table.', ['A','An','The','-'], 2), q('She has ___ idea.', ['a','an','the','-'], 1), q('___ water is cold.', ['A','An','The','-'], 3), q('This is ___ egg.', ['a','an','the','-'], 1), q('___ dog is barking.', ['A','An','The','-'], 2), q('He is ___ honest man.', ['a','an','the','-'], 1), q('I need ___ pen.', ['a','an','the','-'], 0), q('___ sky is blue.', ['A','An','The','-'], 2), q('She eats ___ banana.', ['a','an','the','-'], 0), q('___ music is loud.', ['A','An','The','-'], 3)
    ]
},
{
    id: 'A0_L4', title: 'Урок 4: Вопросительные слова',
    theory: [
        '📘 <b>Основные вопросительные слова</b>\n\n• <b>What</b> — что, какой\n• <b>Where</b> — где, куда\n• <b>Who</b> — кто\n• <b>When</b> — когда\n• <b>Why</b> — почему',
        '📝 <b>How и How much/many</b>\n\n• <b>How</b> — как\n• <b>How much</b> — сколько (неисчисляемое)\n• <b>How many</b> — сколько (исчисляемое)\n\nПримеры:\nHow are you? (Как дела?)\nHow much water? (Сколько воды?)\nHow many books? (Сколько книг?)',
        '💡 <b>Структура вопроса:</b>\n\nВопросительное слово + вспомогательный глагол + подлежащее\n\n<b>What</b> do you like?\n<b>Where</b> is she?\n<b>When</b> are they coming?\n<b>Why</b> is he sad?'
    ],
    questions: [
        q('___ is your name?', ['What','Where','Who','When'], 0), q('___ do you live?', ['What','Where','Who','When'], 1), q('___ is she?', ['What','Where','Who','When'], 2), q('___ is your birthday?', ['What','Where','Who','When'], 3), q('___ are you sad?', ['What','Where','Why','When'], 2), q('___ are you?', ['What','How','Why','When'], 1), q('___ much is it?', ['What','How','Why','When'], 1), q('___ many friends?', ['What','How','Why','When'], 1), q('___ color do you like?', ['What','Where','Who','When'], 0), q('___ is the station?', ['What','Where','Who','When'], 1), q('___ is your teacher?', ['What','Where','Who','When'], 2), q('___ do you work?', ['What','Where','When','Why'], 2), q('___ don\'t you like it?', ['What','Where','Why','When'], 2), q('___ old are you?', ['What','How','Why','When'], 1), q('___ time is it?', ['What','Where','Who','When'], 0), q('___ is your bag?', ['What','Where','Who','When'], 1), q('___ is that man?', ['What','Where','Who','When'], 2), q('___ do you study?', ['What','Where','When','Why'], 2), q('___ is the problem?', ['What','Where','Who','When'], 0), q('___ are you late?', ['What','Where','Why','When'], 2)
    ]
}
],
'A1': [
{
    id: 'A1_L1', title: 'Урок 1: Present Simple',
    theory: ['📘 <b>Present Simple</b>\n\nРегулярные действия и факты.\n\nI/You/We/They + глагол\nHe/She/It + глагол + <b>s</b>', '📝 <b>Окончания -s/-es</b>\n\nworks, goes, studies (y→ies)\n\nОтрицание: don\'t/doesn\'t + глагол', '💡 <b>Маркеры:</b>\nalways, usually, often, never, every day'],
    questions: [
        q('I ___ coffee every day.', ['drink','drinks','drinking','drank'], 0), q('She ___ to music.', ['listen','listens','listening','listened'], 1), q('They ___ football on Sundays.', ['play','plays','playing','played'], 0), q('He ___ up at 7 am.', ['get','gets','getting','got'], 1), q('We ___ English.', ['study','studies','studying','studied'], 0), q('My cat ___ milk.', ['like','likes','liking','liked'], 1), q('I ___ not like tea.', ['do','does','doing','did'], 0), q('She ___ not work here.', ['do','does','doing','did'], 1), q('___ you speak English?', ['Do','Does','Doing','Did'], 0), q('___ he know you?', ['Do','Does','Doing','Did'], 1), q('The sun ___ in the east.', ['rise','rises','rising','rose'], 1), q('Water ___ at 100°C.', ['boil','boils','boiling','boiled'], 1), q('She ___ TV every evening.', ['watch','watches','watching','watched'], 1), q('They ___ to school by bus.', ['go','goes','going','went'], 0), q('He ___ his homework.', ['do','does','doing','did'], 1), q('I ___ pizza.', ['love','loves','loving','loved'], 0), q('My sister ___ in London.', ['live','lives','living','lived'], 1), q('We ___ early.', ['wake','wakes','waking','woke'], 0), q('The train ___ at 9.', ['leave','leaves','leaving','left'], 1), q('___ she play tennis?', ['Do','Does','Doing','Did'], 1)
    ]
},
{
    id: 'A1_L2', title: 'Урок 2: Present Continuous',
    theory: ['📘 <b>Present Continuous</b>\n\nДействие происходит СЕЙЧАС.\n\nam/is/are + глагол + <b>ing</b>', '📝 <b>Правила -ing</b>\n\nmaking (e→ing), sitting (удвоение)\n\nОтрицание: am/is/are + NOT + ing', '💡 <b>Simple vs Continuous</b>\n\nI <b>work</b> every day. (факт)\nI <b>am working</b> now. (сейчас)\n\nМаркеры: now, at the moment, Look!'],
    questions: [
        q('I ___ now.', ['work','am working','works','working'], 1), q('She ___ TV at the moment.', ['watch','is watching','watches','watching'], 1), q('They ___ football now.', ['play','are playing','plays','playing'], 1), q('He ___ right now.', ['sleep','is sleeping','sleeps','sleeping'], 1), q('We ___ dinner.', ['cook','are cooking','cooks','cooking'], 1), q('It ___ outside.', ['rain','is raining','rains','raining'], 1), q('I ___ not sleeping.', ['am','is','are','be'], 0), q('She ___ not working today.', ['am','is','are','be'], 1), q('___ you listening?', ['Am','Is','Are','Be'], 2), q('___ he coming?', ['Am','Is','Are','Be'], 1), q('Look! It ___.', ['snow','is snowing','snows','snowed'], 1), q('I ___ for the bus.', ['wait','am waiting','waits','waited'], 1), q('They ___ to music.', ['listen','are listening','listens','listened'], 1), q('She ___ a book now.', ['read','is reading','reads','reading'], 1), q('We ___ home.', ['go','are going','goes','went'], 1), q('He ___ his car.', ['wash','is washing','washes','washed'], 1), q('The children ___.', ['play','are playing','plays','played'], 1), q('I ___ coffee.', ['drink','am drinking','drinks','drank'], 1), q('She ___ to work.', ['drive','is driving','drives','drove'], 1), q('They ___ lunch.', ['have','are having','has','had'], 1)
    ]
},
{
    id: 'A1_L3', title: 'Урок 3: Past Simple',
    theory: ['📘 <b>Past Simple</b>\n\nДействие завершилось в прошлом.\n\nГлагол + <b>ed</b> или 2 форма', '📝 <b>Неправильные глаголы</b>\n\ngo→went, see→saw, eat→ate, have→had, do→did\n\nОтрицание: didn\'t + глагол (без ed!)', '💡 <b>Маркеры:</b>\nyesterday, last week/month/year, ...ago, in 2010'],
    questions: [
        q('I ___ to the cinema yesterday.', ['go','went','gone','going'], 1), q('She ___ a book last week.', ['read','reads','reading','red'], 0), q('They ___ pizza for dinner.', ['eat','ate','eaten','eating'], 1), q('He ___ his homework.', ['do','did','done','doing'], 1), q('We ___ TV last night.', ['watch','watched','watching','watches'], 1), q('I ___ not see him.', ['do','did','done','doing'], 1), q('She ___ come to the party.', ['do','did','done','doing'], 1), q('___ you like the film?', ['Do','Did','Done','Doing'], 1), q('___ he call you?', ['Do','Did','Done','Doing'], 1), q('I ___ a car in 2020.', ['buy','bought','buyed','buying'], 1), q('She ___ to London last year.', ['fly','flew','flown','flying'], 1), q('They ___ the game.', ['win','won','winned','winning'], 1), q('He ___ me a letter.', ['write','wrote','written','writing'], 1), q('We ___ the bus.', ['miss','missed','missing','misses'], 1), q('I ___ tired yesterday.', ['be','was','were','been'], 1), q('She ___ happy.', ['be','was','were','been'], 1), q('They ___ at home.', ['be','was','were','been'], 2), q('I ___ breakfast at 8.', ['have','had','has','having'], 1), q('He ___ his keys.', ['lose','lost','losed','losing'], 1), q('We ___ a great time.', ['have','had','has','having'], 1)
    ]
},
{
    id: 'A1_L4', title: 'Урок 4: Предлоги',
    theory: ['📘 <b>IN/ON/AT (время)</b>\n\n<b>AT</b> — точное время: at 5pm, at night\n<b>ON</b> — дни: on Monday, on May 1st\n<b>IN</b> — месяцы/годы: in July, in 2020', '📝 <b>IN/ON/AT (место)</b>\n\n<b>AT</b> — точка: at home, at work\n<b>ON</b> — поверхность: on the table\n<b>IN</b> — внутри: in the room, in London', '💡 <b>Запомни:</b>\nIN the morning/afternoon/evening\nBUT AT night\nON the weekend (амер.) / AT (брит.)\nIN a car, ON a bus/train/plane'],
    questions: [
        q('I work ___ Monday.', ['in','on','at','to'], 1), q('She was born ___ 1995.', ['in','on','at','to'], 0), q('We meet ___ 5 pm.', ['in','on','at','to'], 2), q('The book is ___ the table.', ['in','on','at','to'], 1), q('He lives ___ London.', ['in','on','at','to'], 0), q('I sleep ___ night.', ['in','on','at','to'], 2), q('She works ___ the office.', ['in','on','at','to'], 2), q('We go skiing ___ winter.', ['in','on','at','to'], 0), q('My birthday is ___ May.', ['in','on','at','to'], 0), q('The picture is ___ the wall.', ['in','on','at','to'], 1), q('I get up ___ 7 o\'clock.', ['in','on','at','to'], 2), q('They arrived ___ the airport.', ['in','on','at','to'], 2), q('She is ___ home now.', ['in','on','at','to'], 2), q('We met ___ a party.', ['in','on','at','to'], 2), q('The keys are ___ my bag.', ['in','on','at','to'], 0), q('I read ___ the evening.', ['in','on','at','to'], 0), q('He was born ___ June 5th.', ['in','on','at','to'], 1), q('We travel ___ summer.', ['in','on','at','to'], 0), q('The cat is ___ the chair.', ['in','on','at','to'], 1), q('I\'ll see you ___ Friday.', ['in','on','at','to'], 1)
    ]
}
],
'A2': [
{
    id: 'A2_L1', title: 'Урок 1: Present Perfect',
    theory: ['📘 <b>Present Perfect</b>\n\nСвязь прошлого с настоящим.\n\nhave/has + <b>V3</b> (3 форма)', '📝 <b>Когда используем?</b>\n\n1. Результат сейчас: I <b>have lost</b> keys.\n2. Опыт: I <b>have been</b> to Paris.\n3. Недавнее: She <b>has just arrived</b>.', '💡 <b>Маркеры:</b>\nalready, yet, just, ever, never, for, since'],
    questions: [
        q('I ___ my homework.', ['finish','have finished','has finished','finished'], 1), q('She ___ to Paris.', ['be','have been','has been','was'], 2), q('They ___ the film.', ['see','have seen','has seen','saw'], 1), q('He ___ his keys.', ['lose','have lost','has lost','lost'], 2), q('We ___ here for 2 years.', ['live','have lived','has lived','lived'], 1), q('I ___ not seen him.', ['have','has','had','having'], 0), q('She ___ not called yet.', ['have','has','had','having'], 1), q('___ you ever been to Spain?', ['Have','Has','Had','Having'], 0), q('___ he finished work?', ['Have','Has','Had','Having'], 1), q('I have ___ eaten sushi.', ['never','ever','yet','since'], 0), q('She has ___ arrived.', ['just','yet','since','for'], 0), q('Have you done it ___?', ['already','yet','since','for'], 1), q('I have ___ met her.', ['already','yet','since','for'], 0), q('We have known him ___ 2010.', ['since','for','yet','already'], 0), q('They have lived here ___ 5 years.', ['since','for','yet','already'], 1), q('He has ___ called me.', ['never','ever','yet','since'], 0), q('Have you ___ tried sushi?', ['never','ever','yet','since'], 1), q('I have ___ finished.', ['just','yet','since','for'], 0), q('She has worked here ___ 2015.', ['since','for','yet','already'], 0), q('We have ___ been to Japan.', ['never','ever','yet','since'], 0)
    ]
},
{
    id: 'A2_L2', title: 'Урок 2: Future Simple',
    theory: ['📘 <b>Future Simple</b>\n\nСпонтанные решения, предсказания.\n\n<b>will</b> + глагол', '📝 <b>Когда используем?</b>\n\n1. Решение: I <b>\'ll help</b> you!\n2. Предсказание: It <b>will rain</b>.\n3. Обещание: I <b>will call</b>.\n\nОтрицание: won\'t + глагол', '💡 <b>Will vs Going to</b>\n\n<b>Will</b> — решение сейчас: I\'ll have coffee.\n<b>Going to</b> — план: I\'m going to buy a car.'],
    questions: [
        q('I ___ help you.', ['will','am','do','have'], 0), q('She ___ call you later.', ['will','am','do','have'], 0), q('They ___ come tomorrow.', ['will','are','do','have'], 0), q('It ___ rain today.', ['will','is','does','has'], 0), q('We ___ be late.', ['will','are','do','have'], 0), q('I ___ not go.', ['will','am','do','have'], 0), q('He ___ not tell anyone.', ['will','is','does','has'], 0), q('___ you help me?', ['Will','Are','Do','Have'], 0), q('___ she come?', ['Will','Is','Does','Has'], 0), q('I think it ___ be sunny.', ['will','is','does','has'], 0), q('Maybe I ___ stay home.', ['will','am','do','have'], 0), q('She ___ probably arrive late.', ['will','is','does','has'], 0), q('I promise I ___ call.', ['will','am','do','have'], 0), q('They ___ never know.', ['will','are','do','have'], 0), q('He ___ be 30 next year.', ['will','is','does','has'], 0), q('We ___ miss you.', ['will','are','do','have'], 0), q('I ___ always love you.', ['will','am','do','have'], 0), q('___ they agree?', ['Will','Are','Do','Have'], 0), q('I ___ do it now.', ['will','am','do','have'], 0), q('She ___ not like it.', ['will','is','does','has'], 0)
    ]
},
{
    id: 'A2_L3', title: 'Урок 3: Модальные глаголы',
    theory: ['📘 <b>Can/Could</b>\n\n<b>Can</b> — способность сейчас: I <b>can</b> swim.\n<b>Could</b> — в прошлом: I <b>could</b> run.', '📝 <b>Must/Have to</b>\n\n<b>Must</b> — личное: I <b>must</b> study.\n<b>Have to</b> — правило: I <b>have to</b> work.\n<b>Mustn\'t</b> — запрещено.', '💡 <b>Should</b> — совет\nYou <b>should</b> sleep.\n\nПосле модальных всегда инфинитив без to (кроме have to)'],
    questions: [
        q('I ___ swim.', ['can','must','should','have'], 0), q('___ you help me?', ['Can','Must','Should','Have'], 0), q('She ___ speak French.', ['can','must','should','have'], 0), q('I ___ go now.', ['must','can','should','have'], 0), q('You ___ smoke here.', ['mustn\'t','can\'t','shouldn\'t','haven\'t'], 0), q('We ___ wear a helmet.', ['have to','can','should','must'], 0), q('He ___ work tomorrow.', ['has to','can','should','must'], 0), q('You ___ see a doctor.', ['should','can','must','have'], 0), q('I ___ not find my keys.', ['can','must','should','have'], 0), q('She ___ not come.', ['can','must','should','have'], 0), q('___ I open the window?', ['Can','Must','Should','Have'], 0), q('You ___ eat more vegetables.', ['should','can','must','have'], 0), q('They ___ not park here.', ['mustn\'t','can\'t','shouldn\'t','haven\'t'], 0), q('I ___ run fast when I was young.', ['could','can','must','should'], 0), q('We ___ leave now.', ['must','can','should','have'], 0), q('You ___ try this restaurant.', ['should','can','must','have'], 0), q('He ___ not drive.', ['can\'t','mustn\'t','shouldn\'t','haven\'t'], 0), q('___ we go?', ['Can','Must','Should','Have'], 0), q('I ___ finish this today.', ['must','can','should','have'], 0), q('You ___ be more careful.', ['should','can','must','have'], 0)
    ]
},
{
    id: 'A2_L4', title: 'Урок 4: Степени сравнения',
    theory: ['📘 <b>Сравнительная</b>\n\nКороткие: прил + <b>er</b> + than\ntall → taller than\nДлинные: <b>more</b> + прил + than', '📝 <b>Превосходная</b>\n\nКороткие: <b>the</b> + прил + <b>est</b>\nДлинные: <b>the most</b> + прил\nИсключения: good→better→best', '💡 <b>Правила:</b>\nbig→bigger, happy→happier\nДвусложные на -y: easier\nОстальные длинные: more/most'],
    questions: [
        q('She is ___ than me.', ['tall','taller','tallest','more tall'], 1), q('This is ___ book.', ['good','better','best','the best'], 3), q('He is ___ student.', ['intelligent','more intelligent','most intelligent','the most intelligent'], 3), q('My car is ___ than yours.', ['fast','faster','fastest','more fast'], 1), q('This is ___ day of my life!', ['happy','happier','happiest','the happiest'], 3), q('She is ___ than her sister.', ['beautiful','more beautiful','most beautiful','the most beautiful'], 1), q('I am ___ than you.', ['old','older','oldest','more old'], 1), q('This is ___ film I\'ve seen.', ['bad','worse','worst','the worst'], 3), q('He runs ___ than me.', ['fast','faster','fastest','more fast'], 1), q('She is ___ person I know.', ['kind','kinder','kindest','the kindest'], 3), q('This box is ___ than that one.', ['heavy','heavier','heaviest','more heavy'], 1), q('It\'s ___ today than yesterday.', ['cold','colder','coldest','more cold'], 1), q('He is ___ boy in the class.', ['tall','taller','tallest','the tallest'], 3), q('This is ___ restaurant.', ['expensive','more expensive','most expensive','the most expensive'], 3), q('She feels ___ than before.', ['good','better','best','the best'], 1), q('This is ___ question.', ['easy','easier','easiest','the easiest'], 3), q('He is ___ than his brother.', ['strong','stronger','strongest','more strong'], 1), q('It\'s ___ way.', ['short','shorter','shortest','the shortest'], 3), q('She is ___ than me.', ['happy','happier','happiest','more happy'], 1), q('This is ___ book.', ['interesting','more interesting','most interesting','the most interesting'], 3)
    ]
}
],
'B1': [
{
    id: 'B1_L1', title: 'Урок 1: Conditionals (0 и 1)',
    theory: ['📘 <b>Zero Conditional</b>\n\nФакты: If + Present, Present\n<b>If you heat</b> water, <b>it boils</b>.', '📝 <b>First Conditional</b>\n\nРеальное будущее: If + Present, will + глагол\n<b>If it rains</b>, <b>I will stay</b> home.', '💡 <b>Разница:</b>\nZero — всегда правда (факт)\nFirst — возможно в будущем\nIf it rains tomorrow, I\'ll cancel.'],
    questions: [
        q('If you ___ water, it boils.', ['heat','will heat','heated','heating'], 0), q('If it rains, I ___ an umbrella.', ['take','will take','took','taking'], 0), q('If you ___ hard, you will succeed.', ['work','will work','worked','working'], 0), q('If she ___ late, we will start without her.', ['is','will be','was','being'], 0), q('Plants die if they ___ water.', ['don\'t get','won\'t get','didn\'t get','not get'], 0), q('If you ___ me, I will help you.', ['ask','will ask','asked','asking'], 0), q('If he ___ the bus, he will be late.', ['misses','will miss','missed','missing'], 0), q('I will call you if I ___ time.', ['have','will have','had','having'], 0), q('If you ___ sugar in tea, it dissolves.', ['put','will put','putted','putting'], 0), q('She will be angry if you ___ late.', ['are','will be','were','being'], 0), q('If it ___ sunny, we will go to the beach.', ['is','will be','was','being'], 0), q('You will get tired if you ___ too much.', ['work','will work','worked','working'], 0), q('If I ___ enough money, I will buy a car.', ['have','will have','had','having'], 0), q('Ice melts if you ___ it.', ['heat','will heat','heated','heating'], 0), q('If they ___ the train, they will miss the meeting.', ['miss','will miss','missed','missing'], 0), q('He will pass if he ___.', ['studies','will study','studied','studying'], 0), q('If you ___ spicy food, you drink water.', ['eat','will eat','ate','eating'], 0), q('I will be happy if you ___.', ['come','will come','came','coming'], 0), q('If she ___ hard, she will win.', ['tries','will try','tried','trying'], 0), q('You will learn if you ___.', ['practice','will practice','practiced','practicing'], 0)
    ]
},
{
    id: 'B1_L2', title: 'Урок 2: Past Continuous',
    theory: ['📘 <b>Past Continuous</b>\n\nДействие длилось в момент прошлого.\n\nwas/were + глагол + <b>ing</b>', '📝 <b>Past Simple vs Continuous</b>\n\nContinuous — длительное: I <b>was reading</b>.\nSimple — короткое/прерывающее: you <b>called</b>.\n\nWhen + Simple, Continuous\nWhile + Continuous', '💡 <b>Примеры:</b>\nI <b>was sleeping</b> when the phone <b>rang</b>.\nWhile I <b>was cooking</b>, she <b>was watching</b> TV.\nWhat <b>were</b> you <b>doing</b> at 8 pm?'],
    questions: [
        q('I ___ at 8 pm yesterday.', ['worked','was working','work','am working'], 1), q('She ___ when I called.', ['slept','was sleeping','sleeps','is sleeping'], 1), q('They ___ football at 3 pm.', ['played','were playing','play','are playing'], 1), q('What ___ you doing?', ['did','were','do','are'], 1), q('He ___ TV when I arrived.', ['watched','was watching','watches','is watching'], 1), q('We ___ dinner at 7 pm.', ['had','were having','have','are having'], 1), q('I ___ not sleeping.', ['did','was','do','am'], 1), q('They ___ not working.', ['did','were','do','are'], 1), q('___ you watching TV?', ['Did','Were','Do','Are'], 1), q('___ she studying?', ['Did','Was','Does','Is'], 1), q('While I ___, it started to rain.', ['walked','was walking','walk','am walking'], 1), q('He ___ when the phone rang.', ['cooked','was cooking','cooks','is cooking'], 1), q('We ___ to music all evening.', ['listened','were listening','listen','are listening'], 1), q('What ___ she doing at 9?', ['did','was','does','is'], 1), q('I ___ for you all day.', ['waited','was waiting','wait','am waiting'], 1), q('They ___ when we came.', ['argued','were arguing','argue','are arguing'], 1), q('She ___ a book while he was watching TV.', ['read','was reading','reads','is reading'], 1), q('I ___ about you yesterday.', ['thought','was thinking','think','am thinking'], 1), q('The sun ___ when we left.', ['shone','was shining','shines','is shining'], 1), q('We ___ not expecting you.', ['did','were','do','are'], 1)
    ]
},
{
    id: 'B1_L3', title: 'Урок 3: Reported Speech',
    theory: ['📘 <b>Косвенная речь</b>\n\n"I am happy", he said.\n→ He said (that) he <b>was</b> happy.\n\nВремя сдвигается назад!', '📝 <b>Сдвиг времён</b>\n\nPresent → Past\n"I like it" → He said he <b>liked</b> it.\n\nPresent Perfect → Past Perfect\n"I have done" → He said he <b>had done</b>.', '💡 <b>Изменения:</b>\nI → he/she, we → they\nnow → then, today → that day\nyesterday → the day before\ntomorrow → the next day'],
    questions: [
        q('He said he ___ tired.', ['is','was','were','been'], 1), q('She said she ___ English.', ['like','liked','likes','liking'], 1), q('They said they ___ busy.', ['are','were','was','been'], 1), q('He said he ___ the film.', ['like','liked','likes','liking'], 1), q('She said she ___ to Paris.', ['go','went','gone','going'], 1), q('He said he ___ me.', ['help','helped','would help','helping'], 2), q('She said she ___ call.', ['will','would','can','could'], 1), q('They said they ___ coming.', ['are','were','was','been'], 1), q('He said it ___ raining.', ['is','was','were','been'], 1), q('She said she ___ hungry.', ['is','was','were','been'], 1), q('He said he ___ finished.', ['has','had','have','having'], 1), q('She said she ___ seen it.', ['has','had','have','having'], 1), q('They said they ___ there before.', ['have been','had been','has been','were'], 1), q('He said he ___ work.', ['must','had to','has to','having to'], 1), q('She said she ___ swim.', ['can','could','will','would'], 1), q('He said, "I ___ busy."', ['am','was','were','been'], 0), q('She said, "I ___ it tomorrow."', ['do','will do','would do','did'], 1), q('He said, "I ___ you."', ['help','will help','would help','helped'], 1), q('She said, "I ___ late."', ['am','will be','would be','was'], 1), q('He said he ___ agree.', ['don\'t','didn\'t','won\'t','wouldn\'t'], 1)
    ]
},
{
    id: 'B1_L4', title: 'Урок 4: Пассивный залог',
    theory: ['📘 <b>Passive Voice</b>\n\nПодлежащее — объект действия.\n\nActive: Someone <b>made</b> this.\nPassive: This <b>was made</b>.\n\nbe + V3', ' <b>Формы</b>\n\nPresent: is/are + V3\nPast: was/were + V3\nPerfect: have/has been + V3', ' <b>Когда используем?</b>\n1. Неважно кто: English <b>is spoken</b>.\n2. Очевидно кто: The thief <b>was arrested</b>.\n3. Формально: You <b>are required</b> to sign.'],
    questions: [
        q('English ___ here.', ['speak','is spoken','spoke','spoken'], 1), q('The book ___ in 2020.', ['publish','published','was published','publishing'], 2), q('The room ___ every day.', ['clean','cleans','is cleaned','cleaned'], 2), q('The car ___ yesterday.', ['repair','repaired','was repaired','repairing'], 2), q('Letters ___ by post.', ['send','sends','are sent','sent'], 2), q('The window ___ last week.', ['break','broke','was broken','broken'], 2), q('Coffee ___ in Brazil.', ['grow','grows','is grown','grown'], 2), q('The decision ___ already.', ['make','made','has been made','making'], 2), q('The house ___ in 1990.', ['build','built','was built','building'], 2), q('Milk ___ in the fridge.', ['keep','keeps','is kept','kept'], 2), q('The game ___ at 8 pm.', ['play','plays','is played','played'], 2), q('The letter ___ tomorrow.', ['send','sends','will be sent','sent'], 2), q('Photos ___ by tourists.', ['take','takes','are taken','taken'], 2), q('The problem ___ now.', ['solve','solves','is being solved','solved'], 2), q('Rice ___ in Asia.', ['grow','grows','is grown','grown'], 2), q('The meeting ___ cancelled.', ['be','been','was','is'], 2), q('The work ___ finished.', ['has','have','has been','have been'], 2), q('Cars ___ in this factory.', ['make','makes','are made','made'], 2), q('The food ___ delicious.', ['smell','smells','is smelt','smelled'], 2), q('The news ___ yesterday.', ['announce','announced','was announced','announcing'], 2)
    ]
}
],
'B2': [
{
    id: 'B2_L1', title: 'Урок 1: Second Conditional',
    theory: ['📘 <b>Second Conditional</b>\n\nНереальное сейчас/вообще.\n\nIf + Past Simple, <b>would</b> + глагол\n\nIf I <b>had</b> money, I <b>would buy</b> a car.', '📝 <b>Когда используем?</b>\n\n1. Маловероятно: If I won, I would travel.\n2. Невозможно: If I were rich...\n3. Совет: If I were you, I would go.\n\nWere вместо was (формально)', '💡 <b>Примеры:</b>\nIf I <b>had</b> time, I <b>would learn</b> Japanese.\nIf she <b>knew</b>, she <b>would tell</b> us.\nWhat <b>would</b> you do if you <b>met</b> an alien?'],
    questions: [
        q('If I ___ rich, I would buy a house.', ['am','was','were','been'], 2), q('If she ___ time, she would help.', ['has','had','have','having'], 1), q('I would travel if I ___ money.', ['have','had','has','having'], 1), q('If I ___ you, I would go.', ['am','was','were','been'], 2), q('He would call if he ___.', ['knows','knew','know','known'], 1), q('If they ___, they would come.', ['can','could','will','would'], 1), q('I would help if I ___.', ['can','could','will','would'], 1), q('If she ___, she would be happy.', ['knows','knew','know','known'], 1), q('We would go if it ___ sunny.', ['is','was','were','been'], 1), q('If I ___ a bird, I would fly.', ['am','was','were','been'], 2), q('He would pass if he ___.', ['studies','studied','study','studying'], 1), q('If they ___ faster, they would win.', ['run','ran','runned','running'], 1), q('I would tell you if I ___.', ['know','knew','known','knowing'], 1), q('If she ___, she would succeed.', ['tries','tried','try','trying'], 1), q('We would stay if we ___.', ['can','could','will','would'], 1), q('If I ___ the answer, I would tell you.', ['know','knew','known','knowing'], 1), q('He would be happier if he ___.', ['works','worked','work','working'], 1), q('If they ___ us, they would come.', ['invite','invited','invites','inviting'], 1), q('I would do it if I ___ how.', ['know','knew','known','knowing'], 1), q('If she ___, she would understand.', ['listens','listened','listen','listening'], 1)
    ]
},
{
    id: 'B2_L2', title: 'Урок 2: Third Conditional',
    theory: ['📘 <b>Third Conditional</b>\n\nНереальное в ПРОШЛОМ.\n\nIf + Past Perfect, <b>would have</b> + V3\n\nIf I <b>had studied</b>, I <b>would have passed</b>.', '📝 <b>Когда используем?</b>\n\n1. Сожаление: If I had known, I would have helped.\n2. Критика: If you had listened...\n3. Воображение прошлого.', '💡 <b>Примеры:</b>\nIf I <b>had seen</b> him, I <b>would have said</b> hello.\nIf they <b>had left</b> earlier, they <b>wouldn\'t have missed</b> the train.'],
    questions: [
        q('If I had known, I ___ you.', ['would help','would have helped','will help','helped'], 1), q('If she ___, she would have come.', ['knew','had known','knows','knowing'], 1), q('I would have called if I ___ time.', ['had','had had','have','having'], 1), q('If they ___, they would have won.', ['practiced','had practiced','practice','practicing'], 1), q('He would have passed if he ___.', ['studied','had studied','studies','studying'], 1), q('If I ___ you, I would have gone.', ['was','were','had been','have been'], 2), q('She would have been happy if you ___.', ['came','had come','come','coming'], 1), q('If we ___, we wouldn\'t have been late.', ['left','had left','leave','leaving'], 1), q('I would have helped if you ___ me.', ['asked','had asked','ask','asking'], 1), q('If it ___, we would have gone out.', ['didn\'t rain','hadn\'t rained','doesn\'t rain','not raining'], 1), q('He would have seen it if he ___.', ['looked','had looked','looks','looking'], 1), q('If they ___, they would have succeeded.', ['tried','had tried','try','trying'], 1), q('I would have bought it if it ___ cheaper.', ['was','were','had been','has been'], 2), q('If she ___, she would have understood.', ['listened','had listened','listens','listening'], 1), q('We would have stayed if we ___.', ['knew','had known','know','knowing'], 1), q('If I ___, I would have told you.', ['saw','had seen','see','seeing'], 1), q('He would have been angry if he ___.', ['knew','had known','knows','knowing'], 1), q('If they ___, they would have arrived on time.', ['left','had left','leave','leaving'], 1), q('I would have come if I ___ sick.', ['wasn\'t','hadn\'t been','am not','not being'], 1), q('If she ___, she would have passed.', ['studied','had studied','studies','studying'], 1)
    ]
},
{
    id: 'B2_L3', title: 'Урок 3: Mixed Conditionals',
    theory: ['📘 <b>Mixed Conditionals</b>\n\nПрошлое → Сейчас:\nIf + Past Perfect, would + глагол\n\nIf I <b>had studied</b>, I <b>would be</b> a doctor now.', '📝 <b>Сейчас → Прошлое:</b>\n\nIf + Past Simple, would have + V3\n\nIf I <b>were</b> smarter, I <b>would have solved</b> it.', '💡 <b>Примеры:</b>\nIf I <b>had taken</b> that job, I <b>would be</b> rich now.\nIf he <b>were</b> more careful, he <b>wouldn\'t have crashed</b>.'],
    questions: [
        q('If I had studied, I ___ a doctor now.', ['would be','would have been','will be','was'], 0), q('If she were smarter, she ___ the test.', ['would pass','would have passed','will pass','passed'], 1), q('If I had saved money, I ___ rich now.', ['would be','would have been','will be','was'], 0), q('If he were taller, he ___ basketball.', ['would play','would have played','will play','played'], 0), q('If they had left earlier, they ___ here now.', ['would be','would have been','will be','were'], 0), q('If I spoke French, I ___ that job.', ['would get','would have got','will get','got'], 1), q('If she had married him, she ___ happy now.', ['would be','would have been','will be','was'], 0), q('If I were you, I ___ that mistake.', ['wouldn\'t make','wouldn\'t have made','won\'t make','didn\'t make'], 1), q('If he had practiced, he ___ better now.', ['would play','would have played','will play','played'], 0), q('If they were richer, they ___ that house.', ['would buy','would have bought','will buy','bought'], 1), q('If I had known, I ___ here now.', ['would be','would have been','will be','was'], 0), q('If she were more careful, she ___ her phone.', ['wouldn\'t lose','wouldn\'t have lost','won\'t lose','didn\'t lose'], 1), q('If he had studied harder, he ___ at university now.', ['would be','would have been','will be','was'], 0), q('If I were braver, I ___ her.', ['would ask','would have asked','will ask','asked'], 1), q('If they had invested, they ___ millionaires now.', ['would be','would have been','will be','were'], 0), q('If she knew the truth, she ___ angry.', ['would be','would have been','will be','was'], 0), q('If I had taken the job, I ___ in London now.', ['would live','would have lived','will live','lived'], 0), q('If he were more organized, he ___ late.', ['wouldn\'t be','wouldn\'t have been','won\'t be','wasn\'t'], 1), q('If they had trained, they ___ the match.', ['would win','would have won','will win','won'], 1), q('If I were younger, I ___ travel.', ['would','would have','will','did'], 0)
    ]
},
{
    id: 'B2_L4', title: 'Урок 4: Фразовые глаголы',
    theory: ['📘 <b>Phrasal Verbs</b>\n\nГлагол + частица = новое значение.\n\nlook + up = <b>look up</b> (искать)\ngive + up = <b>give up</b> (сдаваться)', '📝 <b>Частые:</b>\n\nget up, look for, give up, turn on/off\nput on, take off, come back, go on', '💡 <b>Примеры:</b>\nI <b>get up</b> at 7.\nCan you <b>turn on</b> the light?\nDon\'t <b>give up</b>!\nI\'m <b>looking for</b> keys.\nThe plane <b>takes off</b> at 9.'],
    questions: [
        q('I ___ at 7 am every day.', ['get up','get on','get off','get back'], 0), q('Can you ___ the light?', ['turn on','turn off','turn up','turn down'], 0), q('I\'m ___ my keys.', ['looking for','looking at','looking after','looking up'], 0), q('Don\'t ___! Keep trying!', ['give up','give in','give out','give away'], 0), q('She ___ her coat.', ['put on','put off','put out','put away'], 0), q('The plane ___ at 9.', ['takes off','takes on','takes up','takes after'], 0), q('I\'ll ___ tomorrow.', ['come back','come on','come in','come out'], 0), q('Please ___ the music.', ['turn down','turn up','turn on','turn off'], 0), q('He ___ his father.', ['takes after','takes on','takes up','takes off'], 0), q('___ the bus at the next stop.', ['Get off','Get on','Get up','Get back'], 0), q('I need to ___ early tomorrow.', ['get up','get on','get off','get back'], 0), q('She ___ the invitation.', ['turned down','turned up','turned on','turned off'], 0), q('Who will ___ the children?', ['look after','look for','look at','look up'], 0), q('I ___ an old friend yesterday.', ['ran into','ran out','ran over','ran away'], 0), q('We ___ milk.', ['ran out of','ran into','ran over','ran away'], 0), q('Please ___ your shoes.', ['take off','take on','take up','take after'], 0), q('The meeting was ___ until Monday.', ['put off','put on','put out','put away'], 0), q('He ___ smoking last year.', ['gave up','gave in','gave out','gave away'], 0), q('I ___ this word in the dictionary.', ['looked up','looked for','looked after','looked at'], 0), q('___! You can do it!', ['Come on','Come in','Come back','Come out'], 0)
    ]
}
]
};

// ===== СОСТОЯНИЕ =====
let state = { points: 0, currentLevel: 'A0', isPremium: false, lessons: {} };

function loadState() {
    try { const s = localStorage.getItem('aevi_progress'); if (s) state = JSON.parse(s); } catch(e) {}
}
function saveState() { localStorage.setItem('aevi_progress', JSON.stringify(state)); updateUI(); }

function updateUI() {
    document.getElementById('points-display').textContent = state.points;
    document.getElementById('premium-btn').style.display = state.isPremium ? 'none' : 'block';
    renderLevels();
    renderLessons();
}

function renderLevels() {
    const c = document.getElementById('levels-container');
    c.innerHTML = '';
    LEVELS.forEach(l => {
        if (l === 'B2' && !state.isPremium) return;
        const btn = document.createElement('button');
        btn.className = 'level-chip' + (state.currentLevel === l ? ' active' : '');
        btn.textContent = l;
        btn.onclick = () => { state.currentLevel = l; saveState(); };
        c.appendChild(btn);
    });
}

function renderLessons() {
    const c = document.getElementById('lessons-container');
    c.innerHTML = '';
    const lessons = DB[state.currentLevel] || [];
    if (!lessons.length) { c.innerHTML = '<p style="text-align:center">Уроки не найдены</p>'; return; }
    lessons.forEach(lesson => {
        const prog = state.lessons[lesson.id] || { completed: false, theoryViewed: false, score: 0 };
        const card = document.createElement('div');
        card.className = 'lesson-card' + (prog.completed ? ' completed' : '');
        card.innerHTML = `
            <div class="theory-icon" onclick="event.stopPropagation(); openTheory('${lesson.id}')">?</div>
            <div class="title">${lesson.title}</div>
            <div class="status">${prog.completed ? '✅ Пройден' : (prog.theoryViewed ? '▶️ Доступен' : '📚 Теория')}</div>`;
        card.onclick = () => startLesson(lesson.id);
        c.appendChild(card);
    });
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}
function goHome() { showScreen('home-screen'); updateUI(); }

document.getElementById('premium-btn').onclick = () => {
    state.isPremium = true;
    tg.showPopup({ title: '🎉 Premium!', message: 'Подписка активирована! B2 разблокирован.', buttons: [{ type: 'ok' }] });
    saveState();
};

// ===== ТЕОРИЯ =====
let currentTheoryLessonId = null, theoryStep = 0;
function openTheory(id) {
    currentTheoryLessonId = id;
    document.getElementById('theory-title').textContent = findLesson(id).title;
    theoryStep = 0; renderTheoryStep(); showScreen('theory-screen');
}
function renderTheoryStep() {
    const l = findLesson(currentTheoryLessonId);
    document.getElementById('theory-content').innerHTML = l.theory[theoryStep].replace(/\n/g, '<br>');
    document.getElementById('theory-next-btn').textContent = theoryStep < l.theory.length - 1 ? 'Далее →' : 'К тесту ';
}
document.getElementById('theory-next-btn').onclick = () => {
    const l = findLesson(currentTheoryLessonId);
    if (theoryStep < l.theory.length - 1) { theoryStep++; renderTheoryStep(); }
    else {
        if (!state.lessons[l.id]) state.lessons[l.id] = { completed: false, theoryViewed: false, score: 0 };
        state.lessons[l.id].theoryViewed = true; saveState(); startQuiz(l.id);
    }
};

// ===== ТЕСТ =====
let currentQuizLessonId = null, quizIndex = 0, quizScore = 0;
function startLesson(id) {
    const p = state.lessons[id];
    (!p || !p.theoryViewed) ? openTheory(id) : startQuiz(id);
}
function startQuiz(id) { currentQuizLessonId = id; quizIndex = 0; quizScore = 0; showScreen('quiz-screen'); loadQuestion(); }
function findLesson(id) { for (const l of LEVELS) { const f = DB[l]?.find(x => x.id === id); if (f) return f; } return null; }

function loadQuestion() {
    const l = findLesson(currentQuizLessonId);
    const q = l.questions[quizIndex];
    document.getElementById('quiz-step').textContent = quizIndex + 1;
    document.getElementById('quiz-fill').style.width = ((quizIndex + 1) / l.questions.length * 100) + '%';
    document.getElementById('quiz-question').textContent = q.q;
    const opts = document.getElementById('quiz-options');
    opts.innerHTML = '';
    q.a.forEach((ans, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn'; btn.textContent = ans;
        btn.onclick = () => handleAnswer(i, q.c, btn, l.questions.length);
        opts.appendChild(btn);
    });
}

function handleAnswer(sel, cor, btn, total) {
    document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
    if (sel === cor) { btn.classList.add('correct'); quizScore++; tg.HapticFeedback?.notificationOccurred('success'); }
    else { btn.classList.add('wrong'); document.querySelectorAll('.option-btn')[cor].classList.add('correct'); tg.HapticFeedback?.notificationOccurred('error'); }
    setTimeout(() => { quizIndex++; quizIndex < total ? loadQuestion() : finishQuiz(); }, 800);
}

function finishQuiz() {
    const l = findLesson(currentQuizLessonId);
    const pts = quizScore * 10;
    state.points += pts;
    state.lessons[l.id] = { completed: true, theoryViewed: true, score: quizScore };
    saveState();
    document.getElementById('result-correct').textContent = quizScore;
    document.getElementById('result-points').textContent = pts;
    showScreen('result-screen');
}

// ===== ЗАПУСК =====
loadState(); updateUI();
setTimeout(() => {
    const s = document.getElementById('splash-screen');
    s.classList.remove('show'); s.style.display = 'none';
    showScreen('home-screen');
}, 5000);
