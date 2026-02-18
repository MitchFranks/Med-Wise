-- ============================================
--  MedWise — Seed Data
--  Run AFTER schema.sql:  psql -U postgres -d medwise -f seed.sql
-- ============================================

-- ============================================
-- Users  (password_hash is bcrypt of "password123")
-- ============================================
-- All sample users have password: password123
INSERT INTO users (first_name, last_name, email, password_hash) VALUES
('Jane',  'Doe',     'jane.doe@example.com',     '$2b$10$GDzHTo6wcpquhWiTlCOaCe3WxoKIO/HwTz86UQiGwvTsMjg7Dm43W'),
('John',  'Smith',   'john.smith@example.com',   '$2b$10$GDzHTo6wcpquhWiTlCOaCe3WxoKIO/HwTz86UQiGwvTsMjg7Dm43W'),
('Maria', 'Garcia',  'maria.garcia@example.com', '$2b$10$GDzHTo6wcpquhWiTlCOaCe3WxoKIO/HwTz86UQiGwvTsMjg7Dm43W');

-- ============================================
-- Content — all 9 items from the learning library
-- ============================================
INSERT INTO content (id, title, description, type, duration) VALUES
('vid-ai-fake',         'How AI Generates Fake Medical Articles',
 'Discover the techniques AI uses to create convincing but false medical content and how to recognize it.',
 'video', '8:24'),
('art-red-flags',       '5 Red Flags in Online Health Advice',
 'Learn the most common warning signs that a health article or social media post may be misleading.',
 'article', '7 min read'),
('vid-checking-sources','Checking Sources: A Beginner''s Guide',
 'A step-by-step walkthrough on how to verify the credibility of medical information you find online.',
 'video', '12:05'),
('guide-sift',          'The SIFT Method for Evaluating Claims',
 'Master the Stop, Investigate, Find, Trace method used by fact-checkers around the world.',
 'guide', '10 min read'),
('info-anatomy',        'Anatomy of a Misleading Health Post',
 'A visual breakdown of the elements that make health misinformation look credible at first glance.',
 'infographic', '3 min read'),
('vid-psychology',      'Why We Fall for Health Misinformation',
 'Explore the psychological biases and emotional triggers that make us vulnerable to false health claims.',
 'video', '15:30'),
('art-trusted-sources', 'Trusted vs. Untrusted Medical Sources',
 'Learn how to distinguish between reliable medical databases and questionable health websites.',
 'article', '8 min read'),
('guide-family',        'How to Talk to Family About Health Myths',
 'Practical strategies for having productive conversations with loved ones who believe health misinformation.',
 'guide', '6 min read'),
('vid-clinical-trials', 'Understanding Clinical Trial Results',
 'Learn how to read and interpret clinical trial findings so you can evaluate medical claims with confidence.',
 'video', '6:45');

-- ============================================
-- Quizzes
-- ============================================
INSERT INTO quizzes (title, description) VALUES
('Spotting Medical Misinformation',
 'Test your ability to identify misleading health claims, AI-generated content, and unreliable sources.'),
('AI-Generated Content Detection',
 'Can you tell the difference between real medical articles and AI-generated fakes?'),
('Source Evaluation Challenge',
 'Evaluate whether health information sources are trustworthy or misleading.');

-- ============================================
-- Quiz Questions — 10 questions for Quiz 1
-- ============================================
INSERT INTO quiz_questions (quiz_id, question_text, correct_answer, explanation, sort_order) VALUES
(1, 'A health article claims a common spice can "cure" diabetes with no side effects. Is this likely misinformation?',
    'Yes', 'Claims of miracle cures with no side effects are a classic red flag for medical misinformation.', 1),
(1, 'An article about a new treatment links to a peer-reviewed journal study. Does this make it automatically reliable?',
    'No', 'While linking to peer-reviewed studies is positive, the article may misinterpret or exaggerate the findings.', 2),
(1, 'A viral social media post shows a doctor recommending a supplement. Is a doctor''s endorsement enough to trust a claim?',
    'No', 'Individual doctor endorsements, especially on social media, don''t replace scientific consensus.', 3),
(1, 'A news article about vaccine risks uses emotional language and personal anecdotes instead of data. Is this a red flag?',
    'Yes', 'Reliance on emotional language over data is a common tactic in health misinformation.', 4),
(1, 'A health blog post has no author name, no publication date, and no references. Should you be skeptical?',
    'Yes', 'Missing authorship, dates, and references are major credibility red flags.', 5),
(1, 'A clinical study with 15 participants reports "groundbreaking" results. Is the sample size a concern?',
    'Yes', 'Very small sample sizes make results less reliable and harder to generalize.', 6),
(1, 'A well-known medical organization (like WHO or CDC) publishes health guidelines. Are these generally trustworthy?',
    'Yes', 'Major health organizations use rigorous review processes, making their guidelines generally reliable.', 7),
(1, 'An AI-generated medical article often lacks specific author credentials and institutional affiliations. True or false?',
    'Yes', 'AI-generated content typically cannot provide verifiable author credentials or real affiliations.', 8),
(1, 'If multiple independent, reputable sources confirm a health claim, is it more likely to be accurate?',
    'Yes', 'Corroboration across independent, reputable sources is a strong indicator of accuracy.', 9),
