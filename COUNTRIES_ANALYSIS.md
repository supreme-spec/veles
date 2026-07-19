# Анализ стран по континентам

> **Статус (2026-07-13):** континенты в реальном источнике `src/shared/data/optimized-continent-mapping.ts`
> уже корректны: `jamaica` → `northAmerica`, `belize`/`nicaragua`/`panama` → `northAmerica`,
> а `micronesia`/`nauru`/`new-zealand`/`niue`/`northern-mariana-islands`/`palau`/`papua-new-guinea`/`samoa`
> → `oceania`. Ниже — исторические находки, исправленные в коде; править данные в `optimized-continent-mapping.ts` не требуется.

## Найденные проблемы:

### 1. ДУБЛИКАТЫ:
- **kitai-gid** (строка 93) - дубликат china (строка 38) ✓ УЖЕ УДАЛЁН

### 2. НЕПРАВИЛЬНОЕ НАЗВАНИЕ КОНТИНЕНТА:
- jamaica,**america** (строка 87) → должно быть **north** (Северная Америка)
- micronesia,**australia** (строка 118) → должно быть **oceania**
- nauru,**australia** (строка 127) → должно быть **oceania**
- new-zealand,**australia** (строка 130) → должно быть **oceania**
- niue,**australia** (строка 134) → должно быть **oceania**
- northern-mariana-islands,**australia** (строка 136) → должно быть **oceania**
- palau,**australia** (строка 142) → должно быть **oceania**
- papua-new-guinea,**australia** (строка 145) → должно быть **oceania**
- samoa,**australia** (строка 165) → должно быть **oceania**

### 3. НЕПРАВИЛЬНОЕ РАСПРЕДЕЛЕНИЕ ЦЕНТРАЛЬНОЙ АМЕРИКИ:
- belize,**south** (строка 20) → должно быть **north**
- nicaragua,**south** (строка 131) → должно быть **north**
- panama,**south** (строка 144) → должно быть **north**

### 4. СПЕЦИФИЧЕСКИЕ ТЕРРИТОРИИ (возможно не страны):
- hong-kong - САР Китая
- macao - САР Китая
- puerto-rico - территория США
- saint-barthelemy - заморская территория Франции
- saint-helena - британская заморская территория
- saint-pierre-and-miquelon - заморская территория Франции
- reunion - заморский регион Франции
- northern-mariana-islands - территория США
- niue - ассоциированное с Новой Зеландией государство
- tibet - автономный регион Китая

### 5. НЕПРИЗНАННЫЕ/ЧАСТИЧНО ПРИЗНАННЫЕ:
- abkhazia - Абхазия
- artsakh - Нагорный Карабах
- donetsk - ДНР
- luhansk - ЛНР
- kosovo - Косово
- northern-cyprus - Северный Кипр
- palestine - Палестина
- sahrawi-arab-democratic-republic - САДР
- somaliland - Сомалиленд
- south-ossetia - Южная Осетия
- transnistria - Приднестровье
- western-sahara - Западная Сахара

## Итого:
- **Всего файлов: 218**
- **Дубликаты: 1** (kitai-gid - уже удалён)
- **После удаления дубликатов: 217**

**Для достижения 212-213 стран нужно:**
- Либо удалить 4-5 территорий/непризнанных образований
- Либо пересчитать что считать "страной"

## Распределение по континентам (после исправлений):

### Европа (europe): ~50
### Азия (asia): ~50
### Африка (africa): ~54
### Северная Америка (north): ~23
### Южная Америка (south): ~13
### Океания (oceania): ~16
### Австралия как континент: только сама Австралия (~1)
