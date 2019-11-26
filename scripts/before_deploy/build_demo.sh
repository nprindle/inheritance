# Attempt to check out 'demo' from gh-pages
git fetch origin gh-pages
git checkout FETCH_HEAD -- demo/

# If it existed and succeeds, copy it into 'dist' to be deployed
if [ $? -eq 0 ]; then
  mv demo dist
else
  git checkout refs/tags/demo

  npm run build-all

  mkdir -p dist/demo
  cp -R assets dist/demo/
  cp built.js dist/demo/
  cp *.html dist/demo/
  cp *.css dist/demo/

  git checkout -
fi

