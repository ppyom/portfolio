export type ImageItem =
  | {
      id: string;
      type: 'remote';
      url: string;
      deleted?: boolean;
    }
  | {
      id: string;
      type: 'local';
      file: File;
      url: string;
    };
