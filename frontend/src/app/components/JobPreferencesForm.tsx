"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import JobResults from './JobResults';  // Changed to default import

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  type: string;
  remote: boolean;
  salary: string;
  applyUrl: string;
}

const JobPreferencesForm = () => {
  const [preferences, setPreferences] = useState({
    jobTitle: '',
    location: '',
    minSalary: '',
    maxDistance: '',
    jobType: 'full-time',
    experience: 'entry',
    remote: false
  });

  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });
      const data = await response.json();
      console.log("Received jobs:", data);
      setJobs(data);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch jobs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Job Search Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-gray-700">Job Title</label>
              <Input
                type="text"
                value={preferences.jobTitle}
                onChange={(e) => setPreferences({...preferences, jobTitle: e.target.value})}
                placeholder="e.g. Software Engineer"
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-gray-700">Location</label>
              <Input
                type="text"
                value={preferences.location}
                onChange={(e) => setPreferences({...preferences, location: e.target.value})}
                placeholder="e.g. Singapore"
                className="w-full"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700">Minimum Salary (Monthly)</label>
              <Input
                type="number"
                value={preferences.minSalary}
                onChange={(e) => setPreferences({...preferences, minSalary: e.target.value})}
                placeholder="e.g. 5000"
                className="w-full"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700">Job Type</label>
              <Select 
                value={preferences.jobType}
                onChange={(e) => setPreferences({...preferences, jobType: e.target.value})}
                className="w-full"
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </Select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={preferences.remote}
                onChange={(e) => setPreferences({...preferences, remote: e.target.checked})}
                className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <label className="text-gray-700">Remote Only</label>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search Jobs'}
            </Button>

            {error && (
              <p className="text-red-500 text-center">{error}</p>
            )}
          </form>
        </CardContent>
      </Card>

      {jobs.length > 0 && <JobResults jobs={jobs} />}
      {jobs.length === 0 && !isLoading && !error && (
        <p className="text-center mt-8 text-gray-500">
          No jobs found. Try adjusting your search criteria.
        </p>
      )}
    </div>
  );
};

export default JobPreferencesForm;