from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

class AdzunaJobSearch:
    def __init__(self):
        self.app_id = os.getenv('ADZUNA_APP_ID')
        self.app_key = os.getenv('ADZUNA_API_KEY')
        self.base_url = "https://api.adzuna.com/v1/api/jobs"

    def search_jobs(self, preferences):
        print("\n=== Starting Job Search ===")
        print(f"Preferences received: {preferences}")

        try:
            # Adzuna API uses gb, us, au, br, de, fr, in, it, nl, nz, pl, ru, sg, za
            country = "sg"  # Singapore
            
            # Construct URL - Adzuna requires country and page number in URL
            url = f"{self.base_url}/{country}/search/1"
            
            # Convert salary to monthly (Adzuna uses annual salary)
            min_salary = int(preferences.get('minSalary', 0)) * 12 if preferences.get('minSalary') else None
            
            # Build parameters according to Adzuna API specs
            params = {
                'app_id': self.app_id,
                'app_key': self.app_key,
                'what': preferences.get('jobTitle', ''),
                'where': preferences.get('location', ''),
                'max_days_old': 30,  # Jobs posted within last 30 days
                'sort_by': 'date',  # Sort by date
                'results_per_page': 20,
            }

            # Add salary filter if provided
            if min_salary:
                params['salary_min'] = min_salary

            # Add job type filter
            if preferences.get('jobType'):
                params['category'] = self._map_job_type(preferences.get('jobType'))

            print(f"Making request to Adzuna with params: {params}")
            print(f"Request URL: {url}")
            
            response = requests.get(url, params=params)
            print(f"Response status: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                jobs = []
                
                for job in data.get('results', []):
                    salary_min = job.get('salary_min')
                    salary_max = job.get('salary_max')
                    salary_display = self._format_salary(salary_min, salary_max)
                    
                    formatted_job = {
                        'id': job.get('id'),
                        'title': job.get('title'),
                        'company': job.get('company', {}).get('display_name', 'Company Not Listed'),
                        'location': job.get('location', {}).get('display_name', 'Location Not Specified'),
                        'description': job.get('description', ''),
                        'type': job.get('category', {}).get('label', 'Full Time'),
                        'remote': 'remote' in job.get('description', '').lower(),
                        'salary': salary_display,
                        'applyUrl': job.get('redirect_url')
                    }
                    jobs.append(formatted_job)
                
                print(f"Found {len(jobs)} matching jobs")
                return jobs
            else:
                print(f"Error: API returned status code {response.status_code}")
                print(f"Response: {response.text}")
                return []

        except Exception as e:
            print(f"Error searching jobs: {str(e)}")
            import traceback
            print(traceback.format_exc())
            return []

    def _map_job_type(self, job_type):
        # Adzuna job categories
        mapping = {
            'full-time': 'it-jobs',  # Default to IT jobs for software roles
            'part-time': 'part-time-jobs',
            'contract': 'contracts',
            'internship': 'graduate-jobs'
        }
        return mapping.get(job_type.lower(), 'it-jobs')

    def _format_salary(self, min_sal, max_sal):
        if not min_sal and not max_sal:
            return "Salary not specified"
        
        # Convert annual to monthly
        if min_sal:
            min_sal = min_sal / 12
        if max_sal:
            max_sal = max_sal / 12

        if min_sal and max_sal:
            return f"S${min_sal:,.2f} - S${max_sal:,.2f} monthly"
        elif min_sal:
            return f"From S${min_sal:,.2f} monthly"
        else:
            return f"Up to S${max_sal:,.2f} monthly"

job_search = AdzunaJobSearch()

@app.route('/api/search', methods=['POST'])
def search_jobs():
    preferences = request.json
    print(f"\nReceived search request with preferences: {preferences}")
    jobs = job_search.search_jobs(preferences)
    return jsonify(jobs)

if __name__ == '__main__':
    load_dotenv()
    
    if not os.getenv('ADZUNA_APP_ID') or not os.getenv('ADZUNA_API_KEY'):
        print("Please set ADZUNA_APP_ID and ADZUNA_API_KEY in .env file")
        exit(1)
        
    print("\n=== Starting Flask Server ===")
    app.run(debug=True)