import axios from "axios";
import { XMLParser } from "fast-xml-parser";

export default async function getData(apiUrl: string) {
  try {
    const res = await axios.get(`${apiUrl}`);
    return res.data;
  } catch (err) {
    // console.error('Error fetching data:', err);
    alert("데이터를 가져오는 중 오류 발생");
  }
}

// fast-xml-parser를 사용해 XML 데이터를 JSON으로 변환
export function convertToJson(xmlData: string) {
  const parser = new XMLParser(); // XMLParser 객체 생성
  return parser.parse(xmlData); // XML -> JSON 변환
}
