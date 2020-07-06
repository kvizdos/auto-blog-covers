const express = require("express");

class Route {
    constructor() {
        this.routes = express.Router();
    }
}

module.exports = Route;