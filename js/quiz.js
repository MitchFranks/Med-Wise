const quizQuestions = [
  {
    question: "Is this claim credible?",
    context: "\"A new study published in the Journal of Natural Medicine found that drinking lemon water every morning cures Type 2 diabetes within 30 days.\"",
    options: [
      { text: "Yes, it sounds credible", correct: false },
      { text: "No, this is misleading", correct: true }
    ],
    feedbackCorrect: "Correct! Claims of a simple \"cure\" for complex chronic diseases like diabetes are a major red flag. Legitimate medical studies use cautious language and don't promise cures from single foods.",
    feedbackIncorrect: "Not quite. This claim uses a classic misinformation pattern — promising a simple cure for a complex disease. Real medical research never claims a food \"cures\" a chronic condition in a fixed timeframe."
  },
  {
    question: "Would you trust this health advice?",
    context: "\"According to the CDC, adults should get the updated flu vaccine each year, ideally before flu season begins in the fall. The vaccine is widely available at pharmacies and doctor's offices.\"",
    options: [
      { text: "Yes, this is trustworthy", correct: true },
      { text: "No, this is misleading", correct: false }
    ],
    feedbackCorrect: "Correct! This information comes from a recognized health authority (CDC), uses moderate language, and provides practical guidance.",
    feedbackIncorrect: "Actually, this is credible information. It references a known health authority (CDC), doesn't make exaggerated claims, and aligns with established medical guidelines."
  },
  {
    question: "Does this article seem reliable?",
    context: "\"BREAKING: Doctors don't want you to know this one trick! A controversial herb has been PROVEN to reverse heart disease completely. Big Pharma is trying to suppress this information. Click here for the shocking truth!\"",
    options: [
      { text: "Yes, it could be true", correct: false },
      { text: "No, this is likely misinformation", correct: true }
    ],
    feedbackCorrect: "Correct! This uses multiple misinformation red flags: sensational language, conspiracy framing, absolute claims, and clickbait tactics.",
    feedbackIncorrect: "This is full of red flags: sensational language, conspiracy framing (\"Big Pharma\"), absolute claims, and clickbait. Reliable health information doesn't use these manipulative tactics."
  },
  {
    question: "Is this medical claim accurate?",
    context: "\"A peer-reviewed study in The Lancet involving 15,000 participants found that regular moderate exercise (150 minutes per week) is associated with a 30% reduced risk of cardiovascular events. Researchers note that more studies are needed.\"",
    options: [
      { text: "Yes, this appears credible", correct: true },
      { text: "No, this seems misleading", correct: false }
    ],
    feedbackCorrect: "Correct! This has hallmarks of credible medical reporting: it cites a respected journal, mentions study size, uses cautious language, and acknowledges limitations.",
    feedbackIncorrect: "This actually appears credible. It references a reputable journal, includes sample size, uses cautious language, and acknowledges the need for further research."
  },
  {
    question: "Should you share this post?",
    context: "\"My cousin's friend took this supplement and her cancer disappeared in two weeks!! No chemo needed!! The medical industry doesn't want people to know about this. Share before they delete this post!!!\"",
    options: [
      { text: "Yes, people should know about this", correct: false },
      { text: "No, I would not share this", correct: true }
    ],
    feedbackCorrect: "Correct! This post relies on anecdotal evidence, makes extraordinary claims about cancer treatment, uses urgency tactics, and promotes conspiracy thinking.",
    feedbackIncorrect: "This post contains major red flags: personal anecdotes instead of evidence, miraculous cure claims, conspiracy thinking, and urgency tactics."
  },
  {
    question: "Is this health information trustworthy?",
    context: "\"The World Health Organization recommends that children aged 6 months to 5 years in malaria-endemic regions receive the RTS,S malaria vaccine. The recommendation is based on results from an ongoing pilot program in Ghana, Kenya, and Malawi.\"",
    options: [
      { text: "Yes, this is trustworthy", correct: true },
      { text: "No, this is misleading", correct: false }
    ],
    feedbackCorrect: "Correct! This references a specific, reputable organization (WHO), provides concrete details, and uses measured, factual language.",
    feedbackIncorrect: "This is actually trustworthy. It cites the WHO, includes specific details, references real pilot programs, and uses factual language."
  },
  {
    question: "Can you spot the problem with this claim?",
    context: "\"New research proves that 5G cell towers cause COVID-19 symptoms. Scientists at an unnamed research facility have confirmed the link. Multiple countries are now considering banning 5G technology.\"",
    options: [
      { text: "This seems like valid research", correct: false },
      { text: "This is misinformation", correct: true }
    ],
    feedbackCorrect: "Correct! This claim has major credibility issues: a debunked conspiracy theory, an \"unnamed\" facility, the word \"proves\" (real science is more cautious), and unverified claims.",
    feedbackIncorrect: "This is misinformation. Red flags include: an unnamed research facility, the word \"proves\", a debunked conspiracy theory linking 5G to COVID-19, and unverified claims."
  },
  {
    question: "Is this social media health tip reliable?",
    context: "\"Reminder: If you're feeling stressed, try some deep breathing exercises. Research published in Frontiers in Psychology shows that diaphragmatic breathing can help reduce cortisol levels. It's not a replacement for professional help, but it's a good self-care tool.\"",
    options: [
      { text: "Yes, this is reliable", correct: true },
      { text: "No, this is misleading", correct: false }
    ],
    feedbackCorrect: "Correct! This tip is balanced and responsible. It cites a real journal, makes a modest claim, and notes it's \"not a replacement for professional help.\"",
    feedbackIncorrect: "This is actually reliable. It references a real academic journal, makes a reasonable claim, and includes an important disclaimer about professional help."
  },
  {
    question: "Would a doctor recommend this?",
    context: "\"Detox tea companies claim their products remove toxins from your body, promote weight loss, and boost your immune system overnight. Many influencers promote these products with personal testimonials and discount codes.\"",
    options: [
      { text: "Yes, detox products are doctor-recommended", correct: false },
      { text: "No, these claims are not evidence-based", correct: true }
    ],
    feedbackCorrect: "Correct! \"Detox\" products are a well-known category of health misinformation. Your liver and kidneys already detoxify your body. Influencer endorsements are marketing, not medical advice.",
    feedbackIncorrect: "These claims are not evidence-based. Medical professionals generally don't recommend \"detox\" products. Influencer testimonials are paid marketing, not medical evidence."
  },
  {
    question: "Is this headline trustworthy?",
    context: "\"Harvard Medical School: 'Getting enough sleep is one of the most important things you can do for your health.' Research consistently links 7-9 hours of sleep per night with reduced risks of heart disease, obesity, and cognitive decline.\"",
    options: [
      { text: "Yes, this is trustworthy", correct: true },
      { text: "No, this is exaggerated", correct: false }
    ],
    feedbackCorrect: "Correct! This cites a highly reputable institution, makes well-established claims, and uses appropriate language (\"reduced risks\" rather than \"prevents\" or \"cures\").",
    feedbackIncorrect: "This is actually trustworthy. Harvard Medical School is a highly credible source, the sleep recommendations align with medical consensus, and the language is appropriately measured."
  }
];

