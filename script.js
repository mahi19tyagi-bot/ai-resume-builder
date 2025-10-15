const form = document.getElementById('resumeForm');
const preview = document.getElementById('preview');
const generateBtn = document.getElementById('generateBtn');
const applyAllBtn = document.getElementById('applyAllBtn');
const readAloudBtn = document.getElementById('readAloudBtn');
const downloadBtn = document.getElementById('downloadBtn');
const aiSuggestions = document.getElementById('aiSuggestions');
const themeToggle = document.getElementById('themeToggle');
const attachmentsInput = document.getElementById('attachments');
let currentTemplate = 'classic';
let attachments = [];
themeToggle.addEventListener('click', () => document.body.classList.toggle('dark'));
function getFormData(){return{fullName:document.getElementById('fullName').value,phone:document.getElementById('phone').value,email:document.getElementById('email').value,linkedin:document.getElementById('linkedin').value,location:document.getElementById('location').value,summary:document.getElementById('summary').value,company1:document.getElementById('company1').value,jobTitle1:document.getElementById('jobTitle1').value,duration1:document.getElementById('duration1').value,experience1:document.getElementById('experience1').value,degree1:document.getElementById('degree1').value,eduInstitution1:document.getElementById('eduInstitution1').value,graduation1:document.getElementById('graduation1').value,techSkills:document.getElementById('techSkills').value,softSkills:document.getElementById('softSkills').value,projects:document.getElementById('projects').value,languages:document.getElementById('languages').value,photo:document.getElementById('photo').files[0]}}

function generateAISuggestions(data){
const suggestions=[];
const keywordMap=[{keywords:['javascript','python','react','node','java','c#'],category:'Software / IT Developer'},{keywords:['excel','sql','analytics','data','tableau','powerbi'],category:'Data Analyst / Data Scientist'},{keywords:['marketing','sales','seo','campaign','brand'],category:'Marketing / Sales Professional'},{keywords:['design','illustrator','photoshop','ux','ui','figma'],category:'Designer / Creative'},{keywords:['leadership','team management','project management','coordination'],category:'Management / Leadership Role'},{keywords:['teacher','tutor','instructor','education','school','training'],category:'Education / Teaching'},{keywords:['doctor','nurse','medical','healthcare','clinic'],category:'Medical / Healthcare'},{keywords:['lawyer','legal','attorney','paralegal'],category:'Legal Professional'},{keywords:['writer','content','editor','journalist','author'],category:'Writing / Content'},{keywords:['artist','musician','actor','performer'],category:'Arts / Entertainment'}];
const allText=((data.summary||'')+' '+(data.experience1||'')+' '+(data.techSkills||'')+' '+(data.projects||'')+' '+(data.softSkills||'')).toLowerCase();
let category='General Professional';
for(let item of keywordMap){if(item.keywords.some(k=>allText.includes(k))){category=item.category;break}}
suggestions.push({text:`Detected Career Category: ${category}`,type:'strong'});
suggestions.push({text:'Ensure your resume highlights achievements relevant to this category.',type:'ok'});
suggestions.push({text:'Check that contact info is complete and professional.',type:'ok'});
if(!data.summary)suggestions.push({text:'Enhance summary with key achievements & metrics',type:'weak'});
if(!data.experience1)suggestions.push({text:'Add detailed professional experience with 3–5 bullet points per role',type:'weak'});
if(!data.techSkills)suggestions.push({text:'Include all relevant technical skills',type:'ok'});
if(!data.projects)suggestions.push({text:'Add projects with outcome & technologies used',type:'ok'});
if(!data.softSkills)suggestions.push({text:'Highlight key soft skills',type:'ok'});
aiSuggestions.innerHTML='';
suggestions.forEach((s,i)=>{const div=document.createElement('div');div.className=`suggestion ${s.type}`;div.innerHTML=`<span data-idx="${i}">${s.text}</span><button onclick="applySuggestion(${i})">Apply</button>`;aiSuggestions.appendChild(div)});
}

