import {TableCard} from "@intra/ui/components/table/TableCard";
import {FilterConfig, Table} from "@intra/ui/components/table/Table";
import {User} from "@intra/shared/types/user.types";
import {formStyles} from "@intra/ui/components/styles/formStyles";

export default function UsersAdmin() {
    const users: User[]  = [
        {
            name: "Kiss Péter",
            email: "peter@example.com",
            birthday: "1995-06-15",
            registrationStatus: "registered",
            role: "student",
        },
        {
            name: "Nagy Anna",
            email: "anna@example.com",
            birthday: "1995-06-15",
            registrationStatus: "partialRegistration",
            role: "admin",
        },
        {
            name: "Tóth Béla",
            email: "bela@example.com",
            birthday: "1989-12-01",
            registrationStatus: "emailNotConfirmed",
            role: "unverified",
        },
    ] as const;

    const filters: FilterConfig[] = [
        { field: "name", label: "Name", type: "string" },
        { field: "email", label: "Email", type: "string" },
        { field: "birthday", label: "Birthday", type: "date" },
        {
            field: "registrationStatus",
            label: "Registration Status",
            type: "select",
            options: [
                { label: "registered", value: "registered" },
                { label: "partialRegistration", value: "partialRegistration" },
                { label: "emailNotConfirmed", value: "emailNotConfirmed" },
            ],
        },
        {
            field: "role",
            label: "Role",
            type: "select",
            options: [
                { label: "admin", value: "admin" },
                { label: "student", value: "student" },
                { label: "unverified", value: "unverified" },
            ],
        },
    ];


    return (
        <TableCard>
            <div className={formStyles.form}>
                <h1 className="text-xl font-semibold mb-4">Users</h1>
                <Table data={users} filters={filters}/>
            </div>

        </TableCard>
    );
}