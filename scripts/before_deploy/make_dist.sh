# The directory to move necessary files into
target="$1"

if [ -z "$target" ]; then
  >&2 echo "Error: no target directory provided"
  exit 1
fi

mkdir "$1"
cp -R assets "$1"/
cp built.js "$1"
cp *.html "$1"
cp *.css "$1"
