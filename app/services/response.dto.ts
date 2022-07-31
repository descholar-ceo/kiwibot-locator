import { DocumentData } from 'firebase/firestore';
export default interface ResponseDto {
    status: number;
    message: string;
    data: any;
}
