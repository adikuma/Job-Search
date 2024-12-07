"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Briefcase,
  MapPin,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { JobCard } from "./JobCard";
import { Select } from "./ui/Select";
import { Autocomplete } from "./ui/Autocomplete";
import type { Job, JobPreferences } from "../types";

const JobSearch = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [preferences, setPreferences] = useState<JobPreferences>({
    jobTitle: "",
    location: "",
    minSalary: "",
    jobType: "full-time",
    remote: false,
  });

  const glassEffect = {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "12px",
  };

  const enhancedDropdownGlass = {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(40px)",
    WebkitBackdropFilter: "blur(40px)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "12px",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async () => {
    if (!preferences.jobTitle.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      });
      const data = await response.json();
      setJobs(data);
      setIsExpanded(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
      setIsExpanded(false);
    }
  };

  const BadgeButton = ({
    selected,
    onClick,
    children,
  }: {
    selected: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-xl text-sm
        transition-all duration-200
        ${
          selected
            ? "bg-white/20 text-white border-white/20"
            : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10"
        }
        border
      `}
    >
      {children}
    </button>
  );

  const inputStyles = `
  w-full px-3 py-2 rounded-xl text-sm
  bg-white/5 border border-white/10 
  text-white placeholder-gray-500
  focus:outline-none focus:border-white/20
  transition-colors
`;
  const countryOptions = [
    // Asia Pacific
    { value: "singapore", label: "Singapore" },
    { value: "japan", label: "Japan" },
    { value: "south-korea", label: "South Korea" },
    { value: "china", label: "China" },
    { value: "hong-kong", label: "Hong Kong" },
    { value: "taiwan", label: "Taiwan" },
    { value: "india", label: "India" },
    { value: "australia", label: "Australia" },
    { value: "new-zealand", label: "New Zealand" },
    { value: "malaysia", label: "Malaysia" },
    { value: "indonesia", label: "Indonesia" },
    { value: "thailand", label: "Thailand" },
    { value: "vietnam", label: "Vietnam" },
    { value: "philippines", label: "Philippines" },

    // Europe
    { value: "united-kingdom", label: "United Kingdom" },
    { value: "germany", label: "Germany" },
    { value: "france", label: "France" },
    { value: "netherlands", label: "Netherlands" },
    { value: "sweden", label: "Sweden" },
    { value: "switzerland", label: "Switzerland" },
    { value: "ireland", label: "Ireland" },
    { value: "spain", label: "Spain" },
    { value: "italy", label: "Italy" },

    // Americas
    { value: "united-states", label: "United States" },
    { value: "canada", label: "Canada" },
    { value: "brazil", label: "Brazil" },

    // Middle East
    { value: "united-arab-emirates", label: "United Arab Emirates" },
    { value: "israel", label: "Israel" },
    { value: "saudi-arabia", label: "Saudi Arabia" },
    { value: "qatar", label: "Qatar" },
  ];

  const jobTypeOptions = [
    { value: "full-time", label: "Full Time" },
    { value: "part-time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
  ];

  return (
    <div className="relative min-h-screen px-6 py-12 bg-black">
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-transparent">
        <div ref={searchRef} className="max-w-lg mx-auto px-6 pt-6">
          <div
            className="p-2.5 flex items-center gap-3 rounded-xl h-16"
            style={glassEffect}
          >
            <Search className="text-gray-400 w-4 h-4 ml-2" />
            <input
              type="text"
              placeholder="Search positions..."
              className="flex-1 text-sm bg-transparent text-white outline-none"
              value={preferences.jobTitle}
              onChange={(e) =>
                setPreferences({ ...preferences, jobTitle: e.target.value })
              }
              onClick={() => setIsExpanded(true)}
              onKeyPress={handleKeyPress}
            />
            {isExpanded ? (
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors mr-1"
              >
                <X className="text-gray-400 w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors mr-1"
              >
                {isLoading ? (
                  <div className="animate-spin w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                )}
              </button>
            )}
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-xl mt-2"
                style={enhancedDropdownGlass}
              >
                <div className="flex flex-col gap-4 w-full">
                  <div>
                    <label className="flex items-center gap-2 text-xs text-gray-400 mb-1.5">
                      <Briefcase size={14} /> Job Type
                    </label>
                    <Select
                      value={preferences.jobType}
                      onChange={(value) =>
                        setPreferences({ ...preferences, jobType: value })
                      }
                      options={jobTypeOptions}
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-xs text-gray-400 mb-1.5">
                      <MapPin size={14} /> Location
                    </label>
                    <div>
                      <Autocomplete
                        value={preferences.location}
                        onChange={(value) =>
                          setPreferences({ ...preferences, location: value })
                        }
                        options={countryOptions}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-xs text-gray-400 mb-1.5">
                      <DollarSign size={14} /> Minimum Salary
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className={`${inputStyles} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                      placeholder="e.g. 5000"
                      value={preferences.minSalary}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        setPreferences({ ...preferences, minSalary: value });
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="pt-24 max-w-7xl mx-auto justify-center">
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-xl font-bold">Jobs</h1>
          <p className="text-sm text-gray-400">{jobs.length} results found</p>
        </div>
        <AnimatePresence>
          {jobs.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.1 },
                  }}
                >
                  <JobCard job={job} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {jobs.length === 0 && !isLoading && (
          <div className="text-center text-gray-500 mt-12">
            {/* <p>No jobs found</p> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSearch;
