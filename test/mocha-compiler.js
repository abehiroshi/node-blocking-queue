"use strict"

require("babel/register")({
  only: /src\/|test\//,
  plugins: ["object-assign", "espower"],
  extensions: [".js"]
})
