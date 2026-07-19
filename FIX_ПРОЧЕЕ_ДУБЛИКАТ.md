# ✅ ИСПРАВЛЕНИЕ: ДУБЛИКАТ "ПРОЧЕЕ"

## 🔍 ПРОБЛЕМА:

На странице `/wiki/countries` раздел **"Прочее"** дублировался, потому что страны с континентами `north-america` и `south-america` не распознавались системой.

## 🐛 ПРИЧИНА:

В файле `src/app/wiki/countries/page.tsx` в объекте `continentDisplayInfo` были только ключи в **camelCase**:
- ❌ `northAmerica` 
- ❌ `southAmerica`

Но в MDX-файлах стран используется формат **kebab-case**:
- ✅ `north-america`
- ✅ `south-america`

Из-за несовпадения ключей, система не находила соответствие и помещала эти страны в категорию **"other"** (Прочее).

---

## ✅ РЕШЕНИЕ:

Добавлены дополнительные ключи в `continentDisplayInfo`:

```typescript
const continentDisplayInfo: Record<string, { name: string; icon: string }> = {
  europe: { name: 'Европа', icon: '🇪🇺' },
  asia: { name: 'Азия', icon: '🌏' },
  northAmerica: { name: 'Северная Америка', icon: '🌎' },
  'north-america': { name: 'Северная Америка', icon: '🌎' },  // ← ДОБАВЛЕНО
  southAmerica: { name: 'Южная Америка', icon: '🌎' },
  'south-america': { name: 'Южная Америка', icon: '🌎' },     // ← ДОБАВЛЕНО
  africa: { name: 'Африка', icon: '🌍' },
  oceania: { name: 'Океания', icon: '🏝️' },
  other: { name: 'Прочее', icon: '🌐' },
};
```

---

## 📊 РЕЗУЛЬТАТ:

Теперь все **217 стран** правильно распределены по **6 континентам**:

- 🌍 **Африка** (africa): 58
- 🌏 **Азия** (asia): 52
- 🇪🇺 **Европа** (europe): 52
- 🌎 **Северная Америка** (north-america): 27
- 🏝️ **Океания** (oceania): 16
- 🌎 **Южная Америка** (south-america): 12

**Категория "Прочее" больше не дублируется!** ✨

---

## ✅ ВАЛИДАЦИЯ:

Все континенты в MDX-файлах проверены:
```
africa
asia
europe
north-america
oceania
south-america
```

Никаких других значений не найдено.
