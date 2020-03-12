package com.test.dashboard.common.util;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.xml.bind.DatatypeConverter;

public class Util {

	public static String base64ToImgDecoder(String img, String src, String userId , String realSrc) {
		
		String[] tmpArray = img.split(",");
		String[] imgInfo = tmpArray[0].split(";");
		String[] extArray = imgInfo[0].split("/");
		
		String base64 = tmpArray[1];
		String ext = extArray[1];
		
		byte[] base64toBaty = DatatypeConverter.parseBase64Binary(base64);
		
		System.out.println(base64);
		System.out.println(ext);
		
		String filePath = src + "/resources/images/userimage/profile/" + userId + "_profileimage."+ext;
		
		File target = new File(filePath);
		
		if(!target.exists()) {
			BufferedImage bufImg = null;
			try {
				bufImg = ImageIO.read(new ByteArrayInputStream(base64toBaty));
				ImageIO.write(bufImg, ext, target);
				
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return null;
			}
			return realSrc + "/resources/images/userimage/profile/" + userId + "_profileimage."+ext;
			
		} else {
			return null;
		}
		
	}
	
}


