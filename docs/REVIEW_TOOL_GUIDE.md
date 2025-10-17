# Resource Review Tool - Quick Start Guide

## 🎯 Overview

The Resource Review Tool helps you quickly review, validate, and categorize language learning resources across 60+ languages.

## 📊 Available Versions

- **review-tool-v2.html** - Ultra-fast with preloading (RECOMMENDED)
- **review-tool-v3.html** - Smart preview with blocking detection

## 🚀 Launch Instructions

### Option 1: Python Web Server (Easiest)

```bash
# Navigate to project root
cd online_language_learning_resources

# Start server
python -m http.server 8080

# Open in browser
# http://localhost:8080/tests/review-tool-v2.html
```

### Option 2: VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click `tests/review-tool-v2.html`
3. Select "Open with Live Server"

### Option 3: Node.js http-server

```bash
npx http-server -p 8080
# Then open: http://localhost:8080/tests/review-tool-v2.html
```

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **K** | Keep resource |
| **D** | Delete resource |
| **E** | Mark for editing |
| **S** | Skip to next |
| **←** | Previous resource |
| **→** | Next resource |
| **Space** | Open in new tab |
| **1** | Toggle "Link Valid" |
| **2** | Toggle "Relevant" |
| **3** | Toggle "Actually Free" |
| **Ctrl+S** | Manual save progress |
| **B** | Toggle batch mode |

## 💾 Features

### Auto-Save
- Progress automatically saves every 5 seconds
- Saves to browser's localStorage
- Can resume session after closing

### Export/Import
- **Export Session**: Save progress as JSON file
- **Import Session**: Restore from JSON file
- **Export Results**: Download decisions for all resources

### Smart Preview
- Preloads next 5 resources
- Queue shows loading status
- Auto-detects iframe blocking
- Falls back to "Open in Tab" button

## 📋 Review Workflow

1. **Load the tool** - All 862 resources load automatically
2. **Review current resource** - View in iframe preview
3. **Make quality checks**:
   - 🔗 Link Valid - Does the URL work?
   - 🎯 Relevant - Is it actually for language learning?
   - 💰 Actually Free - Is it truly free or freemium?
4. **Make decision**:
   - ✓ **Keep** - Good resource, keep in database
   - ✗ **Delete** - Remove from database
   - ✎ **Edit** - Needs corrections
   - ⊙ **Skip** - Review later
5. **Auto-advance** to next resource

## 📊 Progress Tracking

Top bar shows:
- Current position (e.g., "23 / 862")
- Progress bar
- Statistics: Keep, Delete, Edit, Skip counts
- Session time and review rate
- Auto-save indicator

## 🔍 Queue Panel

Left panel shows:
- Upcoming resources
- Preview loading status
- Completed items (grayed out)
- Click to jump to any resource

## ⚡ Tips for Fast Review

1. Use keyboard shortcuts exclusively
2. Let preview preload (watch queue status)
3. Export progress frequently (just in case)
4. Use Space to open suspicious sites in new tab
5. Batch mode for similar resources

## 🐛 Troubleshooting

### Resources not loading?
- Check browser console (F12)
- Ensure you're using a web server (not file://)
- Clear browser cache and refresh

### Preview blocked?
- Some sites block iframes (normal)
- Use "Open in Tab" button
- Mark quick checks and make decision

### Lost progress?
- Check localStorage in browser dev tools
- Look for `reviewToolProgress` key
- Import last exported JSON file

## 📁 Output Files

After review, export results to get:
- JSON file with all decisions
- Timestamp and statistics
- Ready for data cleanup scripts

## 🎯 Estimated Time

- **Casual pace**: ~2-3 resources/min (5-7 hours total)
- **Fast pace**: ~4-6 resources/min (2-4 hours total)
- **Batch mode**: Up to 10 resources/min for similar items

## 💡 Best Practices

1. **Morning sessions**: 100-200 resources
2. **Export after each session**
3. **Take breaks** every 30 minutes
4. **Use quality checks** consistently
5. **When in doubt**, mark "Edit" not "Delete"

---

Ready to start? Launch the tool and press **K** for your first Keep decision! 🚀
