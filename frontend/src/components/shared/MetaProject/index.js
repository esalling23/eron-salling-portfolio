import React from 'react';
import styles from './style.module.scss';
import { Image } from 'react-bootstrap';

const MetaProject = ({ projectName, mainImage }) => {
	return (
		<div className={styles.arcadeBox}>
			<div className={styles.top} />
			<div className={styles.screen}>
				<Image src={mainImage} />
			</div>
			<div className={styles.controls} />
			<div className={styles.bottom} />
		</div>
	)
}

export default MetaProject