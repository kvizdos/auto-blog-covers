const Route = require('../route');
var Jimp = require("jimp");
const fs = require('fs');
const path = require('path');

class SocialCard extends Route {
    constructor() {
        super();
        this.registerRoutes();
    }

    registerRoutes() {
        this.routes.get("/", async (req, res) => {
            const imageCaption = req.query.title;
            const author = req.query.author;
            const time = req.query.time;
            const slug = req.query.slug;
            const forceRefresh = req.query.forceRefresh || false;

            if([imageCaption, author, time, slug].filter(Boolean).length != 4) return res.status(400).send("invalid params")

            let loadedImage;

            if(!fs.existsSync(path.join(__dirname, 'cards', slug.split("/")[0] + ".png")) || forceRefresh) {
                await Jimp.read(path.join(__dirname, 'cards', 'raw', 'card1.png'))
                .then(function (image) {
                    loadedImage = image;
                    return Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
                })
                .then(function (font) {
                    loadedImage.print(font, 100, 100, {text: imageCaption, alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT}, 1750, 900)
                    return loadedImage;
                })
                .then(async function () {
                    return await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
                })
                .then(async (font) => {
                    await loadedImage.print(font, 650, 940, time).print(font, 650, 1010, author).writeAsync(path.join(__dirname, 'cards', slug.split("/")[0] + ".png"));
                    res.sendFile(path.join(__dirname, 'cards', slug.split("/")[0] + ".png"))
                })
                .catch(function (err) {
                    console.error(err);
                });
            } else {
                res.sendFile(path.join(__dirname, 'cards', slug.split("/")[0] + ".png"))
            }
        });
    }

    getRoutes() {
        return this.routes;
    }
}

module.exports = SocialCard;