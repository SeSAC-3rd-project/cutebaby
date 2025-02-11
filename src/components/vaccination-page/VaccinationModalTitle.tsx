import styles from '../../styles/Modal.module.scss';
import { vaccinesName } from './vaccination-table/VaccinationTableData';

interface VaccinationModalTitleProps {
    vaccinationid: number;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const VaccinationModalTitle: React.FC<VaccinationModalTitleProps> = ({
    vaccinationid,
    setIsOpen,
}) => {
    return (
        <div className={styles.modal_title_wrap}>
            {/* Title // 백신이름 */}
            <div className={styles.modal_title}>
                {vaccinesName[vaccinationid - 1]}
                {vaccinationid !== 17 && ' 실접종일 입력'}
            </div>

            {/* x 버튼 */}
            <div
                onClick={() => {
                    setIsOpen(false);
                }}
                style={{
                    fontSize: '40px',
                    cursor: 'pointer',
                }}
            >
                X
            </div>
        </div>
    );
};
