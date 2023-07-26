const fetch = require("node-fetch");
const {Client} = require("discord.js");
const Canvas = require('canvas');
const { MessageEmbed, MessageAttachment } = require('discord.js')
var GlobalClient;
class Watermark {
    constructor(client) {
        if (!client) throw new SyntaxError("No Client provided!");
        this.client = client;
        GlobalClient=client;
    };

    async put(water,bg,erreturn=true)
    {
     
      var wext=water.substring(water.lastIndexOf('.'));
      var bgext=bg.substring(bg.lastIndexOf('.'));
      if(erreturn==true)
      {
      if(wext!='.png' && wext!='.jpg' && wext!='.jpeg')
      console.log('Error: Unsupported Watermark File Format!\naoi.wm: The provided watermark image('+water+') is not supported!\nVisit https://www.npmjs.com/package/aoi.wm to learn about latest file formats(.jpeg, .jpeg, .png, .webp)!')
      if(bgext!='.png' && bgext!='.jpg' && bgext!='.jpeg')
      console.log('Error: Unsupported Image File Format!\naoi.wm: The provided watermark image('+bg+') is not supported!\nVisit https://www.npmjs.com/package/aoi.wm to learn about latest file formats(.jpeg, .jpg, .png)!')
      }
      if(wext!='.png' && wext!='.jpg' && wext!='.jpeg')
      {return "UNSUPPORTED_WATERMARK_TYPE";}
      if(bgext!='.png' && bgext!='.jpg' && bgext!='.jpeg')
      {return "UNSUPPORTED_BACKGROUND_TYPE";}

      const background = await Canvas.loadImage(bg);
      const watermark=await Canvas.loadImage(water);
      
      const canvas = await Canvas.createCanvas(background.width, background.height);
          const context = await canvas.getContext('2d');
      
      await context.drawImage(background, 0, 0, canvas.width, canvas.height);
      var cw=canvas.width;
      var ch=canvas.height;
      var ww=watermark.width;
      var wh=watermark.height;
      if(ww==wh)
      {
        if(cw>ch)
        {
          var theight=(canvas.width/watermark.width)*watermark.height;
          await context.drawImage(watermark, 0, 0, canvas.width, theight);
        }
        else if(cw<=ch)
        {
          var twidth=(canvas.height/watermark.height)*watermark.width;
          await context.drawImage(watermark, 0, 0, twidth, canvas.height);
        }
      }
      else if(cw==ch)
      {
        if(ww>wh)
        {
           var twidth=(canvas.height/watermark.height)*watermark.width;
          await context.drawImage(watermark, 0, 0, twidth, canvas.height);
        }
        else if(ww<=wh)
        {
           var theight=(canvas.width/watermark.width)*watermark.height;
          await context.drawImage(watermark, 0, 0, canvas.width, theight);
        }
      
      }
      else
      {
        if(cw>ch)
        {
          if(ww>wh)
          {
            var twidth=(canvas.height/watermark.height)*watermark.width;
          await context.drawImage(watermark, 0, 0, twidth, canvas.height);
          }
          else
          {
            var theight=(canvas.width/watermark.width)*watermark.height;
            await context.drawImage(watermark, 0, 0, canvas.width, theight);
          }
        }
        else
        {
          if(ww>wh)
          {
            var twidth=(canvas.height/watermark.height)*watermark.width;
            await context.drawImage(watermark, 0, 0, twidth, canvas.height);
            
          }
          else
          {
            var theight=(canvas.width/watermark.width)*watermark.height;
            await context.drawImage(watermark, 0, 0, canvas.width, theight);
          }
        }
        
        
      }
      
  
      
          return canvas.toBuffer();
        
    }

}
module.exports = Watermark