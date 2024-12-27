import styles from "./SkeletonLoader.module.css";

export default function SkeletonLoader() {
  return (
    <div className={styles.skeletonLoader}>
      <div className={styles.skeletonBanner}></div>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.skeletonGrid}>
        {Array.from({ length: 16 }).map((_, index) => (
          <div key={index} className={styles.skeletonSquare}></div>
        ))}
      </div>
    </div>
  );
}
