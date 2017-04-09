import {Specialization} from "./specialization";
import {County} from "./county";
export interface Consultant {
  name: string;
  phones: string[];
  counties: County[];
  legitimation: string;
  specializations: Specialization[];
  city: any[];
}
