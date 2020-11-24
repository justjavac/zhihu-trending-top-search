#!/usr/bin/env -S deno run --unstable --allow-net --allow-read --import-map=import_map.json
// Copyright 2020 justjavac(迷渡). All rights reserved. MIT license.

const response = await fetch('https://www.zhihu.com/api/v4/search/top_search');

const result = await response.json();

console.log(result);
