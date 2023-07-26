# aoi.wm
___
##### 🌟 This is a port of [DevilsCord](https://www.npmjs.com/package/devilscord) for [aoi.js](https://www.npmjs.com/package/aoi.js).
_aoi.wm is a simple package for watermarking images for people using aoi.js!_


## index.js:

```js
const aoijs = require('aoi.js');

const bot = new aoijs.AoiClient({
  token: process.env.TOKEN,
  prefix: ["$getGuildVar[prefix]"],
  intents: [
    "Guilds",
    "GuildMessages"
    ],
  events: [
    "onMessage"
    ]
});

+ require('./node_modules/aoi.wm/src/func.js')(bot)
```

***Function Usage:***
`$watermark[key;image;watermark]`

- Key (Required) - Your Img.BB API key. To get one, [click here](https://api.imgbb.com/), Login/Register and create a key!
- Image - Image URL you want to watermark.
- Watermark - Watermark URL you want to apply.

***Errors:***

> There are three scenarios here:
1. Watermark will apply successfully and it will return the URL to watermarked product.
2. Provided Background Image will not be of supported types (.jpeg, .jpg, .png, .webp).
3. Provided Watermark Image will not be of supported types (.jpeg, .jpg, png).

##### 1st Case:
_When the watermark is applied, It will return an Img.BB url. For example: https://i.ibb.co/Bj86cXW/bfb53095fc89.png._
##### 2nd Case:
_If the image is not of supported types, It will return `Unknown Image Type`._
##### 3rd Case:
_If the watermark is not of supported types, It will return `Unknown Watermark Type`._
### Watermark Command Example:
```js
module.exports = [{
name: "watermark",
code: `
$watermark[$get[key];$nonEscape[$message];$get[watermark]]
$let[key;KEY_HERE]
$let[watermark;WATERMARK_URL]
$onlyIf[$isValidLink[$message]==true;URL is invalid]
$onlyIf[$message!=;Please enter a URL]
`
}]
```

### Example:
##### Input:
![Input Unwatermarked](https://media.discordapp.net/attachments/1015072136794214450/1091393072472006797/AsheyXD_Profile_Picture_PFP_-_Red.png?width=473&height=473)
##### Output:
![Output Watermarked](https://i.ibb.co/Bj86cXW/bfb53095fc89.png)
##### Input:
![Input Unwatermarked](https://cdn.discordapp.com/attachments/1015072136794214450/1091393073013075978/Ashey_Banner_Rxmorse.png)
##### Output:
![Output Watermarked](https://i.ibb.co/HB2Mv52/e19d8488f08b.png)

_Same watermark was used for both the images but it resizes automatically according to the image!_
___
## Credits:
- [@\_devilsking\_](https://www.npmjs.com/~devilsking) (736115344539779072) - For making [DevilsCord](https://www.npmjs.com/package/devilscord).
- [@leref](https://www.npmjs.com/~leref) (608358453580136499) and whole Akarui Development Team - For making [aoi.js](https://www.npmjs.com/package/aoi.js), a great wrapper for interacting with Discord.
___

## FAQs:

Q1. Why is the message getting sent after soo long?
> Answer:  This function relies on many other processes to be completed first like uploading of image to img.bb server (if your network is slow, it may take a while), processing the image to apply watermark (if your system is slow, it may take a while) and converting webp buffer to jpeg buffer.

Q2. Which formats can you apply watermark?
> Answer: You can currently apply watermark on .png, .jpeg, .jpg, .webp, .svg.

Q3. I got an error! Where can I report?
> Answer: At the moment, I dont have any support server but you can always dm me at [@asheyxd](https://discordapp.com/users/428191892950220800) (428191892950220800)
