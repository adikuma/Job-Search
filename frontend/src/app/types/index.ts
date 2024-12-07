export interface Job {
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
  
  export interface JobPreferences {
    jobTitle: string;
    location: string;
    minSalary: string;
    jobType: string;
    remote: boolean;
  }
  
  export interface JobCardProps {
    job: Job;
  }