(() => {
const $ = id => document.getElementById(id);
const chapters = ["Respiration","Properties of Materials","Forces and Energy","Ecosystems"];
const qs = window.QUIZ_QUESTIONS.map((q,i)=>({chapter:Math.floor(i/10),q:q[0],opts:q[1],ans:q[2],exp:q[3],diff:q[4]}));
const selections = Array(qs.length).fill(null);
const answers = Array(qs.length).fill(null);
const submitted = Array(qs.length).fill(false);
let index = 0;
let ended = false;
const dictionary = {
"which":"yang mana","what":"apa","where":"di mana","when":"kapan","why":"mengapa","how":"bagaimana","statement":"pernyataan","best":"terbaik","describes":"menjelaskan","describe":"jelaskan","called":"disebut","inside":"di dalam","outside":"di luar","mainly":"terutama","take":"mengambil","place":"tempat","cell":"sel","cells":"sel-sel","aerobic":"aerob (menggunakan oksigen)","respiration":"respirasi sel","releases":"melepaskan","release":"melepaskan","energy":"energi","glucose":"glukosa","using":"menggunakan","oxygen":"oksigen","moves":"bergerak","air":"udara","lungs":"paru-paru","transports":"mengangkut","blood":"darah","breaks":"memecah","food":"makanan","nucleus":"inti sel","mitochondria":"mitokondria","membrane":"membran","cytoplasm":"sitoplasma","sequence":"urutan","correct":"benar","path":"jalur","nose":"hidung","trachea":"trakea","bronchi":"bronkus","bronchioles":"bronkiolus","air":"udara","sacs":"kantung","alveoli":"alveolus","surrounded":"dikelilingi","many":"banyak","capillaries":"kapiler","allow":"memungkinkan","efficient":"efisien","gas":"gas","exchange":"pertukaran","direction":"arah","diffuse":"berdifusi","diffusion":"difusi","during":"selama","relaxes":"mengendur","relax":"mengendur","contracts":"berkontraksi","contract":"berkontraksi","diaphragm":"diafragma","upwards":"ke atas","downwards":"ke bawah","breathe":"bernapas","inspired":"udara yang dihirup","expired":"udara yang diembuskan","contains":"mengandung","more":"lebih banyak","carbon":"karbon","dioxide":"dioksida","haemoglobin":"hemoglobin","red":"merah","blood":"darah","destroy":"menghancurkan","pathogens":"patogen","transport":"mengangkut","thin":"tipis","walls":"dinding","short":"pendek","distance":"jarak","rapid":"cepat","living":"hidup","germinating":"berkecambah","seeds":"biji","insulated":"terisolasi","flask":"labu","temperature":"suhu","rise":"kenaikan","greater":"lebih besar","dead":"mati",
"sugar":"gula","solution":"larutan","solvent":"pelarut","solute":"zat terlarut","water":"air","dissolves":"melarutkan","dissolve":"melarutkan","substance":"zat","liquid":"cairan","container":"wadah","floats":"mengapung","saturated":"jenuh","maximum":"maksimum","amount":"jumlah","dissolved":"terlarut","solubility":"kelarutan","solid":"padat","solid":"benda padat","increases":"meningkat","increases":"meningkat","temperature":"suhu","independent":"bebas","variable":"variabel","mass":"massa","salt":"garam","dependent":"terikat","measured":"diukur","result":"hasil","volume":"volume","kept":"dipertahankan","constant":"konstan","fair":"adil","investigation":"penyelidikan","purpose":"tujuan","pencil":"pensil","line":"garis","paper":"kertas","chromatography":"kromatografi","graphite":"grafit","insoluble":"tidak larut","solvent":"pelarut","interfere":"mengganggu","chromatogram":"kromatogram","separate":"memisahkan","spots":"titik-titik","mixture":"campuran","coloured":"berwarna","sample":"sampel","ink":"tinta","pure":"murni",
"forces":"gaya-gaya","force":"gaya","equal":"sama","size":"ukuran","opposite":"berlawanan","balanced":"seimbang","unbalanced":"tidak seimbang","stationary":"diam","acting":"bekerja","gravity":"gravitasi","motion":"gerak","moving":"bergerak","object":"benda","change":"mengubah","speed":"kecepatan","direction":"arah","cyclist":"pesepeda","travels":"menempuh","metres":"meter","seconds":"detik","horizontal":"mendatar","graph":"grafik","represents":"mewakili","distance":"jarak","time":"waktu","constant":"konstan","moment":"momen gaya","pivot":"titik tumpu","pressure":"tekanan","applied":"diberikan","contact":"kontak","area":"luas","dam":"bendungan","wall":"dinding","usually":"biasanya","bottom":"bagian bawah","depth":"kedalaman","liquid":"cairan","heated":"dipanaskan","sealed":"tertutup rapat","particles":"partikel","collide":"bertumbukan","often":"sering","harder":"lebih keras","walls":"dinding","coloured":"berwarna","substance":"zat","spreads":"menyebar","still":"diam","region":"wilayah","high":"tinggi","concentration":"konsentrasi","low":"rendah","process":"proses","diffusion":"difusi","force":"gaya","friction":"gesekan","weight":"berat","parachute":"parasut","lever":"tuas","turning":"memutar","newton":"newton","metre":"meter",
"ecosystem":"ekosistem","community":"komunitas","organisms":"organisme","organism":"organisme","interacting":"saling berinteraksi","environment":"lingkungan","non-living":"tak hidup","factor":"faktor","desert":"gurun","sunlight":"sinar matahari","kangaroo":"kanguru","rat":"tikus","cactus":"kaktus","wren":"burung wren","grasshopper":"belalang","habitat":"habitat","natural":"alami","adaptation":"adaptasi","saguaro":"saguaro (jenis kaktus)","thick":"tebal","stem":"batang","stores":"menyimpan","water":"air","food":"makanan","web":"jaring-jaring","arrows":"panah","represent":"mewakili","direction":"arah","energy":"energi","transfer":"perpindahan","producer":"produsen","plants":"tumbuhan","photosynthesis":"fotosintesis","prickly":"berduri","pear":"pir","nocturnal":"aktif pada malam hari","avoid":"menghindari","cooler":"lebih sejuk","heat":"panas","day":"siang","pollination":"penyerbukan","pollen":"serbuk sari","flower":"bunga","stigma":"kepala putik","seeds":"biji","soil":"tanah","roots":"akar","depend":"bergantung","resources":"sumber daya","competition":"persaingan","feeding":"makan","relationships":"hubungan","food":"makanan","chains":"rantai","connected":"terhubung","ecosystem":"ekosistem","predators":"pemangsa","predator":"pemangsa"
};
const escapeHtml = s => String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function rich(text){
 return escapeHtml(text).split(/(\s+|[.,!?;:()[\]{}])/).map(token=>{
  const key=token.toLowerCase().replace(/^[^a-z]+|[^a-z]+$/g,"");
  if(!key || !/[a-z]/i.test(key)) return token;
  const meaning=dictionary[key] || "Arti mengikuti konteks kalimat";
  return '<span class="word cursor-help rounded-sm border-b border-dotted border-transparent hover:border-teal-600 hover:bg-teal-50 focus:outline-none" tabindex="0" data-meaning="' + escapeHtml(meaning) + '">' + token + '</span>';
 }).join("");
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
 f.className="mt-2 sm:mt-3 shrink-0 rounded-xl border px-3 py-2 sm:px-4 sm:py-3 text-[11px] sm:text-sm leading-snug "+(correct?"border-emerald-200 bg-emerald-50 text-emerald-900":"border-rose-200 bg-rose-50 text-rose-900");
 const heading=correct?"✓ CORRECT ANSWER":"✕ NOT QUITE";
 const answer="Correct answer: "+String.fromCharCode(65+q.ans)+". "+q.opts[q.ans];
 f.innerHTML='<b class="font-extrabold">'+heading+'</b><div class="mt-1 font-bold">'+escapeHtml(answer)+'</div><div class="mt-1 text-slate-600">'+escapeHtml(q.exp)+'</div>';
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
 $("options").querySelectorAll("[data-option]").forEach((b,i)=>{
  b.classList.toggle("border-2",i===n);
  b.classList.toggle("border-teal-600",i===n);
  b.classList.toggle("bg-teal-50",i===n);
  b.classList.toggle("text-teal-950",i===n);
 });
 $("submitBtn").disabled=false;
 $("submitHint").textContent="Answer selected. Press Submit Answer to confirm.";
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
  return '<article class="border-b border-slate-200 pb-3 last:border-0"><small class="text-[10px] font-extrabold tracking-widest text-slate-500">QUESTION '+(i+1)+' · CHAPTER '+(q.chapter+1)+'</small><p class="mt-1 text-sm font-bold text-slate-900">'+escapeHtml(q.q)+'</p><p class="mt-1 text-xs text-rose-700">Your answer: '+String.fromCharCode(65+choice)+'. '+escapeHtml(q.opts[choice])+'</p><p class="mt-1 text-xs text-emerald-700">Correct: '+String.fromCharCode(65+q.ans)+'. '+escapeHtml(q.opts[q.ans])+'</p><p class="mt-1 text-xs text-slate-500">'+escapeHtml(q.exp)+'</p></article>';
 }).join("");
}
$("startBtn").addEventListener("click",()=>{
 $("home").classList.add("hidden");$("quiz").classList.remove("hidden");$("quiz").classList.add("grid");render();
});
$("submitBtn").addEventListener("click",submitAnswer);
$("nextBtn").addEventListener("click",()=>{if(submitted[index]){if(index===qs.length-1)finish();else go(index+1);}});
$("prevBtn").addEventListener("click",()=>go(index-1));
$("finishBtn").addEventListener("click",finish);
$("restartBtn").addEventListener("click",()=>{
 selections.fill(null);answers.fill(null);submitted.fill(false);index=0;ended=false;
 $("review").innerHTML="";$("results").classList.add("hidden");$("results").classList.remove("grid");
 $("home").classList.remove("hidden");updateAnswered();
});
})();