function applySuggestion(idx){
const data=getFormData();
const allText=((data.summary||'')+' '+(data.experience1||'')+' '+(data.techSkills||'')+' '+(data.projects||'')+' '+(data.softSkills||'')).toLowerCase();
const keywordMap=[{keywords:['javascript','python','react','node','java','c#'],category:'Software / IT Developer'},{keywords:['excel','sql','analytics','data','tableau','powerbi'],category:'Data Analyst / Data Scientist'},{keywords:['marketing','sales','seo','campaign','brand'],category:'Marketing / Sales Professional'},{keywords:['design','illustrator','photoshop','ux','ui','figma'],category:'Designer / Creative'},{keywords:['leadership','team management','project management','coordination'],category:'Management / Leadership Role'},{keywords:['teacher','tutor','instructor','education','school','training'],category:'Education / Teaching'},{keywords:['doctor','nurse','medical','healthcare','clinic'],category:'Medical / Healthcare'},{keywords:['lawyer','legal','attorney','paralegal'],category:'Legal Professional'},{keywords:['writer','content','editor','journalist','author'],category:'Writing / Content'},{keywords:['artist','musician','actor','performer'],category:'Arts / Entertainment'}];
let category='General Professional';
for(let item of keywordMap){if(item.keywords.some(k=>allText.includes(k))){category=item.category;break}}
const suggestionsMap={ 'Software / IT Developer':{summary:'Experienced software developer proficient in JavaScript, Python, React, and Node.js, delivering high-quality applications.',experience1:'- Developed web applications using React and Node.js\n- Improved system performance by 30%\n- Collaborated with cross-functional teams',techSkills:'JavaScript, Python, React, Node.js, Git',projects:'E-commerce Web App – Implemented shopping cart & payment integration | Portfolio Website – React SPA',softSkills:'Problem Solving, Teamwork, Communication'}, 'Data Analyst / Data Scientist':{summary:'Data analyst skilled in SQL, Python, and Tableau to drive actionable insights and optimize business performance.',experience1:'- Analyzed datasets to identify trends\n- Automated reporting processes\n- Developed predictive models',techSkills:'Python, SQL, Excel, Tableau, Power BI',projects:'Sales Data Analysis – Increased revenue by 10% | Customer Churn Prediction Model',softSkills:'Analytical Thinking, Attention to Detail, Communication'}, 'Marketing / Sales Professional':{summary:'Marketing professional focused on campaign strategy, brand promotion, and increasing sales through innovative approaches.',experience1:'- Executed digital marketing campaigns\n- Optimized SEO and content marketing\n- Managed client relationships',techSkills:'SEO, Google Analytics, Social Media Marketing',projects:'Product Launch Campaign – Achieved 20% higher engagement | Social Media Strategy Project',softSkills:'Creativity, Communication, Teamwork'}, 'Designer / Creative':{summary:'Creative designer experienced in UI/UX, Photoshop, Illustrator, and producing visually compelling designs.',experience1:'- Designed UI/UX for web & mobile apps\n- Created branding materials\n- Collaborated with developers and clients',techSkills:'Photoshop, Illustrator, Figma, Sketch',projects:'App Redesign – Improved user retention | Branding Project for Startup',softSkills:'Creativity, Attention to Detail, Collaboration'}, 'Management / Leadership Role':{summary:'Experienced professional with leadership skills, project management expertise, and team coordination experience.',experience1:'- Led cross-functional teams\n- Managed multiple projects simultaneously\n- Implemented process improvements',techSkills:'Project Management Tools, MS Office, Agile',projects:'Team Expansion Initiative | Process Optimization Project',softSkills:'Leadership, Communication, Strategic Thinking'}, 'General Professional':{summary:'Experienced professional delivering measurable results in your domain.',experience1:'- Key achievement 1\n- Key achievement 2\n- Key achievement 3',techSkills:'Relevant technical skills',projects:'Project A – Outcome | Project B – Outcome',softSkills:'Leadership, Communication, Teamwork'} };
const s=suggestionsMap[category]||suggestionsMap['General Professional'];
document.getElementById('summary').value=s.summary;
document.getElementById('experience1').value=s.experience1;
document.getElementById('techSkills').value=s.techSkills;
document.getElementById('projects').value=s.projects;
document.getElementById('softSkills').value=s.softSkills;
updatePreview();
}

function applyAutoScaling(){
const container=preview.querySelector('.resume');
if(!container)return;
container.style.transform='scale(1)';
container.style.transformOrigin='top left';
const contentHeight=container.scrollHeight;
const a4HeightPx=1123;
if(contentHeight>a4HeightPx){const scaleFactor=a4HeightPx/contentHeight;container.style.transform=`scale(${scaleFactor})`;}
}

