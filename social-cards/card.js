const Jimp = require("jimp");
const fs = require('fs');
const path = require('path');

class Card {
    constructor(name, width, height, padding) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.padding = padding;
    }

    async drawCard(out, textArgs, params) {
        return new Promise(async (resolve, reject) => {
            let loadedImage;

            await Jimp.read(path.join(__dirname, 'cards', 'raw', 'card2.png')).then(function (image) {
                loadedImage = image;
            })
            .then(async () => {
                let lastTextY = 0;
                for(const text of textArgs) {
                    const font = await Jimp.loadFont(text.font);
                    text.x = text.x || 0;
                    text.y = text.y || 0;

                    loadedImage.print(font, text.x + (params.safeZones[text.useSafeZone].preservePadding ? 50 : 0), text.y, {text: text.text, alignmentX: text.alignX, alignmentY: text.alignY}, text.useSafeZone == undefined ? this.width - this.padding : params.safeZones[text.useSafeZone].x - (params.safeZones[text.useSafeZone].preservePadding ? this.padding * 2 : 0), text.useSafeZone == undefined ? this.height - this.padding : params.safeZones[text.useSafeZone].y - (params.safeZones[text.useSafeZone].preservePadding ? this.padding : 0))
                }
                return loadedImage;
            })
            .then(async () => {
                await loadedImage.writeAsync(out);
                resolve(true);
            })
        })
    }
}

module.exports = Card;