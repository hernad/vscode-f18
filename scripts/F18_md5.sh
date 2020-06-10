#!/bin/bash

BINTRAY_USER=bringout
BINTRAY_REPOS=F18
BINTRAY_HOST=https://dl.bintray.com/$BINTRAY_USER/$BINTRAY_REPOS

# F18 execute application
F18_CLI="F18-klijent"

VERSION=$1

UNAME=`uname`


[ -z "$VERSION" ] && echo navesti verziju && exit 1

#ZIPS="F18-linux-x64_$VERSION.zip F18-linux-x86_$VERSION.zip F18-windows-x64_$VERSION.zip F18-windows-x86_$VERSION.zip"

ZIPS="F18-linux-x64_$VERSION.zip F18-windows-x64_$VERSION.zip F18-windows-x86_$VERSION.zip"

mkdir -p tmp

DOWNLOAD=download.zip

echo "" > md5.txt 
for zip in $ZIPS ; do
  echo $zip >> md5.txt
  echo =================== $zip ==========================================
  echo curl -sL $BINTRAY_HOST/$zip --output tmp/$DOWNLOAD
  curl -sL $BINTRAY_HOST/$zip --output tmp/$DOWNLOAD
  ls -lh tmp/$DOWNLOAD

  if [[ "$?" == "0" ]] ; then
    echo $(pwd)
    unzip tmp/$DOWNLOAD -d tmp
    if [[ $zip != F18-windows* ]] ; then
        [ -f tmp/$F18_CLI ] && md5sum tmp/$F18_CLI >> md5.txt
    fi
    [ -f tmp/$F18_CLI.exe ] && md5sum tmp/$F18_CLI.exe >> md5.txt
    rm -rf tmp/*
  else
     echo ERROR !
     exit 1
  fi

done

echo -e

cat md5.txt

