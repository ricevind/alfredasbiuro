export interface LandingPage {
  title: string;
  logoImage: string;
  mainWelcome: {
    header1: string;
    header2: string;
    heroImage: string;
  };
  actionContent: {
    question: string;
    subQuestion: string;
    summary: string;
  };
  description: string;
  adress: {
    street: string;
    city: string;
  };
  phones: {
    phone1: string;
    phone2: string;
    phone3: string;
  };
}
