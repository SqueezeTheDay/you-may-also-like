const fs = require('fs');

const CSS_COLOR_NAMES = ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGrey', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'Darkorange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkSlateGrey', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DimGrey', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Grey', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGrey', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSlateGrey', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'SlateGrey', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'];

let data = [];
let colors = [];
const sex = ['Men', 'Women'];
const where = ['Tops', 'Bottoms'];
const articlesOfClothing = ['Shirts', 'Pants'];
let title = '';
let link;
let listing;
const db = process.argv[2];

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max)); // exclusive

for (let i = 1; i <= 10000000; i++) {
  link = getRandomInt(2);
  title = `${sex[getRandomInt(2)]} ${where[link]} ${articlesOfClothing[link]}`;
  for (let j = 0; j < 4; j++) {
    colors.push(CSS_COLOR_NAMES[getRandomInt(147)]);
  }
  listing = {
    ...(db === 'couch' && { id: i }),
    title,
    main: 'http://lululemonades-related.s3.amazonaws.com/image' + `${getRandomInt(100) + 1}.jpg`.padStart(9, '0'),
    hover: 'http://lululemonades-related.s3.amazonaws.com/image' + `${getRandomInt(100) + 1}.jpg`.padStart(9, '0'),
    color: colors,
    price: `$${getRandomInt(365)} USD`,
  };

  data.push(JSON.stringify(listing));

  if (i === 5000) {
    fs.appendFileSync(`seed-${db}.json`, data.join('\n'));
    data = [];
  } else if (i % 5000 === 0) {
    fs.appendFileSync(`seed-${db}.json`, '\n' + data.join('\n'));
    data = [];
  }

  colors = [];
}

fs.appendFileSync(`seed-${db}.json`, '\n');
