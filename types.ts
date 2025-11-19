export interface Frame {
  id: string;
  name: string;
  src: string; // Data URI of the SVG frame
  textColor: string; // Suggested text color for this frame
}

export enum AppStep {
  UPLOAD = 'UPLOAD',
  EDITOR = 'EDITOR',
  RESULT = 'RESULT'
}
