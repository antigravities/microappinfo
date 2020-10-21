# MicroAppInfo

This is a microservice that provides the contents of Steam's `app_info_print` over HTTP.
It does some prettification of the output so it's less Valve KV friendly and more JSON friendly, and does resolve `store_tags` into human-readable strings, but otherwise, that's it.

## Usage

```
git clone git@github.com:antigravities/microappinfo.git
npm i
npm start
```

**If this is facing outwards to the Internet, you should turn `authentication` on in `config.json` and provide a list of `keys` to prevent abuse.**

## API documentation

### `GET /:appid`

Get app info for an AppID. If `authentication` is on in `config.json`, you must provide one of the `keys` specified in `config.json`, and provide it in the path before `/:appid`. For example, `/mySecretKey/727570`.

```json
> GET /727570

HTTP/1.1 200 OK
Content-Type: application/json

{
   "appid":"727570",
   "common":{
      "name":"After the Collapse",
      "type":"Game",
      "oslist":"windows",
      "osarch":"64",
      "logo":"8cab358cd539194c968249afcfefb88e8a55c6d0",
      "logo_small":"8cab358cd539194c968249afcfefb88e8a55c6d0_thumb",
      "icon":"b8f99f263a98fd13eafef09e68357e72e789a3f4",
      "clienticon":"31f82a6e68e34d6ef3637a88d3687f0af6e5a255",
      "clienttga":"9cd738436207f377b88f4192096993b11ce05192",
      "releasestate":"released",
      "osextended":"",
      "metacritic_name":"After the Collapse",
      "small_capsule":{
         "english":"capsule_231x87.jpg"
      },
      "header_image":{
         "english":"header.jpg"
      },
      "library_assets":{
         "library_capsule":"en",
         "library_hero":"en",
         "library_logo":"en",
         "logo_position":{
            "pinned_position":"BottomLeft",
            "width_pct":"55.13418903150525",
            "height_pct":"100"
         }
      },
      "store_asset_mtime":"1595548814",
      "associations":{
         "0":{
            "type":"developer",
            "name":"Anarkis Gaming"
         },
         "1":{
            "type":"publisher",
            "name":"Anarkis Gaming"
         }
      },
      "primary_genre":28,
      "genres":[
         23,
         28,
         2,
         70
      ],
      "category":[
         2,
         23,
         22,
         30,
         25,
         45,
         46
      ],
      "supported_languages":{
         "english":{
            "supported":"true",
            "subtitles":"true"
         },
         "french":{
            "supported":"true",
            "subtitles":"true"
         }
      },
      "steam_release_date":"1539010287",
      "community_visible_stats":"1",
      "workshop_visible":"1",
      "community_hub_visible":"1",
      "gameid":"727570",
      "store_tags":[
         "Colony Sim",
         "Base Building",
         "Management",
         "Sandbox",
         "Post-apocalyptic",
         "Crafting",
         "Strategy",
         "Top-Down",
         "Procedural Generation",
         "Simulation",
         "Sci-fi",
         "Moddable",
         "Modern",
         "Resource Management",
         "Singleplayer",
         "Indie",
         "2D",
         "City Builder",
         "Early Access",
         "Survival"
      ],
      "review_score":"8",
      "review_percentage":"81"
   },
   "extended":{
      "developer":"Anarkis Gaming",
      "publisher":"Anarkis Gaming",
      "homepage":"https://www.anarkisgaming.com"
   },
   "config":{
      "installdir":"AfterTheCollapse",
      "launch":{
         "0":{
            "executable":"Collapse.exe",
            "type":"default",
            "config":{
               "oslist":"windows"
            }
         },
         "1":{
            "executable":"Collapse.exe",
            "arguments":"Safe",
            "description":"in Safe Mode (disable mods)",
            "type":"option1",
            "config":{
               "oslist":"windows"
            }
         }
      }
   },
   "depots":{
      "228990":{
         "name":"DirectX Jun 2010 Redist",
         "config":{
            "oslist":"windows"
         },
         "maxsize":"102931551",
         "depotfromapp":"228980",
         "sharedinstall":"1"
      },
      "229006":{
         "name":".NET 4.7 Redist",
         "config":{
            "oslist":"windows"
         },
         "maxsize":"83944258",
         "depotfromapp":"228980",
         "sharedinstall":"1"
      },
      "727571":{
         "name":"After the Collapse Content",
         "manifests":{
            "public":"8046680813676520736",
            "32bit":"7698883509043176500",
            "old070":"4543022488869308878",
            "old071":"4083532541157454334",
            "old073":"8038381477282168077",
            "proton":"4037502991050305886"
         },
         "maxsize":"1239234650"
      },
      "hasdepotsindlc":"0",
      "workshopdepot":"727570",
      "branches":{
         "public":{
            "buildid":"5712115",
            "timeupdated":"1603230586"
         },
         "32bit":{
            "buildid":"4287123",
            "description":"x86 Legacy Support (32 Bit)",
            "timeupdated":"1594981647"
         },
         "nightly":{
            "buildid":"5712115",
            "description":"Experimental Branch",
            "timeupdated":"1603230197"
         },
         "old070":{
            "buildid":"5022627",
            "description":"Legacy version - 0.7.0",
            "timeupdated":"1590360207"
         },
         "old071":{
            "buildid":"5084162",
            "description":"Legacy version - 0.7.1",
            "timeupdated":"1591750788"
         },
         "old073":{
            "buildid":"5259759",
            "description":"Legacy version - 0.7.3",
            "timeupdated":"1594982008"
         },
         "proton":{
            "buildid":"5321044",
            "description":"Proton Linux Test",
            "timeupdated":"1595622325"
         }
      }
   },
   "ufs":{
      "quota":"100000000000",
      "maxnumfiles":"10000",
      "savefiles":{
         "0":{
            "root":"gameinstall",
            "path":"saves/",
            "pattern":"*.*",
            "recursive":"1"
         }
      }
   },
   "localization":{
      "richpresence":{
         "english":{
            "tokens":{
               "#collapseconfiguring":"Configuring the Collapse",
               "#collapseingame":"%agents% Survivors | %datetime%",
               "#collapsegameover":"Colony Destroyed | %datetime%",
               "#collapsedefault":"Surviving the Collapse",
               "#collapsecustomstring":"%string%"
            }
         }
      }
   },
   "changenumber":9795476
}
```

```json
> GET /662630

HTTP/1.1 404 Not Found
Content-Type: application/json

{
    "error": "Could not find app 662630"
}
```

## License
```
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```