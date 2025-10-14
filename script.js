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

function getFormData() {
  return {
    fullName: document.getElementById('fullName').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    linkedin: document.getElementById('linkedin').value,
    location: document.getElementById('location').value,
    summary: document.getElementById('summary').value,
    company1: document.getElementById('company1').value,
    jobTitle1: document.getElementById('jobTitle1').value,
    duration1: document.getElementById('duration1').value,
    experience1: document.getElementById('experience1').value,
    degree1: document.getElementById('degree1').value,
    eduInstitution1: document.getElementById('eduInstitution1').value,
    graduation1: document.getElementById('graduation1').value,
    techSkills: document.getElementById('techSkills').value,
    softSkills: document.getElementById('softSkills').value,
    projects: document.getElementById('projects').value,
    languages: document.getElementById('languages').value,
    photo: document.getElementById('photo').files[0]
  };
}

function generateAISuggestions(data) {
  const suggestions = [];
  suggestions.push({ text: 'Ensure your resume highlights your career achievements and key skills.', type: 'ok' });
  suggestions.push({ text: 'Check that contact info is complete and professional.', type: 'ok' });
  suggestions.push({ text: 'Include a strong summary to capture attention.', type: 'ok' });
  suggestions.push({ text: 'List technical and soft skills relevant to your career.', type: 'ok' });
  suggestions.push({ text: 'Include projects, certifications, and awards to strengthen your resume.', type: 'ok' });

  if (!data.summary) suggestions.push({ text: 'Enhance summary with key achievements & metrics', type: 'weak' });
  if (!data.experience1) suggestions.push({ text: 'Add detailed professional experience with 3–5 bullet points per role', type: 'weak' });
  if (!data.techSkills) suggestions.push({ text: 'Include all relevant technical skills', type: 'ok' });
  if (!data.projects) suggestions.push({ text: 'Add projects with outcome & technologies used', type: 'ok' });
  if (!data.softSkills) suggestions.push({ text: 'Highlight key soft skills', type: 'ok' });

  aiSuggestions.innerHTML = '';
  suggestions.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = `suggestion ${s.type}`;
    div.innerHTML = `<span data-idx="${i}">${s.text}</span><button onclick="applySuggestion(${i})">Apply</button>`;
    aiSuggestions.appendChild(div);
  });
}

function applySuggestion(idx) {
  const map = [
    { key: 'summary', text: 'Experienced professional in X,Y,Z delivering measurable results.' },
    { key: 'experience1', text: '- Achievement 1\n- Achievement 2\n- Achievement 3' },
    { key: 'techSkills', text: 'JavaScript, Python, React, Node.js' },
    { key: 'projects', text: 'Project A – Outcome | Project B – Outcome' },
    { key: 'softSkills', text: 'Leadership, Communication, Teamwork' }
  ];
  const s = map[idx];
  if (!s) return;
  if (s.key === 'summary') document.getElementById('summary').value = s.text;
  if (s.key === 'experience1') document.getElementById('experience1').value = s.text;
  if (s.key === 'techSkills') document.getElementById('techSkills').value = s.text;
  if (s.key === 'projects') document.getElementById('projects').value = s.text;
  if (s.key === 'softSkills') document.getElementById('softSkills').value = s.text;
  updatePreview();
}

// 🔹 Automatic Scaling Function
function applyAutoScaling() {
  const container = preview.querySelector('.resume');
  if (!container) return;
  container.style.transform = 'scale(1)';
  container.style.transformOrigin = 'top left';

  const contentHeight = container.scrollHeight;
  const a4HeightPx = 1123;

  if (contentHeight > a4HeightPx) {
    const scaleFactor = a4HeightPx / contentHeight;
    container.style.transform = `scale(${scaleFactor})`;
  }
}