(1, 'A health product website shows only 5-star testimonials and no negative reviews. Is this suspicious?',
    'Yes', 'Showing only positive testimonials without balanced reviews is a common marketing manipulation.', 10);

-- Quiz 2 questions
INSERT INTO quiz_questions (quiz_id, question_text, correct_answer, explanation, sort_order) VALUES
(2, 'AI-generated text often uses unusually smooth and generic language. Is this a tell-tale sign?',
    'Yes', 'AI text tends to be polished but generic, lacking the specific expertise of human-written medical content.', 1),
(2, 'An article references a study from "The Journal of Advanced Medical Research" which you cannot find online. Suspicious?',
    'Yes', 'AI can fabricate journal names and citations that sound legitimate but don''t exist.', 2),
(2, 'A medical blog post contains very specific patient case details and hospital names. Is this less likely to be AI-generated?',
    'Yes', 'Specific, verifiable details are harder for AI to fabricate and suggest human authorship.', 3),
(2, 'AI-generated articles never contain factual medical information.',
    'No', 'AI can mix accurate information with fabricated details, making it harder to detect.', 4),
(2, 'Reverse image searching a medical infographic can help determine if it is AI-generated.',
    'Yes', 'Reverse image search can reveal whether images have been manipulated or generated artificially.', 5);

-- Quiz 3 questions
INSERT INTO quiz_questions (quiz_id, question_text, correct_answer, explanation, sort_order) VALUES
(3, 'A .gov or .edu website domain generally indicates a more reliable source for health information.',
    'Yes', 'Government and educational domains have editorial standards, though individual pages should still be evaluated.', 1),
(3, 'Wikipedia is a reliable primary source for medical decisions.',
    'No', 'Wikipedia is a good starting point but is user-edited and should not be a primary source for medical decisions.', 2),
(3, 'Checking the "About" page of a health website can help assess its credibility.',
    'Yes', 'The About page reveals the organization''s mission, funding sources, and editorial standards.', 3),
(3, 'A health website that sells supplements while providing health advice has a potential conflict of interest.',
    'Yes', 'Financial incentives to sell products create bias that can compromise the objectivity of health advice.', 4),
(3, 'Peer-reviewed research is the gold standard for evaluating medical claims.',
    'Yes', 'Peer review means other experts have evaluated the methodology and conclusions before publication.', 5);

-- ============================================
-- Quiz Attempts — sample history for user 1
-- ============================================
INSERT INTO quiz_attempts (user_id, quiz_id, score, total_questions, completed_at) VALUES
(1, 1, 7, 10, '2026-01-28 14:30:00'),
(1, 1, 8, 10, '2026-02-05 10:15:00'),
(1, 1, 9, 10, '2026-02-10 16:45:00'),
(2, 1, 6, 10, '2026-02-01 09:00:00'),
(2, 2, 4,  5, '2026-02-08 11:30:00');

-- ============================================
-- User Content Progress — sample completions
-- ============================================
INSERT INTO user_content_progress (user_id, content_id, completed, viewed_at) VALUES
(1, 'vid-ai-fake',          true, '2026-01-20 10:00:00'),
(1, 'art-red-flags',        true, '2026-01-22 14:00:00'),
(1, 'vid-checking-sources', true, '2026-01-25 09:30:00'),
(1, 'guide-sift',           true, '2026-02-01 11:00:00'),
(2, 'vid-ai-fake',          true, '2026-02-02 13:00:00'),
(2, 'vid-psychology',       true, '2026-02-05 15:00:00');

-- ============================================
-- Milestones — achievement definitions
-- ============================================
INSERT INTO milestones (key, label, description, icon) VALUES
('first_quiz',       'First Steps',        'Complete your first quiz',               'star'),
('perfect_score',    'Perfect Score',       'Score 10/10 on a quiz',                  'trophy'),
('three_quizzes',    'Quiz Enthusiast',     'Complete 3 quizzes',                     'fire'),
('five_quizzes',     'Quiz Master',         'Complete 5 quizzes',                     'crown'),
('first_video',      'First Watch',         'Watch your first video',                 'play'),
('all_videos',       'Binge Learner',       'Watch all videos',                       'video'),
('first_article',    'Avid Reader',         'Read your first article',                'book'),
('all_articles',     'Knowledge Seeker',    'Read all articles and guides',           'books'),
('first_guide',      'Guided Path',         'Complete your first guide',              'compass'),
('content_explorer', 'Content Explorer',    'View at least 5 different content items','explore'),
('streak_3',         'Consistent Learner',  'Visit 3 days in a row',                 'calendar'),
('streak_7',         'Weekly Warrior',      'Visit 7 days in a row',                 'flame');

-- ============================================
-- User Milestones — sample earned achievements
-- ============================================
INSERT INTO user_milestones (user_id, milestone_id, earned_at) VALUES
(1, 1,  '2026-01-28 14:30:00'),
(1, 3,  '2026-02-10 16:45:00'),
(1, 5,  '2026-01-20 10:00:00'),
(1, 7,  '2026-01-22 14:00:00'),
(1, 9,  '2026-02-01 11:00:00'),
(1, 10, '2026-02-01 11:00:00'),
(2, 1,  '2026-02-01 09:00:00'),
(2, 5,  '2026-02-02 13:00:00');
