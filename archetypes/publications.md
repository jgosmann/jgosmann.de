---
authors:
  - Jan Gosmann
year: {{ dateFormat "2006" .Date }}
journal: ""
pdfurl: ""
exturl: ""
title: "{{ replace (replaceRE "^\\d*-" "" .Name) "-" " " | title }}"
---

