import { CharacterMascot, QuizQuestion, GameItem } from '../types';

export const MASCOTS: Record<'padat' | 'cair' | 'gas', CharacterMascot> = {
  padat: {
    id: 'padat',
    name: 'Si Padat',
    nickname: 'Penjaga Bentuk yang Kuat & Kokoh',
    colorName: 'Biru Kokoh',
    themeColor: 'bg-blue-600',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-400',
    imageSrc: '/src/assets/images/mascot_si_padat_1793362841793.jpg',
    quote: 'Aku kuat dan mandiri! Ke mana pun aku dipindahkan, bentuk dan ukuranku selalu tetap sama!',
    voiceLine: 'Halo sahabat sains! Aku Si Padat! Bentuk dan volumenya selalu tetap kokoh!',
    powers: [
      'Bentuknya selalu tetap (tidak berubah bentuk walau pindah wadah)',
      'Volumenya selalu tetap (ukurannya tidak membesar atau mengecil)',
      'Dapat digenggam langsung dengan tangan',
      'Partikelnya sangat rapat dan terikat kuat satu sama lain'
    ],
    shapeRule: 'Bentuk Tetap',
    volumeRule: 'Volume Tetap',
    particleDescription: 'Partikel-partikel penyusun zat padat tersusun sangat rapat, teratur, dan saling mengikat kuat. Partikel hanya bergetar di tempatnya.',
    dailyExamples: [
      { name: 'Batu Kali', icon: '🪨', desc: 'Keras dan kokoh, bentuknya tetap walau ditaruh di mangkuk.' },
      { name: 'Pensil Warna', icon: '✏️', desc: 'Benda padat yang kita gunakan setiap hari untuk belajar.' },
      { name: 'Meja & Kursi', icon: '🪑', desc: 'Kuat menopang beban karena ikatan partikelnya rapat.' },
      { name: 'Buku Pelajaran', icon: '📚', desc: 'Memiliki bentuk persegi panjang yang tetap.' },
      { name: 'Es Batu', icon: '🧊', desc: 'Air yang membeku menjadi wujud padat yang dingin.' }
    ]
  },
  cair: {
    id: 'cair',
    name: 'Si Cair',
    nickname: 'Penjelajah Air yang Fleksibel & Ramah',
    colorName: 'Biru Muda Turquoise',
    themeColor: 'bg-cyan-600',
    bgLight: 'bg-cyan-50',
    borderColor: 'border-cyan-400',
    imageSrc: '/src/assets/images/mascot_si_cair_1793362841785.jpg',
    quote: 'Aku senang beradaptasi! Tuang aku ke botol, gelas, atau mangkuk, bentukku akan mengikuti wadahmu dengan riang!',
    voiceLine: 'Kecipak-kecipuk! Aku Si Cair! Bentukku mengikuti wadah, tetapi volumenya selalu tetap!',
    powers: [
      'Bentuknya berubah-ubah mengikuti bentuk wadahnya',
      'Volumenya selalu tetap (200 ml di gelas tetap 200 ml di mangkuk)',
      'Dapat mengalir dari tempat tinggi ke tempat yang lebih rendah',
      'Partikelnya cukup rapat tetapi bisa saling bergeser dan meluncur'
    ],
    shapeRule: 'Bentuk Mengikuti Wadah',
    volumeRule: 'Volume Tetap',
    particleDescription: 'Partikel zat cair masih berdekatan, namun ikatannya tidak sekaku zat padat sehingga mereka dapat bebas mengalir dan meluncur.',
    dailyExamples: [
      { name: 'Air Minum Bersih', icon: '💧', desc: 'Segar dan menyehatkan, selalu mengikuti bentuk gelas.' },
      { name: 'Susu Sapi Lezat', icon: '🥛', desc: 'Cairan putih bergizi yang dapat mengalir dengan mudah.' },
      { name: 'Minyak Goreng', icon: '🍳', desc: 'Cairan kental berwarna keemasan untuk memasak.' },
      { name: 'Sirup Manis', icon: '🍓', desc: 'Zat cair dengan rasa manis dan warna-warni menarik.' },
      { name: 'Madu Alami', icon: '🍯', desc: 'Cairan kental manis hasil lebah yang mengalir perlahan.' }
    ]
  },
  gas: {
    id: 'gas',
    name: 'Si Gas',
    nickname: 'Awan Ajaib yang Lincah & Memenuhi Ruang',
    colorName: 'Ungu Lavender Ceria',
    themeColor: 'bg-purple-600',
    bgLight: 'bg-purple-50',
    borderColor: 'border-purple-400',
    imageSrc: '/src/assets/images/mascot_si_gas_1793362842499.jpg',
    quote: 'Wuuush! Aku bebas terbang ke mana-mana! Aku bisa mengembang memenuhi seluruh ruangan dan wadah yang kamu punya!',
    voiceLine: 'Wuuusshh! Aku Si Gas! Bentuk dan volume-ku bebas berubah memenuhi seluruh ruangan!',
    powers: [
      'Bentuknya tidak tetap (berubah sesuai ruang yang ditempatinya)',
      'Volumenya tidak tetap (dapat menyusut atau mengembang memenuhi ruang)',
      'Menekan ke segala arah secara merata',
      'Partikelnya sangat renggang, berjauhan, dan bergerak sangat cepat bebas'
    ],
    shapeRule: 'Bentuk Berubah-ubah',
    volumeRule: 'Volume Berubah Memenuhi Ruang',
    particleDescription: 'Partikel zat gas letaknya berjauhan satu sama lain dengan gaya tarik yang sangat lemah. Partikel bergerak sangat bebas dengan cepat ke segala penjuru.',
    dailyExamples: [
      { name: 'Udara di Sekitar', icon: '💨', desc: 'Tidak terlihat namun bisa kita rasakan dan hirup untuk bernapas.' },
      { name: 'Gas dalam Balon', icon: '🎈', desc: 'Menekan dinding balon karet hingga mengembang besar.' },
      { name: 'Uap Ceret Panas', icon: '☕', desc: 'Air yang menguap ke udara saat dipanaskan mendidih.' },
      { name: 'Asap Cerobong', icon: '🏭', desc: 'Gas hasil pembakaran yang membubung tinggi ke langit.' },
      { name: 'Angin Kipas', icon: '🌀', desc: 'Udara yang bergerak menyejukkan ruangan kita.' }
    ]
  }
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Benda padat seperti penghapus atau batu, bila dipindahkan dari atas meja ke dalam mangkuk, bentuknya akan...',
    options: [
      { label: 'A', text: 'Tetap sama dan tidak berubah' },
      { label: 'B', text: 'Berubah menjadi bulat seperti mangkuk' },
      { label: 'C', text: 'Meleleh menjadi benda cair' }
    ],
    correctAnswer: 'A',
    explanation: 'Hebat! Benda padat memiliki sifat bentuk dan volume yang TETAP. Memindahkannya ke wadah apa pun tidak akan mengubah bentuk aslinya.',
    relatedMascot: 'padat',
    hint: 'Ingat kekuatan Si Padat yang kokoh dan selalu mempertahankan bentuk aslinya!'
  },
  {
    id: 2,
    question: 'Mengapa air sirup ketika dituangkan ke dalam botol bentuknya menjadi persis seperti botol?',
    options: [
      { label: 'A', text: 'Karena volume air sirup membesar' },
      { label: 'B', text: 'Karena bentuk benda cair selalu mengikuti bentuk wadahnya' },
      { label: 'C', text: 'Karena botolnya memiliki magnet penarik air' }
    ],
    correctAnswer: 'B',
    explanation: 'Tepat sekali! Benda cair bersifat fleksibel; bentuknya selalu menyesuaikan dengan bentuk wadah yang ditempatinya.',
    relatedMascot: 'cair',
    hint: 'Si Cair sangat ramah dan suka beradaptasi dengan wadah tempatnya berada!'
  },
  {
    id: 3,
    question: 'Ciri utama yang dimiliki oleh Si Gas adalah...',
    options: [
      { label: 'A', text: 'Bentuk dan volumenya selalu tetap tidak bisa bergerak' },
      { label: 'B', text: 'Dapat digenggam erat dengan kedua tangan kita' },
      { label: 'C', text: 'Bentuk dan volumenya tidak tetap serta memenuhi seluruh ruangan' }
    ],
    correctAnswer: 'C',
    explanation: 'Pintar! Gas memiliki partikel yang bebas bergerak cepat ke segala arah, sehingga bentuk dan volumenya berubah memenuhi seluruh ruangan.',
    relatedMascot: 'gas',
    hint: 'Si Gas seperti awan ajaib yang bebas terbang memenuhi semua sudut ruangan!'
  },
  {
    id: 4,
    question: 'Kelompok benda di bawah ini yang semuanya merupakan benda padat adalah...',
    options: [
      { label: 'A', text: 'Batu kali, pensil kayu, dan buku tulis' },
      { label: 'B', text: 'Air mineral, susu sapi, dan sirup melon' },
      { label: 'C', text: 'Uap air hangat, asap roket, dan minyak goreng' }
    ],
    correctAnswer: 'A',
    explanation: 'Benar sekali! Batu kali, pensil kayu, dan buku tulis adalah contoh nyata benda padat yang bisa kita pegang dan bentuknya tetap.',
    relatedMascot: 'padat',
    hint: 'Cari benda-benda keras dan kokoh yang bisa kamu genggam langsung!'
  },
  {
    id: 5,
    question: 'Ketika kamu meniup balon karet, balon menjadi besar dan menggelembung karena...',
    options: [
      { label: 'A', text: 'Balon terisi oleh gas udara yang menekan ke segala arah' },
      { label: 'B', text: 'Balon terisi oleh air dingin' },
      { label: 'C', text: 'Karet balon berubah menjadi batu padat' }
    ],
    correctAnswer: 'A',
    explanation: 'Hebat! Udara yang ditiupkan adalah zat gas. Partikel gas bergerak cepat dan menekan ke seluruh dinding bagian dalam balon secara merata.',
    relatedMascot: 'gas',
    hint: 'Udara yang keluar dari mulut saat meniup adalah zat gas!'
  },
  {
    id: 6,
    question: 'Ibu menuangkan 200 ml susu cair dari gelas ke dalam sebuah mangkuk lebar. Maka volume (isi) susu tersebut...',
    options: [
      { label: 'A', text: 'Berkurang menjadi hanya 100 ml' },
      { label: 'B', text: 'Tetap 200 ml, tidak bertambah dan tidak berkurang' },
      { label: 'C', text: 'Bertambah banyak menjadi 500 ml' }
    ],
    correctAnswer: 'B',
    explanation: 'Luar biasa! Walaupun bentuk susu berubah menyerupai mangkuk, VOLUME (jumlah isinya) tetap sama, yaitu 200 ml.',
    relatedMascot: 'cair',
    hint: 'Kekuatan Si Cair: Bentuk mengikuti wadah, tapi volumenya SELALU TETAP!'
  },
  {
    id: 7,
    question: 'Benda yang susunan partikel penyusunnya sangat rapat, teratur rapi, dan terikat sangat kuat adalah...',
    options: [
      { label: 'A', text: 'Balok kayu mainan' },
      { label: 'B', text: 'Minyak kelapa goreng' },
      { label: 'C', text: 'Uap air dari ceret' }
    ],
    correctAnswer: 'A',
    explanation: 'Tepat sekali! Zat padat seperti balok kayu memiliki susunan partikel yang sangat rapat dan teratur, sehingga bentuknya kokoh.',
    relatedMascot: 'padat',
    hint: 'Benda yang paling kokoh dan keras memiliki partikel paling rapat!'
  },
  {
    id: 8,
    question: 'Apa yang terjadi jika sebotol minyak wangi disemprotkan di sudut ruangan kelas?',
    options: [
      { label: 'A', text: 'Aroma wangi segera menyebar ke seluruh ruangan kelas' },
      { label: 'B', text: 'Minyak wangi akan langsung mengeras menjadi batu' },
      { label: 'C', text: 'Aroma hanya diam di tempat semprotan saja' }
    ],
    correctAnswer: 'A',
    explanation: 'Betul! Partikel gas minyak wangi bergerak sangat bebas dan cepat menyebar ke seluruh ruangan sehingga semua anak bisa menciumnya.',
    relatedMascot: 'gas',
    hint: 'Gas memiliki sifat bergerak bebas menyebar ke segala penjuru!'
  },
  {
    id: 9,
    question: 'Minyak goreng dan susu stroberi dikelompokkan ke dalam wujud zat yang sama karena...',
    options: [
      { label: 'A', text: 'Sama-sama dapat mengalir dan bentuknya mengikuti wadah' },
      { label: 'B', text: 'Sama-sama keras dan tidak dapat dituang' },
      { label: 'C', text: 'Sama-sama tidak terlihat oleh mata' }
    ],
    correctAnswer: 'A',
    explanation: 'Cerdas! Minyak dan susu keduanya adalah zat cair: bisa dituang, mengalir, dan bentuknya menyesuaikan dengan wadahnya.',
    relatedMascot: 'cair',
    hint: 'Keduanya bisa dituang dan mengalir dari atas ke bawah.'
  },
  {
    id: 10,
    question: 'Ban sepeda yang kempes dipompa dengan pompa angin sampai kencang. Hal ini membuktikan bahwa zat gas...',
    options: [
      { label: 'A', text: 'Menempati ruang dan memiliki tekanan ke segala arah' },
      { label: 'B', text: 'Tidak memiliki massa atau berat sama sekali' },
      { label: 'C', text: 'Selalu berwujud keras seperti batu bata' }
    ],
    correctAnswer: 'A',
    explanation: 'Sempurna! Udara yang dipompakan ke dalam ban mengisi seluruh ruang ban dan menekan dinding ban sehingga ban menjadi keras dan siap dikendarai.',
    relatedMascot: 'gas',
    hint: 'Pompa angin memasukkan udara yang mengisi ruang dalam ban!'
  }
];

