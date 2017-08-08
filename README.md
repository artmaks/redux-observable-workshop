# React + Redux + Redux-Observable application example

# Installation

* `git clone`
* `cd client && npm install`
* `cd server && npm install`
* `cd stub   && npm install`

# Launch

* `cd client && npm start` - ready app in dev mode
* `cd stub 	 && npm start` - app stub
* `cd server && npm start` - web server. generates random data

# Information

Directory **client** contains a fully implemented application. On the other hand, directory **stub** contains partially implemented application. You can improve your skill by implementing it by yourself.

If you have some problems with implementing you can check instruction below. I write down every step during the implementation.

Also in the ``implementation`` branch you can find implemented ``stub`` directory and commits for every part of instruction.

# Instruction (step by step)

**I. Запустить счетчик температуры (сейчас статика)**
1. Смотрим ``index.jsx``
    1. В компонент Provider мы передаем общий state приложения ``appStore``
    2. Переходим в файл ``app.store.js`` из которого импортируется ``store``
2. Смотрим ``app.store.js``
    1. В данном файле мы видим хинт (в виде комментария), который намекает нам, что нужно установить middleware для redux state.
    2. Для этого импортируем ``createEpicMiddleware`` функцию из библиотеки ``redux-observable``
    3. Библиотека позволяет использовать **epics** в качестве **middleware**, поэтому нам необходимо подключить главный epic ``rootEpic``
    4. Делается это по аналогии с ``rootReducer``
    5. Создаём новый ``epicsMiddleware`` при помощи ``createEpicMiddleware``
    6. Передаем ``epicsMiddleware`` в ``applyMiddleware``
3. Сделали, получили ошибку ``Module not found: Can't resolve './temperature/epics' in 'stub/src’``
    1. Это ошибка означает, что у нас отсутсвует **epic** для компонента ``temperature``
    2. Создадим файл ``epics.js`` в директории ``./temperature`` по аналогии с остальными директориями
    3. Для начала импортируем вспомогательную функцию ``FetchEpic`` из файла ``../common/epic-creators.js``
    4. Затем импортируем константы ``FETCH``, ``FETCH_DONE``, ``FETCH_FAILED`` из соответствующего данному компоненту редьюсера
    5. Импортируем адаптер
    6. Затем экспортируем переменную ``temperatureFetchEpic``, которая содержит в себе возвращаемый результат функции ``FetchEpic`` с переданными константами типов и функцией исполнения
4. Сделали, получили ошибку ``Module not found: Can't resolve '../common/epic-creators'``
    1. На самом деле сейчас у нас нет в проекте файла ``epic-creators``, который содержит вспомогательную функцию ``FetchEpic``.
    2. Добавим его… (тут можно и расписать подробнее :))
5. Добавили, получили ошибку ``'../conditions/reducer' does not contain an export named 'CALC_CONDITIONS'``
    1. Просто добавим строчку ``export const CALC_CONDITIONS = 'summary.calcConditions';`` в качестве заглушки
6. Добавили, ошибок нет, но данные не обновляются. 
    1. Идем в файл ``app.reducer.js`` и импортируем ``syncReducer``
    2. Затем добавляем его в ``rootReducer``
    3. Затем идем в ``app.component.jsx`` и импортируем ``SYNC_START`` и ``Action``
    4. При componentDidMount диспатчим ``Action(SYNC_START)``
7. Сделали, получили ошибку в ``conditions/epics.js`` в функции ``getValueFromState``
    1. Причина ошибки простая, функция опирается еще на не существующие записи в store **precipitation**, **humidity** и т.д.
    2. Необходимо просто исключить ненужные на данном этапе эпики из ``rootEpic``
    3. Закоментируем все строчки, кроме нужных нам ``temperatureFetchEpic``, ``syncStartEpic``, ``syncEpic``
8. Заходим на страницу. Успех! Счетчик температуры обновляется!
9. Коммит стэйбл вершион!
 
