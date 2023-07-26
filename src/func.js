const { response } = require("express");

module.exports = (bot) => {
  bot.functionManager.createFunction({
      name: "$watermark",
      type: "djs",
      code: async d => {
        const imgbbUploader = require("imgbb-uploader");
        const fetch = require("node-fetch");
        const data = d.util.aoiFunc(d)
        var imageurl = ''
        const [key,url, water] = data.inside.splits
        const {Watermark} = require('../index.js')
        const watermark=new Watermark(bot);
        var buffer = ""
       const response = await fetch(url);
       const arrayBuffer = await response.arrayBuffer();
       var buffer = await Buffer.from(arrayBuffer);
       const imageIsJpeg = await buffer.toString('base64').startsWith("/")
       const imageIsPng = await buffer.toString('base64').startsWith("i")
       const imageIsWebp = await buffer.toString('base64').startsWith("U")
       const imageIsSvg = await buffer.toString('base64').startsWith("P")
       if (imageIsJpeg == false && imageIsPng == false && imageIsWebp == false && imageIsSvg == false){
        data.result = await "Unknown Image Type"
       }
       else if (imageIsJpeg == true || imageIsPng == true || imageIsSvg == true || imageIsWebp == true) {
       const sharp = require('sharp')
       var buffer2 = await sharp(buffer).jpeg().toBuffer();
       const xd = await imgbbUploader({
         apiKey: key,
         base64string: await buffer2.toString('base64')
       }).then((response) => imageurl = response.url)
        var anything =await watermark.put(water,imageurl).then(async (watah) =>{

       if (watah == "UNSUPPORTED_WATERMARK_TYPE"){
        data.result = "Unknown Watermark Type"
       }
       else{
   
       const base64 = await watah.toString('base64')
   const options = {
     apiKey: key,
     base64string: base64
   };
   const dat = await imgbbUploader(options).then((response) => data.result = response.url)}
 })}
        return {
          code: d.util.setCode(data)
        }
    }
    })
}