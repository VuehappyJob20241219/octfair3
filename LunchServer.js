import fs from 'fs';
import path from 'path';
import { ImageAnnotatorClient } from '@google-cloud/vision';
// 파일 경로 직접 지정
const filePath = 'D:/theE.png'; // 원하는 파일 경로로 수정

const client = new ImageAnnotatorClient({
  keyFilename: 'D:\\vueProject2\\octfair3\\octfair-cf4a1a245562.json', // 본인의 서비스 계정 키 파일 경로
});

// OCR 처리 함수
const processOCR = async (filePath) => {
  try {
    const [result] = await client.textDetection(filePath);
    const annotations = result.textAnnotations;
    if (annotations.length > 0) {
      console.log('OCR Text:', annotations[0].description);
    } else {
      console.log('OCR 결과를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('OCR 처리 중 오류 발생:', error);
  }
};
if (!fs.existsSync(filePath)) {
  console.log('파일이 존재하지 않습니다.');
} else {
  processOCR(filePath);
}