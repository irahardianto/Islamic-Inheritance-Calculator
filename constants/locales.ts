import { Language } from '../types';

type Translations = {
  [key: string]: string | { [key: string]: string };
};

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    appName: 'Islamic Inheritance Calculator',
    language: 'Language',
    currency: 'Currency',
    
    // Form
    deceasedAndEstate: '1. Deceased & Estate',
    totalEstateValue: 'Total Estate Value',
    deceasedGender: "Deceased's Gender",
    male: 'Male',
    female: 'Female',
    survivingHeirs: '2. Surviving Heirs',
    spouse: 'Spouse',
    husband: 'Husband',
    wife: 'Wife/Wives',
    father: 'Father',
    mother: 'Mother',
    children: 'Children',
    sons: 'Sons',
    daughters: 'Daughters',
    siblingsKalalah: 'Full Siblings (Kalalah)',
    kalalahDesc: 'Full siblings inherit if the deceased has no children and no father (Kalalah case). Their share varies depending on other heirs. This is a complex area; consulting a scholar is recommended.',
    calculate: 'Calculate',
    reset: 'Reset',
    decrementLabel: 'Decrement {label}',
    incrementLabel: 'Increment {label}',

    // Results
    awaitingCalculation: 'Awaiting Calculation',
    awaitingCalculationDesc: 'Enter the details of the deceased\'s estate and surviving heirs, then click "Calculate" to see the distribution of inheritance.',
    inheritanceDistribution: 'Inheritance Distribution',
    forAnEstateOf: 'For a total estate of',
    unallocated: 'Unallocated',
    unallocatedFraction: 'Remaining',
    detailedShares: 'Detailed Shares',
    heir: 'Heir',
    count: 'Count',
    fractionalShare: 'Fractional Share',
    amountPerPerson: 'Amount per Person',
    totalAmount: 'Total Amount',
    totalDistributed: 'Total Distributed',
    son: 'Son(s)',
    daughter: 'Daughter(s)',
    brother: 'Brother(s)',
    sister: 'Sister(s)',

    // Analysis
    analysis_awwal: "This is a case of 'Awwal' (abatement), where the sum of prescribed shares ({totalFraction}) exceeds the total estate. Each heir's share is proportionally reduced to ensure the total distribution equals the estate.",
    analysis_radd: "This is a case of 'Radd' (return), where a portion of the estate remains after distributing shares to the prescribed heirs. This surplus has been returned proportionally to the same heirs (excluding the spouse), increasing their original shares.",
    analysis_positive_estate: 'Estate value must be a positive number.',

    // Quranic Reference
    quranicReferenceTitle: 'Quranic References (Surah An-Nisa, 4:11-12)',
    quranVerse4_11_title: 'The Women (4:11)',
    quranVerse4_11_translation: 'Allah commands you regarding your children: the share of the male will be twice that of the female.1 If you leave only two ˹or more˺ females, their share is two-thirds of the estate. But if there is only one female, her share will be one-half. Each parent is entitled to one-sixth if you leave offspring.2 But if you are childless and your parents are the only heirs, then your mother will receive one-third.3 But if you leave siblings, then your mother will receive one-sixth4—after the fulfilment of bequests and debts.5 ˹Be fair to˺ your parents and children, as you do not ˹fully˺ know who is more beneficial to you.6 ˹This is˺ an obligation from Allah. Surely Allah is All-Knowing, All-Wise.',
    quranVerse4_11_source: '— Dr. Mustafa Khattab, The Clear Quran',
    quranVerse4_12_title: 'The Women (4:12)',
    quranVerse4_12_translation: 'You will inherit half of what your wives leave if they are childless. But if they have children, then ˹your share is˺ one-fourth of the estate—after the fulfilment of bequests and debts. And your wives will inherit one-fourth of what you leave if you are childless. But if you have children, then your wives will receive one-eighth of your estate—after the fulfilment of bequests and debts. And if a man or a woman leaves neither parents nor children but only a brother or a sister ˹from their mother’s side˺, they will each inherit one-sixth, but if they are more than one, they ˹all˺ will share one-third of the estate1—after the fulfilment of bequests and debts without harm ˹to the heirs˺.2 ˹This is˺ a commandment from Allah. And Allah is All-Knowing, Most Forbearing.',
    quranVerse4_12_source: '— Dr. Mustafa Khattab, The Clear Quran',
    
    // Footer
    disclaimer: 'Disclaimer: This calculator is for educational purposes based on a specific interpretation of Quranic verses. For binding legal and religious matters, please consult a qualified scholar.',
    copyright: '© 2024 Islamic Inheritance Calculator. All Rights Reserved.',
  },
  id: {
    // Header
    appName: 'Kalkulator Waris Islam',
    language: 'Bahasa',
    currency: 'Mata Uang',
    
    // Form
    deceasedAndEstate: '1. Almarhum & Harta',
    totalEstateValue: 'Total Nilai Harta Warisan',
    deceasedGender: 'Jenis Kelamin Almarhum',
    male: 'Laki-laki',
    female: 'Perempuan',
    survivingHeirs: '2. Ahli Waris',
    spouse: 'Pasangan',
    husband: 'Suami',
    wife: 'Istri',
    father: 'Ayah',
    mother: 'Ibu',
    children: 'Anak-anak',
    sons: 'Anak Laki-laki',
    daughters: 'Anak Perempuan',
    siblingsKalalah: 'Saudara Kandung (Kalalah)',
    kalalahDesc: 'Saudara kandung mewarisi jika almarhum tidak memiliki anak dan ayah (kasus Kalalah). Bagian mereka bervariasi tergantung ahli waris lain. Ini adalah area yang kompleks; disarankan untuk berkonsultasi dengan ulama.',
    calculate: 'Hitung',
    reset: 'Atur Ulang',
    decrementLabel: 'Kurangi {label}',
    incrementLabel: 'Tambah {label}',

    // Results
    awaitingCalculation: 'Menunggu Perhitungan',
    awaitingCalculationDesc: 'Masukkan detail harta warisan dan ahli waris almarhum, lalu klik "Hitung" untuk melihat pembagian warisan.',
    inheritanceDistribution: 'Distribusi Warisan',
    forAnEstateOf: 'Untuk total harta warisan sebesar',
    unallocated: 'Tidak Dialokasikan',
    unallocatedFraction: 'Sisa',
    detailedShares: 'Rincian Pembagian',
    heir: 'Ahli Waris',
    count: 'Jumlah',
    fractionalShare: 'Bagian Pecahan',
    amountPerPerson: 'Jumlah per Orang',
    totalAmount: 'Jumlah Total',
    totalDistributed: 'Total Didistribusikan',
    son: 'Anak Laki-laki',
    daughter: 'Anak Perempuan',
    brother: 'Saudara Laki-laki',
    sister: 'Saudara Perempuan',

    // Analysis
    analysis_awwal: "Ini adalah kasus 'Awwal' (pengurangan), di mana jumlah bagian yang ditentukan ({totalFraction}) melebihi total harta warisan. Bagian setiap ahli waris telah dikurangi secara proporsional untuk memastikan total distribusi sama dengan harta warisan.",
    analysis_radd: "Ini adalah kasus 'Radd' (pengembalian), di mana sebagian harta warisan tersisa setelah dibagikan kepada ahli waris. Kelebihan ini telah dikembalikan secara proporsional kepada ahli waris yang sama (kecuali pasangan), sehingga menambah bagian awal mereka.",
    analysis_positive_estate: 'Nilai harta warisan harus berupa angka positif.',

    // Quranic Reference
    quranicReferenceTitle: 'Referensi Al-Quran (Surah An-Nisa, 4:11-12)',
    quranVerse4_11_title: 'An-Nisa (4:11)',
    quranVerse4_11_translation: 'Allah mensyariatkan (mewajibkan) kepadamu tentang (pembagian warisan untuk) anak-anakmu, (yaitu) bagian seorang anak laki-laki sama dengan bagian dua orang anak perempuan.1 Dan jika anak itu semuanya perempuan yang jumlahnya lebih dari dua, maka bagian mereka dua pertiga dari harta yang ditinggalkan. Jika dia (anak perempuan) itu seorang saja, maka dia memperoleh setengah (harta yang ditinggalkan). Dan untuk kedua ibu-bapak, bagian masing-masing seperenam dari harta yang ditinggalkan, jika dia (yang meninggal) mempunyai anak. Jika dia (yang meninggal) tidak mempunyai anak dan dia diwarisi oleh kedua ibu-bapaknya (saja), maka ibunya mendapat sepertiga. Jika dia (yang meninggal) mempunyai beberapa saudara, maka ibunya mendapat seperenam. (Pembagian-pembagian tersebut di atas) setelah (dipenuhi) wasiat yang dibuatnya atau (dan setelah dibayar) hutangnya. (Tentang) orang tuamu dan anak-anakmu, kamu tidak mengetahui siapa di antara mereka yang lebih banyak manfaatnya bagimu. Ini adalah ketetapan Allah. Sungguh, Allah Maha Mengetahui, Mahabijaksana.',
    quranVerse4_11_source: '— Kementrian Agama Republik Indonesia',
    quranVerse4_12_title: 'An-Nisa (4:12)',
    quranVerse4_12_translation: 'Dan bagianmu (suami-suami) adalah seperdua dari harta yang ditinggalkan oleh istri-istrimu, jika mereka tidak mempunyai anak. Jika mereka (istri-istrimu) itu mempunyai anak, maka kamu mendapat seperempat dari harta yang ditingalkannya setelah (dipenuhi) wasiat yang mereka buat atau (dan setelah dibayar) hutangnya. Para istri memperoleh seperempat harta yang kamu tinggalkan jika kamu tidak mempunyai anak. Jika kamu mempunyai anak, maka para istri memperoleh seperdelapan dari harta yang kamu tinggalkan (setelah dipenuhi) wasiat yang kamu buat atau (dan setelah dibayar) hutang-hutangmu. Jika seseorang meninggal, baik laki-laki maupun perempuan yang tidak meninggalkan ayah dan tidak meninggalkan anak, tetapi mempunyai seorang saudara laki-laki (seibu) atau seorang saudara perempuan (seibu), maka bagi masing-masing dari kedua jenis saudara itu seperenam harta. Tetapi jika saudara-saudara seibu itu lebih dari seorang, maka mereka bersama-sama dalam bagian yang sepertiga itu, setelah (dipenuhi wasiat) yang dibuatnya atau (dan setelah dibayar) hutangnya dengan tidak menyusahkan (kepada ahli waris).1 Demikianlah ketentuan Allah. Allah Maha Mengetahui, Maha Penyantun.',
    quranVerse4_12_source: '— Kementrian Agama Republik Indonesia',

    // Footer
    disclaimer: 'Sanggahan: Kalkulator ini bertujuan untuk pendidikan berdasarkan interpretasi spesifik dari ayat-ayat Al-Quran. Untuk urusan hukum dan agama yang mengikat, silakan berkonsultasi dengan ulama yang berkualifikasi.',
    copyright: '© 2024 Kalkulator Waris Islam. Hak Cipta Dilindungi.',
  },
};