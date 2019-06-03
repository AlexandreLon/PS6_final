import { Attachment } from './attachment';
import { Wish } from './wish';
import {Applicant} from './applicant';

export interface Application {
  id?: number;
  date?: string;
  applicant: Applicant;
  annotation: string;

  year: string;
  signature_date: number;
  signature_place: string;
  signature: boolean;
  status: boolean;
  period: string;
  category: string;
  wishes: Wish[];
  attachment: Attachment[];
}
