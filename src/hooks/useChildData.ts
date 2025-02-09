import { useEffect, useMemo, useState } from 'react';
import { babyinfo, ChildData } from '../components/types';

// childData useState
export const useChildData = (
    babyInfo: babyinfo[],
    selectedBabyId: number | null
) => {
    // 선택한 아이 정보 가져오기
    const selectedBabyInfo = useMemo(
        () => babyInfo.find((baby) => baby.babyid === selectedBabyId),
        [babyInfo, selectedBabyId]
    );

    const [childData, setChildData] = useState<ChildData>({
        gender: null,
        birthDate: null,
        measurementDate: null,
        months: null,
        height: null,
        weight: null,
        headCircumference: null,
    });

    // selectedBabyId가 변경될 때 childData 업데이트
    useEffect(() => {
        if (!selectedBabyInfo) {
            console.warn('selectedBabyInfo가 없습니다.');
            return;
        }

        console.log(
            '✅ useChildData: selectedBabyInfo 업데이트됨',
            selectedBabyInfo
        );

        setChildData({
            gender: selectedBabyInfo.gender === 'boy' ? 'male' : 'female',
            birthDate: new Date(selectedBabyInfo.birthday),
            measurementDate: null,
            months: null,
            height: null,
            weight: null,
            headCircumference: null,
        });
    }, [selectedBabyInfo]); // selectedBabyInfo가 변경될 때 실행

    return { childData, setChildData };
};
