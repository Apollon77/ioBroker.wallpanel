import { FormControl, SxProps, TextField, Theme, Tooltip } from '@mui/material';
import { useI18n } from 'iobroker-react/hooks';
import React, { useState } from 'react';

interface NumberInputProps {
	min: number;
	max: number;
	defaultValue?: number;
	label: string;
	tooltip: string;
	value: number | undefined;
	sx?: SxProps<Theme> | undefined;
	onChange: (value: number) => void;
}
/***
 * need Funktion and useState hook
 *
 *
 *  const [numberValue, setNumberValue] = useState(0);
 *
 *
 *  const handeleNumber = (attr, value) => {
 *
 * 		setNumberValue(value);
 *
 * 		fullConfig.config.$sectionAttr$[attr] = value
 *
 * 	};
 */
export const NumberInput: React.FC<NumberInputProps> = ({
	min,
	max,
	defaultValue,
	label,
	tooltip,
	value,
	sx,
	onChange,
}): JSX.Element => {
	const [values, setValues] = useState<number | undefined>(defaultValue);
	const { translate: _ } = useI18n();

	return (
		<React.Fragment>
			<FormControl variant="outlined">
				<Tooltip title={_(`${tooltip}`)} arrow>
					<TextField
						variant="outlined"
						type="number"
						label={_(`${label}`)}
						value={value === undefined ? (values === undefined ? 30 : values) : value}
						color={'success'}
						sx={sx}
						onChange={(e) => {
							const value = e.target.value;
							if (value !== '') {
								let newValue = parseInt(e.target.value, 10);
								if (newValue > max) newValue = max;
								if (newValue < min) newValue = min;
								setValues(newValue);
								onChange(newValue);
							} else {
								const value = min;
								setValues(value);
								onChange(value);
							}
						}}
					/>
				</Tooltip>
			</FormControl>
		</React.Fragment>
	);
};
