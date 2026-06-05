#!/bin/bash
set -e

# Load FTP credentials
if [ ! -f .env ]; then
  echo "❌ .env file not found"
  exit 1
fi
export $(grep -v '^#' .env | xargs)

echo "🔨 Building..."
rm -rf dist
npm run build

# Create real subdirectory routes so the server finds actual files
# without needing .htaccess rewrite rules
mkdir -p dist/gratitude
cp dist/index.html dist/gratitude/index.html

echo "🚀 Deploying to $FTP_HOST..."
lftp -c "
  set ftp:ssl-allow no;
  open ftp://$FTP_USER:$FTP_PASS@$FTP_HOST;
  mirror --reverse --verbose --ignore-time \
    --exclude .DS_Store \
    ./dist/ $FTP_REMOTE/;
  put ./dist/index.html -o $FTP_REMOTE/index.html;
  put ./dist/gratitude/index.html -o $FTP_REMOTE/gratitude/index.html;
  put ./scripts/analytics.php -o $FTP_REMOTE/scripts/analytics.php;
  put ./scripts/analytics-dashboard.php -o $FTP_REMOTE/scripts/analytics-dashboard.php;
  put ./scripts/log-selections.php -o $FTP_REMOTE/scripts/log-selections.php;
  put ./scripts/visit.php -o $FTP_REMOTE/scripts/visit.php;
  bye
"

echo "✅ Deploy complete!"
