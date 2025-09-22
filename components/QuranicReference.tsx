
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

const QuranicReference: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useAppContext();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-xl font-semibold text-teal-700"
      >
        <span>{t('quranicReferenceTitle')}</span>
        <svg
          className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="mt-4 space-y-6 pt-4 border-t">
          <div className="space-y-3">
            <h3 className="text-lg font-bold">{t('quranVerse4_11_title')}</h3>
            <p className="text-right text-2xl leading-loose arabic-text" dir="rtl">
            يُوصِيكُمُ ٱللَّهُ فِىٓ أَوْلَـٰدِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ ٱلْأُنثَيَيْنِ ۚ فَإِن كُنَّ نِسَآءًۭ فَوْقَ ٱثْنَتَيْنِ فَلَهُنَّ ثُلُثَا مَا تَرَكَ ۖ وَإِن كَانَتْ وَٰحِدَةًۭ فَلَهَا ٱلنِّصْفُ ۚ وَلِأَبَوَيْهِ لِكُلِّ وَٰحِدٍۢ مِّنْهُمَا ٱلسُّدُسُ مِمَّا تَرَكَ إِن كَانَ لَهُۥ وَلَدٌۭ ۚ فَإِن لَّمْ يَكُن لَّهُۥ وَلَدٌۭ وَوَرِثَهُۥٓ أَبَوَاهُ فَلِأُمِّهِ ٱلثُّلُثُ ۚ فَإِن كَانَ لَهُۥٓ إِخْوَةٌۭ فَلِأُمِّهِ ٱلسُّدُسُ ۚ مِنۢ بَعْدِ وَصِيَّةٍۢ يُوصِى بِهَآ أَوْ دَيْنٍ ۗ ءَابَآؤكُمْ وَأَبْنَآؤكُمْ لَا تَدْرُونَ أَيُّهُمْ أَقْرَبُ لَكُمْ نَفْعًۭا ۚ فَرِيضَةًۭ مِّنَ ٱللَّهِ ۗ إِن ٱللَّهَ كَانَ عَلِيمًا حَكِيمًۭا ١١
            </p>
            <blockquote className="border-l-4 border-gray-200 pl-4">
              <p className="text-gray-600 italic">{t('quranVerse4_11_translation')}</p>
              <footer className="text-gray-500 text-sm mt-2">{t('quranVerse4_11_source')}</footer>
            </blockquote>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-bold">{t('quranVerse4_12_title')}</h3>
            <p className="text-right text-2xl leading-loose arabic-text" dir="rtl">
            ۞ وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَٰجكُمْ إِن لَّمْ يَكُن لَّهُنَّ وَلَدٌۭ ۚ فَإِن كَانَ لَهُنَّ وَلَدٌۭ فَلَكُمُ ٱلرُّبُعُ مِمَّا تَرَكْنَ ۚ مِنۢ بَعْدِ وَصِيَّةٍۢ يُوصِينَ بِهَآ أَوْ دَيْنٍۢ ۚ وَلَهُنَّ ٱلرُّبُعُ مِمَّا تَرَكْتُمْ إِن لَّمْ يَكُن لَّكُمْ وَلَدٌۭ ۚ فَإِن كَانَ لَكُمْ وَلَدٌۭ فَلَهُنَّ ٱلثُّمُنُ مِمَّا تَرَكْتُم ۚ مِنۢ بَعْدِ وَصِيَّةٍۢ تُوصُونَ بِهَآ أَوْ دَيْنٍۢ ۗ وَإِن كَانَ رَجُلٌۭ يُورَثُ كَلَـٰلَةً أَوِ ٱمْرَأَةٌۭ وَلَهُۥٓ أَخٌ أَوْ أُخْتٌۭ فَلِكُلِّ وَٰحِدٍۢ مِّنْهُمَا ٱلسُّدُسُ ۚ فَإِن كَانُوٓا۟ أَكْثَرَ مِن ذَٰلِكَ فَهُمْ شُرَكَآءُ فِى ٱلثُّلُثِ ۚ مِنۢ بَعْدِ وَصِيَّةٍۢ يُوصَىٰ بِهَآ أَوْ دَيْنٍ غَيْرَ مُضَآرٍّۢ ۚ وَصِيَّةًۭ مِّنَ ٱللَّهِ ۗ وَٱللَّهُ عَلِيمٌ حَلِيمٌۭ ١٢
            </p>
            <blockquote className="border-l-4 border-gray-200 pl-4">
                <p className="text-gray-600 italic">{t('quranVerse4_12_translation')}</p>
                <footer className="text-gray-500 text-sm mt-2">{t('quranVerse4_12_source')}</footer>
            </blockquote>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuranicReference;