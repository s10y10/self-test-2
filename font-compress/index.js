const fontSpider = require("font-spider");
const fs = require("fs-extra");
const path = require("path");

fontSpider
  .spider([__dirname + "/index.html"], {
    silent: false,
  })
  .then(function (webFonts) {
    fs.emptyDirSync(path.resolve(__dirname, "output"));
    for (let i = 0; i < webFonts.length; i++) {
      let font = webFonts[i];
      font.chars += " ";
      for (let j = 0; j < font.files.length; j++) {
        let file = font.files[j];
        let fontName = file.url.replace(
          `c:/workspace/font-compress/baseFont/`,
          ""
        );
        const newPath = path.resolve(__dirname, "output", fontName);
        fs.copyFileSync(file.url, newPath);
        file.url = newPath;
      }
    }
    return fontSpider.compressor(webFonts, { backup: false });
  })
  .then(function (webFonts) {
    console.log(webFonts);
  })
  .catch(function (errors) {
    console.log(errors);
  });
