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
  return '<span class="word" tabindex="0" data-meaning="' + escapeHtml(meaning) + '">' + token + '</span>';
 }).join("");
}
function showTip(el){
 const tip=$("tooltip");
 tip.textContent=el.textContent.trim()+" = "+el.dataset.meaning;
 tip.style.display="block";
 const r=el.getBoundingClientRect();
 let left=Math.min(innerWidth-250,Math.max(8,r.left));
 let top=r.bottom+8;
 if(top+60>innerHeight) top=r.top-62;
 tip.style.left=left+"px";
 tip.style.top=Math.max(6,top)+"px";
}
document.addEventListener("mouseover",e=>{const w=e.target.closest(".word");if(w)showTip(w);});
document.addEventListener("mouseout",e=>{if(e.target.closest(".word"))$("tooltip").style.display="none";});
document.addEventListener("focusin",e=>{const w=e.target.closest(".word");if(w)showTip(w);});
document.addEventListener("focusout",e=>{if(e.target.closest(".word"))$("tooltip").style.display="none";});
document.addEventListener("click",e=>{
 const w=e.target.closest(".word");
 if(w){showTip(w);clearTimeout(window.tipTimer);window.tipTimer=setTimeout(()=>$("tooltip").style.display="none",2600);}
});
function updateAnswered(){
 const count=submitted.filter(Boolean).length;
 $("answered").textContent="Submitted: "+count+" / "+qs.length;
 $("finishBtn").disabled=count!==qs.length;
}
function showFeedback(){
 const q=qs[index];
 const f=$("feedback");
 const correct=answers[index]===q.ans;
 f.classList.remove("hidden","correct-feedback","incorrect-feedback");
 f.classList.add(correct?"correct-feedback":"incorrect-feedback");
 const heading=correct?"✓ CORRECT ANSWER":"✕ NOT QUITE";
 const answer="Correct answer: "+String.fromCharCode(65+q.ans)+". "+q.opts[q.ans];
 f.innerHTML="<b>"+heading+"</b><div class=\"feedback-answer\">"+escapeHtml(answer)+"</div><div class=\"feedback-explanation\">"+escapeHtml(q.exp)+"</div>";
}
function render(){
 $("feedback").classList.add("hidden");
 $("tooltip").style.display="none";
 const q=qs[index];
 const isSubmitted=submitted[index];
 $("questionPanel").classList.toggle("submitted",isSubmitted);
 $("counter").textContent=String(index+1).padStart(2,"0")+" / "+qs.length;
 $("progressFill").style.width=((index+1)/qs.length*100)+"%";
 $("chapterLabel").textContent="CHAPTER "+(q.chapter+1)+" · "+chapters[q.chapter].toUpperCase();
 $("difficulty").textContent=q.diff.toUpperCase();
 $("questionText").innerHTML=rich(q.q);
 $("options").innerHTML=q.opts.map((o,i)=>{
  const selected=selections[index]===i;
  const correct=isSubmitted&&i===q.ans;
  const incorrect=isSubmitted&&selected&&i!==q.ans;
  const classes=["option",selected?"selected":"",correct?"correct-answer":"",incorrect?"incorrect-answer":""].filter(Boolean).join(" ");
  return '<button class="'+classes+'" data-option="'+i+'" '+(isSubmitted?"disabled":"")+'><span class="option-letter">'+String.fromCharCode(65+i)+'.</span><span>'+rich(o)+'</span></button>';
 }).join("");
 $("options").querySelectorAll("[data-option]").forEach(b=>b.addEventListener("click",()=>selectAnswer(Number(b.dataset.option))));
 $("statusLabel").textContent=isSubmitted?"SUBMITTED":"NOT SUBMITTED";
 $("submitBtn").disabled=isSubmitted||selections[index]===null;
 $("submitBtn").textContent=isSubmitted?"ANSWER SUBMITTED ✓":"SUBMIT ANSWER";
 $("submitHint").textContent=isSubmitted?"Your answer has been submitted.":(selections[index]===null?"Choose one answer first.":"Answer selected. Press Submit Answer to confirm.");
 $("prevBtn").disabled=index===0;
 $("prevBtn").style.opacity=index===0?".4":"1";
 $("nextBtn").disabled=!isSubmitted;
 $("nextBtn").textContent=index===qs.length-1?"FINISH QUIZ →":"NEXT QUESTION →";
 updateAnswered();
 if(isSubmitted)showFeedback();
}
function selectAnswer(n){
 if(submitted[index])return;
 selections[index]=n;
 $("options").querySelectorAll("[data-option]").forEach((b,i)=>b.classList.toggle("selected",i===n));
 $("submitBtn").disabled=false;
 $("submitHint").textContent="Answer selected. Press Submit Answer to confirm.";
}
function submitAnswer(){
 if(submitted[index]||selections[index]===null)return;
 answers[index]=selections[index];
 submitted[index]=true;
 render();
}
function go(n){
 if(n<0)return;
 if(n>index&&!submitted[index])return;
 if(n>=qs.length){if(submitted.every(Boolean))finish();return;}
 index=n;
 render();
}
function finish(){
 if(ended||!submitted.every(Boolean))return;
 ended=true;
 $("quiz").classList.add("hidden");
 $("results").classList.remove("hidden");
 let correct=0,wrong=0,unanswered=0;
 qs.forEach((q,i)=>{
  if(answers[i]===null)unanswered++;
  else if(answers[i]===q.ans)correct++;
  else wrong++;
 });
 $("score").textContent=Math.round(correct/qs.length*100)+"%";
 $("correct").textContent=correct;
 $("incorrect").textContent=wrong;
 $("unanswered").textContent=unanswered;
 $("remark").textContent=correct>=36?"Outstanding scientific thinking!":correct>=30?"Excellent work!":correct>=24?"Good effort. Keep learning!":correct>=16?"Keep practising and improving!":"Keep studying. You can do it!";
 $("chapterResults").innerHTML=chapters.map((name,c)=>{
  const total=qs.filter(q=>q.chapter===c).length;
  const got=qs.filter((q,i)=>q.chapter===c&&answers[i]===q.ans).length;
  return '<div><div class="chapter-line"><span>Chapter '+(c+1)+': '+name+'</span><span>'+got+'/'+total+'</span></div><div class="mini-progress"><div style="width:'+(got/total*100)+'%"></div></div></div>';
 }).join("");
 $("review").innerHTML=qs.map((q,i)=>{
  const choice=answers[i];
  return '<article class="review-item"><small class="eyebrow">QUESTION '+(i+1)+' · CHAPTER '+(q.chapter+1)+'</small><p><b>'+escapeHtml(q.q)+'</b></p><p class="your">Your answer: '+String.fromCharCode(65+choice)+'. '+escapeHtml(q.opts[choice])+'</p><p class="right">Correct: '+String.fromCharCode(65+q.ans)+'. '+escapeHtml(q.opts[q.ans])+'</p><p class="explain">'+escapeHtml(q.exp)+'</p></article>';
 }).join("");
}
$("startBtn").addEventListener("click",()=>{
 $("home").classList.add("hidden");
 $("quiz").classList.remove("hidden");
 render();
});
$("submitBtn").addEventListener("click",submitAnswer);
$("nextBtn").addEventListener("click",()=>{
 if(!submitted[index])return;
 if(index===qs.length-1)finish();
 else go(index+1);
});
$("prevBtn").addEventListener("click",()=>go(index-1));
$("finishBtn").addEventListener("click",finish);
$("restartBtn").addEventListener("click",()=>{
 selections.fill(null);
 answers.fill(null);
 submitted.fill(false);
 index=0;
 ended=false;
 $("review").innerHTML="";
 $("results").classList.add("hidden");
 $("home").classList.remove("hidden");
 updateAnswered();
});
})();
