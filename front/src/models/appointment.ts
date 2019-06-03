import {Applicant} from './applicant';

export interface Appointment {
    id?: number;
    starting_date?: number;
    ending_date?: number;
    type?: string;
    applicant_id ?: number;
    applicant?: Applicant;
    object?: string;
    status?: boolean;
}

export enum AppointmentType {
    Type1 = 'Remise de mon dossier de candidature',
    Type2 = 'Formalités d\'inscription',
    Type3 = 'Questions dossier de candidature',
    Type4 = 'Formalités administratives pour le voyage',
    Type5 = 'Dossier de bourse',
    Type6 = 'Autre',
}

export enum DayName {
    monday = 'Lundi',
    tuesday = 'Mardi',
    wednesday = 'Mercredi',
    thursday = 'Jeudi',
    friday = 'Vendredi',
}
