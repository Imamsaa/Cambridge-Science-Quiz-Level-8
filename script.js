(() => {
const $ = id => document.getElementById(id);
const chapters = ["Respiration","Properties of Materials","Forces and Energy","Ecosystems"];
const qs = window.QUIZ_QUESTIONS.map((q,i)=>({chapter:Math.floor(i/10),q:q[0],opts:q[1],ans:q[2],exp:q[3],diff:q[4]}));
const answers=Array(qs.length).fill(null), locked=Array(qs.length).fill(false), seconds=Array(qs.length).fill(600);
let index=0, ticker=null, audioCtx=null, alarmOsc=null, alarmGain=null, alarmInterval=null, ended=false;
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
  return `<span class="word" tabindex="0" data-meaning="${escapeHtml(meaning)}">${token}</span>`;
 }).join("");
}
function fmt(n){return `${String(Math.floor(n/60)).padStart(2,"0")}:${String(n%60).padStart(2,"0")}`;}
function showTip(el){
 const tip=$("tooltip");tip.textContent=`${el.textContent.trim()} = ${el.dataset.meaning}`;
 tip.style.display="block";const r=el.getBoundingClientRect();
 let left=Math.min(innerWidth-250,Math.max(8,r.left));let top=r.bottom+8;
 if(top+60>innerHeight)top=r.top-62;
 tip.style.left=left+"px";tip.style.top=Math.max(6,top)+"px";
}
document.addEventListener("mouseover",e=>{const w=e.target.closest(".word");if(w)showTip(w)});
document.addEventListener("mouseout",e=>{if(e.target.closest(".word"))$("tooltip").style.display="none"});
document.addEventListener("focusin",e=>{const w=e.target.closest(".word");if(w)showTip(w)});
document.addEventListener("focusout",e=>{if(e.target.closest(".word"))$("tooltip").style.display="none"});
document.addEventListener("click",e=>{const w=e.target.closest(".word");if(w){showTip(w);clearTimeout(window.tipTimer);window.tipTimer=setTimeout(()=>$("tooltip").style.display="none",2600)}});
function stopAlarm(){
 if(alarmInterval)clearInterval(alarmInterval);alarmInterval=null;
 if(alarmOsc){try{alarmOsc.stop()}catch(e){}alarmOsc=null;}
 if(alarmGain){try{alarmGain.disconnect()}catch(e){}alarmGain=null;}
}
function soundAlarm(){
 stopAlarm();
 try{
  audioCtx=audioCtx||new(window.AudioContext||window.webkitAudioContext)();audioCtx.resume();
  alarmOsc=audioCtx.createOscillator();alarmGain=audioCtx.createGain();
  alarmOsc.type="sawtooth";alarmOsc.frequency.value=750;alarmGain.gain.value=.001;
  alarmOsc.connect(alarmGain);alarmGain.connect(audioCtx.destination);alarmOsc.start();
  let high=false;alarmInterval=setInterval(()=>{high=!high;alarmOsc.frequency.setTargetAtTime(high?980:620,audioCtx.currentTime,.025);alarmGain.gain.setTargetAtTime(.11,audioCtx.currentTime,.02)},330);
 }catch(e){}
}
function updateAnswered(){$("answered").textContent=`Answered: ${answers.filter(x=>x!==null).length} / ${qs.length}`;}
function feedback(){
 const q=qs[index],f=$("feedback");f.classList.remove("hidden");
 f.innerHTML=`<b>✓ Answer saved</b><div class="muted" style="margin-top:4px">Your answer has been recorded. The correct answer and explanation will appear in the final review.</div>`;
}
function timeoutView(){$("timeout").classList.remove("hidden");$("timer").textContent="00:00";$("timer").style.color="#ff6868";soundAlarm();}
function render(){
 stopAlarm();$("timeout").classList.add("hidden");$("feedback").classList.add("hidden");$("tooltip").style.display="none";
 const q=qs[index];$("counter").textContent=`${String(index+1).padStart(2,"0")} / ${qs.length}`;
 $("progressFill").style.width=((index+1)/qs.length*100)+"%";
 $("chapterLabel").textContent=`CHAPTER ${q.chapter+1} · ${chapters[q.chapter].toUpperCase()}`;
 $("difficulty").textContent=q.diff.toUpperCase();$("questionText").innerHTML=rich(q.q);
 $("options").innerHTML=q.opts.map((o,i)=>`<button class="option ${answers[index]===i?"selected":""}" data-option="${i}"><span class="option-letter">${"ABCD"[i]}.</span><span>${rich(o)}</span></button>`).join("");
 document.querySelectorAll("[data-option]").forEach(b=>b.addEventListener("click",()=>selectAnswer(Number(b.dataset.option))));
 $("timer").textContent=fmt(seconds[index]);$("timer").style.color=seconds[index]<=60?"#ff6868":"";
 $("prevBtn").disabled=index===0;$("prevBtn").style.opacity=index===0?".4":"1";
 $("nextBtn").textContent=index===qs.length-1?"FINISH QUIZ ✓":"Next Question →";
 updateAnswered();if(locked[index])timeoutView();if(answers[index]!==null)feedback();
}
function selectAnswer(n){if(locked[index])return;answers[index]=n;document.querySelectorAll("[data-option]").forEach((b,i)=>b.classList.toggle("selected",i===n));feedback();updateAnswered();}
function tick(){
 if(ended||$("quiz").classList.contains("hidden"))return;
 if(seconds[index]>0){seconds[index]--;$("timer").textContent=fmt(seconds[index]);if(seconds[index]<=60)$("timer").style.color="#ff6868";
  if(seconds[index]===0){locked[index]=true;timeoutView();}
 }
}
function startTimer(){clearInterval(ticker);ticker=setInterval(tick,1000);}
function go(n){if(n<0)return;if(n>=qs.length){finish();return;}index=n;render();startTimer();}
function finish(){
 ended=true;clearInterval(ticker);stopAlarm();$("quiz").classList.add("hidden");$("results").classList.remove("hidden");
 let correct=0,wrong=0,unanswered=0;
 qs.forEach((q,i)=>{if(answers[i]===null)unanswered++;else if(answers[i]===q.ans)correct++;else wrong++;});
 $("score").textContent=Math.round(correct/qs.length*100)+"%";$("correct").textContent=correct;$("incorrect").textContent=wrong;$("unanswered").textContent=unanswered;
 $("remark").textContent=correct>=36?"Outstanding scientific thinking!":correct>=30?"Excellent work!":correct>=24?"Good effort. Keep learning!":correct>=16?"Keep practising and improving!":"Keep studying. You can do it!";
 $("chapterResults").innerHTML=chapters.map((name,c)=>{const total=qs.filter(q=>q.chapter===c).length;const got=qs.filter((q,i)=>q.chapter===c&&answers[i]===q.ans).length;return `<div><div class="chapter-line"><span>Chapter ${c+1}: ${name}</span><span>${got}/${total}</span></div><div class="mini-progress"><div style="width:${got/total*100}%"></div></div></div>`}).join("");
 $("review").innerHTML=qs.map((q,i)=>`<article class="review-item"><small class="eyebrow">QUESTION ${i+1} · CHAPTER ${q.chapter+1}</small><p><b>${escapeHtml(q.q)}</b></p><p class="your">Your answer: ${answers[i]===null?"Not answered":`${"ABCD"[answers[i]]}. ${escapeHtml(q.opts[answers[i]])}`}</p><p class="right">Correct: ${"ABCD"[q.ans]}. ${escapeHtml(q.opts[q.ans])}</p><p class="explain">${escapeHtml(q.exp)}</p></article>`).join("");
}
$("startBtn").addEventListener("click",()=>{$("home").classList.add("hidden");$("quiz").classList.remove("hidden");render();startTimer();});
$("nextBtn").addEventListener("click",()=>go(index+1));$("timeoutNext").addEventListener("click",()=>go(index+1));$("prevBtn").addEventListener("click",()=>go(index-1));$("finishBtn").addEventListener("click",finish);
$("restartBtn").addEventListener("click",()=>{answers.fill(null);locked.fill(false);seconds.fill(600);index=0;ended=false;$("results").classList.add("hidden");$("home").classList.remove("hidden");});
})();