let currentQuestion = 0;
let userAnswers = [];
let answerSubmitted = false;

function startQuiz() {
  currentQuestion = 0;
  userAnswers = [];
  answerSubmitted = false;
  document.getElementById('quizIntro').style.display = 'none';
  document.getElementById('quizActive').style.display = 'block';
  document.getElementById('quizResults').style.display = 'none';
  renderQuestion();
}

function renderQuestion() {
  const q = quizQuestions[currentQuestion];
  answerSubmitted = false;

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  document.getElementById('progressText').textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
  document.getElementById('progressPercent').textContent = `${Math.round(progress)}%`;
  document.getElementById('progressFill').style.width = `${progress}%`;

  document.getElementById('questionLabel').innerHTML = `<svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/></svg> Question ${currentQuestion + 1}`;
  document.getElementById('questionText').textContent = q.question;
  document.getElementById('questionContext').textContent = q.context;

  const optionsContainer = document.getElementById('quizOptions');
  optionsContainer.innerHTML = q.options.map((opt, idx) => `
    <button class="quiz-option" onclick="selectAnswer(${idx})" aria-label="${opt.text}">
      <div class="quiz-option-icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="display:none;" class="check-icon"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/></svg>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="display:none;" class="x-icon"><path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"/></svg>
      </div>
      <span>${opt.text}</span>
    </button>
  `).join('');

  const feedback = document.getElementById('quizFeedback');
  feedback.classList.remove('show', 'correct', 'incorrect');
  feedback.style.display = 'none';

  document.getElementById('nextBtn').style.display = 'none';
  document.getElementById('prevBtn').style.visibility = currentQuestion > 0 ? 'visible' : 'hidden';

  const card = document.getElementById('questionCard');
  card.style.animation = 'none';
  card.offsetHeight;
  card.style.animation = 'fadeIn 0.4s ease';
}