function updatePreview() {
  const data = getFormData();
  let html = `<div class="resume ${currentTemplate}">`;
  if (data.photo) html += `<img src="${URL.createObjectURL(data.photo)}">`;
  html += `<h1>${data.fullName || 'Your Name'}</h1>`;
  html += `<p><strong>Phone:</strong> ${data.phone || 'N/A'} | <strong>Email:</strong> ${data.email || 'N/A'} | <strong>LinkedIn:</strong> ${data.linkedin || 'N/A'}</p>`;
  html += `<p><strong>Location:</strong> ${data.location || 'N/A'}</p>`;
  html += `<h3>Summary</h3><p>${data.summary || 'Add your career summary highlighting achievements and skills.'}</p>`;
  html += `<h3>Professional Experience</h3><p>${data.jobTitle1 ? `${data.jobTitle1} at ${data.company1} (${data.duration1})` : 'Add your work experience here.'}</p>`;
  html += `<p>${data.experience1}</p>`;
  html += `<h3>Education</h3><p>${data.degree1} at ${data.eduInstitution1} (${data.graduation1})</p>`;
  html += `<h3>Technical Skills</h3><p>${data.techSkills}</p>`;
  html += `<h3>Soft Skills</h3><p>${data.softSkills}</p>`;
  html += `<h3>Projects</h3><p>${data.projects}</p>`;
  html += `<h3>Languages</h3><p>${data.languages}</p>`;
  html += `</div>`;
  preview.innerHTML = html;
  generateAISuggestions(data);
  applyAutoScaling();
}

document.querySelectorAll('.template-thumb').forEach(btn => btn.addEventListener('click', () => {
  currentTemplate = btn.dataset.template;
  updatePreview();
}));

attachmentsInput.addEventListener('change', e => { attachments = Array.from(e.target.files); });
form.querySelectorAll('input,textarea').forEach(el => el.addEventListener('input', updatePreview));
generateBtn.addEventListener('click', updatePreview);
applyAllBtn.addEventListener('click', () => { [0, 1, 2, 3, 4].forEach(i => applySuggestion(i)); updatePreview(); });
readAloudBtn.addEventListener('click', () => {
  const text = preview.querySelector('.resume').innerText;
  const utter = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utter);
});

function fileToDataURL(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

// ✅ Smart PDF scaling — desktop = exact preview, mobile = auto fit
downloadBtn.addEventListener('click', async () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'pt', 'a4');
  const element = preview.querySelector('.resume');

  const isMobile = window.innerWidth <= 768;

  // For desktop, don't apply auto scaling — exact preview
  if (isMobile) applyAutoScaling();

  // 1️⃣ Capture resume page
  const resumeCanvas = await html2canvas(element, {
    scale: isMobile ? 3 : 2,
    useCORS: true
  });
  const resumeImg = resumeCanvas.toDataURL('image/jpeg', 1.0);
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  if (isMobile) {
    const imgWidth = resumeCanvas.width;
    const imgHeight = resumeCanvas.height;
    const ratio = Math.min((pageWidth - 20) / imgWidth, (pageHeight - 20) / imgHeight);
    const w = imgWidth * ratio;
    const h = imgHeight * ratio;
    const x = (pageWidth - w) / 2;
    const y = (pageHeight - h) / 2;
    doc.addImage(resumeImg, 'JPEG', x, y, w, h);
  } else {
    doc.addImage(resumeImg, 'JPEG', 0, 0, pageWidth, pageHeight);
  }

  // 2️⃣ Append attachments as additional pages
  for (let file of attachments) {
    const imgData = await fileToDataURL(file);
    const img = new Image();
    img.src = imgData;
    await new Promise(resolve => {
      img.onload = () => {
        doc.addPage();
        const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
        const w = img.width * ratio;
        const h = img.height * ratio;
        const x = (pageWidth - w) / 2;
        const y = (pageHeight - h) / 2;
        doc.addImage(img, 'JPEG', x, y, w, h);
        resolve();
      };
    });
  }

  doc.save('Resume_Complete.pdf');
});

document.querySelectorAll('.mic').forEach(btn => btn.addEventListener('click', () => {
  const target = document.getElementById(btn.dataset.target);
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();
  recognition.onresult = e => {
    target.value = e.results[0][0].transcript;
    updatePreview();
  };
}));

updatePreview();
