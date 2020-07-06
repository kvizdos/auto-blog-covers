const Jimp = require("jimp");
const path = require('path');

const cardClass = require('./card');
const Card = new cardClass("Test", 1200, 630, 50);

Card.drawCard(path.join(__dirname, 'cards', 'how-to.png'), [{
    text: "How to make your website look amazing when posted on social media",
    font: path.join(__dirname, 'fonts', 'OpenSans-Bold.fnt'),
    useSafeZone: 0,
    alignY: Jimp.VERTICAL_ALIGN_MIDDLE,
}, {
    text: `Kenton Vizdos » 07/06/2020`,
    font: path.join(__dirname, 'fonts', 'OpenSans-SemiBold.fnt'),
    alignX: Jimp.HORIZONTAL_ALIGN_CENTER,
    alignY: Jimp.VERTICAL_ALIGN_BOTTOM,
    x: 0,
    y: -10,
    useSafeZone: 1
}], {
    safeZones: [
        {preservePadding: true, x: 1200, y: 480},
        {preservePadding: false, x: 1200, y: 630}
    ]
}).then(() => {
    console.log("done")
})