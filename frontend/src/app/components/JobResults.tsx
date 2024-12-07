"use client";

import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { ScrollArea } from './ui/ScrollArea';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

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

interface JobResultsProps {
  jobs: Job[];
}

const JobResults = ({ jobs }: JobResultsProps) => {
  return (
    <Card className="w-full mt-8">
      <CardHeader>
        <CardTitle>Found {jobs.length} Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <div className="space-y-4">
            {jobs.map((job) => (
              <Card key={job.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.company}</p>
                    <p className="text-sm text-gray-600">{job.location}</p>
                    <p className="mt-2 text-gray-700 line-clamp-3">{job.description}</p>
                    <div className="mt-2 space-x-2">
                      <Badge>{job.type}</Badge>
                      {job.remote && <Badge variant="secondary">Remote</Badge>}
                      <Badge variant="outline">{job.salary}</Badge>
                    </div>
                  </div>
                  <Button 
                    onClick={() => window.open(job.applyUrl, '_blank')}
                    variant="outline"
                    className="shrink-0"
                  >
                    Apply
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default JobResults;