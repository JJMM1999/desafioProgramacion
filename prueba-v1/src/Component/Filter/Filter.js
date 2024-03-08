import React from 'react';
import Select from 'react-dropdown-select';

//style de la tabla
const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};
const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
};

const formatGroupLabel = (data) => (
    <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
);

const Filter = ({ listLocation, onLocationChange }) => {
    let options = [];

    //parte del codigo para cuando se seleccione devuelva el valor
    const handleChange = (selectedOptions) => {
        // Verificar si se seleccionó alguna opción
        if (selectedOptions && selectedOptions.length > 0) {
            const selectedValue = selectedOptions[0].value; // Obtener el valor de la opción seleccionada
            onLocationChange(selectedValue); // Llamar a la función onLocationChange con el valor seleccionado
        } else {
            // Si no se seleccionó ninguna opción, puedes manejarlo aquí
            onLocationChange("0");
        }
    };

    //se verifica si el array viene con datos y si es array
    if (Array.isArray(listLocation)) {
        options = listLocation.map(location => {
            const { name, residents } = location;
            const residentsCount = Array.isArray(residents) ? residents.length : 0;
            return { label: `${name} residentes: ${residentsCount}`, value: name };
        });
    } else {
        console.error("listLocation no es un array.");
    }

    return (
        <Select
            options={options}
            formatGroupLabel={formatGroupLabel} // Integración de la función formatGroupLabel
            noDataLabel='No hay planeta'
            onChange={handleChange}
        />
    );
};

export default Filter;