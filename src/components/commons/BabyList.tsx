import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchBabyInfo } from '../../store/babySlice';
import { babyinfo } from '../types';

interface BabyListProps {
    babyInfo: babyinfo[];
    handleSelectBaby: (babyId: number) => void;
    selectedBabyId: number | null;
}

export const BabyList: React.FC<BabyListProps> = ({
    babyInfo,
    handleSelectBaby,
    selectedBabyId,
}) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchBabyInfo());
    }, [dispatch, babyInfo.length]);

    return (
        <div>
            <div>
                {babyInfo.length === 0 ? (
                    <p>등록된 아이가 없습니다!</p>
                ) : (
                    babyInfo.map((baby: babyinfo) => (
                        <div
                            key={baby.babyid}
                            onClick={() => handleSelectBaby(baby.babyid)}
                            style={{
                                cursor: 'pointer',
                                fontWeight:
                                    baby.babyid === selectedBabyId
                                        ? 'bold'
                                        : 'normal',
                            }}
                        >
                            {baby.babyid} - {baby.babyname}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
