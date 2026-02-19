/**
 * MedWise — Progress Tracker
 * Uses localStorage to persist user progress until a real database is connected.
 * Tracks: quiz attempts, content viewed (videos/articles/guides), milestones.
 */

const MedWiseProgress = (() => {
  const STORAGE_KEY_PREFIX = 'medwise_progress_';
  const AUTH_KEY = 'medwise_auth';

  function getStorageKey() {
    const userId = localStorage.getItem('medwise_user_db_id') || localStorage.getItem('medwise_user_email') || 'guest';
    return STORAGE_KEY_PREFIX + userId;
  }

  const DEFAULT_DATA = {
    quizzes: [],
    content: {},
    milestones: {
      first_quiz: false,
      perfect_score: false,
      three_quizzes: false,
      five_quizzes: false,
      first_video: false,
      all_videos: false,
      first_article: false,
      all_articles: false,
      first_guide: false,
      content_explorer: false,
      streak_3: false,
      streak_7: false
    },
    streakDays: [],
    lastVisit: null
  };

  const CONTENT_LIBRARY = [
    { id: 'vid-ai-fake', title: 'How AI Generates Fake Medical Articles', type: 'video', duration: '8:24' },
    { id: 'art-red-flags', title: '5 Red Flags in Online Health Advice', type: 'article', duration: '7 min read' },
    { id: 'vid-checking-sources', title: 'Checking Sources: A Beginner\'s Guide', type: 'video', duration: '12:05' },
    { id: 'guide-sift', title: 'The SIFT Method for Evaluating Claims', type: 'guide', duration: '10 min read' },
    { id: 'info-anatomy', title: 'Anatomy of a Misleading Health Post', type: 'infographic', duration: '3 min read' },
    { id: 'vid-psychology', title: 'Why We Fall for Health Misinformation', type: 'video', duration: '15:30' },
    { id: 'art-trusted-sources', title: 'Trusted vs. Untrusted Medical Sources', type: 'article', duration: '8 min read' },
    { id: 'guide-family', title: 'How to Talk to Family About Health Myths', type: 'guide', duration: '6 min read' },
    { id: 'vid-clinical-trials', title: 'Understanding Clinical Trial Results', type: 'video', duration: '6:45' }
  ];

  const MILESTONE_DEFS = [
    { id: 'first_quiz', label: 'First Steps', desc: 'Complete your first quiz', icon: 'star' },
    { id: 'perfect_score', label: 'Perfect Score', desc: 'Score 10/10 on a quiz', icon: 'trophy' },
    { id: 'three_quizzes', label: 'Quiz Enthusiast', desc: 'Complete 3 quizzes', icon: 'fire' },
    { id: 'five_quizzes', label: 'Quiz Master', desc: 'Complete 5 quizzes', icon: 'crown' },
    { id: 'first_video', label: 'First Watch', desc: 'Watch your first video', icon: 'play' },
    { id: 'all_videos', label: 'Binge Learner', desc: 'Watch all videos', icon: 'video' },
    { id: 'first_article', label: 'Avid Reader', desc: 'Read your first article', icon: 'book' },
    { id: 'all_articles', label: 'Knowledge Seeker', desc: 'Read all articles and guides', icon: 'books' },
    { id: 'first_guide', label: 'Guided Path', desc: 'Complete your first guide', icon: 'compass' },
    { id: 'content_explorer', label: 'Content Explorer', desc: 'View at least 5 different pieces of content', icon: 'explore' },
    { id: 'streak_3', label: 'Consistent Learner', desc: 'Visit 3 days in a row', icon: 'calendar' },
    { id: 'streak_7', label: 'Weekly Warrior', desc: 'Visit 7 days in a row', icon: 'flame' }
  ];

  function load() {
    try {
      const key = getStorageKey();
      const raw = localStorage.getItem(key);
      if (!raw) return { ...DEFAULT_DATA, content: {}, milestones: { ...DEFAULT_DATA.milestones } };
      const data = JSON.parse(raw);
      return {
        ...DEFAULT_DATA,
        ...data,
        milestones: { ...DEFAULT_DATA.milestones, ...(data.milestones || {}) }
      };
    } catch {
      return { ...DEFAULT_DATA, content: {}, milestones: { ...DEFAULT_DATA.milestones } };
    }
  }

  function save(data) {
    localStorage.setItem(getStorageKey(), JSON.stringify(data));
  }

  function isLoggedIn() {
    return localStorage.getItem(AUTH_KEY) === 'true';
  }

  function login(name, email) {
    localStorage.setItem(AUTH_KEY, 'true');
    localStorage.setItem('medwise_user_name', name || 'User');
    localStorage.setItem('medwise_user_email', email || '');
    // Clean up old shared progress key from before per-user storage
    localStorage.removeItem('medwise_progress');
    trackStreak();
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem('medwise_user_name');
    localStorage.removeItem('medwise_user_email');
    localStorage.removeItem('medwise_user_db_id');
  }

  function getUserName() {
    return localStorage.getItem('medwise_user_name') || 'User';
  }

  function getUserEmail() {
    return localStorage.getItem('medwise_user_email') || '';
  }

  function getUserInitials() {
    const name = getUserName();
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  }

  function trackStreak() {
    const data = load();
    const today = new Date().toISOString().split('T')[0];
    if (!data.streakDays.includes(today)) {
      data.streakDays.push(today);
    }
    data.lastVisit = today;
    checkMilestones(data);
    save(data);
  }

  function getStreakCount() {
    const data = load();
    const days = data.streakDays.sort().reverse();
    if (!days.length) return 0;

    let streak = 1;
    const today = new Date();
    const lastDay = new Date(days[0]);
    const diffToday = Math.floor((today - lastDay) / 86400000);
    if (diffToday > 1) return 0;

    for (let i = 0; i < days.length - 1; i++) {
      const curr = new Date(days[i]);
      const prev = new Date(days[i + 1]);
      const diff = Math.floor((curr - prev) / 86400000);
      if (diff === 1) streak++;
      else break;
    }
    return streak;
  }

  function saveQuizResult(score, total, answers) {
    const data = load();
    const result = {
      id: 'quiz-' + Date.now(),
      date: new Date().toISOString(),
      score,
      total,
      percentage: Math.round((score / total) * 100),
      answers
    };
    data.quizzes.push(result);
    checkMilestones(data);
    save(data);
    return result;
  }

  function getQuizHistory() {
    return load().quizzes.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  function getQuizStats() {
    const quizzes = load().quizzes;
    if (!quizzes.length) return { count: 0, avgScore: 0, bestScore: 0 };
    const scores = quizzes.map(q => q.percentage);
    return {
      count: quizzes.length,
      avgScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      bestScore: Math.max(...scores)
    };
  }

  function markContentViewed(contentId) {
    const data = load();
    if (!data.content[contentId]) {
      data.content[contentId] = { viewedAt: new Date().toISOString(), completed: true };
    }
    checkMilestones(data);
    save(data);
  }

  function unmarkContentViewed(contentId) {
    const data = load();
    delete data.content[contentId];
    save(data);
  }

  function isContentViewed(contentId) {
    const data = load();
    return !!data.content[contentId];
  }

  function getContentStats() {
    const data = load();
    const viewed = Object.keys(data.content);
    const videos = CONTENT_LIBRARY.filter(c => c.type === 'video');
    const articles = CONTENT_LIBRARY.filter(c => c.type === 'article');
    const guides = CONTENT_LIBRARY.filter(c => c.type === 'guide');
    const infographics = CONTENT_LIBRARY.filter(c => c.type === 'infographic');

    return {
      totalViewed: viewed.length,
      totalContent: CONTENT_LIBRARY.length,
      videosWatched: videos.filter(v => viewed.includes(v.id)).length,
      videosTotal: videos.length,
      articlesRead: articles.filter(a => viewed.includes(a.id)).length,
      articlesTotal: articles.length,
      guidesCompleted: guides.filter(g => viewed.includes(g.id)).length,
      guidesTotal: guides.length,
      infographicsViewed: infographics.filter(i => viewed.includes(i.id)).length,
      infographicsTotal: infographics.length
    };
  }

  function getContentLibrary() {
    const data = load();
    return CONTENT_LIBRARY.map(item => ({
      ...item,
      completed: !!data.content[item.id],
      viewedAt: data.content[item.id]?.viewedAt || null
    }));
  }

  function checkMilestones(data) {
    const quizCount = data.quizzes.length;
    const viewedIds = Object.keys(data.content);
    const videos = CONTENT_LIBRARY.filter(c => c.type === 'video');
    const articles = CONTENT_LIBRARY.filter(c => c.type === 'article' || c.type === 'guide');
    const streak = getStreakCount();

    if (quizCount >= 1) data.milestones.first_quiz = true;
    if (data.quizzes.some(q => q.score === q.total)) data.milestones.perfect_score = true;
    if (quizCount >= 3) data.milestones.three_quizzes = true;
    if (quizCount >= 5) data.milestones.five_quizzes = true;
    if (videos.some(v => viewedIds.includes(v.id))) data.milestones.first_video = true;
    if (videos.every(v => viewedIds.includes(v.id))) data.milestones.all_videos = true;
    const arts = CONTENT_LIBRARY.filter(c => c.type === 'article');
    if (arts.some(a => viewedIds.includes(a.id))) data.milestones.first_article = true;
    if (articles.every(a => viewedIds.includes(a.id))) data.milestones.all_articles = true;
    const guides = CONTENT_LIBRARY.filter(c => c.type === 'guide');
    if (guides.some(g => viewedIds.includes(g.id))) data.milestones.first_guide = true;
    if (viewedIds.length >= 5) data.milestones.content_explorer = true;
    if (streak >= 3) data.milestones.streak_3 = true;
    if (streak >= 7) data.milestones.streak_7 = true;
  }

  function getMilestones() {
    const data = load();
    return MILESTONE_DEFS.map(m => ({
      ...m,
      earned: !!data.milestones[m.id]
    }));
  }

  function getMilestoneStats() {
    const milestones = getMilestones();
    return {
      earned: milestones.filter(m => m.earned).length,
      total: milestones.length
    };
  }

  function getOverallProgress() {
    const quiz = getQuizStats();
    const content = getContentStats();
    const milestone = getMilestoneStats();
    const totalItems = 10 + content.totalContent + milestone.total;
    const completedItems = Math.min(quiz.count, 10) + content.totalViewed + milestone.earned;
    return Math.round((completedItems / totalItems) * 100);
  }

  function resetAll() {
    localStorage.removeItem(getStorageKey());
  }

  return {
    isLoggedIn, login, logout, getUserName, getUserEmail, getUserInitials,
    trackStreak, getStreakCount,
    saveQuizResult, getQuizHistory, getQuizStats,
    markContentViewed, unmarkContentViewed, isContentViewed, getContentStats, getContentLibrary,
    getMilestones, getMilestoneStats, getOverallProgress,
    CONTENT_LIBRARY, resetAll
  };
})();
