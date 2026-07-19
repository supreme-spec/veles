'use client';

import { useState, useEffect } from 'react';
import { Search, Calendar, Users, MapPin, AlertCircle, ExternalLink, Loader2 } from 'lucide-react';

const TELEGRAM_MANAGER = 'https://t.me/Anastasiiiiyyaa';

interface DictionaryData {
  departureCities: { cid: string; name: string }[];
  destinations: { cid: string; name: string }[];
}

export default function TourSearchForm() {
  const [loading, setLoading] = useState(false);
  const [dictLoading, setDictLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [dictionaries, setDictionaries] = useState<DictionaryData>({ departureCities: [], destinations: [] });

  const [formData, setFormData] = useState({
    departureTownCID: '',
    tourCID: '',
    dateFrom: new Date().toISOString().split('T')[0],
    dateTo: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    adults: 2,
    children: 0,
  });

  useEffect(() => {
    async function fetchDicts() {
      try {
        const res = await fetch('/api/tours/dictionaries');
        const data = await res.json();
        if (data.success) {
          setDictionaries(data.data);
          if (data.data.departureCities.length > 0) {
            setFormData(prev => ({ ...prev, departureTownCID: data.data.departureCities[0].cid }));
          }
          if (data.data.destinations.length > 0) {
            setFormData(prev => ({ ...prev, tourCID: data.data.destinations[0].cid }));
          }
        }
      } catch (err) {
        console.error('Ошибка загрузки справочников', err);
      } finally {
        setDictLoading(false);
      }
    }
    fetchDicts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const res = await fetch('/api/tours/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.error || 'Ошибка при поиске туров');
        return;
      }
      setResults(data.data || []);
    } catch (err) {
      setError('Произошла ошибка сети. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  const getTelegramMessage = (tour: any) => {
    const depCity = dictionaries.departureCities.find(c => c.cid === formData.departureTownCID)?.name || formData.departureTownCID;
    const dest = dictionaries.destinations.find(d => d.cid === formData.tourCID)?.name || formData.tourCID;

    return encodeURIComponent(
      `Здравствуйте! Хочу забронировать тур:%0A🌍 Направление: ${dest}%0A✈️ Вылет из: ${depCity}%0A🏨 Отель: ${tour.hotelName}%0A🛏 Категория: ${tour.roomCategory}%0A🌙 Ночей: ${tour.nights}%0A💰 Цена: ${tour.price.toLocaleString('ru-RU')} ₽%0A📅 Даты: с ${formData.dateFrom} по ${formData.dateTo}%0A👥 Туристов: ${formData.adults} взр., ${formData.children} дет.`
    );
  };

  if (dictLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-12 flex flex-col items-center justify-center text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-600" />
        <p>Загрузка доступных направлений...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 mb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0">
        <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-bl-xl shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          В разработке
        </span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <Search className="w-6 h-6 text-blue-600" />
        Поиск выгодных туров
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Город вылета
            </label>
            <select
              value={formData.departureTownCID}
              onChange={(e) => setFormData({ ...formData, departureTownCID: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white dark:bg-gray-700 dark:text-white"
            >
              {dictionaries.departureCities.map(city => (
                <option key={city.cid} value={city.cid}>{city.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Направление
            </label>
            <select
              value={formData.tourCID}
              onChange={(e) => setFormData({ ...formData, tourCID: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white dark:bg-gray-700 dark:text-white"
            >
              {dictionaries.destinations.map(dest => (
                <option key={dest.cid} value={dest.cid}>{dest.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Даты поездки
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                value={formData.dateFrom}
                onChange={(e) => setFormData({ ...formData, dateFrom: e.target.value })}
                className="w-1/2 px-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white dark:bg-gray-700 dark:text-white"
              />
              <input
                type="date"
                value={formData.dateTo}
                onChange={(e) => setFormData({ ...formData, dateTo: e.target.value })}
                className="w-1/2 px-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Users className="w-4 h-4" /> Туристы
            </label>
            <div className="flex gap-2">
              <select
                value={formData.adults}
                onChange={(e) => setFormData({ ...formData, adults: Number(e.target.value) })}
                className="w-1/2 px-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white dark:bg-gray-700 dark:text-white"
              >
                {[1, 2, 3, 4].map(n => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'взрослый' : 'взрослых'}
                  </option>
                ))}
              </select>
              <select
                value={formData.children}
                onChange={(e) => setFormData({ ...formData, children: Number(e.target.value) })}
                className="w-1/2 px-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white dark:bg-gray-700 dark:text-white"
              >
                {[0, 1, 2, 3].map(n => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'ребенок' : 'детей'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Ищем лучшие предложения...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Найти туры
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm flex items-start gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Найдено вариантов: {results.length}</h3>
          <div className="grid gap-4">
            {results.map((tour) => {
              const tgLink = `${TELEGRAM_MANAGER}?text=${getTelegramMessage(tour)}`;
              return (
                <div
                  key={tour.id}
                  className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">{tour.hotelName}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      {tour.roomCategory} • {tour.nights} ночей
                    </p>
                  </div>
                  <div className="text-right flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-2">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {tour.price.toLocaleString('ru-RU')} ₽
                    </div>
                    <a
                      href={tgLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm flex items-center gap-2"
                    >
                      Забронировать <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {results.length === 0 && !loading && !error && formData.dateFrom && (
        <div className="mt-8 p-8 text-center text-gray-500 bg-gray-50 dark:bg-gray-700 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
          <p>По выбранным параметрам предложений пока нет. Попробуйте изменить даты или направление.</p>
        </div>
      )}
    </div>
  );
}
