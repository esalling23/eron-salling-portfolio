import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Pill from './Pill';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import styles from './styles.module.scss';
import classNames from 'classnames';

const GROUPS = {
	FE: 'Frontend',
	BE: 'Backend',
	FS: 'Fullstack',
	GD: 'Game Development',
	DC: 'DevOps',
	DB: 'Database Management',
};

// Main component to handle the tab interface
const SkillsInterface = ({ items }) => {
	const [activeGroup, setActiveGroup] = useState(Object.keys(GROUPS)[0]);

	// Group items by 'group'
	const groupedItems = items?.reduce((acc, item) => {
		acc[item.group] = acc[item.group] || [];
		acc[item.group].push(item);
		return acc;
	}, {});

	const sideBarTabs = <ButtonGroup vertical className="border-0 rounded-0 d-none d-md-flex">
		{Object.keys(GROUPS).map((group) => (
			<Button
				key={group}
				variant={activeGroup === group ? 'primary' : 'secondary'}
				onClick={() => setActiveGroup(group)}
				className={classNames('w-100 m-0 border rounded-0', styles.groupButton, { active: activeGroup === group })}
			>
				{GROUPS[group]}
			</Button>
		))}
	</ButtonGroup>;

	const mobileTabs = <ButtonGroup vertical className="border-0 rounded-0 mb-3 d-flex flex-wrap flex-row d-md-none">
		{Object.keys(GROUPS).map((group) => (
			<Button
				key={group}
				variant={activeGroup === group ? 'primary' : 'secondary'}
				onClick={() => setActiveGroup(group)}
				className={classNames('w-50 m-0 border rounded-0', styles.groupButton, { active: activeGroup === group })}
			>
				{GROUPS[group]}
			</Button>
		))}
	</ButtonGroup>;

	return (
		<Container fluid className="pb-4">
			<h2 className="py-3 text-center text-title">Tech and Skills</h2>
			<Row className="d-flex flex-direction-row">
				{/* Tabs */}
				<Col xs={12} md={4}>
					{sideBarTabs}
					{mobileTabs}
				</Col>

				{/* Pills for active group */}
				<Col className={styles.pillContainer} xs={12} md={8}>
					{groupedItems && groupedItems[activeGroup] &&
						groupedItems[activeGroup].map((item, index) => (
							<Pill key={index} name={item.name} />
						))
					}
				</Col>
			</Row>
		</Container>
	);
};

SkillsInterface.propTypes = {
	items: PropTypes.array
};

export default SkillsInterface;