export const GAME_ITEMS: GameItem[] = [
  {
    id: 'g-1',
    name: 'Batu Kali',
    category: 'padat',
    iconName: 'Rock',
    emoji: '🪨',
    funFact: 'Batu kali sangat keras dan mempertahankan bentuknya walau terkena ombak air!',
    hint: 'Bentuknya keras, kokoh, dan tidak berubah bentuk.'
  },
  {
    id: 'g-2',
    name: 'Air Mineral Segar',
    category: 'cair',
    iconName: 'Droplet',
    emoji: '💧',
    funFact: 'Tubuh manusia terdiri dari sekitar 60% cairan air!',
    hint: 'Dapat mengalir dan bentuknya mengikuti bentuk gelas.'
  },
  {
    id: 'g-3',
    name: 'Udara dalam Balon',
    category: 'gas',
    iconName: 'Wind',
    emoji: '🎈',
    funFact: 'Udara di balon menekan ke segala arah sehingga balon membulat lucu!',
    hint: 'Membuat balon mengembang dan memenuhi seluruh ruang balon.'
  },
  {
    id: 'g-4',
    name: 'Pensil Kayu',
    category: 'padat',
    iconName: 'Pencil',
    emoji: '✏️',
    funFact: 'Bentuk pensil tetap silinder walau kamu taruh di saku atau kotak pensil.',
    hint: 'Alat tulis padat yang bisa kamu genggam langsung.'
  },
  {
    id: 'g-5',
    name: 'Susu Sapi Segar',
    category: 'cair',
    iconName: 'Milk',
    emoji: '🥛',
    funFact: 'Susu mengalir lezat dan bentuknya mengikuti cangkir atau botol.',
    hint: 'Minuman bergizi yang dapat mengalir dan dituangkan.'
  },
  {
    id: 'g-6',
    name: 'Asap Cerobong',
    category: 'gas',
    iconName: 'CloudFog',
    emoji: '💨',
    funFact: 'Asap bergerak cepat ke atas dan menyebar luas di udara bebas.',
    hint: 'Melayang ke udara dan menyebar ke seluruh ruangan.'
  },
  {
    id: 'g-7',
    name: 'Buku Pelajaran',
    category: 'padat',
    iconName: 'Book',
    emoji: '📚',
    funFact: 'Buku tersusun dari serat kertas padat yang dijilid rapi.',
    hint: 'Benda padat persegi yang tidak berubah bentuk di tas.'
  },
  {
    id: 'g-8',
    name: 'Minyak Goreng',
    category: 'cair',
    iconName: 'Flame',
    emoji: '🍳',
    funFact: 'Minyak goreng lebih kental daripada air tetapi tetap berwujud cair!',
    hint: 'Cairan emas yang dituangkan ke wajan penggorengan.'
  },
  {
    id: 'g-9',
    name: 'Uap Teko Mendidih',
    category: 'gas',
    iconName: 'CloudDrizzle',
    emoji: '☕',
    funFact: 'Uap adalah air yang berubah wujud menjadi gas karena dipanaskan!',
    hint: 'Kepulan uap hangat yang melayang dari moncong teko.'
  },
  {
    id: 'g-10',
    name: 'Es Batu Balok',
    category: 'padat',
    iconName: 'Snowflake',
    emoji: '🧊',
    funFact: 'Es batu adalah air dalam wujud padat yang berbentuk kubus kokoh.',
    hint: 'Benda padat yang dingin dan tidak berubah bentuk saat beku.'
  },
  {
    id: 'g-11',
    name: 'Sirup Stroberi Manis',
    category: 'cair',
    iconName: 'GlassWater',
    emoji: '🍓',
    funFact: 'Sirup manis mengalir mengikuti lekuk botol dan gelas es buah.',
    hint: 'Cairan merah manis yang larut bila diaduk dengan air.'
  },
  {
    id: 'g-12',
    name: 'Angin dari Kipas',
    category: 'gas',
    iconName: 'Fan',
    emoji: '🌀',
    funFact: 'Angin adalah udara (gas) yang bergerak mengalir ke arah kita!',
    hint: 'Hembusan udara sejuk yang tidak terlihat tapi terasa segar.'
  }
];

