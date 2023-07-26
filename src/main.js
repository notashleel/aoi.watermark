const fetch = require("node-fetch");
const {Client} = require("discord.js");


class Mains {
    constructor(client) {
        if (!client) throw new SyntaxError("No Client provided!");
        this.client = client;
    };

    async test()
    {
      console.log("Works!")
    }

}
module.exports = Mains