import { hostname } from "os"

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      
        {hostname: "images.unsplash.com"},
        {hostname :"lh3.googleusercontent.com"}

      
    ]
  },
  // experimental:{
  //   serverAction: true
  // }
}
 
module.exports = nextConfig