function selectAnswer(selectedIdx) {
  if (answerSubmitted) return;
  answerSubmitted = true;

  const q = quizQuestions[currentQuestion];
  const isCorrect = q.options[selectedIdx].correct;
  userAnswers[currentQuestion] = { selectedIdx, isCorrect };

  const options = document.querySelectorAll('.quiz-option');
  options.forEach((opt, idx) => {
    opt.style.pointerEvents = 'none';
    if (idx === selectedIdx) {
      opt.classList.add(isCorrect ? 'correct' : 'incorrect');
      const icon = isCorrect ? opt.querySelector('.check-icon') : opt.querySelector('.x-icon');
      if (icon) icon.style.display = 'block';
    }
    if (q.options[idx].correct && !isCorrect) {
      opt.classList.add('correct');
      const checkIcon = opt.querySelector('.check-icon');
      if (checkIcon) checkIcon.style.display = 'block';
    }
  });

  const feedback = document.getElementById('quizFeedback');
  feedback.style.display = '';
  feedback.className = 'quiz-feedback show ' + (isCorrect ? 'correct' : 'incorrect');

  const feedbackIcon = document.getElementById('feedbackIcon');
  feedbackIcon.innerHTML = isCorrect
    ? '<path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>'
    : '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>';

  document.getElementById('feedbackTitle').textContent = isCorrect ? 'Correct!' : 'Not Quite';
  document.getElementById('feedbackText').textContent = isCorrect ? q.feedbackCorrect : q.feedbackIncorrect;

  const nextBtn = document.getElementById('nextBtn');
  nextBtn.style.display = '';
  const isLast = currentQuestion === quizQuestions.length - 1;
  nextBtn.innerHTML = isLast
    ? 'See Results <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>'
    : 'Next Question <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>';
}

function nextQuestion() {
  if (currentQuestion < quizQuestions.length - 1) { currentQuestion++; renderQuestion(); }
  else showResults();
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
    if (userAnswers[currentQuestion]) selectAnswer(userAnswers[currentQuestion].selectedIdx);
  }
}

function showResults() {
  document.getElementById('quizActive').style.display = 'none';
  document.getElementById('quizResults').style.display = 'block';

  const correctCount = userAnswers.filter(a => a && a.isCorrect).length;
  const total = quizQuestions.length;
  const percentage = Math.round((correctCount / total) * 100);

  document.getElementById('scoreText').textContent = `${correctCount} / ${total}`;

  let message = '';
  if (percentage >= 90) message = "Excellent! You're a misinformation detection expert!";
  else if (percentage >= 70) message = "Great job! You have strong skills in spotting misinformation.";
  else if (percentage >= 50) message = "Good effort! Check out our learning modules to improve further.";
  else message = "Thanks for taking the quiz! Our content library can help you learn more.";
  document.getElementById('resultsMessage').textContent = message;

  if (typeof MedWiseProgress !== 'undefined' && MedWiseProgress.isLoggedIn()) {
    MedWiseProgress.saveQuizResult(correctCount, total, userAnswers.map((a, i) => ({
      question: quizQuestions[i].question,
      correct: !!(a && a.isCorrect)
    })));
  }

  const breakdown = document.getElementById('resultsBreakdown');
  breakdown.innerHTML = `<div style="display:flex;flex-direction:column;gap:var(--space-3);margin-top:var(--space-6);">${quizQuestions.map((q, idx) => {
    const answer = userAnswers[idx];
    const isCorrect = answer && answer.isCorrect;
    return `<div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3) var(--space-4);background:${isCorrect ? 'var(--color-success-light)' : 'var(--color-error-light)'};border-radius:var(--radius-md);"><svg width="18" height="18" viewBox="0 0 20 20" fill="${isCorrect ? 'var(--color-success)' : 'var(--color-error)'}">${isCorrect ? '<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>' : '<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>'}</svg><span style="font-size:var(--text-sm);font-weight:500;">Q${idx + 1}: ${q.question}</span></div>`;
  }).join('')}</div>`;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function restartQuiz() {
  currentQuestion = 0;
  userAnswers = [];
  answerSubmitted = false;
  document.getElementById('quizResults').style.display = 'none';
  document.getElementById('quizActive').style.display = 'block';
  renderQuestion();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
