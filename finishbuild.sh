rm -rf ./fqt-todo/icons*/manifest.* 
cp -rf ./src/chrome ./fqt-todo 
cp -rf ./src/manifest.json ./fqt-todo/manifest.json

cp -rf ./fqt-todo/index.html ./fqt-todo/sync.html
cp -rf ./fqt-todo/index.html ./fqt-todo/importExport.html
cp -rf ./fqt-todo/index.html ./fqt-todo/dataManage.html
cp -rf ./fqt-todo/index.html ./fqt-todo/setting.html