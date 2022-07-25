import images from '../models/images.js';

import compress_images from 'compress-images';

export const postImage =  async (req,res) => {
    // const image = req.body;
    // const img = image.data

    // console.log(req.body);
    // console.log(req.file)
    const input_img= "D:/ShoppingSite/server/*.{jpg,JPEG,png,gif}"
    const output_path = "img/";
    
    try {
//         console.log(compress_images(input_img, output_path,{compress_force: false,statistic: true, autoupdate:true}, false,
//             { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
//             { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
//             { svg: { engine: "svgo", command: "--multipass" } },
//             { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
//             function (error, completed, statistic) {
//                 console.log("-------------");
//                 console.log(error);
//                 console.log(completed);
//                 console.log(statistic);
//                 console.log("-------------");
//               }
// ))
    } catch (error) {
        console.log(error)
    }
}
