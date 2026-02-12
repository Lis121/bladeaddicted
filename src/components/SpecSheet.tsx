import styles from './SpecSheet.module.css';

interface SpecSheetProps {
    specs: { label: string; value: string }[];
}

const SpecSheet = ({ specs }: SpecSheetProps) => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Technical Specifications</h3>
            <table className={styles.table}>
                <tbody>
                    {specs.map((spec, index) => (
                        <tr key={index} className={styles.row}>
                            <td className={styles.label}>{spec.label}</td>
                            <td className={styles.value}>{spec.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SpecSheet;
