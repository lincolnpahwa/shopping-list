/* eslint-env node */
'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties

  return {
    name: "smart-shopping-list",
    short_name: "smart-shopping-list",
    description: "",
    start_url: "/?special_behavior=true",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/assets/images/icon-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    ms: {
      tileColor: '#fff'
    }
  };
}
