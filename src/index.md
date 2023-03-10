---
title: Erlebnispfade
layout: documents.11ty.js
---

<ul>
{%- for path in collections.pathes -%}
  
    <li><a href="{{ path.url | url }}">{{ path.data.title }}</a></li>
  
{%- endfor -%}
</ul>
