export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    age: number;
    image: string;
    address: {
        city: string;
        address: string;
        state: string;
    };
    company: {
        name: string;
        title: string;
        department: string;
    };
}

export interface User {
    users: User[];
}