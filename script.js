(() => {
const $ = id => document.getElementById(id);
const chapters = ["Respiration","Properties of Materials","Forces and Energy","Ecosystems"];
let qs = [];
const selections = [];
const answers = [];
const submitted = [];
let index = 0;
let ended = false;

function shuffleArray(items){
 const shuffled=items.slice();
 for(let i=shuffled.length-1;i>0;i--){
  const j=Math.floor(Math.random()*(i+1));
  [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];
 }
 return shuffled;
}

function prepareQuiz(){
 const questionBank=window.QUIZ_QUESTIONS.map((q,i)=>{
  const shuffledOptions=shuffleArray(q[1].map((text,optionIndex)=>({
   text,
   correct:optionIndex===q[2]
  })));
  return {
   chapter:Math.floor(i/25),
   q:q[0],
   opts:shuffledOptions.map(option=>option.text),
   ans:shuffledOptions.findIndex(option=>option.correct),
   exp:q[3],
   diff:q[4]
  };
 });
 qs=shuffleArray(questionBank);
 selections.length=0;
 answers.length=0;
 submitted.length=0;
 for(let i=0;i<qs.length;i++){
  selections.push(null);
  answers.push(null);
  submitted.push(false);
 }
 index=0;
 ended=false;
}
const dictionary = {
"which":"yang mana","what":"apa","where":"di mana","when":"kapan","why":"mengapa","how":"bagaimana","statement":"pernyataan","best":"terbaik","describes":"menjelaskan","describe":"jelaskan","called":"disebut","inside":"di dalam","outside":"di luar","mainly":"terutama","take":"mengambil","place":"tempat","cell":"sel","cells":"sel-sel","aerobic":"aerob (menggunakan oksigen)","respiration":"respirasi sel","releases":"melepaskan","release":"melepaskan","energy":"energi","glucose":"glukosa","using":"menggunakan","oxygen":"oksigen","moves":"bergerak","air":"udara","lungs":"paru-paru","transports":"mengangkut","blood":"darah","breaks":"memecah","food":"makanan","nucleus":"inti sel","mitochondria":"mitokondria","membrane":"membran","cytoplasm":"sitoplasma","sequence":"urutan","correct":"benar","answer":"jawaban","are":"adalah","the":"(kata sandang)","main":"utama","sites":"tempat/lokasi","of":"dari","a":"sebuah","an":"sebuah","not":"tidak","quite":"sepenuhnya/agak","explanation":"penjelasan","respiring":"melakukan respirasi","path":"jalur","nose":"hidung","trachea":"trakea","bronchi":"bronkus","bronchioles":"bronkiolus","air":"udara","sacs":"kantung","alveoli":"alveolus","surrounded":"dikelilingi","many":"banyak","capillaries":"kapiler","allow":"memungkinkan","efficient":"efisien","gas":"gas","exchange":"pertukaran","direction":"arah","diffuse":"berdifusi","diffusion":"difusi","during":"selama","relaxes":"mengendur","relax":"mengendur","contracts":"berkontraksi","contract":"berkontraksi","diaphragm":"diafragma","upwards":"ke atas","downwards":"ke bawah","breathe":"bernapas","inspired":"udara yang dihirup","expired":"udara yang diembuskan","contains":"mengandung","more":"lebih banyak","carbon":"karbon","dioxide":"dioksida","haemoglobin":"hemoglobin","red":"merah","blood":"darah","destroy":"menghancurkan","pathogens":"patogen","transport":"mengangkut","thin":"tipis","walls":"dinding","short":"pendek","distance":"jarak","rapid":"cepat","living":"hidup","germinating":"berkecambah","seeds":"biji","insulated":"terisolasi","flask":"labu","temperature":"suhu","rise":"kenaikan","greater":"lebih besar","dead":"mati",
"sugar":"gula","solution":"larutan","solvent":"pelarut","solute":"zat terlarut","water":"air","dissolves":"melarutkan","dissolve":"melarutkan","substance":"zat","liquid":"cairan","container":"wadah","floats":"mengapung","saturated":"jenuh","maximum":"maksimum","amount":"jumlah","dissolved":"terlarut","solubility":"kelarutan","solid":"padat","solid":"benda padat","increases":"meningkat","increases":"meningkat","temperature":"suhu","independent":"bebas","variable":"variabel","mass":"massa","salt":"garam","dependent":"terikat","measured":"diukur","result":"hasil","volume":"volume","kept":"dipertahankan","constant":"konstan","fair":"adil","investigation":"penyelidikan","purpose":"tujuan","pencil":"pensil","line":"garis","paper":"kertas","chromatography":"kromatografi","graphite":"grafit","insoluble":"tidak larut","solvent":"pelarut","interfere":"mengganggu","chromatogram":"kromatogram","separate":"memisahkan","spots":"titik-titik","mixture":"campuran","coloured":"berwarna","sample":"sampel","ink":"tinta","pure":"murni",
"forces":"gaya-gaya","force":"gaya","equal":"sama","size":"ukuran","opposite":"berlawanan","balanced":"seimbang","unbalanced":"tidak seimbang","stationary":"diam","acting":"bekerja","gravity":"gravitasi","motion":"gerak","moving":"bergerak","object":"benda","change":"mengubah","speed":"kecepatan","direction":"arah","cyclist":"pesepeda","travels":"menempuh","metres":"meter","seconds":"detik","horizontal":"mendatar","graph":"grafik","represents":"mewakili","distance":"jarak","time":"waktu","constant":"konstan","moment":"momen gaya","pivot":"titik tumpu","pressure":"tekanan","applied":"diberikan","contact":"kontak","area":"luas","dam":"bendungan","wall":"dinding","usually":"biasanya","bottom":"bagian bawah","depth":"kedalaman","liquid":"cairan","heated":"dipanaskan","sealed":"tertutup rapat","particles":"partikel","collide":"bertumbukan","often":"sering","harder":"lebih keras","walls":"dinding","coloured":"berwarna","substance":"zat","spreads":"menyebar","still":"diam","region":"wilayah","high":"tinggi","concentration":"konsentrasi","low":"rendah","process":"proses","diffusion":"difusi","force":"gaya","friction":"gesekan","weight":"berat","parachute":"parasut","lever":"tuas","turning":"memutar","newton":"newton","metre":"meter",
"ecosystem":"ekosistem","community":"komunitas","organisms":"organisme","organism":"organisme","interacting":"saling berinteraksi","environment":"lingkungan","non-living":"tak hidup","factor":"faktor","desert":"gurun","sunlight":"sinar matahari","kangaroo":"kanguru","rat":"tikus","cactus":"kaktus","wren":"burung wren","grasshopper":"belalang","habitat":"habitat","natural":"alami","adaptation":"adaptasi","saguaro":"saguaro (jenis kaktus)","thick":"tebal","stem":"batang","stores":"menyimpan","water":"air","food":"makanan","web":"jaring-jaring","arrows":"panah","represent":"mewakili","direction":"arah","energy":"energi","transfer":"perpindahan","producer":"produsen","plants":"tumbuhan","photosynthesis":"fotosintesis","prickly":"berduri","pear":"pir","nocturnal":"aktif pada malam hari","avoid":"menghindari","cooler":"lebih sejuk","heat":"panas","day":"siang","pollination":"penyerbukan","pollen":"serbuk sari","flower":"bunga","stigma":"kepala putik","seeds":"biji","soil":"tanah","roots":"akar","depend":"bergantung","resources":"sumber daya","competition":"persaingan","feeding":"makan","relationships":"hubungan","food":"makanan","chains":"rantai","connected":"terhubung","ecosystem":"ekosistem","predators":"pemangsa","predator":"pemangsa"
};
const contextualDictionary = {
"is":"adalah/merupakan",
"in":"di/dalam",
"to":"ke/untuk",
"it":"itu",
"and":"dan",
"they":"mereka",
"from":"dari",
"with":"dengan",
"that":"yang/itu",
"so":"sehingga",
"into":"ke dalam",
"for":"untuk",
"can":"dapat",
"as":"sebagai",
"does":"apakah/melakukan",
"its":"-nya",
"same":"sama",
"at":"pada/di",
"only":"hanya",
"on":"pada/di atas",
"g":"gram",
"book":"buku",
"book's":"buku ini",
"all":"semua",
"be":"menjadi/adalah",
"becomes":"menjadi",
"no":"tidak ada",
"m/s":"meter per detik",
"nm":"newton meter",
"by":"oleh/dengan",
"make":"membuat",
"happens":"terjadi",
"has":"memiliki",
"do":"melakukan",
"must":"harus",
"m":"meter",
"down":"ke bawah/turun",
"stop":"berhenti",
"chest":"rongga dada",
"makes":"membuat/menyebabkan",
"decreases":"menurun/berkurang",
"one":"satu",
"through":"melalui",
"than":"daripada",
"become":"menjadi",
"fish":"ikan",
"changes":"berubah/perubahan",
"help":"membantu",
"move":"bergerak",
"out":"keluar",
"colour":"warna",
"some":"beberapa",
"their":"milik mereka",
"produce":"menghasilkan",
"helps":"membantu",
"stays":"tetap",
"both":"keduanya",
"exactly":"tepat/persis",
"vocal":"suara",
"cords":"pita-pita",
"breathing":"pernapasan",
"cannot":"tidak dapat",
"always":"selalu",
"other":"lainnya",
"above":"di atas",
"explains":"menjelaskan",
"or":"atau",
"larger":"lebih besar",
"because":"karena",
"animals":"hewan-hewan",
"algae":"alga",
"native":"asli",
"before":"sebelum",
"increasing":"meningkatkan",
"provide":"menyediakan/memberikan",
"much":"banyak",
"while":"sementara/ketika",
"turn":"memutar/berbelok",
"each":"setiap",
"plasma":"plasma darah",
"different":"berbeda",
"chloride":"klorida",
"faster":"lebih cepat",
"n":"newton",
"point":"titik",
"n/m":"newton per meter persegi",
"leaves":"daun-daun",
"birds":"burung-burung",
"flowers":"bunga-bunga",
"body":"tubuh",
"shows":"menunjukkan",
"heavier":"lebih berat",
"you":"kamu/Anda",
"prevent":"mencegah",
"show":"menunjukkan",
"them":"mereka",
"have":"memiliki",
"between":"di antara",
"chemical":"kimia",
"movement":"pergerakan",
"need":"membutuhkan",
"stay":"tetap/bertahan",
"use":"menggunakan",
"up":"ke atas",
"substances":"zat-zat",
"zero":"nol",
"dissolving":"pelarutan",
"described":"dijelaskan/disebut",
"sodium":"natrium",
"such":"seperti",
"dry":"kering",
"distance–time":"jarak–waktu",
"s":"detik",
"ground":"tanah/permukaan tanah",
"parachutist":"penerjun payung",
"after":"setelah",
"door":"pintu",
"sand":"pasir",
"plant":"tumbuhan",
"lives":"hidup/tinggal",
"chain":"rantai",
"nest":"sarang",
"young":"anak hewan/muda",
"mangrove":"bakau",
"sea":"laut",
"shrimp-like":"mirip udang",
"buffelgrass":"rumput buffel",
"ddt":"DDT (insektisida)",
"passes":"melewati",
"gases":"gas-gas",
"student":"siswa",
"decrease":"menurun/penurunan",
"rings":"cincin",
"cartilage":"tulang rawan",
"smaller":"lebih kecil",
"larynx":"laring/kotak suara",
"sac":"kantung",
"ribs":"tulang rusuk",
"outwards":"ke arah luar",
"completely":"sepenuhnya",
"far":"jauh",
"being":"sedang/menjadi",
"mean":"berarti/rata-rata",
"word":"kata",
"gives":"memberikan",
"plus":"ditambah",
"carry":"membawa",
"part":"bagian",
"type":"jenis",
"final":"akhir",
"deliberately":"dengan sengaja",
"changed":"diubah",
"should":"sebaiknya/harus",
"front":"bagian depan",
"level":"tingkat/permukaan",
"immediately":"segera",
"this":"ini",
"visible":"terlihat",
"crystals":"kristal-kristal",
"opaque":"tidak tembus pandang",
"c":"derajat Celsius",
"table":"tabel",
"copper":"tembaga",
"sulfate":"sulfat",
"potassium":"kalium",
"methylated":"metilasi",
"spirits":"spiritus/alkohol industri",
"strip":"potongan/pita",
"colours":"warna-warna",
"two":"dua",
"act":"bekerja/beraksi",
"remove":"menghilangkan/mengangkat",
"changing":"mengubah/perubahan",
"acts":"bekerja",
"produces":"menghasilkan",
"increase":"meningkatkan",
"higher":"lebih tinggi",
"slows":"melambat",
"resistance":"hambatan",
"seesaw":"jungkat-jungkit",
"moments":"momen gaya",
"includes":"mencakup",
"interact":"berinteraksi",
"sonoran":"Sonora",
"holes":"lubang-lubang",
"nests":"sarang-sarang",
"spines":"duri-duri",
"grows":"tumbuh",
"eggs":"telur-telur",
"insects":"serangga-serangga",
"eat":"memakan",
"fallen":"yang gugur/jatuh",
"decomposed":"diuraikan",
"ice":"es",
"polar":"kutub",
"stoats":"cerpelai",
"persistent":"sulit terurai/bertahan lama",
"compares":"membandingkan",
"contain":"mengandung",
"digest":"mencerna",
"antibodies":"antibodi",
"very":"sangat",
"slow":"lambat",
"large":"besar",
"warmer":"lebih hangat",
"another":"lainnya",
"name":"nama",
"voicebox":"kotak suara",
"sound":"bunyi/suara",
"vibrate":"bergetar",
"fill":"mengisi",
"inhalation":"menghirup napas",
"quickly":"dengan cepat",
"breathed":"dihirup/diembuskan",
"produced":"dihasilkan",
"equation":"persamaan",
"released":"dilepaskan",
"processes":"proses-proses",
"alive":"hidup",
"mostly":"sebagian besar",
"never":"tidak pernah",
"soluble":"dapat larut",
"affects":"memengaruhi",
"test":"pengujian",
"keeping":"menjaga/mempertahankan",
"comparison":"perbandingan",
"easily":"dengan mudah",
"spot":"titik/noda",
"start":"memulai",
"directly":"secara langsung",
"evaporates":"menguap",
"travel":"bergerak/menempuh",
"beaker":"gelas beker",
"three":"tiga",
"several":"beberapa",
"melting":"pencairan",
"rather":"alih-alih",
"state":"wujud/keadaan",
"forms":"membentuk",
"mixes":"bercampur",
"new":"baru",
"element":"unsur",
"about":"tentang/sekitar",
"equals":"sama dengan",
"loses":"kehilangan",
"milk":"susu",
"see":"melihat",
"concentrated":"pekat",
"given":"diberikan/tertentu",
"stated":"dinyatakan",
"per":"per",
"half":"setengah",
"calcium":"kalsium",
"chlorate":"klorat",
"nitrate":"nitrat",
"used":"digunakan",
"instead":"sebagai gantinya",
"oil":"minyak",
"made":"dibuat",
"every":"setiap",
"removed":"diangkat/dihilangkan",
"reaches":"mencapai",
"top":"bagian atas",
"removing":"mengangkat/menghilangkan",
"permanent-marker":"spidol permanen",
"alcohol":"alkohol",
"remains":"tetap/tersisa",
"perpendicular":"tegak lurus",
"less":"lebih sedikit",
"lower":"lebih rendah",
"heating":"pemanasan",
"collisions":"tumbukan",
"rock":"batu",
"upward":"ke atas",
"resistive":"yang menghambat",
"just":"tepat/hanya",
"average":"rata-rata",
"starting":"awal/mulai",
"steeper":"lebih curam",
"lines":"garis-garis",
"shown":"ditunjukkan",
"flatter":"lebih landai",
"lowest":"paling rendah",
"travelled":"ditempuh",
"placed":"diletakkan",
"hinges":"engsel",
"removes":"menghilangkan",
"parallel":"sejajar",
"easier":"lebih mudah",
"farther":"lebih jauh",
"away":"menjauh",
"balance":"menyeimbangkan/keseimbangan",
"true":"benar",
"child":"anak",
"children":"anak-anak",
"sit":"duduk",
"closest":"paling dekat",
"directions":"arah-arah",
"camels":"unta-unta",
"wide":"lebar",
"feet":"kaki",
"walk":"berjalan",
"reduce":"mengurangi",
"camel's":"unta",
"exert":"memberikan (gaya)",
"touching":"bersentuhan",
"reduces":"mengurangi",
"camel":"unta",
"sinking":"terbenam",
"forcefully":"dengan kuat",
"expands":"mengembang",
"forceful":"kuat",
"parts":"bagian-bagian",
"these":"ini (jamak)",
"abiotic":"abiotik/tak hidup",
"group":"kelompok",
"ecosystems":"ekosistem-ekosistem",
"permanent":"permanen",
"wet":"basah",
"soft":"lunak",
"conditions":"kondisi",
"age":"usia",
"rainfall":"curah hujan",
"eats":"memakan",
"red-tailed":"berekor merah",
"hawk":"elang",
"own":"sendiri",
"get":"mendapatkan",
"needing":"membutuhkan",
"active":"aktif",
"extreme":"ekstrem",
"daytime":"siang hari",
"flower's":"bunga",
"eating":"memakan",
"female":"betina",
"reason":"alasan",
"needs":"membutuhkan/kebutuhan",
"compete":"bersaing",
"environments":"lingkungan-lingkungan",
"dependencies":"ketergantungan",
"pathway":"jalur",
"list":"daftar",
"factors":"faktor-faktor",
"diagram":"diagram",
"showing":"yang menunjukkan",
"interconnected":"saling terhubung",
"animal":"hewan",
"woodpecker":"burung pelatuk",
"coyote":"kojote",
"making":"membuat",
"choose":"memilih",
"sharp":"tajam",
"flowering":"berbunga",
"opening":"terbukanya",
"pollinate":"menyerbuki",
"collect":"mengumpulkan",
"store":"menyimpan",
"stems":"batang-batang",
"collecting":"mengumpulkan",
"storing":"menyimpan",
"rain":"hujan",
"light":"cahaya",
"pollinating":"menyerbuki",
"bright":"terang",
"photosynthesise":"melakukan fotosintesis",
"distinguishes":"membedakan",
"surroundings":"lingkungan sekitar",
"things":"hal-hal/benda-benda",
"individual":"individu",
"terms":"istilah-istilah",
"thing":"hal/benda",
"defines":"mendefinisikan",
"interactions":"interaksi",
"role":"peran",
"source":"sumber",
"forest":"hutan",
"find":"menemukan",
"growth":"pertumbuhan",
"follows":"mengikuti",
"relationship":"hubungan",
"underside":"bagian bawah",
"breeding":"berkembang biak",
"flooded":"tergenang",
"rice":"padi",
"paddies":"sawah",
"bears":"beruang-beruang",
"wrens":"burung wren",
"kiwis":"burung kiwi",
"rice-paddy":"sawah",
"breed":"berkembang biak",
"cause":"menyebabkan",
"problems":"masalah",
"introduced":"didatangkan/diperkenalkan",
"zealand":"Selandia Baru",
"pollinated":"diserbuki",
"reduced":"berkurang",
"number":"jumlah",
"ate":"memakan",
"contributing":"berkontribusi/menyebabkan",
"declines":"penurunan",
"populations":"populasi",
"people":"orang-orang",
"originally":"awalnya",
"bring":"membawa",
"nesting":"bersarang",
"feed":"makanan/memberi makan",
"states":"menyatakan",
"was":"adalah/telah",
"planted":"ditanam",
"arizona":"Arizona",
"invasive":"invasif",
"competes":"bersaing",
"areas":"daerah-daerah",
"takes":"mengambil",
"affecting":"memengaruhi",
"describing":"menggambarkan",
"remain":"tetap/bertahan",
"disappears":"menghilang",
"spraying":"penyemprotan",
"harmless":"tidak berbahaya",
"biomagnification":"biomagnifikasi",
"levels":"tingkatan",
"gets":"menjadi/mendapatkan",
"older":"lebih tua",
"created":"dibuat",
"along":"sepanjang",
"accumulate":"menumpuk/terakumulasi",
"hover":"arahkan kursor",
"tap":"ketuk",
"any":"apa pun/setiap",
"english":"bahasa Inggris",
"indonesian":"bahasa Indonesia",
"meaning":"arti",
"your":"-mu/milikmu",
"object’s":"benda itu",
"runner's":"pelari",
"object's":"benda itu"
};
Object.assign(dictionary, contextualDictionary);
Object.assign(dictionary, {"performance":"hasil/performa","quiz":"kuis","completed":"selesai"});
Object.assign(dictionary, {"keep":"menjaga/mempertahankan","selected":"dipilih","handle":"gagang","sides":"sisi-sisi","over":"di atas/selama","spread":"menyebar","helping":"membantu","there":"di sana/terdapat","pressing":"menekan","deeper":"lebih dalam","single":"tunggal/satu","species":"spesies","naturally":"secara alami","survive":"bertahan hidup","rattlesnake":"ular derik","night":"malam","live":"hidup/tinggal","cacti":"tanaman-tanaman kaktus","gila":"Gila (nama jenis burung pelatuk)","woodpeckers":"burung-burung pelatuk","cholla":"cholla (jenis kaktus berduri)","protect":"melindungi","underwater":"di bawah air","reproduce":"berkembang biak","nectar":"nektar","ants":"semut","underground":"di bawah tanah","germinate":"berkecambah","bird":"burung","shelter":"tempat berlindung","among":"di antara","description":"deskripsi/uraian","mud":"lumpur","bacteria":"bakteri","says":"menyatakan","arctic":"Arktik","tiny":"sangat kecil","bear":"beruang","grow":"tumbuh","frogs":"katak","dragonflies":"capung","seals":"anjing laut","did":"melakukan (bentuk lampau)/apakah","hunted":"memburu","cattle":"ternak sapi","rapidly":"dengan cepat","nutrients":"nutrisi/zat hara","break":"menguraikan/merusak","years":"tahun-tahun","reaching":"mencapai","mucus":"lendir","entering":"memasuki","rich":"kaya","supply":"pasokan","efficiently":"secara efisien","heart":"jantung","flattens":"menjadi rata","correctly":"dengan benar","function":"fungsi","combines":"bergabung/mengikat","around":"di sekitar","flow":"mengalir/aliran","allowing":"memungkinkan","supports":"mendukung","releasing":"melepaskan","flasks":"labu-labu percobaan","neither":"keduanya tidak","respire":"melakukan respirasi","actively":"secara aktif","structure":"struktur","keeps":"menjaga","open":"terbuka","collapsing":"mengempis/runtuh","enter":"masuk","divide":"membagi","join":"bergabung","form":"membentuk","bronchus":"bronkus","branches":"bercabang/cabang-cabang","tubes":"tabung/saluran","windpipe":"batang tenggorok","also":"juga","close":"menutup/dekat","passing":"melewati","rib":"tulang rusuk","cage":"rongga/rangka","inwards":"ke arah dalam","towards":"menuju/ke arah","spine":"tulang belakang","intercostal":"antartulang rusuk","muscles":"otot-otot","combination":"kombinasi","push":"mendorong","pass":"melewati","air-sac":"kantung udara","capillary":"kapiler","muscular":"berotot","giving":"memberikan","nitrogen":"nitrogen","hydrogen":"hidrogen","diffuses":"berdifusi","then":"kemudian","difference":"perbedaan","reaction":"reaksi","words":"kata-kata","whereas":"sedangkan","producing":"menghasilkan","needed":"dibutuhkan","reactions":"reaksi-reaksi","white":"putih","platelets":"keping darah/trombosit","digestive":"pencernaan","system":"sistem","digested":"dicerna","carried":"diangkut/dibawa","clot":"bekuan/menggumpal","lack":"tidak memiliki/kekurangan","carrying":"membawa/mengangkut","crystal":"kristal","anything":"apa pun","unlimited":"tanpa batas","colourless":"tidak berwarna","solids":"benda-benda padat","investigates":"menyelidiki","thermometer":"termometer","disappear":"menghilang","variables":"variabel-variabel","marks":"menandai/tanda","pool":"genangan/kolam","black":"hitam","suggest":"menunjukkan/mengisyaratkan","metal":"logam","evenly":"secara merata","formed":"terbentuk/dibentuk","suspension":"suspensi/campuran yang tidak larut sempurna","total":"total/jumlah keseluruhan","matter":"materi/zat","clearly":"dengan jelas","fewer":"lebih sedikit","hotter":"lebih panas","dilute":"encer","empty":"kosong","compared":"dibandingkan","measuring":"mengukur/pengukuran","known":"diketahui","fifty":"lima puluh","grams":"gram","greatest":"paling besar/tertinggi","according":"menurut/berdasarkan","generally":"secara umum","salts":"garam-garam","plotted":"digambarkan pada grafik","values":"nilai-nilai","ensure":"memastikan","measures":"mengukur/ukuran","ruler":"penggaris","clean":"membersihkan/bersih","oil-paint":"cat minyak","brushes":"kuas-kuas","solvents":"pelarut-pelarut","paint":"cat/mengecat","paints":"cat-cat","but":"tetapi","seen":"terlihat/dilihat","interpreted":"ditafsirkan","separated":"dipisahkan","return":"kembali","preserves":"mempertahankan/menjaga","interpreting":"menafsirkan","could":"dapat/bisa","tried":"dicoba/mencoba","notes":"mencatat/catatan","may":"mungkin/dapat","frictionless":"tanpa gesekan","stopped":"berhenti/dihentikan","acceleration":"percepatan","decreasing":"menurun/berkurang","without":"tanpa","thicker":"lebih tebal","stronger":"lebih kuat","particle":"partikel","frequency":"frekuensi","condensation":"pengembunan/kondensasi","filtration":"penyaringan/filtrasi","overall":"secara keseluruhan","standard":"standar/baku","unit":"satuan","second":"detik/kedua","newtons":"newton (satuan gaya)","abbreviated":"disingkat","rest":"diam/istirahat","pair":"pasangan","vertical":"vertikal/tegak","balances":"menyeimbangkan","sideways":"ke samping","wind":"angin","sun":"matahari","pushes":"mendorong","forward":"ke depan","driving":"penggerak","shadow":"bayangan","falling":"jatuh/terjun","opens":"membuka","speeds":"mempercepat/menambah kecepatan","creates":"menciptakan/menyebabkan","resultant":"resultan/gabungan","downward":"ke bawah","runner":"pelari","travelling":"sedang bergerak/menempuh","speeding":"mempercepat","returning":"kembali","means":"berarti/maksudnya","straight":"lurus","rising":"menanjak/naik","outstanding":"luar biasa","scientific":"ilmiah","thinking":"pemikiran/berpikir","excellent":"sangat baik","work":"pekerjaan/usaha","good":"baik","effort":"usaha","learning":"belajar/pembelajaran","practising":"berlatih","improving":"meningkatkan/memperbaiki","studying":"belajar/mempelajari","question":"pertanyaan/soal","chapter":"bab","first":"pertama","press":"tekan","submit":"kirim/serahkan","confirm":"konfirmasi/mengesahkan","been":"telah/pernah","four":"empat","chapters":"bab-bab","hundred":"seratus","questions":"pertanyaan-pertanyaan/soal-soal","challenge":"tantangan"});

const phraseDictionary = {
"red blood cells":"sel darah merah",
"white blood cells":"sel darah putih",
"blood plasma":"plasma darah",
"air sacs":"kantung udara paru-paru",
"air sac":"kantung udara paru-paru",
"gas exchange":"pertukaran gas",
"respiratory system":"sistem pernapasan",
"human respiratory system":"sistem pernapasan manusia",
"vocal cords":"pita suara",
"intercostal muscles":"otot antartulang rusuk",
"cell membrane":"membran sel",
"aerobic respiration":"respirasi aerob",
"distance–time graph":"grafik jarak–waktu",
"distance/time graph":"grafik jarak–waktu",
"average speed":"kecepatan rata-rata",
"balanced forces":"gaya-gaya seimbang",
"unbalanced forces":"gaya-gaya tidak seimbang",
"air resistance":"hambatan udara",
"contact force":"gaya kontak",
"turning force":"gaya putar",
"turning forces":"gaya putar",
"moment of force":"momen gaya",
"paper chromatography":"kromatografi kertas",
"solubility investigation":"penyelidikan kelarutan",
"saturated solution":"larutan jenuh",
"concentrated solution":"larutan pekat",
"dilute solution":"larutan encer",
"independent variable":"variabel bebas",
"dependent variable":"variabel terikat",
"control variable":"variabel kontrol",
"food chain":"rantai makanan",
"food web":"jaring-jaring makanan",
"non-living factor":"faktor tak hidup",
"non-living factors":"faktor-faktor tak hidup",
"introduced species":"spesies pendatang",
"invasive species":"spesies invasif",
"native species":"spesies asli",
"sonoran desert":"Gurun Sonora",
"rice paddy":"sawah",
"sea ice":"es laut",
"arctic ocean":"Samudra Arktik",
"carbon dioxide":"karbon dioksida",
"methylated spirits":"spiritus",
"permanent marker":"spidol permanen",
"calcium chloride":"kalsium klorida",
"sodium chloride":"natrium klorida",
"copper sulfate":"tembaga sulfat",
"potassium chlorate":"kalium klorat",
"air sacs (alveoli)":"kantung udara (alveolus)",
"red blood cell":"sel darah merah",
"white blood cell":"sel darah putih",
"blood capillary":"kapiler darah",
"distance travelled":"jarak yang ditempuh",
"sealed container":"wadah tertutup rapat",
"contact area":"luas bidang sentuh",
"resultant force":"gaya resultan",
"not quite":"belum tepat",
"correct answer":"jawaban yang benar",
"answer submitted":"jawaban telah dikirim",
"answer selected":"jawaban dipilih",
"finish quiz":"akhiri kuis",
"next question":"soal berikutnya",
"question progress":"progres soal",
"answer status":"status jawaban",
"scientific thinking":"berpikir ilmiah",
"quiz completed":"kuis selesai",
"chapter performance":"hasil per bab",
"your answer":"jawabanmu",
"time remaining":"sisa waktu",
"food sources":"sumber makanan",
"at rest":"dalam keadaan diam",
"constant speed":"kecepatan konstan",
"average speed":"kecepatan rata-rata",
"distance travelled":"jarak yang ditempuh",
"water temperature":"suhu air",
"air pressure":"tekanan udara",
"gas pressure":"tekanan gas",
"liquid pressure":"tekanan cairan",
"surface area":"luas permukaan",
"contact area":"luas bidang sentuh",
"body cells":"sel-sel tubuh",
"living organisms":"organisme hidup",
"non-living environment":"lingkungan tak hidup",
"native birds":"burung asli",
"young fish":"ikan-ikan muda",
"food resources":"sumber makanan",
"food dye":"pewarna makanan",
"ink sample":"sampel tinta",
"solvent front":"batas pergerakan pelarut",
"resulting image":"gambar hasil kromatografi",
"air resistance":"hambatan udara",
"turning effect":"efek putar",
"opposite direction":"arah berlawanan",
"equal in size":"sama besar",
"higher concentration":"konsentrasi lebih tinggi",
"lower concentration":"konsentrasi lebih rendah",
"short distance":"jarak pendek",
"thin walls":"dinding tipis",
"blood supply":"pasokan darah",
"body temperature":"suhu tubuh",
"heat energy":"energi panas",
"chemical reaction":"reaksi kimia",
"respiratory system":"sistem pernapasan",
"digestive system":"sistem pencernaan",
"red blood cell":"sel darah merah",
"white blood cell":"sel darah putih",
"blood capillary":"kapiler darah",
"air sac":"kantung udara paru-paru",
"air sacs":"kantung udara paru-paru",
"gas exchange":"pertukaran gas",
"distance–time graph":"grafik jarak–waktu",
"distance/time graph":"grafik jarak–waktu",
"food chain":"rantai makanan",
"food web":"jaring-jaring makanan",
"invasive species":"spesies invasif",
"introduced species":"spesies pendatang",
"native species":"spesies asli",
"paper chromatography":"kromatografi kertas",
"saturated solution":"larutan jenuh",
"dilute solution":"larutan encer",
"concentrated solution":"larutan pekat",
"independent variable":"variabel bebas",
"dependent variable":"variabel terikat",
"control variable":"variabel kontrol",
"sonoran desert":"Gurun Sonora",
"rice paddy":"sawah",
"arctic ocean":"Samudra Arktik",
"persistent substance":"zat yang sulit terurai",
"word equation":"persamaan kata"
};

const escapeHtml = s => String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function rich(text){
 const source=String(text);
 const lower=source.toLowerCase();
 const phraseSpans=[];
 Object.keys(phraseDictionary).sort((a,b)=>b.length-a.length).forEach(phrase=>{
  let at=0;
  while((at=lower.indexOf(phrase,at))!==-1){
   phraseSpans.push({start:at,end:at+phrase.length,phrase,meaning:phraseDictionary[phrase]});
   at+=phrase.length;
  }
 });
 phraseSpans.sort((a,b)=>(b.end-b.start)-(a.end-a.start));
 const wordRe=/[A-Za-z]+(?:[-’'][A-Za-z]+)*(?:\/[A-Za-z]+)?|[^A-Za-z]+/g;
 let html="",match;
 while((match=wordRe.exec(source))!==null){
  const token=match[0];
  if(!/[A-Za-z]/.test(token)){html+=escapeHtml(token);continue;}
  const key=token.toLowerCase().replace(/^[^a-z]+|[^a-z]+$/g,"");
  const span=phraseSpans.find(item=>match.index>=item.start&&match.index<item.end);
  const meaning=span
   ? span.meaning+" (frasa: "+span.phrase+")"
   : (dictionary[key]||"Terjemahan belum tersedia");
  html+='<span class="word cursor-help rounded-sm border-b border-dotted border-transparent hover:border-teal-600 hover:bg-teal-50 focus:outline-none" tabindex="0" data-meaning="'+escapeHtml(meaning)+'">'+escapeHtml(token)+'</span>';
 }
 return html;
}
function showTip(el){
 const tip=$("tooltip");
 tip.textContent=el.textContent.trim()+" = "+el.dataset.meaning;
 tip.classList.remove("hidden");
 const r=el.getBoundingClientRect();
 let left=Math.min(innerWidth-290,Math.max(8,r.left));
 let top=r.bottom+8;
 if(top+60>innerHeight) top=r.top-62;
 tip.style.left=left+"px";tip.style.top=Math.max(6,top)+"px";
}
document.addEventListener("mouseover",e=>{const w=e.target.closest(".word");if(w)showTip(w);});
document.addEventListener("mouseout",e=>{if(e.target.closest(".word"))$("tooltip").classList.add("hidden");});
document.addEventListener("focusin",e=>{const w=e.target.closest(".word");if(w)showTip(w);});
document.addEventListener("focusout",e=>{if(e.target.closest(".word"))$("tooltip").classList.add("hidden");});
document.addEventListener("click",e=>{const w=e.target.closest(".word");if(w){showTip(w);clearTimeout(window.tipTimer);window.tipTimer=setTimeout(()=>$("tooltip").classList.add("hidden"),2600);}});
function updateAnswered(){
 const count=submitted.filter(Boolean).length;
 $("answered").textContent="Submitted: "+count+" / "+qs.length;
 $("finishBtn").disabled=count!==qs.length;
}
function showFeedback(){
 const q=qs[index],correct=answers[index]===q.ans,f=$("feedback");
 const tone=correct
  ?"border-emerald-200 bg-emerald-50 text-emerald-950"
  :"border-rose-200 bg-rose-50 text-rose-950";
 const badge=correct
  ?"bg-emerald-100 text-emerald-800"
  :"bg-rose-100 text-rose-800";
 f.className="mt-3 grid shrink-0 grid-cols-1 gap-2 rounded-2xl border p-2.5 sm:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] sm:gap-3 sm:p-3 "+tone;
 const heading=correct?"CORRECT ANSWER":"NOT QUITE";
 const answer=String.fromCharCode(65+q.ans)+". "+q.opts[q.ans];
 f.innerHTML=
  '<section class="flex min-w-0 flex-col justify-center gap-2 rounded-xl bg-white/75 p-3">'+
   '<div class="flex items-center gap-2">'+
    '<span class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full '+badge+' text-sm font-black">'+(correct?"✓":"✕")+'</span>'+
    '<b class="text-xs font-black tracking-wider '+(correct?"text-emerald-800":"text-rose-800")+'">'+heading+'</b>'+
   '</div>'+
   '<div class="min-w-0">'+
    '<div class="mb-1 text-[9px] font-extrabold tracking-[.16em] text-slate-500">'+rich("CORRECT ANSWER")+'</div>'+
    '<p class="break-words text-sm font-bold leading-relaxed text-slate-900 sm:text-base">'+rich(answer)+'</p>'+
   '</div>'+
  '</section>'+
  '<section class="flex min-w-0 flex-col justify-center rounded-xl bg-white/75 p-3">'+
   '<div class="mb-1 text-[9px] font-extrabold tracking-[.16em] text-slate-500">'+rich("EXPLANATION")+'</div>'+
   '<p class="break-words text-xs leading-relaxed text-slate-700 sm:text-sm">'+rich(q.exp)+'</p>'+
   '<p class="mt-2 text-[10px] font-medium text-slate-400">Hover or tap any English word for its Indonesian meaning.</p>'+
  '</section>';
}
function render(){
 $("feedback").classList.add("hidden");
 $("tooltip").classList.add("hidden");
 const q=qs[index],isSubmitted=submitted[index];
 $("counter").textContent=String(index+1).padStart(2,"0")+" / "+qs.length;
 $("progressFill").style.width=((index+1)/qs.length*100)+"%";
 $("chapterLabel").textContent="CHAPTER "+(q.chapter+1)+" · "+chapters[q.chapter].toUpperCase();
 $("difficulty").textContent=q.diff.toUpperCase();
 $("questionText").innerHTML=rich(q.q);
 $("options").innerHTML=q.opts.map((o,i)=>{
  const selected=selections[index]===i;
  const correct=isSubmitted&&i===q.ans;
  const incorrect=isSubmitted&&selected&&i!==q.ans;
  let cls="option flex h-full min-h-9 w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm leading-snug text-slate-800 transition hover:border-teal-400 hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:cursor-default disabled:opacity-100 sm:px-4 sm:text-base lg:text-lg";
  if(selected&&!isSubmitted)cls+=" border-2 border-teal-600 bg-teal-50 text-teal-950";
  if(correct)cls+=" !border-2 !border-emerald-600 !bg-emerald-50 !text-emerald-900";
  if(incorrect)cls+=" !border-2 !border-rose-500 !bg-rose-50 !text-rose-900";
  return '<button class="'+cls+'" data-option="'+i+'" '+(isSubmitted?"disabled":"")+'><span class="w-6 shrink-0 font-black text-teal-700">'+String.fromCharCode(65+i)+'.</span><span>'+rich(o)+'</span></button>';
 }).join("");
 $("options").querySelectorAll("[data-option]").forEach(b=>b.addEventListener("click",()=>selectAnswer(Number(b.dataset.option))));
 $("statusLabel").textContent=isSubmitted?"SUBMITTED":"NOT SUBMITTED";
 $("statusLabel").className="mt-1 inline-flex rounded-full border px-3 py-1 text-[10px] font-extrabold tracking-wider sm:text-xs "+(isSubmitted?"border-emerald-200 bg-emerald-50 text-emerald-800":"border-slate-200 bg-white text-slate-600");
 $("submitBtn").classList.toggle("hidden",isSubmitted);
 $("submitHint").classList.toggle("hidden",isSubmitted);
 $("submitBtn").disabled=isSubmitted||selections[index]===null;
 $("submitHint").textContent=selections[index]===null?"Choose an answer first.":"Answer selected. Press Submit Answer to confirm.";
 $("prevBtn").disabled=index===0;
 $("nextBtn").disabled=!isSubmitted;
 $("nextBtn").textContent=index===qs.length-1?"FINISH QUIZ →":"NEXT QUESTION →";
 updateAnswered();
 if(isSubmitted)showFeedback();
}
function selectAnswer(n){
 if(submitted[index])return;
 selections[index]=n;
 render();
}
function submitAnswer(){
 if(submitted[index]||selections[index]===null)return;
 answers[index]=selections[index];submitted[index]=true;render();
}
function go(n){
 if(n<0||n>index&&!submitted[index])return;
 if(n>=qs.length){if(submitted.every(Boolean))finish();return;}
 index=n;render();
}
function finish(){
 if(ended||!submitted.every(Boolean))return;
 ended=true;$("quiz").classList.add("hidden");$("results").classList.remove("hidden");$("results").classList.add("grid");
 let correct=0,wrong=0;
 qs.forEach((q,i)=>{if(answers[i]===q.ans)correct++;else wrong++;});
 $("score").textContent=Math.round(correct/qs.length*100)+"%";
 $("correct").textContent=correct;$("incorrect").textContent=wrong;$("unanswered").textContent=0;
 $("remark").textContent=correct>=36?"Outstanding scientific thinking!":correct>=30?"Excellent work!":correct>=24?"Good effort. Keep learning!":correct>=16?"Keep practising and improving!":"Keep studying. You can do it!";
 $("chapterResults").innerHTML=chapters.map((name,c)=>{
  const total=qs.filter(q=>q.chapter===c).length,got=qs.filter((q,i)=>q.chapter===c&&answers[i]===q.ans).length;
  return '<div><div class="flex justify-between gap-2 text-[11px] font-bold text-slate-700 sm:text-xs"><span>Chapter '+(c+1)+': '+name+'</span><span>'+got+'/'+total+'</span></div><div class="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-200"><div class="h-full rounded-full bg-teal-600" style="width:'+(got/total*100)+'%"></div></div></div>';
 }).join("");
 $("review").innerHTML=qs.map((q,i)=>{
  const choice=answers[i];
  return '<article class="border-b border-slate-200 pb-3 last:border-0"><small class="text-[10px] font-extrabold tracking-widest text-slate-500">QUESTION '+(i+1)+' · CHAPTER '+(q.chapter+1)+'</small><p class="mt-1 text-sm font-bold text-slate-900">'+rich(q.q)+'</p><p class="mt-1 text-xs text-rose-700">Your answer: '+String.fromCharCode(65+choice)+'. '+rich(q.opts[choice])+'</p><p class="mt-1 text-xs text-emerald-700">Correct: '+String.fromCharCode(65+q.ans)+'. '+rich(q.opts[q.ans])+'</p><p class="mt-1 text-xs text-slate-500">'+rich(q.exp)+'</p></article>';
 }).join("");
}
$("startBtn").addEventListener("click",()=>{
 prepareQuiz();
 $("home").classList.add("hidden");$("quiz").classList.remove("hidden");$("quiz").classList.add("grid");render();
});
$("submitBtn").addEventListener("click",submitAnswer);
$("nextBtn").addEventListener("click",()=>{if(submitted[index]){if(index===qs.length-1)finish();else go(index+1);}});
$("prevBtn").addEventListener("click",()=>go(index-1));
$("finishBtn").addEventListener("click",finish);
$("restartBtn").addEventListener("click",()=>{
 prepareQuiz();
 $("review").innerHTML="";$("results").classList.add("hidden");$("results").classList.remove("grid");
 $("quiz").classList.add("hidden");$("quiz").classList.remove("grid");
 $("home").classList.remove("hidden");updateAnswered();
});
})();