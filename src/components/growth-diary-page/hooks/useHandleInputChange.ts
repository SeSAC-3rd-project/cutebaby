import { useEffect, useState } from 'react';
import { ChildData } from '../../types';
import { calculateMonths } from '../functions/calculateMonths';

export const useHandleInputChange = (childData: ChildData) => {
    const [inputData, setInputData] = useState<ChildData>({
        gender: null, // childData.gender, // 초기 랜더링 시에는 childData 없어서 null
        birthDate: null, // childData.birthDate,
        measurementDate: new Date(),
        months: null,
        height: null,
        weight: null,
        headCircumference: null,
    });

    // childData의 gender와 birthDate 업데이트 시 inputData도 업데이트
    useEffect(() => {
        if (childData.gender !== null && childData.birthDate !== null) {
            setInputData((prev) => ({
                ...prev,
                gender: childData.gender,
                birthDate: childData.birthDate,
            }));
        }
    }, [childData.gender, childData.birthDate]);

    // measurementDate가 변경될 때 useCalculateMonths 실행
    useEffect(() => {
        if (inputData.birthDate && inputData.measurementDate) {
            const newMonths = calculateMonths(inputData);

            // 기존 months 값과 다를 때만 업데이트
            if (inputData.months !== newMonths) {
                setInputData((prev) => ({
                    ...prev,
                    months: newMonths,
                }));
            }
        }
    }, [inputData.measurementDate, inputData.birthDate]);

    // 입력 필드 변경 시
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputData((prev) => ({
            ...prev,
            [name]:
                name === 'measurementDate'
                    ? value
                        ? new Date(value)
                        : null
                    : value,
        }));
    };

    return { inputData, setInputData, handleInputChange };
};
