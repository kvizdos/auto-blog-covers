const Route = require('../route');
var Jimp = require("jimp");
const fs = require('fs');
const path = require('path');
const cardClass = require('./card');

class SocialCard extends Route {
    constructor() {
        super();
        this.registerRoutes();

        this.Card = new cardClass("Main card", 1200, 630, 50);
    }

    registerRoutes() {
        this.routes.get("/", async (req, res) => {
            const imageCaption = req.query.title;
            const author = req.query.author;
            const time = req.query.time;
            const slug = req.query.slug;
            const forceRefresh = req.query.forceRefresh || false;

            if([imageCaption, author, time, slug].filter(Boolean).length != 4) return res.status(400).send("invalid params")

            if(!fs.existsSync(path.join(__dirname, 'cards', slug.split("/")[0] + ".png")) || forceRefresh) {
                await this.Card.drawCard(path.join(__dirname, 'cards', slug.split("/")[0] + ".png"), [{
                    text: imageCaption,
                    font: path.join(__dirname, 'fonts', 'OpenSans-Bold.fnt'),
                    useSafeZone: 0,
                    alignY: Jimp.VERTICAL_ALIGN_MIDDLE,
                }, {
                    text: `Read this article by ${author} in ${time == 1 ? "1 minute" : time + " minutes"}`,
                    font: path.join(__dirname, 'fonts', 'OpenSans-SemiBold.fnt'),
                    alignX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignY: Jimp.VERTICAL_ALIGN_BOTTOM,
                    x: 0,
                    y: -20,
                    useSafeZone: 1
                }], {
                    safeZones: [
                        {preservePadding: true, x: 1200, y: 480},
                        {preservePadding: false, x: 1200, y: 630}
                    ]
                })

                res.sendFile(path.join(__dirname, 'cards', slug.split("/")[0] + ".png"))
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