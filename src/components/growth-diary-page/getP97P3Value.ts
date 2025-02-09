import { LmsData } from '../types';
import { calculateP3, calculateP97 } from './Calculate';

export const getP97P3Value = (
    growthType: string, // "키", "몸무게", "머리둘레"
    filteredLmsDataByGender: LmsData[] // 필터링된 성별 데이터
) => {
    console.log(
        'getP97P3Value filteredLmsDataByGender',
        filteredLmsDataByGender
    );

    // filteredLmsDataByGender에서 성장종류코드가 growthType인 데이터만 필터링
    const filteredData = filteredLmsDataByGender.filter(
        (data) => data['영유아성장종류코드명'] === growthType
    );

    console.log('getP97P3Value filteredData', filteredData, growthType);

    // LMS값을 이용해 개월수에 따른 p97값 구하기
    const p97 = filteredData.map((data) => ({
        x: data['개월수구분코드'],
        y: calculateP97(
            Number(data['영유아성장도표L값']),
            Number(data['영유아성장도표M값']),
            Number(data['영유아성장도표S값'])
        ),
    }));

    const p3 = filteredData.map((data) => ({
        x: data['개월수구분코드'],
        y: calculateP3(
            Number(data['영유아성장도표L값']),
            Number(data['영유아성장도표M값']),
            Number(data['영유아성장도표S값'])
        ),
    }));

    return { p97, p3 };
};
