import type { DocumentData, QuerySnapshot } from "firebase/firestore";

export class Data {
  id: string = "";
}

export class FirebaseData<T extends Data> {
  id!: string;
  data!: T;
  constructor(snapShot: DocumentData) {
    this.id = snapShot.id;
    this.data = snapShot.data() as T;
    this.data.id = snapShot.id;
  }
}
