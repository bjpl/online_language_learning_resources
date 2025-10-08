#!/usr/bin/env node

/**
 * Generate comprehensive daily reports for all commit dates
 * Similar to the describe_it project daily reports format
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reportsDir = path.join(__dirname, '..', 'daily_reports');

// Ensure reports directory exists
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

// Get unique commit dates
const datesOutput = execSync('git log --all --date=format:"%Y-%m-%d" --pretty=format:"%ad" | sort -u', { encoding: 'utf-8' });
const dates = datesOutput.trim().split('\n').filter(d => d);

console.log(`\nGenerating daily reports for ${dates.length} dates...\n`);

for (const date of dates) {
  generateDailyReport(date);
}

console.log(`\n✅ Generated ${dates.length} daily reports in ${reportsDir}\n`);

function generateDailyReport(date) {
  const nextDate = getNextDate(date);

  // Get commits for this date
  const commitsOutput = execSync(
    `git log --all --date=format:"%Y-%m-%d %H:%M" --pretty=format:"%ad|%h|%s|%an" --since="${date}" --until="${nextDate}"`,
    { encoding: 'utf-8' }
  );

  const commits = commitsOutput.trim().split('\n').filter(c => c).map(line => {
    const [datetime, hash, subject, author] = line.split('|');
    const [_, time] = datetime.split(' ');
    return { datetime, time, hash, subject, author };
  });

  if (commits.length === 0) {
    return;
  }

  // Get detailed stats
  const statsOutput = execSync(
    `git log --all --since="${date}" --until="${nextDate}" --shortstat --pretty=format:"%H"`,
    { encoding: 'utf-8' }
  );

  const { filesChanged, linesAdded, linesDeleted } = parseStats(statsOutput);

  // Categorize commits
  const categories = categorizeCommits(commits);

  // Generate report content
  const report = generateReportContent(date, commits, {
    filesChanged,
    linesAdded,
    linesDeleted,
    categories
  });

  // Write report file
  const filename = `${date}.md`;
  const filepath = path.join(reportsDir, filename);
  fs.writeFileSync(filepath, report, 'utf-8');

  console.log(`✓ ${filename} - ${commits.length} commits`);
}

function getNextDate(date) {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

function parseStats(statsOutput) {
  let filesChanged = 0;
  let linesAdded = 0;
  let linesDeleted = 0;

  const lines = statsOutput.split('\n');
  for (const line of lines) {
    if (line.includes('file') && line.includes('changed')) {
      const match = line.match(/(\d+) files? changed(?:, (\d+) insertions?\(\+\))?(?:, (\d+) deletions?\(-\))?/);
      if (match) {
        filesChanged += parseInt(match[1] || 0);
        linesAdded += parseInt(match[2] || 0);
        linesDeleted += parseInt(match[3] || 0);
      }
    }
  }

  return { filesChanged, linesAdded, linesDeleted };
}

function categorizeCommits(commits) {
  const categories = {
    feat: [],
    fix: [],
    docs: [],
    style: [],
    refactor: [],
    chore: [],
    test: [],
    other: []
  };

  for (const commit of commits) {
    const subject = commit.subject.toLowerCase();
    if (subject.startsWith('feat:') || subject.startsWith('feat ')) {
      categories.feat.push(commit);
    } else if (subject.startsWith('fix:') || subject.startsWith('fix ')) {
      categories.fix.push(commit);
    } else if (subject.startsWith('docs:') || subject.startsWith('docs ')) {
      categories.docs.push(commit);
    } else if (subject.startsWith('style:') || subject.startsWith('style ')) {
      categories.style.push(commit);
    } else if (subject.startsWith('refactor:') || subject.startsWith('refactor ')) {
      categories.refactor.push(commit);
    } else if (subject.startsWith('chore:') || subject.startsWith('chore ')) {
      categories.chore.push(commit);
    } else if (subject.startsWith('test:') || subject.startsWith('test ')) {
      categories.test.push(commit);
    } else {
      categories.other.push(commit);
    }
  }

  return categories;
}

function generateReportContent(date, commits, stats) {
  const dateObj = new Date(date);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const formattedDate = `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;

  const { filesChanged, linesAdded, linesDeleted, categories } = stats;
  const netChange = linesAdded - linesDeleted;

  // Generate executive summary
  const summary = generateExecutiveSummary(date, commits, stats);

  // Commit timeline
  const timeline = commits.map(c => `${c.time} ┃ ${c.subject}`).join('\n');

  // Calculate time distribution
  const timeDistribution = calculateTimeDistribution(commits);

  // Category distribution
  const categoryDist = calculateCategoryDistribution(categories);

  return `# Daily Development Report - ${formattedDate}

## Executive Summary

${summary}

### Day Highlights
- **${commits.length} commits** across development session
- **${filesChanged} files changed**
- **${linesAdded} lines added, ${linesDeleted} lines deleted**
- **Net change: ${netChange > 0 ? '+' : ''}${netChange} lines**

---

## Commit Timeline

\`\`\`
${timeline}
\`\`\`

---

## Statistics Dashboard

### Code Metrics
\`\`\`
Total Commits:     ${commits.length}
Files Changed:     ${filesChanged}
Lines Added:    ${linesAdded.toLocaleString()}
Lines Deleted:    ${linesDeleted.toLocaleString()}
Net Change:    ${netChange > 0 ? '+' : ''}${netChange.toLocaleString()}
\`\`\`

### Contribution Timeline
\`\`\`
${generateTimelineChart(timeDistribution, commits.length)}
\`\`\`

### Commit Category Distribution
\`\`\`
${categoryDist}
\`\`\`

---

## Key Achievements

${generateKeyAchievements(commits, categories)}

---

## Detailed Changes

${generateDetailedChanges(commits)}

---

## Next Steps

${generateNextSteps(date, commits)}

---

**Report Generated**: ${new Date().toISOString()}
**Commits Analyzed**: ${commits.length}
**Development Date**: ${date}
`;
}

function generateExecutiveSummary(date, commits, stats) {
  const { categories } = stats;

  const hasFeat = categories.feat.length > 0;
  const hasFix = categories.fix.length > 0;
  const hasRefactor = categories.refactor.length > 0;

  const focus = [];
  if (hasFeat) focus.push('feature development');
  if (hasFix) focus.push('bug fixes');
  if (hasRefactor) focus.push('code refactoring');
  if (categories.docs.length > 0) focus.push('documentation');

  const focusText = focus.length > 0 ? focus.join(', ') : 'project development';

  return `**Major Achievement**: Focus on ${focusText} with ${commits.length} commits implementing improvements to the Language Learning Hub.`;
}

function calculateTimeDistribution(commits) {
  const dist = Array(24).fill(0);

  for (const commit of commits) {
    const hour = parseInt(commit.time.split(':')[0]);
    dist[hour]++;
  }

  return dist;
}

function generateTimelineChart(dist, totalCommits) {
  const ranges = [
    { label: '00:00-06:00', start: 0, end: 6 },
    { label: '06:00-12:00', start: 6, end: 12 },
    { label: '12:00-18:00', start: 12, end: 18 },
    { label: '18:00-21:00', start: 18, end: 21 },
    { label: '21:00-23:59', start: 21, end: 24 }
  ];

  let chart = '';
  for (const range of ranges) {
    let count = 0;
    for (let i = range.start; i < range.end; i++) {
      count += dist[i];
    }
    const pct = totalCommits > 0 ? (count / totalCommits) * 100 : 0;
    const bars = '█'.repeat(Math.round(pct / 5));
    chart += `${range.label}  ${bars.padEnd(20)} ${count} commits\n`;
  }

  return chart.trim();
}

function calculateCategoryDistribution(categories) {
  const total = Object.values(categories).reduce((sum, arr) => sum + arr.length, 0);

  const lines = [];
  const catOrder = ['feat', 'fix', 'refactor', 'docs', 'style', 'chore', 'test', 'other'];
  const catNames = {
    feat: 'Features',
    fix: 'Bug Fixes',
    refactor: 'Refactoring',
    docs: 'Documentation',
    style: 'Styling',
    chore: 'Maintenance',
    test: 'Testing',
    other: 'Other'
  };

  for (const cat of catOrder) {
    const count = categories[cat].length;
    if (count > 0) {
      const pct = total > 0 ? (count / total) * 100 : 0;
      const bars = '█'.repeat(Math.round(pct / 5));
      lines.push(`${`${catNames[cat]}:`.padEnd(20)  }${bars.padEnd(20)} ${Math.round(pct)}% (${count} commits)`);
    }
  }

  return lines.join('\n');
}

function generateKeyAchievements(commits, categories) {
  const achievements = [];

  if (categories.feat.length > 0) {
    achievements.push(`### Features Added (${categories.feat.length})\n${ 
      categories.feat.map(c => `- ${c.subject.replace(/^feat:\s*/i, '')}`).join('\n')}`);
  }

  if (categories.fix.length > 0) {
    achievements.push(`### Bugs Fixed (${categories.fix.length})\n${ 
      categories.fix.map(c => `- ${c.subject.replace(/^fix:\s*/i, '')}`).join('\n')}`);
  }

  if (categories.refactor.length > 0) {
    achievements.push(`### Code Improvements (${categories.refactor.length})\n${ 
      categories.refactor.map(c => `- ${c.subject.replace(/^refactor:\s*/i, '')}`).join('\n')}`);
  }

  return achievements.length > 0 ? achievements.join('\n\n') : 'Project development and maintenance work completed.';
}

function generateDetailedChanges(commits) {
  return commits.map((c, i) =>
    `**${i + 1}. ${c.subject}** (${c.hash})\n   - Time: ${c.time}\n   - Author: ${c.author}`
  ).join('\n\n');
}

function generateNextSteps(date, commits) {
  // Check what was done to suggest next steps
  const subjects = commits.map(c => c.subject.toLowerCase()).join(' ');

  const steps = [];

  if (subjects.includes('test')) {
    steps.push('- [ ] Expand test coverage');
  }
  if (subjects.includes('docs') || subjects.includes('documentation')) {
    steps.push('- [ ] Review and update documentation');
  }
  if (subjects.includes('fix')) {
    steps.push('- [ ] Monitor for related issues');
  }
  if (subjects.includes('feat')) {
    steps.push('- [ ] User testing of new features');
  }

  steps.push('- [ ] Code review and refactoring opportunities');
  steps.push('- [ ] Performance optimization assessment');

  return steps.join('\n');
}
