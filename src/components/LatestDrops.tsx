import Link from 'next/link';
import styles from './LatestDrops.module.css';

const DROPS = [
    {
        id: '1',
        modelName: 'Para 3',
        fullName: 'SPYDERCO PARA 3',
        steel: 'CPM S45VN',
        lock: 'Compression',
        price: '$180',
        color: 'orange'
    },
    {
        id: '2',
        modelName: 'Sebenza',
        fullName: 'CHRIS REEVE SEBENZA 31',
        steel: 'Magnacut',
        lock: 'Frame Lock',
        price: '$500',
        color: 'white'
    },
    {
        id: '3',
        modelName: 'Ultratech',
        fullName: 'MICROTECH ULTRATECH',
        steel: 'M390',
        lock: 'OTF Auto',
        price: '$310',
        color: 'green'
    },
    {
        id: '4',
        modelName: '940',
        fullName: 'BENCHMADE 940 OSBORNE',
        steel: 'S30V',
        lock: 'Axis Lock',
        price: '$205',
        color: 'purple'
    }
];

const LatestDrops = () => {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>LATEST DROPS</h2>
            </div>

            <div className={styles.grid}>
                {DROPS.map((product) => (
                    <Link href={`/review/${product.id}`} key={product.id} className={styles.card}>
                        <div className={styles.priceTag}>{product.price}</div>

                        <div className={styles.modelNameHuge}>
                            {product.modelName}
                        </div>

                        <div className={styles.details}>
                            <h3 className={styles.productName}>{product.fullName}</h3>

                            <div className={styles.specs}>
                                <div className={styles.specItem}>
                                    <span className={styles.specLabel}>STEEL</span>
                                    <span>{product.steel}</span>
                                </div>
                                <div className={styles.specItem}>
                                    <span className={styles.specLabel}>LOCK</span>
                                    <span>{product.lock}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default LatestDrops;
