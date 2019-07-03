export interface IVideo {
  id?: string;
  name?: string;
  episode?: number;
  description?: string;
  url?: string;
  courseID?: string;
  chapterID?: string;
  resources?: { name: string; url: string }[];
  isSample?: boolean;
}

export class Video implements IVideo {
  constructor(
    public id?: string,
    public name?: string,
    public episode?: number,
    public description?: string,
    public url?: string,
    public courseID?: string,
    public chapterID?: string,
    public resources?: { name: string; url: string }[],
    public isSample?: boolean
  ) {
    this.isSample = this.isSample || false;
  }
}
