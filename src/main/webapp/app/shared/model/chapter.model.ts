export interface IChapter {
  id?: string;
  name?: string;
  chapterNumber?: number;
  description?: string;
  courseID?: string;
  isPaidChapter?: boolean;
}

export class Chapter implements IChapter {
  constructor(
    public id?: string,
    public name?: string,
    public chapterNumber?: number,
    public description?: string,
    public courseID?: string,
    public isPaidChapter?: boolean
  ) {
    this.isPaidChapter = this.isPaidChapter || false;
  }
}
