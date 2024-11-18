# Webpack

1. Проинециализировал проект
2. Устанавливаю Eslint@8.57.1
3. "export default {" - выбрать такую конструкцию, мне помог встроенный ИИ
4. Переделал файл конфигурации c помощью команда npm init @eslint/config, при
   команде отменил установку доп пакетов
5. Автоматически пока что ничего не линтется
6. Вручную устанавливаю доп пакеты globals, @eslint/js, eslint-plugin-react,
   @types/eslint\_\_js typescript typescript-eslint
7. После перезапуска расширения в иде заработал линтинг в рилтайм
8. Как теперь сделать чтобы линтер проверил весь проект? npx eslint src
9. Добавил скрипт "lint": "eslint src"

10. Как добавить конфиг airbnb? решил в пункте 15
11. Установил prettier
12. npm install -D eslint-plugin-import@2.25.3 eslint-plugin-jsx-a11y@6.5.1
    eslint-plugin-react-hooks@4.3.0
13. Как настроить eslint-plugin-import, я не понимаю о чем пишется в
    документации на npm. В пункте typescript есть опция установить
    eslint-import-resolver-typescript?? {Не сделал}
14. Что если мне вообще не нужно настраивать зависимости предложенные в airbnb
    документации? Ведь там нет об этом ни слова. Моя теория: так как мы берем
    конфиг airbnb, то в нем уже есть настройки этих зависимостей. С другой
    стороны может ли быть этот конфиг таким гибким что по разному встраивает
    плагины в зависимости это расширения самого конфига eslint?
15. Просто добавил airbnb в корневой массив конфига
16. npm install eslint-config-airbnb-typescript \
     @typescript-eslint/eslint-plugin@^7.0.0 \
     @typescript-eslint/parser@^7.0.0 \
     --save-dev
17. eslint-plugin - не хотел устанавливаться из за конфликта с
    @typescript-eslint/parser, но с помощью команды npm view я узнал подходящую
    версию и установил
18. Добавил также в корень массива расширение airbnb-typescript
19. Добавил parserOptions: { project: './tsconfig.json' }
20. Забыл установить сам airbnb
21. Пишет ошибку, что я как то не так добавил airbnb (пункт 15), A config object
    is using the "extends" key, which is not supported in flat config system.
22. Как тогда использовать airbnb во flat конфиге? Да
23. import { fileURLToPath } from 'url';

// mimic CommonJS variables -- not needed if using CommonJS
const **filename = fileURLToPath(import.meta.url);
const **dirname = path.dirname(\_\_filename);

const compat = new FlatCompat({
baseDirectory: \_\_dirname,
});

{
...
...compat.extends('airbnb'),
{
// plugins: {
// '@typescript-eslint': tseslint,
// },
rules: {
...airbnbTypescript.rules,
},
settings: {
...airbnbTypescript.settings,
},
},
...}