function updatePreview(){
const data=getFormData();
data.profession=document.getElementById('profession')?.value||'';
data.portfolio=document.getElementById('portfolio')?.value||'';
data.achievements=document.getElementById('achievements')?.value||'';
data.hobbies=document.getElementById('hobbies')?.value||'';
data.attachments=attachments.map(f=>f.name).join(', ');
const allText=((data.summary||'')+' '+(data.experience1||'')+' '+(data.techSkills||'')+' '+(data.projects||'')+' '+(data.softSkills||'')).toLowerCase();
const keywordMap=[{keywords:['javascript','python','react','node','java','c#'],category:'Software / IT Developer'},{keywords:['excel','sql','analytics','data','tableau','powerbi'],category:'Data Analyst / Data Scientist'},{keywords:['marketing','sales','seo','campaign','brand'],category:'Marketing / Sales Professional'},{keywords:['design','illustrator','photoshop','ux','ui','figma'],category:'Designer / Creative'},{keywords:['leadership','team management','project management','coordination'],category:'Management / Leadership Role'},{keywords:['teacher','tutor','instructor','education','school','training'],category:'Education / Teaching'},{keywords:['doctor','nurse','medical','healthcare','clinic'],category:'Medical / Healthcare'},{keywords:['lawyer','legal','attorney','paralegal'],category:'Legal Professional'},{keywords:['writer','content','editor','journalist','author'],category:'Writing / Content'},{keywords:['artist','musician','actor','performer'],category:'Arts / Entertainment'}];
let category='General Professional';
for(let item of keywordMap){if(item.keywords.some(k=>allText.includes(k))){category=item.category;break}}
let html=`<div class="resume ${currentTemplate}">`;
if(data.photo)html+=`<img src="${URL.createObjectURL(data.photo)}">`;
html+=`<h1>${data.fullName||'Your Name'}</h1>`;
html+=`<h2 style="text-align:center;font-style:italic;color:#555;">${category}</h2>`;
html+=`<p><strong>Phone:</strong> ${data.phone||'N/A'} | <strong>Email:</strong> ${data.email||'N/A'} | <strong>LinkedIn:</strong> ${data.linkedin||'N/A'}</p>`;
html+=`<p><strong>Location:</strong> ${data.location||'N/A'}</p>`;
if(data.profession)html+=`<p><strong>Profession:</strong> ${data.profession}</p>`;
if(data.portfolio)html+=`<p><strong>Portfolio:</strong> <a href="${data.portfolio}" target="_blank">${data.portfolio}</a></p>`;
html+=`<h3>Summary</h3><p>${data.summary||'Add your career summary highlighting achievements and skills.'}</p>`;
html+=`<h3>Professional Experience</h3><p>${data.jobTitle1?`${data.jobTitle1} at ${data.company1} (${data.duration1})`:'Add your work experience here.'}</p>`;
html+=`<p>${data.experience1}</p>`;
html+=`<h3>Education</h3><p>${data.degree1} at ${data.eduInstitution1} (${data.graduation1})</p>`;
html+=`<h3>Technical Skills</h3><p>${data.techSkills}</p>`;
html+=`<h3>Soft Skills</h3><p>${data.softSkills}</p>`;
html+=`<h3>Projects</h3><p>${data.projects}</p>`;
if(data.achievements)html+=`<h3>Achievements & Awards</h3><p>${data.achievements}</p>`;
if(data.hobbies)html+=`<h3>Hobbies & Interests</h3><p>${data.hobbies}</p>`;
html+=`<h3>Languages</h3><p>${data.languages}</p>`;
html+=`</div>`;
preview.innerHTML=html;
generateAISuggestions(data);
applyAutoScaling();
}

document.querySelectorAll('.template-thumb').forEach(btn=>btn.addEventListener('click',()=>{currentTemplate=btn.dataset.template;updatePreview();}));
attachmentsInput.addEventListener('change',e=>{attachments=Array.from(e.target.files);});
form.querySelectorAll('input,textarea').forEach(el=>el.addEventListener('input',updatePreview));
generateBtn.addEventListener('click',updatePreview);
applyAllBtn.addEventListener('click',()=>{[0,1,2,3,4].forEach(i=>applySuggestion(i));updatePreview();});
readAloudBtn.addEventListener('click',()=>{const text=preview.querySelector('.resume').innerText;const utter=new SpeechSynthesisUtterance(text);speechSynthesis.speak(utter);});
function fileToDataURL(file){return new Promise(resolve=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.readAsDataURL(file);});}
downloadBtn.addEventListener('click',async()=>{const {jsPDF}=window.jspdf;const doc=new jsPDF('p','pt','a4');const element=preview.querySelector('.resume');const isMobile=window.innerWidth<=768;if(isMobile)applyAutoScaling();const resumeCanvas=await html2canvas(element,{scale:isMobile?3:2,useCORS:true});const resumeImg=resumeCanvas.toDataURL('image/jpeg',1.0);const pageWidth=doc.internal.pageSize.getWidth();const pageHeight=doc.internal.pageSize.getHeight();if(isMobile){const imgWidth=resumeCanvas.width;const imgHeight=resumeCanvas.height;const ratio=Math.min((pageWidth-20)/imgWidth,(pageHeight-20)/imgHeight);const w=imgWidth*ratio;const h=imgHeight*ratio;const x=(pageWidth-w)/2;const y=(pageHeight-h)/2;doc.addImage(resumeImg,'JPEG',x,y,w,h);}else{doc.addImage(resumeImg,'JPEG',0,0,pageWidth,pageHeight);}
for(let file of attachments){const imgData=await fileToDataURL(file);const img=new Image();img.src=imgData;await new Promise(resolve=>{img.onload=()=>{const ratio=Math.min(pageWidth/img.width,pageHeight/img.height);const w=img.width*ratio;const h=img.height*ratio;const x=(pageWidth-w)/2;const y=(pageHeight-h)/2;doc.addImage(img,'JPEG',x,y,w,h);resolve();}});}
doc.save('Resume_Complete.pdf');});
document.querySelectorAll('.mic').forEach(btn=>btn.addEventListener('click',()=>{const target=document.getElementById(btn.dataset.target);const recognition=new(window.SpeechRecognition||window.webkitSpeechRecognition)();recognition.lang='en-US';recognition.start();recognition.onresult=e=>{target.value=e.results[0][0].transcript;updatePreview();};}));
updatePreview();
