import Select from "react-select";

const Options = ({ categories, onChange }) => {
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
            placeholder="select event categories to view them on map"
            options={options}
            isOptionDisabled={(option) => (option.hasEvents ? false : true)}
            onChange={onChange}
        />
    );
};

export default Options;
