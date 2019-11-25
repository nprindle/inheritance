git checkout refs/tags/demo

npm run build-all

mkdir -p dist/demo
cp -R assets dist/demo
cp built.js dist/demo
cp *.html dist/demo
cp *.css dist/demo

git checkout -