**II. Запустить счетчик ветра (сейчас его нет)**
1. Добавим ``windReducer`` в ``app.reducer.js``
2. Расскоментируем ``windSpeedFetchEpic``, ``windDirectionFetchEpic`` в ``app.epics.js``
3. Откроем файл ``app.component.jsx`` и добавим компонент ``DashboardPanel`` для отображения скорости ветра (по аналогии с температурой)
4. В таких **props** как ``error`` и ``loading`` заменим ``'temperature'`` на ``'wind'``
5. ``this.getValue('temperature')`` заменим на ``this.getValue('wind.speed’)``. Так как ветер имеет как скорость так и направление
6. Осталось исправить функцию ``getValue``, чтобы она могла принимать вложенные поля переменной...
7. Счетчик обновляется!
8. Теперь добавим функцию ``getWindDirectionIcon`` для определения иконки ветра в зависимости от направления
9. И передадим соответствующую иконку в **props** компонента ``DashboardPanel``
10. Иконка направления обновляется!

**III. Запустить счетчик влажности (humidity)**
1. Добавим ``humidityReducer`` в ``app.reducer.js``
2. Расскоментируем ``humidityFetchEpic`` в ``app.epics.js``
3. Откроем файл ``app.component.jsx`` и добавим компонент ``DashboardPanel`` для отображения влажности (по аналогии с температурой)
4. Заменим параметры ``temperature`` на ``wind``
5. Успех! Влажность обновляется!
6. Коммит!

**IV. Запустить учет conditions в верхнем компоненте на странице**
1. Идем в файл ``conditions/reducer.js``
    1. Видим, что в данный момент reducer всегда возвращает прежний ``state`` и начальное состояние равно ``snow``
    2. Устанавливаем начальное состояние равное ``na``
    3. Объявляем константу ``CALC_CONDITIONS``
    4. Пишем обработчик поступающих в **Reducer** событий (switch - case)
    5. Для события ``CALC_CONDITIONS`` напишем 2 вспомогательные функции: ``calcConditionsActionHandler`` и ``composeConditions``
    6. ``calcConditionsActionHandler`` вызывается при срабатывании события ``CALC_CONDITIONS`` и возвращает новый ``state``
    7. ``composeConditons`` используется для расчета нового состояния на основе погодных данных 
2. Далее идем в файл ``app.epics.js`` и добавляем эпик ``calcConditionsEpic``
3. Так как для расчета состояния используется **precipitation** необходимо включить также соответсвующий **epic** и **reducer**
4. Готово! Состояние обновляется!
5. Коммит!

**V. Подключить статистику**
1. Подключаем ``statsReducer`` в ``rootReducer``
2.  Раскомментируем необходимые для статистики эпики в ``rootEpic``
3. Открываем файл ``app.component.jsx``
    1. Создаем специальную функцию ``getStatsFor(type)`` которая возвращает статистику для определенного типа событий
    2. Теперь нам необходимо передать **props** ``statsValues`` в каждый из компонентов
4. Затем необходимо создать новый компонент ``StatsTable`` каждый и использовать его внутри ``dashboard-panel`` компонента для отображения статистики
5. Сделали, получаем ошибку ``«Cannot read property 'daily' of undefined»``. Это возникаем из-за того, что мы передали статистику только в 1 компонент (temperature), а остальные получают undefined.
6. Для решения в файле ``stats-table.component.jsx`` в методе ``getValue`` изначально проверяем **values** на undefined и возвращаем ``'--'`` если это так.
7. Отлично! Статистика для температуры считается.
8. Подключим остальные компоненты (ветер и влажность)
9. Ура! Все компоненты ведут статистику!
10. Коммит!

**VI. При обновлении статистики было замечено, что не считается общая средняя температура**
1. Анализируем функцию ``TotalStatsEpic``
2. Замечаем, что функцию считается с ошибкой для **temperature**, потому что в состоянии **temperature** отсутсвует ``tick``
3. Анализируем редьюсер для temperature и понимаем, что он использует вложенные редьюсеры которые находятся в этом же файле. 
4. Заменяем их на аналогичные общие функции, которые успешно используются в остальных компонентах.
5. Общая статистика работает!
6. Коммит!
