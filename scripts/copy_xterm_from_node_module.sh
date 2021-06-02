echo "copy from vscode-f18 node module"

cp -av node_modules/xterm/package.json cli/xterm/
cp -av node_modules/xterm/lib/xterm.js cli/xterm/lib/
cp -av node_modules/xterm/css/xterm.css cli/xterm/css/