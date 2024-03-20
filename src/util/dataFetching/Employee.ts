import { IEmployee, IUser } from '../../interfaces/UserInterface';
import { formatDate } from '../time';

export const fetchAllDataEmployee = async (employee: IEmployee[]) => {
    let employeeArray = [];
    for (const [_, emp] of employee.entries()) {
        employeeArray.push({
            id: emp._id,
            firstName: emp.firstName,
            surname: emp?.surname,
            fullName: `${emp.firstName} ${emp?.surname}`,
            phoneNumber: emp.phoneNumber,
            gender: emp.gender,
            departmentName: emp?.department?.departmentName,
            function: emp.function,
            companyName: emp?.department?.company.companyName,
            departmentId: emp?.department?._id,
            user: emp?.user,
            updatedAt: emp.updatedAt,
            banned: emp.banned,
            createdAt: formatDate(emp.createdAt),
        });
    }
    return employeeArray;
};

export const responseDataEmployee = (data: any, page: number) => {
    return {
        employees: data,
        currentPage: Number(page),
        hasMorePages: true,
        lastPage: Number(page),
        perPage: data.length,
        prevPageUrl: null,
        total: data.length,
    };
};






