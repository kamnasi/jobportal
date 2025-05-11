import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const selectedFilters = JSON.parse(searchedQuery);
            console.log("Selected Filters:", selectedFilters);

            let filteredJobs = allJobs;

            const keyMapping = {
                Location: "location",
                Industry: "title",
                Salary: "salary"
            };

            Object.entries(selectedFilters).forEach(([filterType, filters]) => {
                const jobKey = keyMapping[filterType];

                if (filters.length > 0) {
                    if (filterType === "Salary") {
                        // Handle salary range filtering
                        filteredJobs = filteredJobs.filter((job) => {
                            const jobSalary = typeof job[jobKey] === "string"
                                ? parseInt(job[jobKey].replace(/[^0-9]/g, ""), 10) // Extract numeric value from string
                                : job[jobKey]; // Use the numeric value directly if it's already a number

                            return filters.some((filter) => {
                                const [min, max] = filter.split("-").map(Number); // Parse range
                                return jobSalary >= min && jobSalary <= max;
                            });
                        });
                    } else {
                        // Handle other filters (Location, Industry)
                        filteredJobs = filteredJobs.filter((job) => {
                            return filters.some((filter) =>
                                job[jobKey]?.toLowerCase() === filter.toLowerCase()
                            );
                        });
                    }
                }
            });

            console.log("Filtered Jobs:", filteredJobs);
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Jobs;