import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employee';

export class EmployeeData implements InMemoryDbService {

  createDb() {
    const employees: Employee[] = [
      {
        id: 1,
        name: 'Ravi',
        qualification: 'BE',
        experiance: '1yr',
        languages: ['hindi', 'english']
      },
      {
        id: 2,
        name: 'vishal',
        qualification: 'BE',
        experiance: '1yr',
        languages: ['hindi', 'english']
      },
      {
        id: 3,
        name: 'arjun',
        qualification: 'BE',
        experiance: '1yr',
        languages: ['hindi', 'english']
       },
      {
        id: 4,
        name: 'ram',
        qualification: 'BE',
        experiance: '1yr',
        languages: ['hindi', 'english']
       },
      {
        id: 5,
        name: 'raju',
        qualification: 'BE',
        experiance: '1yr',
        languages: ['hindi', 'english']
      }
    ];
    return { employees };
  }
}
