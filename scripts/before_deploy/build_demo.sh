target="$1"

if [ -z "$target" ]; then
  >&2 echo "Error: no target directory provided"
  exit 1
fi

pages_branch="$2"

if [ -z "$pages_branch" ]; then
  >&2 echo "Error: no GitHub pages branch name provided"
  exit 1
fi

# Attempt to check out 'demo' from gh-pages
git fetch origin $pages_branch
git checkout FETCH_HEAD -- demo/

# If it existed and succeeds, copy it into 'dist' to be deployed
if [ $? -eq 0 ]; then
  mv demo "$target"
else
  git checkout refs/tags/demo

  npm run build-all

  mkdir -p "$target/demo"
  cp -R assets "$target/demo/"
  cp built.js "$target/demo/"
  cp *.html "$target/demo/"
  cp *.css "$target/demo/"

  git checkout -
fi

