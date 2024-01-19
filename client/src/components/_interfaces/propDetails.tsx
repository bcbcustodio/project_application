export interface HeroImageDetails {
  bgImage: string;
  introText: string;
  headlineText: string;
  displayBtns?: boolean;
}

export interface ProjectDetails {
  id?: string;
  name: string;
  imageUrl?: string;
  description?: string;
  link?: string;
  months?: string;
  jobDescription?: string[];
  title?: string;
  isWorkCard?: boolean;
}
