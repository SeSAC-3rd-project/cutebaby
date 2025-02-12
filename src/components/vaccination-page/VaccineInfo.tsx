import React from 'react';
import modal from '../../styles/Modal.module.scss';

interface VaccineInfoProps {
    setOpenInfoModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const VaccineInfo: React.FC<VaccineInfoProps> = ({
    setOpenInfoModal,
}) => {
    const vaccineinfo = [
        {
            name: 'HepB(B형간염)',
            description:
                'B형간염 표면항원(HBsAg) 양성인 산모로부터 출생한 신생아는 분만 직후 12시간 이내 B형간염 면역글로불린(HBIG) 및 B형간염 백신(1차)를 동시에 접종하고, 2차와 3차 접종은 각각 생후 1개월 및 6개월에 실시',
        },
        {
            name: 'BCG(결핵)',
            description: '생후 4주 이내 접종',
        },
        {
            name: 'DTaP(디프테리아·파상풍·백일해)',
            description:
                'DTaP-IPV(디프테리아·파상풍·백일해·폴리오) 또는 DTaP-IPV/Hib(디프테리아·파상풍·백일해·폴리오·b형헤모필루스인플루엔자) 혼합백신으로 접종 가능',
        },
        {
            name: 'Tdap/Td(디프테리아·파상풍·백일해/파상풍·디프테리아)',
            description:
                '11~12세 접종은 Tdap 또는 Td 백신으로 접종 가능하나, Tdap 백신을 우선 고려\n※이후 10년마다 Tdap 또는 Td 추가접종(11세 이후 접종 중 한 번은 Tdap으로 접종)',
        },
        {
            name: 'IPV(폴리오)',
            description:
                '3차 접종은 생후 6개월부터 18개월까지 접종 가능하며, DTaP-IPV(디프테리아·파상풍·백일해·폴리오) 또는 DTaP-IPV/Hib(디프테리아·파상풍·백일해·폴리오·b형헤모필루스인플루엔자) 혼합백신으로 접종 가능',
        },
        {
            name: 'Hib(b형헤모필루스인플루엔자)',
            description:
                '생후 2개월 ~ 5세 미만 모든 소아를 대상으로 접종, 5세 이상은 b형헤모필루스인플루엔자 감염 위험성이 높은 경우(기능적 또는 해부학적 무비증(겸상적혈구증, 비장 절제술 후)), 면역결핍질환(특히 igG2 아형 결핍증), 항암치료에 따른 면역저하, HIV 감염, 초기 요소 보체결핍증, 조혈모세포이식술을 받은 경우 접종, DTaP-IPV/Hib(디프테리아·파상풍·백일해·폴리오·b형헤모필루스인플루엔자)로 접종 가능\n- DTaP-IPV(디프테리아·파상풍·백일해·폴리오) 혼합백신: 생후 2, 4, 6개월, 4-6세에 DTaP, IPV 백신 대신 접종할 수 있음\n- DTaP-IPV/Hib(디프테리아·파상풍·백일해·폴리오·b형헤모필루스인플루엔자): 생후 2, 4, 6개월에 DTaP, IPV, Hib 백신 대신 접종할 수 있음\n※DTaP 혼합백신 사용 시 기초접종 3회는 동일 제조사의 백신으로 접종하는 것이 원칙이며, 생후 15-18개월에 접종하는 DTaP 백신은 제조사에 관계없이 선택하여 접종 가능',
        },
        {
            name: 'PCV(폐렴구균 단백결합)',
            description:
                '10가와 13가 단백결합 백신간에 교차접종은 권장하지 않음',
        },
        {
            name: 'PPSV(폐렴구균 다당질)',
            description:
                '2세 이상의 폐렴구균 감염의 고위험군을 대상으로 하며 건강상태를 고려하여 담당의사와 충분한 상담 후 접종\n※폐렴구균 감염의 고위험군\n- 면역 기능이 저하된 소아: HIV 감염증, 만성신부전과 신증후군, 면역억제제나 방사선 치료를 하는 질환(악성 종양, 백혈병, 림프종, 호지킨병) 또는 고형 장기 이식, 선천성 면역결핍질환\n- 기능적 또는 해부학적 무비증 소아: 겸상구 빈혈 또는 헤모글로빈증, 무비증 또는 비장 기능 장애\n- 면역 기능은 정상이나 다음과 같은 질환을 가진 소아: 만성 심장 질환, 만성 폐 질환, 만성 간 질환, 당뇨병, 뇌척수액 누출, 인공와우 이식 상태',
        },
        {
            name: 'RV1(로타바이러스 감염증)',
            description: '생후 2, 4개월 2회 접종(경구투여)',
        },
        {
            name: 'RV5(로타바이러스 감염증)',
            description: '생후 2, 4, 6개월 3회 접종(경구투여)',
        },
        {
            name: 'MMR(홍역·유행성이하선염·풍진)',
            description:
                '홍역 유행 시 생후 6-11개월 MMR 백신 접종이 가능하나 이 경우 생후 12개월(1세가 되는 생일) 이후에 MMR 백신으로 일정에 맞추어 접종',
        },
        {
            name: 'VAR(수두)',
            description: '생후 12~15개월에 1회 접종',
        },
        {
            name: 'HepA(A형간염)',
            description:
                '1차 접종은 생후 12~23개월에 시작하고, 2차는 1차 접종으로부터 6개월 이상 경과한 후(제조사에 따라 추천 접종간격이 다름) 접종',
        },
        {
            name: 'IJEV(일본뇌염 불활성화 백신)',
            description:
                '1차 접종 1개월 후 2차 접종을 실시하고, 추가 접종은 2차 접종으로부터 11개월 후, 6세, 12세에 접종',
        },
        {
            name: 'LJEV(일본뇌염 약독화 생백신)',
            description: '1차 접종 12개월 후 2차 접종',
        },
        {
            name: 'HPV(사람유두종바이러스 감염증)',
            description:
                '11-12세 여아에서 6-12개월 간격으로 2회 접종하고, 2가와 4가 백신 간 교차접종은 추천하지 않음',
        },
        {
            name: 'IIV(인플루엔자 불활성화 백신)',
            description:
                '생후 6개월-9세 미만 소아에서 접종 첫 해는 최소 4주 간격으로 2회 접종이 필요하며, 이듬해부터는 매년 1회 접종, 접종 첫 해에 1회만 접종 받았다면 다음 해에 4주 간격으로 2회 접종해야 함, 이전에 인플루엔자 접종을 받은 적이 있는 생후 6개월-9세 미만 소아도 유행주에 따라서 2회 접종이 필요할 수 있으므로, 매 절기 인플루엔자 국가예방접종 지원사업 관리지참을 참고',
        },
    ];

    return (
        <div
            onClick={() => {
                setOpenInfoModal(false);
            }}
            className={modal.modal_overlay}
        >
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className={modal.modal_title_wrap}>
                    <h1 style={{ marginBottom: '48px' }}>백신 정보</h1>
                    <div
                        onClick={() => {
                            setOpenInfoModal(false);
                        }}
                        className={modal.X_btn}
                    >
                        X
                    </div>
                </div>

                <div>
                    <span>
                        <strong>국가예방접종:</strong> 국가에서 권장하는
                        필수예방접종(국가는 ⌜감염병의 예방 및 관리에 관한 법률⌟
                        을 통해 예방접종 대상 감염병과 예방접종 실시기준 및
                        방법을 정하고, 이를 근거로 재원을 마련하여 지원하고
                        있음)
                    </span>

                    <ul
                        style={{ listStyle: 'none', padding: '0', margin: '0' }}
                    >
                        {vaccineinfo.map((vaccine, index) => (
                            <li
                                key={index}
                                style={{
                                    display: 'flex',
                                }}
                            >
                                <span>{index + 1}. </span>
                                <div
                                    style={{
                                        whiteSpace: 'pre-line', // \n을 인식하여 줄바꿈 적용
                                    }}
                                >
                                    <strong>{vaccine.name}</strong>:{' '}
                                    {vaccine.description}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
