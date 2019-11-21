#!/bin/bash
images=("The_Catburgurlar.png" "The_Clone.png" "The_Reject_-_Done.png" "final_logo.png" "random.png" "the_shell.png" "thegranddaughter.png")

for f in ${images[*]}; do
    optipng -o6 "assets/$f"
done
