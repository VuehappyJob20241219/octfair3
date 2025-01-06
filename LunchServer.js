import { ImageAnnotatorClient } from "@google-cloud/vision";
import fs from "fs";

// 환경 변수 기반 경로 설정

const getFormattedDate = () => {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2); // 연도의 마지막 2자리
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 월 (1부터 시작)
  const day = String(now.getDate()).padStart(2, "0"); // 일

  return `${year}-${month}-${day}`;
};

const date = getFormattedDate();
const filePath = `V:/FileRepository/menu/${date}.jpg`; // 기본 이미지 파일 경로 설정
const client = new ImageAnnotatorClient({
  keyFilename: "brave-anagram-438514-n3-bfd0a7128c43.json",
});

// OCR 처리 함수
const processOCR = async (filePath) => {
  try {
    const [result] = await client.textDetection(filePath);
    const annotations = result.textAnnotations;
    if (annotations.length > 0) {
      console.log("OCR Text:", annotations[0].description);
      fs.writeFileSync(
        `uploads/ocr_result(${date}).txt`,
        annotations[0].description,
        "utf8"
      );
    } else {
      console.log("OCR 결과를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("OCR 처리 중 오류 발생:", error.message);
  }
};

// 파일 존재 확인 및 OCR 실행
if (!fs.existsSync(filePath)) {
  console.log("파일이 존재하지 않습니다:", filePath);
} else {
  processOCR(filePath);
}
