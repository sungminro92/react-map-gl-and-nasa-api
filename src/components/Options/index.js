import Select from "react-select";
import { useState } from "react"

const Options = ({ categories, onChange }) => {
    const [value, setValue] = useState("");

    let options = [
        {
            value: 0,
            label: "View All Events",
            hasEvents: true
        }
    ];

    categories.forEach((category) => {
        options.push({
            value: category.id,
            label: category.title + ` (${category.numOfEvents})`,
            hasEvents: category.hasEvents
        });
    });

    return (
        <Select
            isMulti
            placeholder="Select categories to view them on map"
            options={options}
            value={value}
            isOptionDisabled={(option) => (option.hasEvents ? false : true)}
            onChange={onChange}
        />
    );
};

export default Options;
