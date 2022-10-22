# Тестовое задание на позицию "HTML-верстальщик / Front-end разработчик" в компанию Nevatrip

## 1 часть

### 1 задание (Верстка блока): 
Свёрстанные блоки находятся в файле task_1_1.html.

### 2 задание (Таблица на странице):

Несколько вариантов:
- Если скроллбар допустим, но нужно, чтобы вёрстка была в порядке: можно обернуть таблицу в `<div>` с применённым css-правилом `overflow-x: auto`;
- Также можно попробовать применить правило `word-break: break-all`, т.к. в некоторых случаях ячейки таблицы шире, чем предполагалось, из-за очень длинных слов, которые по умолчанию не переносятся;
- Если скроллбар недопустим: ещё одно простое решение заключается в  ограничении ширины таблицы путём применения к вышеупомянутому `<div>` правила `width: 100%` (или с другим значением, меньшим 100%);
- Используя медиавыражения `@media`, можно написать отдельные наборы правил для просмотра страницы на устройствах с различными параметрами экрана.
- В качестве радикального решения можно переписать таблицу, удалив все теги `<table>` и пр. и используя контейнер с `display: grid`, который в гораздо большем объёме поддаётся стилизации и адаптации под различные устройства.

## 2 часть

### 1 задание (Билеты на событие), 1 вопрос 

Самый очевидный вариант, который можно предпринять для сохранения двух дополнительных категорий (льготные и групповые билеты) - добавить по две колонки для каждого типа билетов:
ticket_type_price и ticket_type_quantity. Однако, из условия следует, что в будущем возможны новые категории билетов, и каждый раз модифицировать БД не кажется оптимальным вариантом. К тому же, количество колонок будет постоянно увеличиваться, и в определённый момент БД будет трудночитаема.

Я предлагаю добавить одну колонку `types_data` (строковый тип), которая будет хранить дополнительную информацию о типах в виде строки.

В общем случае, строка будет иметь следующий вид:
`A_B_C`,
- где А - буквенное обозначение типа билета (в нашем случае, пусть это будет "P" (от Preferential) для льготных и "G" (от Group) для групповых);
- В - стоимость билета;
- С - количество билетов.

Для записи билетов нескольких типов можно в качестве символа, обозначающего соединение, использовать `&`, тогда строка будет выглядеть следующим образом:
`Aa_Ba_Ca&Ab_Bb_Cb`,
где a и b обозначают принадлежность параметров A, B и С к разным типам.

Например, следующая запись:
`P_500_2`
означает, что в состав заказа, помимо прочих билетов, также включены 2 льготных билета стоимостью 500 руб. каждый.

Ещё примеры:
- `G_2500_1`: один групповой билет стоимостью 2500 руб.
- `P_600_3&G_2000_1`: 3 льготных билета по 600 руб. и 1 групповой стоимостью 2000 руб.

В будущем, при появлении новых типов билетов им достаточно будет присвоить свой буквенный код.
Итоговая таблица (с пересчитанной стоимостью):

| id | event_id | event_date          | ticket_adult_price | ticket_adult_quantity | ticket_kid_price | ticket_kid_quantity | types_data       | barcode  | user_id | equal_price | created             |
|----|----------|---------------------|--------------------|-----------------------|------------------|---------------------|------------------|----------|---------|-------------|---------------------|
| 1  | 003      | 2021-08-21 13:00:00 | 700                | 1                     | 450              | 0                   | P_500_2          | 11111111 | 00451   | 700         | 2021-01-11 13:22:09 |
| 2  | 006      | 2021-07-29 18:00:00 | 1000               | 0                     | 800              | 2                   | G_2500_1         | 22222222 | 00364   | 1600        | 2021-01-12 16:62:08 |
| 3  | 003      | 2021-08-15 17:00:00 | 700                | 4                     | 450              | 3                   | P_600_3&G_2000_1 | 33333333 | 00015   | 4150        | 2021-01-13 10:08:45 |

### 1 задание (Билеты на событие), 2 вопрос 

### 2 задание (Время из A в B)