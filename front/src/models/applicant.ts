import {Application} from './application';
import { Grade } from './grade';

export interface Applicant {
    id?: number;
    status?: boolean;
    gender?: string;
    lastname?: string;
    firstname?: string;
    pathways?: string;
    birth_date?: string;
    student_number?: string;
    nationality?: string;
    address?: string;
    city?: string;
    zip?: string;
    mobile?: string;
    phone?: string;
    email?: string;
    applications?: Application[];

    last_year_path: string;
    agreement_personnal_data: boolean;
    grade_since_bac: Grade[];
}
