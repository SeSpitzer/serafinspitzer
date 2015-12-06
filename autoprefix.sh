#!/bin/sh

postcss --use autoprefixer css/site.css > tmp.css
mv tmp.css css/site.css
