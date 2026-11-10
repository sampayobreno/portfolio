import Image from "next/image";
import styles from "./ProjectCover.module.css";

// Editorial photo + an interface sketch drawn in code, so example covers read as product work.
function Mock({ kind }) {
  if (kind === "queue") {
    return (
      <div className={styles.card}>
        <div className={styles.bar}><i /><i /><i /><b style={{ width: "34%" }} /></div>
        {[["FR", 62, true], ["PT", 48], ["EN", 70], ["ES", 40]].map(([lang, width, risk]) => (
          <div className={styles.row} key={lang}>
            <span className={styles.avatar} /><b style={{ width: `${width}%` }} />
            <span className={risk ? `${styles.pill} ${styles.pillAccent}` : styles.pill}>{lang}</span>
          </div>
        ))}
      </div>
    );
  }
  if (kind === "timeline") {
    return (
      <div className={styles.card}>
        <div className={styles.bar}><i /><i /><i /><b style={{ width: "28%" }} /></div>
        <div className={styles.timeline}>
          {[54, 72, 40, 64].map((width, i) => (
            <div className={styles.event} key={width}><span className={i === 3 ? `${styles.node} ${styles.nodeAccent}` : styles.node} /><b style={{ width: `${width}%` }} /></div>
          ))}
        </div>
        <span className={styles.button} />
      </div>
    );
  }
  if (kind === "tokens") {
    return (
      <div className={styles.card}>
        <div className={styles.bar}><i /><i /><i /><b style={{ width: "22%" }} /></div>
        <div className={styles.tokens}>
          <span className={styles.aa}>Aa</span>
          <div className={styles.swatches}>{["ink", "ink2", "rule", "surface", "accent", "soft"].map((tone) => <span key={tone} className={styles[`sw_${tone}`]} />)}</div>
        </div>
        <div className={styles.row}><span className={styles.button} /><span className={styles.ghost} /></div>
      </div>
    );
  }
  return (
    <div className={styles.card}>
      <div className={styles.steps}><span className={styles.stepOn} /><span className={styles.stepOn} /><span /></div>
      {[66, 52].map((width) => <div className={styles.row} key={width}><span className={styles.thumb} /><b style={{ width: `${width}%` }} /></div>)}
      <div className={styles.total}><b style={{ width: "30%" }} /><b style={{ width: "18%" }} /></div>
      <span className={styles.button} />
    </div>
  );
}

export function ProjectCover({ project, priority = false, sizes = "(max-width: 760px) 100vw, 60vw" }) {
  return (
    <div className={styles.cover}>
      <Image src={project.cover.src} alt="" fill priority={priority} sizes={sizes} className={styles.photo} />
      <div className={styles.mockWrap} aria-hidden="true"><Mock kind={project.mock} /></div>
    </div>
  );
}
