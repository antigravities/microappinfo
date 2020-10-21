const Steam = require("steam-user");
const express = require("express");
const fs = require("fs");
const cheerio = require("cheerio");
const fetch = require("node-fetch");

const bot = new Steam({
    enablePicsCache: true,
    picsCacheAll: true
});
const app = express();
const config = fs.existsSync("config.json") ? JSON.parse(fs.readFileSync("config.json")) : { resolveTags: true };

const tags = {};

function kvArrayToArray(kvArray){
    return Object.keys(kvArray).map(i => kvArray[i]);
}

async function refreshAppTags(){
    let $;

    try {
        $ = cheerio.load(await (await fetch("https://store.steampowered.com/tag/browse/")).text());
    } catch(e) {
        console.log("Couldn't fetch apps.");
        return;
    }

    $(".tag_browse_tag").each((_, i) => {
        tags[$(i).attr("data-tagid")] = $(i).text().trim();
    });

    console.log("Refreshed " + Object.keys(tags).length + " app tags.");
}

bot.on("loggedOn", () => {
    console.log("Logged on to Steam (anonymously).");
});

let basePath = config.authenticate ? "/:key/:appid(\\d+)" : "/:appid(\\d+)";

app.get("/", (_, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(fs.readFileSync("README.md"));
})

app.get(basePath, (req, res) => {
    if( config.authenticate && config.keys && config.keys.length > 0 ){
        if( config.keys.indexOf(req.params['key']) < 0 ){
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(JSON.stringify({"error": "Authentication is enabled but no valid key has been provided"}));
            return;
        }
    }

    let app = parseInt(req.params['appid']);
    bot.getProductInfo([app], [], (err, apps, packages, unknownApps, unknownPackages) => {
        if( err ){
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({"error": "Internal server error"}));
            console.log(err);
            return;
        } 

        if( unknownApps.indexOf(app) > -1 || ! apps["" + app] ){
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({"error": "Could not find app " + app}));
            return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });

        let info = apps["" + app].appinfo || {};

        // some tweaks to make this less of an embarrassment
        info.changenumber = apps["" + app].changenumber;

        if( info.common ){
            info.common.store_tags = info.common.store_tags ? kvArrayToArray(info.common.store_tags).map(i => parseInt(i)) : [];
            info.common.genres = info.common.genres ? kvArrayToArray(info.common.genres).map(i => parseInt(i)) : [];
            info.common.category = info.common.category ? Object.keys(info.common.category).map(i => parseInt(i.split("category_")[1])) : [];
            info.common.primary_genre = parseInt(info.common.primary_genre);

            if( config.resolveTags ){
                info.common.store_tags = info.common.store_tags.map(i => tags["" + i] ? tags["" + i] : i);
            }
        }
        
       res.end(JSON.stringify(info));
       return;
    });
});

refreshAppTags();
setInterval(() => refreshAppTags, 86400000);

app.listen(37213);

bot.logOn();