export const CURRICULUM_INFO = {
  mataPelajaran: 'Ilmu Pengetahuan Alam dan Sosial (IPAS)',
  kelas: 'Kelas III Sekolah Dasar (Fase B)',
  bab: 'Bab 8 – Rahasia 3 Wujud Zat',
  subbab: 'Tiga Sahabat dengan Kekuatan Berbeda',
  capaianPembelajaran: 'Peserta didik memahami wujud zat dan perubahannya serta dapat mengidentifikasi sifat-sifat zat padat, cair, dan gas dalam kehidupan sehari-hari.',
  tujuanPembelajaran: [
    'Mengidentifikasi karakteristik wujud zat padat, cair, dan gas.',
    'Menganalisis perbedaan sifat bentuk dan volume pada zat padat, cair, dan gas melalui simulasi interaktif.',
    'Mengelompokkan contoh benda-benda di lingkungan sekitar ke dalam 3 wujud zat dengan tepat.',
    'Menunjukkan sikap mandiri, rasa ingin tahu, dan bernalar kritis melalui eksperimen laboratorium virtual.'
  ],
  profilPelajarPancasila: [
    { title: 'Mandiri', desc: 'Siswa aktif mengeksplorasi materi, mencoba simulasi laboratorium, dan mengerjakan kuis secara percaya diri.' },
    { title: 'Bernalar Kritis', desc: 'Mampu membedakan sifat bentuk dan volume setiap wujud zat berdasarkan bukti percobaan interaktif.' },
    { title: 'Kreatif', desc: 'Mencoba berbagai variasi wadah dan cairan di laboratorium serta menyelesaikan tantangan permainan.' }
  ]
};
