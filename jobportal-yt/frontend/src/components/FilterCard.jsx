import React, { useEffect, useState } from 'react'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Gurugram"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Science", "Graphic Designer", "Product Manager", "Data analyst", "Cybersecurity Analyst", "Software Developer/Engineer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40000", "42000-100000", "100000-200000"] // Ensure ranges are consistent
    },
    // Add other filters here if needed
]

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({});
    const dispatch = useDispatch();

    const changeHandler = (filterType, value) => {
        setSelectedFilters((prev) => {
            const currentFilters = prev[filterType] || [];
            const updatedFilters = currentFilters.includes(value)
                ? currentFilters.filter((item) => item !== value) // Remove if already selected
                : [...currentFilters, value]; // Add if not selected
            return { ...prev, [filterType]: updatedFilters };
        });
    };

    useEffect(() => {
        dispatch(setSearchedQuery(JSON.stringify(selectedFilters)));
    }, [selectedFilters, dispatch]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            {
                fitlerData.map((data, index) => (
                    <div key={index}>
                        <h1 className='font-bold text-lg mt-4'>{data.fitlerType}</h1>
                        {
                            data.array.map((item, idx) => {
                                const itemId = `id${index}-${idx}`;
                                return (
                                    <div className='flex items-center space-x-2 my-2' key={itemId}>
                                        <Checkbox
                                            id={itemId}
                                            checked={selectedFilters[data.fitlerType]?.includes(item) || false}
                                            onCheckedChange={() => changeHandler(data.fitlerType, item)}
                                        />
                                        <Label htmlFor={itemId}>{item}</Label>
                                    </div>
                                );
                            })
                        }
                    </div>
                ))
            }
        </div>
    );
};

export default FilterCard;