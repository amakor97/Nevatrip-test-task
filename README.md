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

### 1 задание (Билеты на событие)

| id | event_id | event_date | ticket_adult_price | ticket_adult_quantity | ticket_kid_price | ticket_kid_quantity | additional_data | barcode | user_id | equal_price | created |
|----|----------|------------|--------------------|-----------------------|------------------|---------------------|-----------------|---------|---------|-------------|---------|
|    |          |            |                    |                       |                  |                     |                 |         |         |             |         |
|    |          |            |                    |                       |                  |                     |                 |         |         |             |         |
|    |          |            |                    |                       |                  |                     |                 |         |         |             |         |

### 2 задание (Время из A в B)