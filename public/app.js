const image=document.querySelector('#image'), preview=document.querySelector('#preview');
const generate=document.querySelector('#generate'), status=document.querySelector('#status');
const result=document.querySelector('#result'), download=document.querySelector('#download');
const creditsEl=document.querySelector('#credits'); let imgReady=false, credits=10;

image.onchange=()=>{const f=image.files[0]; if(!f)return; preview.src=URL.createObjectURL(f);
preview.onload=()=>{preview.style.display='block';imgReady=true;status.textContent='Image ready hai.'}};

generate.onclick=async()=>{
 if(!imgReady)return status.textContent='⚠️ Pehle image upload karein.';
 if(credits<1)return status.textContent='⚠️ Credits khatam hain.';
 credits--; creditsEl.textContent=credits; generate.disabled=true; status.textContent='⏳ Video generate ho raha hai...';

 // Demo locally creates a short animated WebM. Replace with /api/generate for a real AI provider.
 const c=document.createElement('canvas'), ctx=c.getContext('2d'); c.width=720;c.height=720;
 const stream=c.captureStream(30); const rec=new MediaRecorder(stream); const chunks=[];
 rec.ondataavailable=e=>e.data.size&&chunks.push(e.data);
 rec.onstop=()=>{const url=URL.createObjectURL(new Blob(chunks,{type:'video/webm'}));
 result.src=url;result.style.display='block';download.href=url;download.style.display='inline-block';
 status.textContent='✅ Demo video ready hai.';generate.disabled=false};
 rec.start();const start=performance.now(),dur=5000;
 function frame(t){const p=Math.min((t-start)/dur,1),s=1+.15*p;
 ctx.fillStyle='#000';ctx.fillRect(0,0,c.width,c.height);ctx.save();ctx.translate(360,360);ctx.scale(s,s);
 ctx.translate(-preview.naturalWidth/2,-preview.naturalHeight/2);ctx.drawImage(preview,0,0);ctx.restore();
 p<1?requestAnimationFrame(frame):rec.stop()} requestAnimationFrame(frame);
};
document.querySelector('#login').onclick=()=>alert('Login UI placeholder — production में secure authentication जोड़ें।');
